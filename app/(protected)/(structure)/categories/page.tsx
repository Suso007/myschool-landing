'use client';

import { useEffect, useState } from 'react';
import { useUIStore, useCategoryStore } from '@/lib/store';
import { DataTable } from '@/components/ui/data-table';
import { MobileCardDeck } from '@/components/ui/mobile-card-deck';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash2, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Category, CategoryInput, UpdateCategoryInput } from '@/lib/types';
import { toast } from 'sonner';
import { ColumnDef } from '@tanstack/react-table';

const categorySchema = z.object({
    departmentId: z.number().int().positive(),
    name: z.string().min(2),
    description: z.string().optional(),
    type: z.string().min(1, 'Type is required'),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

export default function CategoriesPage() {
    const setBreadcrumbs = useUIStore((state) => state.setBreadcrumbs);
    const { categories, loading, fetchCategories, addCategory, updateCategory, deleteCategory } = useCategoryStore();
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);

    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            departmentId: 1,
            name: '',
            description: '',
            type: '',
        },
    });

    useEffect(() => {
        setBreadcrumbs([{ label: 'Dashboard', href: '/dashboard' }, { label: 'Categories' }]);
        fetchCategories();
    }, [setBreadcrumbs, fetchCategories]);

    useEffect(() => {
        if (editingCategory) {
            form.reset({
                departmentId: editingCategory.departmentId,
                name: editingCategory.name,
                description: editingCategory.description || '',
                type: editingCategory.type,
            });
        } else {
            form.reset();
        }
    }, [editingCategory, form]);

    const onSubmit = async (values: CategoryFormValues) => {
        try {
            if (editingCategory) {
                await updateCategory(editingCategory.id, values);
                toast.success('Category updated successfully');
                setEditingCategory(null);
            } else {
                await addCategory(values);
                toast.success('Category created successfully');
                setIsAddDialogOpen(false);
            }
            form.reset();
        } catch (error: any) {
            toast.error(error.message || 'Something went wrong');
        }
    };

    const handleDelete = async (category: Category) => {
        if (confirm(`Are you sure you want to delete "${category.name}"?`)) {
            try {
                await deleteCategory(category.id);
                toast.success('Category deleted successfully');
            } catch (error: any) {
                toast.error(error.message || 'Failed to delete category');
            }
        }
    };

    const handleEditClick = (category: Category) => {
        setEditingCategory(category);
        setIsAddDialogOpen(true);
    };

    const columns: ColumnDef<Category>[] = [
        {
            accessorKey: 'name',
            header: 'Name',
        },
        {
            accessorKey: 'type',
            header: 'Type',
            cell: ({ row }) => (
                <Badge>{row.original.type}</Badge>
            ),
        },
        {
            accessorKey: 'description',
            header: 'Description',
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
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">Categories</h1>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Manage your categories</p>
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
                    setIsAddDialogOpen(open);
                    if (!open) { setEditingCategory(null); form.reset(); }
                }}>
                    <DialogTrigger asChild>
                        <Button><Plus className="h-4 w-4 mr-2" />Add Category</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{editingCategory ? 'Edit Category' : 'Add New Category'}</DialogTitle>
                        </DialogHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField control={form.control} name="name" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl><Input placeholder="General" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="type" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Type</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="STAFF">Staff</SelectItem>
                                                <SelectItem value="STUDENT">Student</SelectItem>
                                                <SelectItem value="OTHER">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="description" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl><Textarea placeholder="Category description..." {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <div className="flex justify-end gap-2">
                                    <Button type="button" variant="outline" onClick={() => { setIsAddDialogOpen(false); setEditingCategory(null); form.reset(); }}>Cancel</Button>
                                    <Button type="submit" disabled={loading}>
                                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        {editingCategory ? 'Update' : 'Create'}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
            </div>

            {loading && categories.length === 0 ? (
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                </div>
            ) : (
                <>
                    <div className="hidden md:block">
                        <DataTable columns={columns} data={categories} searchKey="name" searchPlaceholder="Search categories..." />
                    </div>
                    <div className="md:hidden">
                        <MobileCardDeck
                            items={categories}
                            renderTitle={(cat) => cat.name}
                            renderBadge={(cat) => <Badge>{cat.type}</Badge>}
                            renderContent={(cat) => (
                                <div className="space-y-2 text-sm">
                                    {cat.description && <div>{cat.description}</div>}
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
