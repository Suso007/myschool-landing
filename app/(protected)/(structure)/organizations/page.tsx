'use client';

import { useEffect, useState } from 'react';
import { useUIStore, useOrganizationStore, useTenantStore } from '@/lib/store';
import { SearchableSelect } from '@/components/ui/searchable-select';
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
import { Organization, OrganizationInput, UpdateOrganizationInput } from '@/lib/types';
import { toast } from 'sonner';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

const organizationSchema = z.object({
    tenantId: z.number().int().positive(),
    name: z.string().min(2, 'Name must be at least 2 characters'),
    region: z.string().optional(),
    headOfOrg: z.string().optional(),
});

type OrganizationFormValues = z.infer<typeof organizationSchema>;

export default function OrganizationsPage() {
    const setBreadcrumbs = useUIStore((state) => state.setBreadcrumbs);
    const { organizations, loading, fetchOrganizations, addOrganization, updateOrganization, deleteOrganization } = useOrganizationStore();
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [editingOrganization, setEditingOrganization] = useState<Organization | null>(null);

    const form = useForm<OrganizationFormValues>({
        resolver: zodResolver(organizationSchema),
        defaultValues: {
            tenantId: 1, // Default tenant ID
            name: '',
            region: '',
            headOfOrg: '',
        },
    });

    useEffect(() => {
        setBreadcrumbs([
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Organizations' },
        ]);
        fetchOrganizations();
    }, [setBreadcrumbs, fetchOrganizations]);

    useEffect(() => {
        if (editingOrganization) {
            form.reset({
                tenantId: editingOrganization.tenantId,
                name: editingOrganization.name,
                region: editingOrganization.region || '',
                headOfOrg: editingOrganization.headOfOrg || '',
            });
        } else {
            form.reset({
                tenantId: 1,
                name: '',
                region: '',
                headOfOrg: '',
            });
        }
    }, [editingOrganization, form]);

    const onSubmit = async (values: OrganizationFormValues) => {
        try {
            if (editingOrganization) {
                await updateOrganization(editingOrganization.id, values);
                toast.success('Organization updated successfully');
                setEditingOrganization(null);
            } else {
                await addOrganization(values);
                toast.success('Organization created successfully');
                setIsAddDialogOpen(false);
            }
            form.reset();
        } catch (error: any) {
            toast.error(error.message || 'Something went wrong');
        }
    };

    const handleDelete = async (organization: Organization) => {
        if (confirm(`Are you sure you want to delete "${organization.name}"?`)) {
            try {
                await deleteOrganization(organization.id);
                toast.success('Organization deleted successfully');
            } catch (error: any) {
                toast.error(error.message || 'Failed to delete organization');
            }
        }
    };

    const handleEditClick = (organization: Organization) => {
        setEditingOrganization(organization);
        setIsAddDialogOpen(true);
    };

    const columns: ColumnDef<Organization>[] = [
        {
            accessorKey: 'name',
            header: 'Name',
        },
        {
            accessorKey: 'region',
            header: 'Region',
        },
        {
            accessorKey: 'headOfOrg',
            header: 'Head of Organization',
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
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">Organizations</h1>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        Manage your organizations
                    </p>
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
                    setIsAddDialogOpen(open);
                    if (!open) {
                        setEditingOrganization(null);
                        form.reset();
                    }
                }}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Organization
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{editingOrganization ? 'Edit Organization' : 'Add New Organization'}</DialogTitle>
                        </DialogHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="tenantId"
                                    render={({ field }) => {
                                        const { tenants, loading: tenantsLoading } = useTenantStore();

                                        useEffect(() => {
                                            useTenantStore.getState().fetchTenants();
                                        }, []);

                                        const tenantOptions = tenants.map(t => ({
                                            value: parseInt(t.id),
                                            label: t.name
                                        }));

                                        return (
                                            <FormItem>
                                                <FormLabel>Tenant</FormLabel>
                                                <FormControl>
                                                    <SearchableSelect
                                                        options={tenantOptions}
                                                        value={field.value}
                                                        onValueChange={(value) => field.onChange(typeof value === 'string' ? parseInt(value) : value)}
                                                        placeholder="Select tenant..."
                                                        searchPlaceholder="Search tenants..."
                                                        loading={tenantsLoading}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        );
                                    }}
                                />
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Global Education Network" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="region"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Region</FormLabel>
                                            <FormControl>
                                                <Input placeholder="North America" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="headOfOrg"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Head of Organization</FormLabel>
                                            <FormControl>
                                                <Input placeholder="John Doe" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex justify-end gap-2">
                                    <Button type="button" variant="outline" onClick={() => {
                                        setIsAddDialogOpen(false);
                                        setEditingOrganization(null);
                                        form.reset();
                                    }}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={loading}>
                                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        {editingOrganization ? 'Update' : 'Create'}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Data Display */}
            {loading && organizations.length === 0 ? (
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                </div>
            ) : (
                <>
                    {/* Desktop Table View */}
                    <div className="hidden md:block">
                        <DataTable
                            columns={columns}
                            data={organizations}
                            searchKey="name"
                            searchPlaceholder="Search organizations..."
                        />
                    </div>

                    {/* Mobile Card View */}
                    <div className="md:hidden">
                        <MobileCardDeck
                            items={organizations}
                            renderTitle={(org) => org.name}
                            renderBadge={(org) => (
                                <Badge variant={org.isActive ? 'default' : 'secondary'}>
                                    {org.isActive ? 'Active' : 'Inactive'}
                                </Badge>
                            )}
                            renderContent={(org) => (
                                <div className="space-y-2 text-sm">
                                    {org.region && (
                                        <div>
                                            <span className="text-gray-600 dark:text-gray-400">Region: </span>
                                            {org.region}
                                        </div>
                                    )}
                                    {org.headOfOrg && (
                                        <div>
                                            <span className="text-gray-600 dark:text-gray-400">Head: </span>
                                            {org.headOfOrg}
                                        </div>
                                    )}
                                    <div>
                                        <span className="text-gray-600 dark:text-gray-400">Created: </span>
                                        {format(new Date(org.createdAt), 'PPP')}
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
