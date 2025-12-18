'use client';

import { useEffect, useState } from 'react';
import { useUIStore, useBranchStore } from '@/lib/store';
import { DataTable } from '@/components/ui/data-table';
import { MobileCardDeck } from '@/components/ui/mobile-card-deck';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Plus, Edit, Trash2, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Branch, BranchInput, UpdateBranchInput } from '@/lib/types';
import { toast } from 'sonner';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

const branchSchema = z.object({
    organizationId: z.number().int().positive(),
    tenantId: z.number().int().positive(),
    name: z.string().min(2, 'Name must be at least 2 characters'),
    address: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    pincode: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email().optional(),
});

type BranchFormValues = z.infer<typeof branchSchema>;

export default function BranchesPage() {
    const setBreadcrumbs = useUIStore((state) => state.setBreadcrumbs);
    const { branches, loading, fetchBranches, addBranch, updateBranch, deleteBranch } = useBranchStore();
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [editingBranch, setEditingBranch] = useState<Branch | null>(null);

    const form = useForm<BranchFormValues>({
        resolver: zodResolver(branchSchema),
        defaultValues: {
            organizationId: 1,
            tenantId: 1,
            name: '',
            address: '',
            city: '',
            state: '',
            pincode: '',
            phone: '',
            email: '',
        },
    });

    useEffect(() => {
        setBreadcrumbs([
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Branches' },
        ]);
        fetchBranches();
    }, [setBreadcrumbs, fetchBranches]);

    useEffect(() => {
        if (editingBranch) {
            form.reset({
                organizationId: editingBranch.organizationId,
                tenantId: editingBranch.tenantId,
                name: editingBranch.name,
                address: editingBranch.address || '',
                city: editingBranch.city || '',
                state: editingBranch.state || '',
                pincode: editingBranch.pincode || '',
                phone: editingBranch.phone || '',
                email: editingBranch.email || '',
            });
        } else {
            form.reset();
        }
    }, [editingBranch, form]);

    const onSubmit = async (values: BranchFormValues) => {
        try {
            if (editingBranch) {
                await updateBranch(editingBranch.id, values);
                toast.success('Branch updated successfully');
                setEditingBranch(null);
            } else {
                await addBranch(values);
                toast.success('Branch created successfully');
                setIsAddDialogOpen(false);
            }
            form.reset();
        } catch (error: any) {
            toast.error(error.message || 'Something went wrong');
        }
    };

    const handleDelete = async (branch: Branch) => {
        if (confirm(`Are you sure you want to delete "${branch.name}"?`)) {
            try {
                await deleteBranch(branch.id);
                toast.success('Branch deleted successfully');
            } catch (error: any) {
                toast.error(error.message || 'Failed to delete branch');
            }
        }
    };

    const handleEditClick = (branch: Branch) => {
        setEditingBranch(branch);
        setIsAddDialogOpen(true);
    };

    const columns: ColumnDef<Branch>[] = [
        {
            accessorKey: 'name',
            header: 'Name',
        },
        {
            accessorKey: 'city',
            header: 'City',
        },
        {
            accessorKey: 'state',
            header: 'State',
        },
        {
            accessorKey: 'phone',
            header: 'Phone',
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
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">Branches</h1>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Manage your branches</p>
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
                    setIsAddDialogOpen(open);
                    if (!open) {
                        setEditingBranch(null);
                        form.reset();
                    }
                }}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Branch
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>{editingBranch ? 'Edit Branch' : 'Add New Branch'}</DialogTitle>
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
                                                <Input placeholder="Main Campus" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="city"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>City</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="New York" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="state"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>State</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="NY" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Address</FormLabel>
                                            <FormControl>
                                                <Input placeholder="123 Main St" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Phone</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="+1 234 567 8900" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input type="email" placeholder="branch@school.com" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="flex justify-end gap-2">
                                    <Button type="button" variant="outline" onClick={() => {
                                        setIsAddDialogOpen(false);
                                        setEditingBranch(null);
                                        form.reset();
                                    }}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={loading}>
                                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        {editingBranch ? 'Update' : 'Create'}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
            </div>

            {loading && branches.length === 0 ? (
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                </div>
            ) : (
                <>
                    <div className="hidden md:block">
                        <DataTable
                            columns={columns}
                            data={branches}
                            searchKey="name"
                            searchPlaceholder="Search branches..."
                        />
                    </div>
                    <div className="md:hidden">
                        <MobileCardDeck
                            items={branches}
                            renderTitle={(branch) => branch.name}
                            renderBadge={(branch) => (
                                <Badge variant={branch.isActive ? 'default' : 'secondary'}>
                                    {branch.isActive ? 'Active' : 'Inactive'}
                                </Badge>
                            )}
                            renderContent={(branch) => (
                                <div className="space-y-2 text-sm">
                                    {branch.city && <div><span className="text-gray-600 dark:text-gray-400">City: </span>{branch.city}, {branch.state}</div>}
                                    {branch.phone && <div><span className="text-gray-600 dark:text-gray-400">Phone: </span>{branch.phone}</div>}
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
