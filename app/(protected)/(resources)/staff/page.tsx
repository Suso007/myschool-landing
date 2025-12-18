'use client';

import { useEffect, useState } from 'react';
import { useUIStore, useStaffStore } from '@/lib/store';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Plus, Edit, Trash2, Loader2, User } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { StaffProfile, StaffProfileInput } from '@/lib/types';
import { toast } from 'sonner';
import { ColumnDef } from '@tanstack/react-table';

const staffSchema = z.object({
    userId: z.number().int().positive(),
    tenantId: z.number().int().positive(),
    branchId: z.number().int().positive(),
    departmentId: z.number().int().positive().optional(),
    categoryId: z.number().int().positive().optional(),
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    designation: z.string().min(2),
    employeeCode: z.string().min(2),
    joiningDate: z.string(),
});

type StaffFormValues = z.infer<typeof staffSchema>;

export default function StaffPage() {
    const setBreadcrumbs = useUIStore((state) => state.setBreadcrumbs);
    const { staffProfiles, loading, fetchStaffProfiles, addStaffProfile, updateStaffProfile, deleteStaffProfile } = useStaffStore();
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [editingStaff, setEditingStaff] = useState<StaffProfile | null>(null);

    const form = useForm<StaffFormValues>({
        resolver: zodResolver(staffSchema),
        defaultValues: {
            userId: 1,
            tenantId: 1,
            branchId: 1,
            firstName: '',
            lastName: '',
            designation: '',
            employeeCode: '',
            joiningDate: new Date().toISOString().split('T')[0],
        },
    });

    useEffect(() => {
        setBreadcrumbs([{ label: 'Dashboard', href: '/dashboard' }, { label: 'Staff' }]);
        fetchStaffProfiles();
    }, [setBreadcrumbs, fetchStaffProfiles]);

    useEffect(() => {
        if (editingStaff) {
            form.reset({
                userId: editingStaff.userId,
                tenantId: editingStaff.tenantId,
                branchId: editingStaff.branchId,
                departmentId: editingStaff.departmentId,
                categoryId: editingStaff.categoryId,
                firstName: editingStaff.firstName,
                lastName: editingStaff.lastName,
                designation: editingStaff.designation || '',
                employeeCode: editingStaff.employeeCode || '',
                joiningDate: editingStaff.joiningDate || new Date().toISOString().split('T')[0],
            });
        } else {
            form.reset();
        }
    }, [editingStaff, form]);

    const onSubmit = async (values: StaffFormValues) => {
        try {
            if (editingStaff) {
                await updateStaffProfile(editingStaff.id, values);
                toast.success('Staff updated successfully');
                setEditingStaff(null);
            } else {
                await addStaffProfile(values);
                toast.success('Staff created successfully');
                setIsAddDialogOpen(false);
            }
            form.reset();
        } catch (error: any) {
            toast.error(error.message || 'Something went wrong');
        }
    };

    const handleDelete = async (staff: StaffProfile) => {
        if (confirm(`Are you sure you want to delete "${staff.firstName} ${staff.lastName}"?`)) {
            try {
                await deleteStaffProfile(staff.id);
                toast.success('Staff deleted successfully');
            } catch (error: any) {
                toast.error(error.message || 'Failed to delete staff');
            }
        }
    };

    const handleEditClick = (staff: StaffProfile) => {
        setEditingStaff(staff);
        setIsAddDialogOpen(true);
    };

    const columns: ColumnDef<StaffProfile>[] = [
        {
            accessorKey: 'employeeCode',
            header: 'Employee Code',
        },
        {
            accessorKey: 'firstName',
            header: 'Name',
            cell: ({ row }) => `${row.original.firstName} ${row.original.lastName}`,
        },
        {
            accessorKey: 'designation',
            header: 'Designation',
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
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">Staff</h1>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Manage your staff members</p>
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
                    setIsAddDialogOpen(open);
                    if (!open) { setEditingStaff(null); form.reset(); }
                }}>
                    <DialogTrigger asChild>
                        <Button><Plus className="h-4 w-4 mr-2" />Add Staff</Button>
                    </DialogTrigger>
                    <DialogContent className="max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>{editingStaff ? 'Edit Staff' : 'Add New Staff'}</DialogTitle>
                        </DialogHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField control={form.control} name="firstName" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>First Name</FormLabel>
                                            <FormControl><Input placeholder="John" {...field} /></FormControl>
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
                                    <FormField control={form.control} name="employeeCode" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Employee Code</FormLabel>
                                            <FormControl><Input placeholder="EMP001" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <FormField control={form.control} name="designation" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Designation</FormLabel>
                                            <FormControl><Input placeholder="Teacher" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                </div>
                                <FormField control={form.control} name="joiningDate" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Joining Date</FormLabel>
                                        <FormControl><Input type="date" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <div className="flex justify-end gap-2">
                                    <Button type="button" variant="outline" onClick={() => { setIsAddDialogOpen(false); setEditingStaff(null); form.reset(); }}>Cancel</Button>
                                    <Button type="submit" disabled={loading}>
                                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        {editingStaff ? 'Update' : 'Create'}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
            </div>

            {loading && staffProfiles.length === 0 ? (
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                </div>
            ) : (
                <div className="hidden md:block">
                    <DataTable columns={columns} data={staffProfiles} searchKey="firstName" searchPlaceholder="Search staff..." />
                </div>
            )}
        </div>
    );
}
