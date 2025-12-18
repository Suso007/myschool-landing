'use client';

import { useEffect, useState } from 'react';
import { useUIStore, useDepartmentStore } from '@/lib/store';
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
import { Department, DepartmentInput, UpdateDepartmentInput } from '@/lib/types';
import { toast } from 'sonner';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

const departmentSchema = z.object({
    branchId: z.number().int().positive(),
    name: z.string().min(2, 'Name must be at least 2 characters'),
    code: z.string().min(2, 'Code must be at least 2 characters'),
    hodName: z.string().optional(),
    description: z.string().optional(),
});

type DepartmentFormValues = z.infer<typeof departmentSchema>;

export default function DepartmentsPage() {
    const setBreadcrumbs = useUIStore((state) => state.setBreadcrumbs);
    const { departments, loading, fetchDepartments, addDepartment, updateDepartment, deleteDepartment } = useDepartmentStore();
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);

    const form = useForm<DepartmentFormValues>({
        resolver: zodResolver(departmentSchema),
        defaultValues: {
            branchId: 1,
            name: '',
            code: '',
            hodName: '',
            description: '',
        },
    });

    useEffect(() => {
        setBreadcrumbs([
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Departments' },
        ]);
        fetchDepartments();
    }, [setBreadcrumbs, fetchDepartments]);

    useEffect(() => {
        if (editingDepartment) {
            form.reset({
                branchId: editingDepartment.branchId,
                name: editingDepartment.name,
                code: editingDepartment.code,
                hodName: editingDepartment.hodName || '',
                description: editingDepartment.description || '',
            });
        } else {
            form.reset();
        }
    }, [editingDepartment, form]);

    const onSubmit = async (values: DepartmentFormValues) => {
        try {
            if (editingDepartment) {
                await updateDepartment(editingDepartment.id, values);
                toast.success('Department updated successfully');
                setEditingDepartment(null);
            } else {
                await addDepartment(values);
                toast.success('Department created successfully');
                setIsAddDialogOpen(false);
            }
            form.reset();
        } catch (error: any) {
            toast.error(error.message || 'Something went wrong');
        }
    };

    const handleDelete = async (department: Department) => {
        if (confirm(`Are you sure you want to delete "${department.name}"?`)) {
            try {
                await deleteDepartment(department.id);
                toast.success('Department deleted successfully');
            } catch (error: any) {
                toast.error(error.message || 'Failed to delete department');
            }
        }
    };

    const handleEditClick = (department: Department) => {
        setEditingDepartment(department);
        setIsAddDialogOpen(true);
    };

    const columns: ColumnDef<Department>[] = [
        {
            accessorKey: 'name',
            header: 'Name',
        },
        {
            accessorKey: 'code',
            header: 'Code',
            cell: ({ row }) => (
                <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                    {row.original.code}
                </code>
            ),
        },
        {
            accessorKey: 'hodName',
            header: 'HOD',
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
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">Departments</h1>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Manage your departments</p>
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
                    setIsAddDialogOpen(open);
                    if (!open) {
                        setEditingDepartment(null);
                        form.reset();
                    }
                }}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Department
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{editingDepartment ? 'Edit Department' : 'Add New Department'}</DialogTitle>
                        </DialogHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Computer Science" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="code"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Code</FormLabel>
                                            <FormControl>
                                                <Input placeholder="CS" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="hodName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Head of Department</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Dr. John Doe" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Department description..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex justify-end gap-2">
                                    <Button type="button" variant="outline" onClick={() => {
                                        setIsAddDialogOpen(false);
                                        setEditingDepartment(null);
                                        form.reset();
                                    }}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={loading}>
                                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        {editingDepartment ? 'Update' : 'Create'}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
            </div>

            {loading && departments.length === 0 ? (
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                </div>
            ) : (
                <>
                    <div className="hidden md:block">
                        <DataTable
                            columns={columns}
                            data={departments}
                            searchKey="name"
                            searchPlaceholder="Search departments..."
                        />
                    </div>
                    <div className="md:hidden">
                        <MobileCardDeck
                            items={departments}
                            renderTitle={(dept) => dept.name}
                            renderBadge={(dept) => (
                                <Badge variant={dept.isActive ? 'default' : 'secondary'}>
                                    {dept.isActive ? 'Active' : 'Inactive'}
                                </Badge>
                            )}
                            renderContent={(dept) => (
                                <div className="space-y-2 text-sm">
                                    <div><span className="text-gray-600 dark:text-gray-400">Code: </span><code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{dept.code}</code></div>
                                    {dept.hodName && <div><span className="text-gray-600 dark:text-gray-400">HOD: </span>{dept.hodName}</div>}
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
