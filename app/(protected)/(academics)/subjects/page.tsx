'use client';

import { useEffect, useState } from 'react';
import { useUIStore, useSubjectStore } from '@/lib/store';
import { DataTable } from '@/components/ui/data-table';
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
import { Subject, SubjectInput } from '@/lib/types';
import { toast } from 'sonner';
import { ColumnDef } from '@tanstack/react-table';

const subjectSchema = z.object({
    departmentId: z.number().int().positive(),
    name: z.string().min(2, 'Name must be at least 2 characters'),
    code: z.string().min(2, 'Code must be at least 2 characters'),
    description: z.string().optional(),
    credits: z.number().int().positive().optional(),
});

type SubjectFormValues = z.infer<typeof subjectSchema>;

export default function SubjectsPage() {
    const setBreadcrumbs = useUIStore((state) => state.setBreadcrumbs);
    const { subjects, loading, fetchSubjects, addSubject, updateSubject, deleteSubject } = useSubjectStore();
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [editingSubject, setEditingSubject] = useState<Subject | null>(null);

    const form = useForm<SubjectFormValues>({
        resolver: zodResolver(subjectSchema),
        defaultValues: {
            departmentId: 1,
            name: '',
            code: '',
            description: '',
            credits: undefined,
        },
    });

    useEffect(() => {
        setBreadcrumbs([{ label: 'Dashboard', href: '/dashboard' }, { label: 'Subjects' }]);
        fetchSubjects();
    }, [setBreadcrumbs, fetchSubjects]);

    useEffect(() => {
        if (editingSubject) {
            form.reset({
                departmentId: editingSubject.departmentId,
                name: editingSubject.name,
                code: editingSubject.code,
                description: editingSubject.description || '',
                credits: editingSubject.credits || undefined,
            });
        } else {
            form.reset();
        }
    }, [editingSubject, form]);

    const onSubmit = async (values: SubjectFormValues) => {
        try {
            if (editingSubject) {
                await updateSubject(editingSubject.id, values);
                toast.success('Subject updated successfully');
                setEditingSubject(null);
            } else {
                await addSubject(values);
                toast.success('Subject created successfully');
                setIsAddDialogOpen(false);
            }
            form.reset();
        } catch (error: any) {
            toast.error(error.message || 'Something went wrong');
        }
    };

    const handleDelete = async (subject: Subject) => {
        if (confirm(`Are you sure you want to delete "${subject.name}"?`)) {
            try {
                await deleteSubject(subject.id);
                toast.success('Subject deleted successfully');
            } catch (error: any) {
                toast.error(error.message || 'Failed to delete subject');
            }
        }
    };

    const handleEditClick = (subject: Subject) => {
        setEditingSubject(subject);
        setIsAddDialogOpen(true);
    };

    const columns: ColumnDef<Subject>[] = [
        {
            accessorKey: 'name',
            header: 'Name',
        },
        {
            accessorKey: 'code',
            header: 'Code',
        },
        {
            accessorKey: 'credits',
            header: 'Credits',
            cell: ({ row }) => row.original.credits || '-',
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
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">Subjects</h1>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Manage your subjects</p>
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
                    setIsAddDialogOpen(open);
                    if (!open) { setEditingSubject(null); form.reset(); }
                }}>
                    <DialogTrigger asChild>
                        <Button><Plus className="h-4 w-4 mr-2" />Add Subject</Button>
                    </DialogTrigger>
                    <DialogContent className="max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>{editingSubject ? 'Edit Subject' : 'Add New Subject'}</DialogTitle>
                        </DialogHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField control={form.control} name="name" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Subject Name</FormLabel>
                                        <FormControl><Input placeholder="Mathematics" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField control={form.control} name="code" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Subject Code</FormLabel>
                                            <FormControl><Input placeholder="MATH101" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <FormField control={form.control} name="credits" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Credits</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="3"
                                                    {...field}
                                                    onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                                                    value={field.value || ''}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                </div>
                                <FormField control={form.control} name="description" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl><Textarea placeholder="Subject description..." {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <div className="flex justify-end gap-2">
                                    <Button type="button" variant="outline" onClick={() => { setIsAddDialogOpen(false); setEditingSubject(null); form.reset(); }}>Cancel</Button>
                                    <Button type="submit" disabled={loading}>
                                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        {editingSubject ? 'Update' : 'Create'}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
            </div>

            {loading && subjects.length === 0 ? (
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                </div>
            ) : (
                <div className="hidden md:block">
                    <DataTable columns={columns} data={subjects} searchKey="name" searchPlaceholder="Search subjects..." />
                </div>
            )}
        </div>
    );
}
