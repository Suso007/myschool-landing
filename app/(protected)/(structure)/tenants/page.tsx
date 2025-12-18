'use client';

import { useEffect, useState } from 'react';
import { useUIStore, useTenantStore } from '@/lib/store';
import { DataTable } from '@/components/ui/data-table';
import { MobileCardDeck } from '@/components/ui/mobile-card-deck';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash2, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Tenant, TenantInput, UpdateTenantInput, SubscriptionPlan } from '@/lib/types';
import { toast } from 'sonner';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

const tenantSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    domainSlug: z.string().min(2, 'Domain slug must be at least 2 characters').regex(/^[a-z0-9-]+$/, 'Only lowercase letters, numbers, and hyphens'),
    subscriptionPlan: z.enum(['FREE', 'BASIC', 'PREMIUM', 'ENTERPRISE']),
});

type TenantFormValues = z.infer<typeof tenantSchema>;

export default function TenantsPage() {
    const setBreadcrumbs = useUIStore((state) => state.setBreadcrumbs);
    const { tenants, loading, fetchTenants, addTenant, updateTenant, deleteTenant } = useTenantStore();
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [editingTenant, setEditingTenant] = useState<Tenant | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    const form = useForm<TenantFormValues>({
        resolver: zodResolver(tenantSchema),
        defaultValues: {
            name: '',
            domainSlug: '',
            subscriptionPlan: 'FREE',
        },
    });

    useEffect(() => {
        setBreadcrumbs([
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Tenants' },
        ]);
        fetchTenants();

        // Check if mobile
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, [setBreadcrumbs, fetchTenants]);

    useEffect(() => {
        if (editingTenant) {
            form.reset({
                name: editingTenant.name,
                domainSlug: editingTenant.domainSlug,
                subscriptionPlan: editingTenant.subscriptionPlan,
            });
        } else {
            form.reset({
                name: '',
                domainSlug: '',
                subscriptionPlan: 'FREE',
            });
        }
    }, [editingTenant, form]);

    const onSubmit = async (values: TenantFormValues) => {
        try {
            // Cast the string value to the SubscriptionPlan enum
            const input = {
                ...values,
                subscriptionPlan: values.subscriptionPlan as SubscriptionPlan,
            };

            if (editingTenant) {
                await updateTenant(editingTenant.id, input);
                toast.success('Tenant updated successfully');
                setEditingTenant(null);
            } else {
                await addTenant(input);
                toast.success('Tenant created successfully');
                setIsAddDialogOpen(false);
            }
            form.reset();
        } catch (error: any) {
            toast.error(error.message || 'Something went wrong');
        }
    };

    const handleDelete = async (tenant: Tenant) => {
        if (confirm(`Are you sure you want to delete "${tenant.name}"?`)) {
            try {
                await deleteTenant(tenant.id);
                toast.success('Tenant deleted successfully');
            } catch (error: any) {
                toast.error(error.message || 'Failed to delete tenant');
            }
        }
    };

    const handleEditClick = (tenant: Tenant) => {
        setEditingTenant(tenant);
        setIsAddDialogOpen(true);
    };

    const columns: ColumnDef<Tenant>[] = [
        {
            accessorKey: 'name',
            header: 'Name',
        },
        {
            accessorKey: 'domainSlug',
            header: 'Domain Slug',
            cell: ({ row }) => (
                <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                    {row.original.domainSlug}
                </code>
            ),
        },
        {
            accessorKey: 'subscriptionPlan',
            header: 'Plan',
            cell: ({ row }) => (
                <Badge variant={row.original.subscriptionPlan === 'ENTERPRISE' ? 'default' : 'secondary'}>
                    {row.original.subscriptionPlan}
                </Badge>
            ),
        },
        {
            accessorKey: 'createdAt',
            header: 'Created',
            cell: ({ row }) => format(new Date(row.original.createdAt), 'PPP'),
        },
        {
            id: 'actions',
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditClick(row.original)}
                    >
                        <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(row.original)}
                        className="text-red-600 dark:text-red-400"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">Tenants</h1>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        Manage your tenant organizations
                    </p>
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
                    setIsAddDialogOpen(open);
                    if (!open) {
                        setEditingTenant(null);
                        form.reset();
                    }
                }}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Tenant
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{editingTenant ? 'Edit Tenant' : 'Add New Tenant'}</DialogTitle>
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
                                                <Input placeholder="Global Education Trust" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="domainSlug"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Domain Slug</FormLabel>
                                            <FormControl>
                                                <Input placeholder="global-edu" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="subscriptionPlan"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Subscription Plan</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a plan" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="FREE">Free</SelectItem>
                                                    <SelectItem value="BASIC">Basic</SelectItem>
                                                    <SelectItem value="PREMIUM">Premium</SelectItem>
                                                    <SelectItem value="ENTERPRISE">Enterprise</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex justify-end gap-2">
                                    <Button type="button" variant="outline" onClick={() => {
                                        setIsAddDialogOpen(false);
                                        setEditingTenant(null);
                                        form.reset();
                                    }}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={loading}>
                                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        {editingTenant ? 'Update' : 'Create'}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Data Display */}
            {loading && tenants.length === 0 ? (
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                </div>
            ) : (
                <>
                    {/* Desktop Table View */}
                    <div className="hidden md:block">
                        <DataTable
                            columns={columns}
                            data={tenants}
                            searchKey="name"
                            searchPlaceholder="Search tenants..."
                        />
                    </div>

                    {/* Mobile Card View */}
                    <div className="md:hidden">
                        <MobileCardDeck
                            items={tenants}
                            renderTitle={(tenant) => tenant.name}
                            renderBadge={(tenant) => (
                                <Badge variant={tenant.subscriptionPlan === 'ENTERPRISE' ? 'default' : 'secondary'}>
                                    {tenant.subscriptionPlan}
                                </Badge>
                            )}
                            renderContent={(tenant) => (
                                <div className="space-y-2 text-sm">
                                    <div>
                                        <span className="text-gray-600 dark:text-gray-400">Domain: </span>
                                        <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                                            {tenant.domainSlug}
                                        </code>
                                    </div>
                                    <div>
                                        <span className="text-gray-600 dark:text-gray-400">Created: </span>
                                        {format(new Date(tenant.createdAt), 'PPP')}
                                    </div>
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
