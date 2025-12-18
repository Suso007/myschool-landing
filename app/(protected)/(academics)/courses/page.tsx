'use client';

import { useEffect, useState } from 'react';
import { useUIStore, useCourseStore } from '@/lib/store';
import { DataTable } from '@/components/ui/data-table';
import { MobileCardDeck } from '@/components/ui/mobile-card-deck';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit, Trash2, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Course } from '@/lib/types';
import { toast } from 'sonner';
import { ColumnDef } from '@tanstack/react-table';

const courseSchema = z.object({
    departmentId: z.number().int().positive(),
    name: z.string().min(2, 'Name must be at least 2 characters'),
    code: z.string().min(2, 'Code must be at least 2 characters').optional(),
    description: z.string().optional(),
    duration: z.number().int().positive().optional(),
});

type CourseFormValues = z.infer<typeof courseSchema>;

export default function CoursesPage() {
    const setBreadcrumbs = useUIStore((state) => state.setBreadcrumbs);
    const { courses, loading, fetchCourses, addCourse, updateCourse, deleteCourse } = useCourseStore();
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [editingCourse, setEditingCourse] = useState<Course | null>(null);

    const form = useForm<CourseFormValues>({
        resolver: zodResolver(courseSchema),
        defaultValues: {
            departmentId: 1,
            name: '',
            code: '',
            description: '',
            duration: undefined,
        },
    });

    useEffect(() => {
        setBreadcrumbs([
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Courses' },
        ]);
        fetchCourses();
    }, [setBreadcrumbs, fetchCourses]);

    useEffect(() => {
        if (editingCourse) {
            form.reset({
                departmentId: editingCourse.departmentId,
                name: editingCourse.name,
                code: editingCourse.code || '',
                description: editingCourse.description || '',
                duration: editingCourse.duration || undefined,
            });
        } else {
            form.reset();
        }
    }, [editingCourse, form]);

    const onSubmit = async (values: CourseFormValues) => {
        try {
            if (editingCourse) {
                await updateCourse(editingCourse.id, values);
                toast.success('Course updated successfully');
                setEditingCourse(null);
            } else {
                await addCourse(values);
                toast.success('Course created successfully');
                setIsAddDialogOpen(false);
            }
            form.reset();
        } catch (error: any) {
            toast.error(error.message || 'Something went wrong');
        }
    };

    const handleDelete = async (course: Course) => {
        if (confirm(`Are you sure you want to delete "${course.name}"?`)) {
            try {
                await deleteCourse(course.id);
                toast.success('Course deleted successfully');
            } catch (error: any) {
                toast.error(error.message || 'Failed to delete course');
            }
        }
    };

    const handleEditClick = (course: Course) => {
        setEditingCourse(course);
        setIsAddDialogOpen(true);
    };

    const columns: ColumnDef<Course>[] = [
        {
            accessorKey: 'name',
            header: 'Course Name',
        },
        {
            accessorKey: 'code',
            header: 'Code',
            cell: ({ row }) => (
                row.original.code ? (
                    <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                        {row.original.code}
                    </code>
                ) : '-'
            ),
        },
        {
            accessorKey: 'duration',
            header: 'Duration',
            cell: ({ row }) => row.original.duration ? `${row.original.duration} years` : '-',
        },
        {
            accessorKey: 'isActive',
            header: 'Status',
            cell: ({ row }) => (
                <Badge variant={row.original.isActive ? 'default' : 'secondary'}>
                    {row.original.isActive ? 'Active' : 'Inactive'}
                </Badge>
            ),
        },
        {
            id: 'actions',
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEditClick(row.original)}>
                        <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(row.original)} className="text-red-600 dark:text-red-400">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">Courses</h1>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Manage your courses</p>
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
                    setIsAddDialogOpen(open);
                    if (!open) {
                        setEditingCourse(null);
                        form.reset();
                    }
                }}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Course
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>{editingCourse ? 'Edit Course' : 'Add New Course'}</DialogTitle>
                        </DialogHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Course Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Bachelor of Computer Science" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="code"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Course Code</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="BCS" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="duration"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Duration (Years)</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        placeholder="4"
                                                        {...field}
                                                        onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                                                        value={field.value || ''}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Course description..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex justify-end gap-2">
                                    <Button type="button" variant="outline" onClick={() => {
                                        setIsAddDialogOpen(false);
                                        setEditingCourse(null);
                                        form.reset();
                                    }}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={loading}>
                                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        {editingCourse ? 'Update' : 'Create'}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
            </div>

            {loading && courses.length === 0 ? (
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                </div>
            ) : (
                <>
                    <div className="hidden md:block">
                        <DataTable
                            columns={columns}
                            data={courses}
                            searchKey="name"
                            searchPlaceholder="Search courses..."
                        />
                    </div>
                    <div className="md:hidden">
                        <MobileCardDeck
                            items={courses}
                            renderTitle={(course) => course.name}
                            renderBadge={(course) => (
                                <Badge variant={course.isActive ? 'default' : 'secondary'}>
                                    {course.isActive ? 'Active' : 'Inactive'}
                                </Badge>
                            )}
                            renderContent={(course) => (
                                <div className="space-y-2 text-sm">
                                    {course.code && (
                                        <div>
                                            <span className="text-gray-600 dark:text-gray-400">Code: </span>
                                            <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{course.code}</code>
                                        </div>
                                    )}
                                    {course.duration && (
                                        <div>
                                            <span className="text-gray-600 dark:text-gray-400">Duration: </span>
                                            {course.duration} years
                                        </div>
                                    )}
                                    {course.description && (
                                        <div className="text-gray-600 dark:text-gray-400 text-xs">
                                            {course.description}
                                        </div>
                                    )}
                                </div>
                            )}
                            onEdit={handleEditClick}
                            onDelete={handleDelete}
                        />
                    </div>
                </>
            )}
        </div>
    );
}
