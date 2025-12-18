'use client';

import { useEffect, useState } from 'react';
import { useUIStore, useUserStore } from '@/lib/store';
import { DataTable } from '@/components/ui/data-table';
import { MobileCardDeck } from '@/components/ui/mobile-card-deck';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Plus, Edit, Trash2, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { UserManagement, CreateUserInput, UpdateUserInput, UserRole } from '@/lib/types';
import { toast } from 'sonner';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

const createUserSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    phone: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    role: z.nativeEnum(UserRole),
    tenantId: z.number().optional(),
    organizationId: z.number().optional(),
    branchId: z.number().optional(),
    departmentId: z.number().optional(),
    categoryId: z.number().optional(),
    profilePicture: z.string().url().optional().or(z.literal('')),
});

const updateUserSchema = z.object({
    email: z.string().email('Invalid email address').optional(),
    phone: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    role: z.nativeEnum(UserRole).optional(),
    tenantId: z.number().optional(),
    organizationId: z.number().optional(),
    branchId: z.number().optional(),
    departmentId: z.number().optional(),
    categoryId: z.number().optional(),
    profilePicture: z.string().url().optional().or(z.literal('')),
    isActive: z.boolean().optional(),
});

type CreateUserFormValues = z.infer<typeof createUserSchema>;
type UpdateUserFormValues = z.infer<typeof updateUserSchema>;

export default function UsersPage() {
    const setBreadcrumbs = useUIStore((state) => state.setBreadcrumbs);
    const { users, loading, fetchUsers, createUser, updateUser, deleteUser } = useUserStore();
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<UserManagement | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    const createForm = useForm<CreateUserFormValues>({
        resolver: zodResolver(createUserSchema),
        defaultValues: {
            email: '',
            password: '',
            phone: '',
            firstName: '',
            lastName: '',
            role: UserRole.STAFF,
            profilePicture: '',
        },
    });

    const updateForm = useForm<UpdateUserFormValues>({
        resolver: zodResolver(updateUserSchema),
        defaultValues: {
            email: '',
            phone: '',
            firstName: '',
            lastName: '',
            role: UserRole.STAFF,
            isActive: true,
            profilePicture: '',
        },
    });

    useEffect(() => {
        setBreadcrumbs([
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Users' },
        ]);
        fetchUsers();

        // Check if mobile
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, [setBreadcrumbs, fetchUsers]);

    useEffect(() => {
        if (editingUser) {
            updateForm.reset({
                email: editingUser.email,
                phone: editingUser.phone || '',
                firstName: editingUser.firstName || '',
                lastName: editingUser.lastName || '',
                role: editingUser.role,
                tenantId: editingUser.tenantId,
                organizationId: editingUser.organizationId,
                branchId: editingUser.branchId,
                departmentId: editingUser.departmentId,
                categoryId: editingUser.categoryId,
                profilePicture: editingUser.profilePicture || '',
                isActive: editingUser.isActive,
            });
        }
    }, [editingUser, updateForm]);

    const onCreateSubmit = async (values: CreateUserFormValues) => {
        try {
            const input: CreateUserInput = {
                email: values.email,
                password: values.password,
                phone: values.phone || undefined,
                firstName: values.firstName || undefined,
                lastName: values.lastName || undefined,
                role: values.role,
                tenantId: values.tenantId,
                organizationId: values.organizationId,
                branchId: values.branchId,
                departmentId: values.departmentId,
                categoryId: values.categoryId,
                profilePicture: values.profilePicture || undefined,
            };

            await createUser(input);
            toast.success('User created successfully');
            setIsAddDialogOpen(false);
            createForm.reset();
        } catch (error: any) {
            toast.error(error.message || 'Failed to create user');
        }
    };

    const onUpdateSubmit = async (values: UpdateUserFormValues) => {
        if (!editingUser) return;

        try {
            const input: UpdateUserInput = {
                email: values.email,
                phone: values.phone || undefined,
                firstName: values.firstName || undefined,
                lastName: values.lastName || undefined,
                role: values.role,
                tenantId: values.tenantId,
                organizationId: values.organizationId,
                branchId: values.branchId,
                departmentId: values.departmentId,
                categoryId: values.categoryId,
                profilePicture: values.profilePicture || undefined,
                isActive: values.isActive,
            };

            await updateUser(editingUser.id, input);
            toast.success('User updated successfully');
            setEditingUser(null);
            setIsAddDialogOpen(false);
        } catch (error: any) {
            toast.error(error.message || 'Failed to update user');
        }
    };

    const handleDelete = async (user: UserManagement) => {
        if (confirm(`Are you sure you want to delete "${user.email}"?`)) {
            try {
                await deleteUser(user.id);
                toast.success('User deleted successfully');
            } catch (error: any) {
                toast.error(error.message || 'Failed to delete user');
            }
        }
    };

    const handleEditClick = (user: UserManagement) => {
        setEditingUser(user);
        setIsAddDialogOpen(true);
    };

    const handleDialogClose = (open: boolean) => {
        setIsAddDialogOpen(open);
        if (!open) {
            setEditingUser(null);
            createForm.reset();
            updateForm.reset();
        }
    };

    const getRoleBadgeVariant = (role: UserRole) => {
        switch (role) {
            case UserRole.SUPERADMIN:
                return 'destructive';
            case UserRole.TENANT_ADMIN:
                return 'default';
            case UserRole.ORG_ADMIN:
            case UserRole.BRANCH_ADMIN:
                return 'secondary';
            default:
                return 'outline';
        }
    };

    const columns: ColumnDef<UserManagement>[] = [
        {
            accessorKey: 'name',
            header: 'Name',
            cell: ({ row }) => {
                const firstName = row.original.firstName || '';
                const lastName = row.original.lastName || '';
                const name = `${firstName} ${lastName}`.trim() || 'N/A';
                return <span>{name}</span>;
            },
        },
        {
            accessorKey: 'email',
            header: 'Email',
        },
        {
            accessorKey: 'phone',
            header: 'Phone',
            cell: ({ row }) => row.original.phone || 'N/A',
        },
        {
            accessorKey: 'role',
            header: 'Role',
            cell: ({ row }) => (
                <Badge variant={getRoleBadgeVariant(row.original.role)}>
                    {row.original.role}
                </Badge>
            ),
        },
        {
            accessorKey: 'tenantId',
            header: 'Tenant',
            cell: ({ row }) => row.original.tenantId || 'N/A',
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
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">Users</h1>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        Manage system users and their permissions
                    </p>
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={handleDialogClose}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Add User
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>{editingUser ? 'Edit User' : 'Add New User'}</DialogTitle>
                        </DialogHeader>
                        {editingUser ? (
                            <Form {...updateForm}>
                                <form onSubmit={updateForm.handleSubmit(onUpdateSubmit)} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            control={updateForm.control}
                                            name="firstName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>First Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="John" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={updateForm.control}
                                            name="lastName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Last Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Doe" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <FormField
                                        control={updateForm.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input type="email" placeholder="john@example.com" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={updateForm.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Phone</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="+91 98765 43210" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={updateForm.control}
                                        name="role"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Role *</FormLabel>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select role" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value={UserRole.SUPERADMIN}>Super Admin</SelectItem>
                                                        <SelectItem value={UserRole.TENANT_ADMIN}>Tenant Admin</SelectItem>
                                                        <SelectItem value={UserRole.ORG_ADMIN}>Org Admin</SelectItem>
                                                        <SelectItem value={UserRole.BRANCH_ADMIN}>Branch Admin</SelectItem>
                                                        <SelectItem value={UserRole.DEPT_ADMIN}>Dept Admin</SelectItem>
                                                        <SelectItem value={UserRole.STAFF}>Staff</SelectItem>
                                                        <SelectItem value={UserRole.STUDENT}>Student</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            control={updateForm.control}
                                            name="tenantId"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Tenant ID</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            placeholder="1"
                                                            {...field}
                                                            onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={updateForm.control}
                                            name="organizationId"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Organization ID</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            placeholder="1"
                                                            {...field}
                                                            onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">
                                        <FormField
                                            control={updateForm.control}
                                            name="branchId"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Branch ID</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            placeholder="1"
                                                            {...field}
                                                            onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={updateForm.control}
                                            name="departmentId"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Department ID</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            placeholder="1"
                                                            {...field}
                                                            onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={updateForm.control}
                                            name="categoryId"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Category ID</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            placeholder="1"
                                                            {...field}
                                                            onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <FormField
                                        control={updateForm.control}
                                        name="profilePicture"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Profile Picture URL</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="https://example.com/avatar.jpg" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={updateForm.control}
                                        name="isActive"
                                        render={({ field }) => (
                                            <FormItem className="flex items-center justify-between rounded-lg border p-4">
                                                <div className="space-y-0.5">
                                                    <FormLabel className="text-base">Active Status</FormLabel>
                                                    <div className="text-sm text-gray-500">
                                                        Enable or disable user account
                                                    </div>
                                                </div>
                                                <FormControl>
                                                    <Switch
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <div className="flex justify-end gap-2">
                                        <Button type="button" variant="outline" onClick={() => handleDialogClose(false)}>
                                            Cancel
                                        </Button>
                                        <Button type="submit" disabled={loading}>
                                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                            Update User
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        ) : (
                            <Form {...createForm}>
                                <form onSubmit={createForm.handleSubmit(onCreateSubmit)} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            control={createForm.control}
                                            name="firstName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>First Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="John" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={createForm.control}
                                            name="lastName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Last Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Doe" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <FormField
                                        control={createForm.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email *</FormLabel>
                                                <FormControl>
                                                    <Input type="email" placeholder="john@example.com" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={createForm.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password *</FormLabel>
                                                <FormControl>
                                                    <Input type="password" placeholder="Min 8 characters" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={createForm.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Phone</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="+91 98765 43210" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={createForm.control}
                                        name="role"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Role *</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select role" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value={UserRole.SUPERADMIN}>Super Admin</SelectItem>
                                                        <SelectItem value={UserRole.TENANT_ADMIN}>Tenant Admin</SelectItem>
                                                        <SelectItem value={UserRole.ORG_ADMIN}>Org Admin</SelectItem>
                                                        <SelectItem value={UserRole.BRANCH_ADMIN}>Branch Admin</SelectItem>
                                                        <SelectItem value={UserRole.DEPT_ADMIN}>Dept Admin</SelectItem>
                                                        <SelectItem value={UserRole.STAFF}>Staff</SelectItem>
                                                        <SelectItem value={UserRole.STUDENT}>Student</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            control={createForm.control}
                                            name="tenantId"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Tenant ID</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            placeholder="1"
                                                            {...field}
                                                            onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={createForm.control}
                                            name="organizationId"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Organization ID</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            placeholder="1"
                                                            {...field}
                                                            onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">
                                        <FormField
                                            control={createForm.control}
                                            name="branchId"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Branch ID</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            placeholder="1"
                                                            {...field}
                                                            onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={createForm.control}
                                            name="departmentId"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Department ID</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            placeholder="1"
                                                            {...field}
                                                            onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={createForm.control}
                                            name="categoryId"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Category ID</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            placeholder="1"
                                                            {...field}
                                                            onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <FormField
                                        control={createForm.control}
                                        name="profilePicture"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Profile Picture URL</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="https://example.com/avatar.jpg" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="flex justify-end gap-2">
                                        <Button type="button" variant="outline" onClick={() => handleDialogClose(false)}>
                                            Cancel
                                        </Button>
                                        <Button type="submit" disabled={loading}>
                                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                            Create User
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        )}
                    </DialogContent>
                </Dialog>
            </div>

            {/* Data Display */}
            {loading && users.length === 0 ? (
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                </div>
            ) : (
                <>
                    {/* Desktop Table View */}
                    <div className="hidden md:block">
                        <DataTable
                            columns={columns}
                            data={users}
                            searchKey="email"
                            searchPlaceholder="Search users by email..."
                        />
                    </div>

                    {/* Mobile Card View */}
                    <div className="md:hidden">
                        <MobileCardDeck
                            items={users}
                            renderTitle={(user) => {
                                const name = `${user.firstName || ''} ${user.lastName || ''}`.trim();
                                return name || user.email;
                            }}
                            renderBadge={(user) => (
                                <Badge variant={getRoleBadgeVariant(user.role)}>
                                    {user.role}
                                </Badge>
                            )}
                            renderContent={(user) => (
                                <div className="space-y-2 text-sm">
                                    <div>
                                        <span className="text-gray-600 dark:text-gray-400">Email: </span>
                                        {user.email}
                                    </div>
                                    {user.phone && (
                                        <div>
                                            <span className="text-gray-600 dark:text-gray-400">Phone: </span>
                                            {user.phone}
                                        </div>
                                    )}
                                    <div>
                                        <span className="text-gray-600 dark:text-gray-400">Status: </span>
                                        <Badge variant={user.isActive ? 'default' : 'secondary'} className="ml-1">
                                            {user.isActive ? 'Active' : 'Inactive'}
                                        </Badge>
                                    </div>
                                    <div>
                                        <span className="text-gray-600 dark:text-gray-400">Created: </span>
                                        {format(new Date(user.createdAt), 'PPP')}
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
