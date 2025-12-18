'use client';

import React, { useState, useEffect } from 'react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, closestCenter, useDraggable, useDroppable } from '@dnd-kit/core';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Calendar,
    Users,
    UserCheck,
    Plus,
    Download,
    Grid3x3,
    GripVertical,
    Clock,
    BookOpen,
    User,
    AlertTriangle,
    Edit2,
    Trash2,
    FileSpreadsheet,
    FileText,
} from 'lucide-react';
import { useTimetableStore } from '@/lib/store/entity-stores/timetable-store';
import { useClassStore } from '@/lib/store/entity-stores/class-store';
import { useStaffStore } from '@/lib/store/entity-stores/staff-store';
import { useSubjectStore } from '@/lib/store/entity-stores/subject-store';
import { useBranchStore } from '@/lib/store/entity-stores/branch-store';
import { exportToExcel, exportToPDF, exportSubstitutionsToExcel, exportSubstitutionsToPDF } from '@/lib/utils/export-utils';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const TIME_SLOTS = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
];
const periodDuration = 60;

// Draggable Slot Component with Edit/Delete
function DraggableSlot({ slot, onEdit, onDelete }: { slot: any; onEdit: () => void; onDelete: () => void }) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: slot.id.toString(),
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: isDragging ? 0.5 : 1,
    } : undefined;

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800 rounded-lg p-2 h-full group relative"
        >
            {/* Action Buttons */}
            <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 z-10">
                <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0 bg-white/90 dark:bg-gray-900/90"
                    onClick={(e) => {
                        e.stopPropagation();
                        onEdit();
                    }}
                >
                    <Edit2 className="h-3 w-3" />
                </Button>
                <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0 bg-white/90 dark:bg-gray-900/90 text-red-600"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete();
                    }}
                >
                    <Trash2 className="h-3 w-3" />
                </Button>
            </div>

            <div {...listeners} {...attributes} className="cursor-move h-full">
                <div className="flex items-start justify-between gap-1">
                    <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-indigo-900 dark:text-indigo-100 truncate">
                            {slot.subject?.name || 'Subject'}
                        </div>
                        <div className="text-xs text-indigo-700 dark:text-indigo-300 mt-1 truncate">
                            {slot.staff?.firstName} {slot.staff?.lastName}
                        </div>
                        {slot.roomNo && (
                            <Badge variant="secondary" className="text-xs mt-1">
                                Room {slot.roomNo}
                            </Badge>
                        )}
                    </div>
                    <GripVertical className="h-3 w-3 text-indigo-400 flex-shrink-0" />
                </div>
            </div>
        </div>
    );
}

// Droppable Cell Component
function DroppableCell({ id, children }: { id: string; children: React.ReactNode }) {
    const { isOver, setNodeRef } = useDroppable({
        id,
    });

    return (
        <div
            ref={setNodeRef}
            className={`bg-white dark:bg-gray-900 p-2 min-h-[90px] transition-colors border-r border-b border-gray-100 dark:border-gray-800 ${isOver ? 'bg-indigo-100 dark:bg-indigo-900/40 ring-2 ring-indigo-500' : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
        >
            {children}
        </div>
    );
}

// Add/Edit Period Dialog
function PeriodFormDialog({
    open,
    onOpenChange,
    editingSlot,
    onSave,
    branchId,
    classId,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    editingSlot: any | null;
    onSave: () => void;
    branchId: number;
    classId: number;
}) {
    const [formData, setFormData] = useState({
        branchId: branchId.toString() || '',
        classId: classId.toString() || '',
        subjectId: '',
        staffId: '',
        dayOfWeek: '',
        startTime: '',
        endTime: '',
        roomNo: '',
    });

    const { branches } = useBranchStore();
    const { classes } = useClassStore();
    const { subjects } = useSubjectStore();
    const { staffProfiles } = useStaffStore();
    const { addSlot, updateSlot } = useTimetableStore();

    useEffect(() => {
        if (editingSlot) {
            setFormData({
                branchId: editingSlot.branchId?.toString() || '',
                classId: editingSlot.classId?.toString() || '',
                subjectId: editingSlot.subjectId?.toString() || '',
                staffId: editingSlot.staffId?.toString() || '',
                dayOfWeek: editingSlot.dayOfWeek?.toString() || '',
                startTime: editingSlot.startTime || '',
                endTime: editingSlot.endTime || '',
                roomNo: editingSlot.roomNo || '',
            });
        } else {
            setFormData({
                branchId: branchId.toString() || '',
                classId: classId.toString() || '',
                subjectId: '',
                staffId: '',
                dayOfWeek: '',
                startTime: '',
                endTime: '',
                roomNo: '',
            });
        }
    }, [editingSlot, open]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const input = {
            branchId: parseInt(formData.branchId),
            classId: parseInt(formData.classId),
            subjectId: parseInt(formData.subjectId),
            staffId: parseInt(formData.staffId),
            dayOfWeek: parseInt(formData.dayOfWeek),
            startTime: formData.startTime,
            endTime: formData.endTime,
            roomNo: formData.roomNo || undefined,
        };

        if (editingSlot) {
            await updateSlot(editingSlot.id.toString(), input, branchId, classId);
        } else {
            await addSlot(input, branchId, classId);
        }

        onSave();
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {editingSlot ? 'Edit Period' : 'Add New Period'}
                    </DialogTitle>
                    <DialogDescription>
                        {editingSlot ? 'Update the period details' : 'Fill in the details to create a new period'}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="branch">Branch *</Label>
                                <Select
                                    value={formData.branchId}
                                    onValueChange={(value) => setFormData({ ...formData, branchId: value })}
                                    required
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select branch" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {branches.map((branch: any) => (
                                            <SelectItem key={branch.id} value={branch.id.toString()}>
                                                {branch.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="class">Class *</Label>
                                <Select
                                    value={formData.classId}
                                    onValueChange={(value) => setFormData({ ...formData, classId: value })}
                                    required
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select class" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {classes.map((cls: any) => (
                                            <SelectItem key={cls.id} value={cls.id.toString()}>
                                                {cls.name} {cls.section}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="subject">Subject *</Label>
                                <Select
                                    value={formData.subjectId}
                                    onValueChange={(value) => setFormData({ ...formData, subjectId: value })}
                                    required
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select subject" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {subjects.map((subject: any) => (
                                            <SelectItem key={subject.id} value={subject.id.toString()}>
                                                {subject.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="staff">Teacher *</Label>
                                <Select
                                    value={formData.staffId}
                                    onValueChange={(value) => setFormData({ ...formData, staffId: value })}
                                    required
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select teacher" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {staffProfiles.map((staff: any) => (
                                            <SelectItem key={staff.id} value={staff.id.toString()}>
                                                {staff.firstName} {staff.lastName}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="day">Day of Week *</Label>
                                <Select
                                    value={formData.dayOfWeek}
                                    onValueChange={(value) => setFormData({ ...formData, dayOfWeek: value })}
                                    required
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select day" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {DAYS.map((day, idx) => (
                                            <SelectItem key={idx} value={(idx + 1).toString()}>
                                                {day}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="startTime">Start Time *</Label>
                                <Select
                                    value={formData.startTime}
                                    onValueChange={(value) => setFormData({ ...formData, startTime: value })}
                                    required
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Start" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {TIME_SLOTS.map((time) => (
                                            <SelectItem key={time} value={time}>
                                                {time}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="endTime">End Time *</Label>
                                <Select
                                    value={formData.endTime}
                                    onValueChange={(value) => setFormData({ ...formData, endTime: value })}
                                    required
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="End" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {TIME_SLOTS.map((time) => (
                                            <SelectItem key={time} value={time}>
                                                {time}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="roomNo">Room Number</Label>
                            <Input
                                id="roomNo"
                                placeholder="e.g., 101, Lab A"
                                value={formData.roomNo}
                                onChange={(e) => setFormData({ ...formData, roomNo: e.target.value })}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </Button>
                        <Button type="submit">
                            {editingSlot ? 'Update Period' : 'Add Period'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default function TimetablePage() {
    const [activeTab, setActiveTab] = useState('schedule');
    const [selectedBranch, setSelectedBranch] = useState<string>('');
    const [selectedClass, setSelectedClass] = useState<string>('');
    const [selectedStaff, setSelectedStaff] = useState<string>('');
    const [activeId, setActiveId] = useState<string | null>(null);
    const [showSubForm, setShowSubForm] = useState(false);
    const [showPeriodForm, setShowPeriodForm] = useState(false);
    const [editingSlot, setEditingSlot] = useState<any | null>(null);

    const {
        classTimetable,
        staffTimetable,
        substitutions,
        loading,
        fetchClassTimetable,
        fetchStaffTimetable,
        fetchSubstitutions,
        updateSlot,
        deleteSlot,
    } = useTimetableStore();

    const { classes, fetchClasses } = useClassStore();
    const { staffProfiles, fetchStaffProfiles } = useStaffStore();
    const { fetchSubjects } = useSubjectStore();
    const { branches, fetchBranches } = useBranchStore();

    useEffect(() => {
        fetchSubstitutions();
        fetchClasses();
        fetchStaffProfiles();
        fetchSubjects();
        fetchBranches();
    }, []);

    useEffect(() => {
        if (selectedBranch && selectedClass) {
            fetchClassTimetable(parseInt(selectedBranch), parseInt(selectedClass))
        }
    }, [selectedBranch, selectedClass]);

    useEffect(() => {
        if (selectedStaff) {
            fetchStaffTimetable(parseInt(selectedStaff));
        }
    }, [selectedStaff]);

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id as string);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const slotId = active.id as string;
            const targetCell = over.id as string;
            const [dayIdx, timeSlot] = targetCell.split('-');

            // Calculate end time by adding periodDuration
            const startHour = parseInt(timeSlot.split(':')[0]);
            const startMin = parseInt(timeSlot.split(':')[1]);
            const endHour = startHour + Math.floor(periodDuration / 60);
            const endMin = startMin + (periodDuration % 60);
            const endTime = `${String(endHour).padStart(2, '0')}:${String(endMin).padStart(2, '0')}`;

            // Update slot with new position
            const slot = classTimetable.find((s: any) => s.id.toString() === slotId);
            if (slot) {
                updateSlot(slotId, {
                    dayOfWeek: parseInt(dayIdx) + 1,
                    startTime: timeSlot,
                    endTime: endTime,
                }, parseInt(selectedBranch), parseInt(selectedClass));
            }
        }

        setActiveId(null);
    };

    const handleEditSlot = (slot: any) => {
        setEditingSlot(slot);
        setShowPeriodForm(true);
    };

    const handleDeleteSlot = async (slotId: string) => {
        if (confirm('Are you sure you want to delete this period?')) {
            await deleteSlot(slotId, parseInt(selectedBranch), parseInt(selectedClass));
        }
    };

    const handleAddPeriod = () => {
        setEditingSlot(null);
        setShowPeriodForm(true);
    };

    return (
        <DndContext
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                            Timetable Management
                        </h1>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Manage schedules, substitutions, and templates
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                            <SelectTrigger className="w-[250px]">
                                <SelectValue placeholder="Select a branch" />
                            </SelectTrigger>
                            <SelectContent>
                                {branches.map((branch: any) => (
                                    <SelectItem key={branch.id} value={branch.id.toString()}>
                                        {branch.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select value={selectedClass} onValueChange={setSelectedClass}>
                            <SelectTrigger className="w-[250px]">
                                <SelectValue placeholder="Select a class" />
                            </SelectTrigger>
                            <SelectContent>
                                {classes.map((cls: any) => (
                                    <SelectItem key={cls.id} value={cls.id.toString()}>
                                        {cls.name} {cls.section}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" disabled={!selectedClass}>
                                    <Download className="h-4 w-4 mr-2" />
                                    Export
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Export Format</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => {
                                        const className = classes.find((c: any) => c.id.toString() === selectedClass);
                                        exportToExcel(
                                            activeTab === 'schedule' ? classTimetable :
                                                activeTab === 'classes' ? classTimetable :
                                                    activeTab === 'teachers' ? staffTimetable : [],
                                            className?.name || 'Timetable',
                                            activeTab === 'schedule' ? 'schedule' :
                                                activeTab === 'classes' ? 'class' : 'teacher'
                                        );
                                    }}
                                >
                                    <FileSpreadsheet className="h-4 w-4 mr-2" />
                                    Export to Excel
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => {
                                        const className = classes.find((c: any) => c.id.toString() === selectedClass);
                                        exportToPDF(
                                            activeTab === 'schedule' ? classTimetable :
                                                activeTab === 'classes' ? classTimetable :
                                                    activeTab === 'teachers' ? staffTimetable : [],
                                            className?.name || 'Timetable',
                                            activeTab === 'schedule' ? 'schedule' :
                                                activeTab === 'classes' ? 'class' : 'teacher'
                                        );
                                    }}
                                >
                                    <FileText className="h-4 w-4 mr-2" />
                                    Export to PDF
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button size="sm" onClick={handleAddPeriod} disabled={!selectedClass}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Period
                        </Button>
                    </div>
                </div>

                {/* Add/Edit Period Dialog */}
                <PeriodFormDialog
                    open={showPeriodForm}
                    onOpenChange={setShowPeriodForm}
                    editingSlot={editingSlot}
                    onSave={() => { if (selectedClass) fetchClassTimetable(parseInt(selectedBranch), parseInt(selectedClass)); }}
                    branchId={parseInt(selectedBranch)}
                    classId={parseInt(selectedClass)}
                />

                {/* Stats Cards - keeping the same */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Periods</CardTitle>
                            <Grid3x3 className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{classTimetable.length}</div>
                            <p className="text-xs text-muted-foreground">Active schedules</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Substitutions</CardTitle>
                            <UserCheck className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {substitutions.filter((s: any) => s.status === 'PENDING').length}
                            </div>
                            <p className="text-xs text-muted-foreground">Pending approvals</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Classes</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {new Set(classTimetable.map((s: any) => s.classId)).size}
                            </div>
                            <p className="text-xs text-muted-foreground">With schedules</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">This Week</CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{DAYS.length * 8}</div>
                            <p className="text-xs text-muted-foreground">Total slots</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="schedule">
                            <Grid3x3 className="h-4 w-4 mr-2" />
                            Schedule Grid
                        </TabsTrigger>
                        <TabsTrigger value="classes">
                            <Users className="h-4 w-4 mr-2" />
                            Classes
                        </TabsTrigger>
                        <TabsTrigger value="teachers">
                            <User className="h-4 w-4 mr-2" />
                            Teachers
                        </TabsTrigger>
                        <TabsTrigger value="substitutions">
                            <UserCheck className="h-4 w-4 mr-2" />
                            Substitutions
                        </TabsTrigger>
                    </TabsList>

                    {/* Schedule Grid Tab */}
                    <TabsContent value="schedule" className="space-y-4 mt-6">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>Weekly Schedule</CardTitle>
                                        <CardDescription>
                                            Drag periods to reschedule • Click edit/delete icons to modify
                                        </CardDescription>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400">
                                            <AlertTriangle className="h-4 w-4" />
                                            <span>Hover to edit/delete</span>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="overflow-x-auto">
                                    <div className="min-w-[900px]">
                                        <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                                            {/* Header */}
                                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-3 font-semibold text-sm sticky top-0 z-10">
                                                <Clock className="h-4 w-4 inline mr-2" />
                                                Time
                                            </div>
                                            {DAYS.map((day) => (
                                                <div
                                                    key={day}
                                                    className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 p-3 font-semibold text-sm text-center sticky top-0 z-10"
                                                >
                                                    {day}
                                                </div>
                                            ))}

                                            {/* Time Slots */}
                                            {TIME_SLOTS.slice(0, -1).map((time, timeIdx) => (
                                                <React.Fragment key={time}>
                                                    <div className="bg-white dark:bg-gray-900 p-3 text-sm font-medium text-gray-600 dark:text-gray-400">
                                                        {time}
                                                    </div>
                                                    {DAYS.map((day, dayIdx) => {
                                                        const slot = classTimetable.find(
                                                            (s: any) =>
                                                                s.dayOfWeek === dayIdx + 1 &&
                                                                s.startTime === time
                                                        );
                                                        const cellId = `${dayIdx}-${time}`;

                                                        return (
                                                            <DroppableCell key={cellId} id={cellId}>
                                                                {slot && (
                                                                    <DraggableSlot
                                                                        slot={slot}
                                                                        onEdit={() => handleEditSlot(slot)}
                                                                        onDelete={() => handleDeleteSlot(slot.id.toString())}
                                                                    />
                                                                )}
                                                            </DroppableCell>
                                                        );
                                                    })}
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Class Timetables Tab */}
                    <TabsContent value="classes" className="space-y-4 mt-6">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>Class Timetables</CardTitle>
                                        <CardDescription>
                                            View and manage class schedules
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {!selectedClass ? (
                                    <div className="text-center py-12">
                                        <Users className="h-12 w-12 text-gray-300 dark:text-gray-700 mx-auto mb-3" />
                                        <p className="text-gray-500">Select a class to view its timetable</p>
                                    </div>
                                ) : classTimetable.length === 0 ? (
                                    <div className="text-center py-12">
                                        <BookOpen className="h-12 w-12 text-gray-300 dark:text-gray-700 mx-auto mb-3" />
                                        <p className="text-gray-500">No schedule found for this class</p>
                                        <Button size="sm" className="mt-4">
                                            <Plus className="h-4 w-4 mr-2" />
                                            Create Schedule
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {DAYS.map((day, dayIdx) => {
                                            const daySlots = classTimetable.filter(
                                                (s: any) => s.dayOfWeek === dayIdx + 1
                                            ).sort((a, b) => a.startTime.localeCompare(b.startTime));

                                            return daySlots.length > 0 ? (
                                                <div key={day} className="border rounded-lg p-4">
                                                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                                                        <Calendar className="h-5 w-5 text-indigo-600" />
                                                        {day}
                                                    </h3>
                                                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                                        {daySlots.map((slot: any) => (
                                                            <Card key={slot.id} className="border-l-4 border-l-indigo-500">
                                                                <CardContent className="p-4">
                                                                    <div className="flex items-start justify-between mb-2">
                                                                        <div className="text-sm font-medium">
                                                                            {slot.startTime} - {slot.endTime}
                                                                        </div>
                                                                        <Badge variant="outline">{slot.roomNo || 'N/A'}</Badge>
                                                                    </div>
                                                                    <div className="text-lg font-semibold text-indigo-900 dark:text-indigo-100">
                                                                        {slot.subject?.name}
                                                                    </div>
                                                                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                                        {slot.staff?.firstName} {slot.staff?.lastName}
                                                                    </div>
                                                                </CardContent>
                                                            </Card>
                                                        ))}
                                                    </div>
                                                </div>
                                            ) : null;
                                        })}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Teacher Timetables Tab */}
                    <TabsContent value="teachers" className="space-y-4 mt-6">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>Teacher Timetables</CardTitle>
                                        <CardDescription>
                                            View teacher schedules and workload
                                        </CardDescription>
                                    </div>
                                    <Select value={selectedStaff} onValueChange={setSelectedStaff}>
                                        <SelectTrigger className="w-[250px]">
                                            <SelectValue placeholder="Select a teacher" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {staffProfiles.map((staff: any) => (
                                                <SelectItem key={staff.id} value={staff.id.toString()}>
                                                    {staff.firstName} {staff.lastName}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {!selectedStaff ? (
                                    <div className="text-center py-12">
                                        <User className="h-12 w-12 text-gray-300 dark:text-gray-700 mx-auto mb-3" />
                                        <p className="text-gray-500">Select a teacher to view their timetable</p>
                                    </div>
                                ) : staffTimetable.length === 0 ? (
                                    <div className="text-center py-12">
                                        <BookOpen className="h-12 w-12 text-gray-300 dark:text-gray-700 mx-auto mb-3" />
                                        <p className="text-gray-500">No schedule assigned to this teacher</p>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="mb-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <div className="font-semibold">Total Classes</div>
                                                    <div className="text-2xl font-bold text-indigo-600">
                                                        {staffTimetable.length}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-semibold">Classes</div>
                                                    <div className="text-2xl font-bold text-indigo-600">
                                                        {new Set(staffTimetable.map((s: any) => s.classId)).size}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-semibold">Subjects</div>
                                                    <div className="text-2xl font-bold text-indigo-600">
                                                        {new Set(staffTimetable.map((s: any) => s.subjectId)).size}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            {DAYS.map((day, dayIdx) => {
                                                const daySlots = staffTimetable.filter(
                                                    (s: any) => s.dayOfWeek === dayIdx + 1
                                                ).sort((a, b) => a.startTime.localeCompare(b.startTime));

                                                return daySlots.length > 0 ? (
                                                    <div key={day} className="border rounded-lg p-4">
                                                        <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                                                            <Calendar className="h-5 w-5 text-indigo-600" />
                                                            {day}
                                                        </h3>
                                                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                                            {daySlots.map((slot: any) => (
                                                                <Card key={slot.id} className="border-l-4 border-l-indigo-500">
                                                                    <CardContent className="p-4">
                                                                        <div className="flex items-start justify-between mb-2">
                                                                            <div className="text-sm font-medium">
                                                                                {slot.startTime} - {slot.endTime}
                                                                            </div>
                                                                            <Badge variant="outline">{slot.roomNo || 'N/A'}</Badge>
                                                                        </div>
                                                                        <div className="text-lg font-semibold text-indigo-900 dark:text-indigo-100">
                                                                            {slot.subject?.name}
                                                                        </div>
                                                                        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                                            Class: {slot.class?.name}
                                                                        </div>
                                                                    </CardContent>
                                                                </Card>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ) : null;
                                            })}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Substitutions Tab */}
                    <TabsContent value="substitutions" className="space-y-4 mt-6">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>Substitution Requests</CardTitle>
                                        <CardDescription>
                                            Manage teacher substitutions and approvals
                                        </CardDescription>
                                    </div>
                                    <Dialog open={showSubForm} onOpenChange={setShowSubForm}>
                                        <DialogTrigger asChild>
                                            <Button size="sm">
                                                <Plus className="h-4 w-4 mr-2" />
                                                Request Substitution
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Request Substitution</DialogTitle>
                                                <DialogDescription>
                                                    Fill in the details for the substitution request
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="grid gap-4 py-4">
                                                <div className="grid gap-2">
                                                    <Label htmlFor="date">Date</Label>
                                                    <Input id="date" type="date" />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="original">Original Teacher</Label>
                                                    <Select>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select teacher" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {staffProfiles.map((staff: any) => (
                                                                <SelectItem key={staff.id} value={staff.id.toString()}>
                                                                    {staff.firstName} {staff.lastName}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="substitute">Substitute Teacher</Label>
                                                    <Select>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select teacher" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {staffProfiles.map((staff: any) => (
                                                                <SelectItem key={staff.id} value={staff.id.toString()}>
                                                                    {staff.firstName} {staff.lastName}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="reason">Reason</Label>
                                                    <Textarea
                                                        id="reason"
                                                        placeholder="Enter reason for substitution..."
                                                    />
                                                </div>
                                            </div>
                                            <DialogFooter>
                                                <Button variant="outline" onClick={() => setShowSubForm(false)}>
                                                    Cancel
                                                </Button>
                                                <Button>Submit Request</Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {substitutions.length === 0 ? (
                                    <div className="text-center py-12">
                                        <UserCheck className="h-12 w-12 text-gray-300 dark:text-gray-700 mx-auto mb-3" />
                                        <p className="text-gray-500 mb-4">No substitution requests</p>
                                        <Button size="sm" onClick={() => setShowSubForm(true)}>
                                            <Plus className="h-4 w-4 mr-2" />
                                            Create First Request
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {substitutions.map((sub: any) => (
                                            <Card key={sub.id} className="border-l-4 border-l-amber-500">
                                                <CardContent className="p-4">
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-3 mb-2">
                                                                <div className="text-sm font-medium">
                                                                    {new Date(sub.date).toLocaleDateString('en-US', {
                                                                        weekday: 'short',
                                                                        year: 'numeric',
                                                                        month: 'short',
                                                                        day: 'numeric',
                                                                    })}
                                                                </div>
                                                                <Badge
                                                                    variant={
                                                                        sub.status === 'APPROVED'
                                                                            ? 'default'
                                                                            : sub.status === 'PENDING'
                                                                                ? 'secondary'
                                                                                : 'destructive'
                                                                    }
                                                                >
                                                                    {sub.status}
                                                                </Badge>
                                                            </div>
                                                            <div className="text-base font-semibold mb-1">
                                                                {sub.originalStaff?.firstName} {sub.originalStaff?.lastName} →{' '}
                                                                {sub.substituteStaff?.firstName} {sub.substituteStaff?.lastName}
                                                            </div>
                                                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                                                Subject: {sub.timetableSlot?.subject?.name} •{' '}
                                                                Class: {sub.timetableSlot?.class?.name}
                                                            </div>
                                                            {sub.reason && (
                                                                <div className="mt-2 text-sm text-gray-500 italic">
                                                                    "{sub.reason}"
                                                                </div>
                                                            )}
                                                        </div>
                                                        {sub.status === 'PENDING' && (
                                                            <div className="flex gap-2">
                                                                <Button size="sm" variant="default">
                                                                    Approve
                                                                </Button>
                                                                <Button size="sm" variant="destructive">
                                                                    Reject
                                                                </Button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                {/* Drag Overlay */}
                <DragOverlay>
                    {activeId ? (
                        <div className="opacity-90">
                            {classTimetable.find((s: any) => s.id.toString() === activeId) && (
                                <DraggableSlot
                                    slot={classTimetable.find((s: any) => s.id.toString() === activeId)}
                                    onEdit={() => { }}
                                    onDelete={() => { }}
                                />
                            )}
                        </div>
                    ) : null}
                </DragOverlay>
            </div>
        </DndContext>
    );
}
