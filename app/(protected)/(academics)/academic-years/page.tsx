'use client';

import { useEffect, useState } from 'react';
import { useUIStore, useAcademicYearStore } from '@/lib/store';
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
import { AcademicYear, AcademicYearInput } from '@/lib/types';
import { toast } from 'sonner';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

const academicYearSchema = z.object({
    branchId: z.number().int().positive(),
    name: z.string().min(2),
    startDate: z.string(),
    endDate: z.string(),
});

type AcademicYearFormValues = z.infer<typeof academicYearSchema>;

export default function AcademicYearsPage() {
    const setBreadcrumbs = useUIStore((state) => state.setBreadcrumbs);
    const { academicYears, loading, fetchAcademicYears, addAcademicYear, updateAcademicYear, deleteAcademicYear } = useAcademicYearStore();
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [editingAcademicYear, setEditingAcademicYear] = useState<AcademicYear | null>(null);

    const form = useForm<AcademicYearFormValues>({
        resolver: zodResolver(academicYearSchema),
        defaultValues: {
            branchId: 1,
            name: '',
            startDate: '',
            endDate: '',
        },
    });

    useEffect(() => {
        setBreadcrumbs([{ label: 'Dashboard', href: '/dashboard' }, { label: 'Academic Years' }]);
        fetchAcademicYears();
    }, [setBreadcrumbs, fetchAcademicYears]);

    useEffect(() => {
        if (editingAcademicYear) {
            form.reset({
                branchId: editingAcademicYear.branchId,
                name: editingAcademicYear.name,
                startDate: editingAcademicYear.startDate,
                endDate: editingAcademicYear.endDate,
            });
        } else {
            form.reset();
        }
    }, [editingAcademicYear, form]);

    const onSubmit = async (values: AcademicYearFormValues) => {
        try {
            if (editingAcademicYear) {
                await updateAcademicYear(editingAcademicYear.id, values);
                toast.success('Academic Year updated successfully');
                setEditingAcademicYear(null);
            } else {
                await addAcademicYear(values);
                toast.success('Academic Year created successfully');
                setIsAddDialogOpen(false);
            }
            form.reset();
        } catch (error: any) {
            toast.error(error.message || 'Something went wrong');
        }
    };

    const handleDelete = async (academicYear: AcademicYear) => {
        if (confirm(`Are you sure you want to delete "${academicYear.name}"?`)) {
            try {
                await deleteAcademicYear(academicYear.id);
                toast.success('Academic Year deleted successfully');
            } catch (error: any) {
                toast.error(error.message || 'Failed to delete academic year');
            }
        }
    };

    const handleEditClick = (academicYear: AcademicYear) => {
        setEditingAcademicYear(academicYear);
        setIsAddDialogOpen(true);
    };

    const columns: ColumnDef<AcademicYear>[] = [
        { accessorKey: 'name', header: 'Name' },
        { accessorKey: 'startDate', header: 'Start Date', cell: ({ row }) => format(new Date(row.original.startDate), 'PP') },
        { accessorKey: 'endDate', header: 'End Date', cell: ({ row }) => format(new Date(row.original.endDate), 'PP') },
        {
            accessorKey: 'isCurrent',
            header: 'Status',
            cell: ({ row }) => (
                <Badge variant={row.original.isCurrent ? 'default' : 'secondary'}>
                    {row.original.isCurrent ? 'Current' : 'Past'}
                </Badge>
            ),
        },
        {
            id: 'actions',
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEditClick(row.original)}><Edit className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(row.original)} className="text-red-600"><Trash2 className="h-4 w-4" /></Button>
                </div>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">Academic Years</h1>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Manage academic years</p>
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
                    setIsAddDialogOpen(open);
                    if (!open) { setEditingAcademicYear(null); form.reset(); }
                }}>
                    <DialogTrigger asChild><Button><Plus className="h-4 w-4 mr-2" />Add Academic Year</Button></DialogTrigger>
                    <DialogContent>
                        <DialogHeader><DialogTitle>{editingAcademicYear ? 'Edit Academic Year' : 'Add New Academic Year'}</DialogTitle></DialogHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField control={form.control} name="name" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl><Input placeholder="2024-2025" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField control={form.control} name="startDate" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Start Date</FormLabel>
                                            <FormControl><Input type="date" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <FormField control={form.control} name="endDate" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>End Date</FormLabel>
                                            <FormControl><Input type="date" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                </div>
                                <div className="flex justify-end gap-2">
                                    <Button type="button" variant="outline" onClick={() => { setIsAddDialogOpen(false); setEditingAcademicYear(null); form.reset(); }}>Cancel</Button>
                                    <Button type="submit" disabled={loading}>
                                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        {editingAcademicYear ? 'Update' : 'Create'}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
            </div>

            {loading && academicYears.length === 0 ? (
                <div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin text-gray-400" /></div>
            ) : (
                <div className="hidden md:block">
                    <DataTable columns={columns} data={academicYears} searchKey="name" searchPlaceholder="Search academic years..." />
                </div>
            )}
        </div>
    );
}
