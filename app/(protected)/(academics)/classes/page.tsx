'use client';

import { useEffect, useState } from 'react';
import { useUIStore, useClassStore } from '@/lib/store';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Plus, Edit, Trash2, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Class, ClassInput } from '@/lib/types';
import { toast } from 'sonner';
import { ColumnDef } from '@tanstack/react-table';

const classSchema = z.object({
    branchId: z.number().int().positive(),
    academicYearId: z.number().int().positive(),
    courseId: z.number().int().positive(),
    name: z.string().min(2, 'Name must be at least 2 characters'),
    section: z.string().optional(),
    maxStudents: z.number().int().positive().optional(),
    roomNo: z.string().optional(),
});

type ClassFormValues = z.infer<typeof classSchema>;

export default function ClassesPage() {
    const setBreadcrumbs = useUIStore((state) => state.setBreadcrumbs);
    const { classes, loading, fetchClasses, addClass, updateClass, deleteClass } = useClassStore();
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [editingClass, setEditingClass] = useState<Class | null>(null);

    const form = useForm<ClassFormValues>({
        resolver: zodResolver(classSchema),
        defaultValues: {
            branchId: 1,
            academicYearId: 1,
            courseId: 1,
            name: '',
            section: '',
            maxStudents: undefined,
            roomNo: '',
        },
    });

    useEffect(() => {
        setBreadcrumbs([{ label: 'Dashboard', href: '/dashboard' }, { label: 'Classes' }]);
        fetchClasses();
    }, [setBreadcrumbs, fetchClasses]);

    useEffect(() => {
        if (editingClass) {
            form.reset({
                branchId: editingClass.branchId,
                academicYearId: editingClass.academicYearId,
                courseId: editingClass.courseId,
                name: editingClass.name,
                section: editingClass.section || '',
                maxStudents: editingClass.maxStudents || undefined,
                roomNo: editingClass.roomNo || '',
            });
        } else {
            form.reset();
        }
    }, [editingClass, form]);

    const onSubmit = async (values: ClassFormValues) => {
        try {
            if (editingClass) {
                await updateClass(editingClass.id, values);
                toast.success('Class updated successfully');
                setEditingClass(null);
            } else {
                await addClass(values);
                toast.success('Class created successfully');
                setIsAddDialogOpen(false);
            }
            form.reset();
        } catch (error: any) {
            toast.error(error.message || 'Something went wrong');
        }
    };

    const handleDelete = async (classItem: Class) => {
        if (confirm(`Are you sure you want to delete "${classItem.name}"?`)) {
            try {
                await deleteClass(classItem.id);
                toast.success('Class deleted successfully');
            } catch (error: any) {
                toast.error(error.message || 'Failed to delete class');
            }
        }
    };

    const handleEditClick = (classItem: Class) => {
        setEditingClass(classItem);
        setIsAddDialogOpen(true);
    };

    const columns: ColumnDef<Class>[] = [
        {
            accessorKey: 'name',
            header: 'Class Name',
        },
        {
            accessorKey: 'section',
            header: 'Section',
            cell: ({ row }) => row.original.section || '-',
        },
        {
            accessorKey: 'roomNo',
            header: 'Room No',
            cell: ({ row }) => row.original.roomNo || '-',
        },
        {
            accessorKey: 'maxStudents',
            header: 'Max Students',
            cell: ({ row }) => row.original.maxStudents || '-',
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
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">Classes</h1>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Manage your classes</p>
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
                    setIsAddDialogOpen(open);
                    if (!open) { setEditingClass(null); form.reset(); }
                }}>
                    <DialogTrigger asChild>
                        <Button><Plus className="h-4 w-4 mr-2" />Add Class</Button>
                    </DialogTrigger>
                    <DialogContent className="max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>{editingClass ? 'Edit Class' : 'Add New Class'}</DialogTitle>
                        </DialogHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField control={form.control} name="name" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Class Name</FormLabel>
                                        <FormControl><Input placeholder="Class 10A" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField control={form.control} name="section" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Section</FormLabel>
                                            <FormControl><Input placeholder="A" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <FormField control={form.control} name="roomNo" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Room No</FormLabel>
                                            <FormControl><Input placeholder="101" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                </div>
                                <FormField control={form.control} name="maxStudents" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Max Students</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="50"
                                                {...field}
                                                onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                                                value={field.value || ''}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <div className="flex justify-end gap-2">
                                    <Button type="button" variant="outline" onClick={() => { setIsAddDialogOpen(false); setEditingClass(null); form.reset(); }}>Cancel</Button>
                                    <Button type="submit" disabled={loading}>
                                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        {editingClass ? 'Update' : 'Create'}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
            </div>

            {loading && classes.length === 0 ? (
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                </div>
            ) : (
                <div className="hidden md:block">
                    <DataTable columns={columns} data={classes} searchKey="name" searchPlaceholder="Search classes..." />
                </div>
            )}
        </div>
    );
}
