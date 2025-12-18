'use client';

import { useEffect, useState } from 'react';
import { useUIStore, useStudentStore } from '@/lib/store';
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
import { Student, StudentInput } from '@/lib/types';
import { toast } from 'sonner';
import { ColumnDef } from '@tanstack/react-table';

const studentSchema = z.object({
    userId: z.number().int().positive(),
    tenantId: z.number().int().positive(),
    branchId: z.number().int().positive(),
    departmentId: z.number().int().positive().optional(),
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    admissionNo: z.string().min(2),
    rollNo: z.string().optional(),
    enrollmentYear: z.number().int().min(2000),
});

type StudentFormValues = z.infer<typeof studentSchema>;

export default function StudentsPage() {
    const setBreadcrumbs = useUIStore((state) => state.setBreadcrumbs);
    const { students, loading, fetchStudents, addStudent, updateStudent, deleteStudent } = useStudentStore();
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [editingStudent, setEditingStudent] = useState<Student | null>(null);

    const form = useForm<StudentFormValues>({
        resolver: zodResolver(studentSchema),
        defaultValues: {
            userId: 1,
            tenantId: 1,
            branchId: 1,
            firstName: '',
            lastName: '',
            admissionNo: '',
            rollNo: '',
            enrollmentYear: new Date().getFullYear(),
        },
    });

    useEffect(() => {
        setBreadcrumbs([{ label: 'Dashboard', href: '/dashboard' }, { label: 'Students' }]);
        fetchStudents();
    }, [setBreadcrumbs, fetchStudents]);

    useEffect(() => {
        if (editingStudent) {
            form.reset({
                userId: editingStudent.userId,
                tenantId: editingStudent.tenantId,
                branchId: editingStudent.branchId,
                departmentId: editingStudent.departmentId,
                firstName: editingStudent.firstName,
                lastName: editingStudent.lastName,
                admissionNo: editingStudent.admissionNo || '',
                rollNo: editingStudent.rollNo || '',
                enrollmentYear: editingStudent.enrollmentYear || new Date().getFullYear(),
            });
        } else {
            form.reset();
        }
    }, [editingStudent, form]);

    const onSubmit = async (values: StudentFormValues) => {
        try {
            if (editingStudent) {
                await updateStudent(editingStudent.id, values);
                toast.success('Student updated successfully');
                setEditingStudent(null);
            } else {
                await addStudent(values);
                toast.success('Student created successfully');
                setIsAddDialogOpen(false);
            }
            form.reset();
        } catch (error: any) {
            toast.error(error.message || 'Something went wrong');
        }
    };

    const handleDelete = async (student: Student) => {
        if (confirm(`Are you sure you want to delete "${student.firstName} ${student.lastName}"?`)) {
            try {
                await deleteStudent(student.id);
                toast.success('Student deleted successfully');
            } catch (error: any) {
                toast.error(error.message || 'Failed to delete student');
            }
        }
    };

    const handleEditClick = (student: Student) => {
        setEditingStudent(student);
        setIsAddDialogOpen(true);
    };

    const columns: ColumnDef<Student>[] = [
        {
            accessorKey: 'admissionNo',
            header: 'Admission No',
        },
        {
            accessorKey: 'firstName',
            header: 'Name',
            cell: ({ row }) => `${row.original.firstName} ${row.original.lastName}`,
        },
        {
            accessorKey: 'rollNo',
            header: 'Roll No',
        },
        {
            accessorKey: 'enrollmentYear',
            header: 'Year',
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
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">Students</h1>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Manage your students</p>
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
                    setIsAddDialogOpen(open);
                    if (!open) { setEditingStudent(null); form.reset(); }
                }}>
                    <DialogTrigger asChild>
                        <Button><Plus className="h-4 w-4 mr-2" />Add Student</Button>
                    </DialogTrigger>
                    <DialogContent className="max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>{editingStudent ? 'Edit Student' : 'Add New Student'}</DialogTitle>
                        </DialogHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField control={form.control} name="firstName" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>First Name</FormLabel>
                                            <FormControl><Input placeholder="Jane" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <FormField control={form.control} name="lastName" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Last Name</FormLabel>
                                            <FormControl><Input placeholder="Doe" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField control={form.control} name="admissionNo" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Admission No</FormLabel>
                                            <FormControl><Input placeholder="ADM2024001" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <FormField control={form.control} name="rollNo" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Roll No</FormLabel>
                                            <FormControl><Input placeholder="101" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                </div>
                                <FormField control={form.control} name="enrollmentYear" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Enrollment Year</FormLabel>
                                        <FormControl><Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <div className="flex justify-end gap-2">
                                    <Button type="button" variant="outline" onClick={() => { setIsAddDialogOpen(false); setEditingStudent(null); form.reset(); }}>Cancel</Button>
                                    <Button type="submit" disabled={loading}>
                                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        {editingStudent ? 'Update' : 'Create'}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
            </div>

            {loading && students.length === 0 ? (
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                </div>
            ) : (
                <div className="hidden md:block">
                    <DataTable columns={columns} data={students} searchKey="firstName" searchPlaceholder="Search students..." />
                </div>
            )}
        </div>
    );
}
