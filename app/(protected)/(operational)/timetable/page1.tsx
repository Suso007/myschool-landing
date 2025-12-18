'use client';

import { useEffect } from 'react';
import { useUIStore } from '@/lib/store';
import { Calendar as CalendarIcon, Grid3x3, Table, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function TimetablePage() {
    const setBreadcrumbs = useUIStore((state) => state.setBreadcrumbs);

    useEffect(() => {
        setBreadcrumbs([{ label: 'Dashboard', href: '/dashboard' }, { label: 'Timetable' }]);
    }, [setBreadcrumbs]);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Timetable Management</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Manage class schedules and timetables</p>
            </div>

            <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Feature Coming Soon</AlertTitle>
                <AlertDescription>
                    The timetable management system requires a specialized grid UI with drag-and-drop scheduling, period management, and teacher-class conflicts resolution. This feature is planned for a future release.
                </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Grid3x3 className="h-5 w-5" />
                            Weekly View
                        </CardTitle>
                        <CardDescription>Traditional grid-based schedule</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            View and manage weekly class schedules with period-wise subject and teacher allocation
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CalendarIcon className="h-5 w-5" />
                            Calendar View
                        </CardTitle>
                        <CardDescription>Day-wise schedule overview</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Calendar-based view for daily class schedules with time slots and room allocations
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Table className="h-5 w-5" />
                            List View
                        </CardTitle>
                        <CardDescription>Detailed schedule listing</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Comprehensive list view with filters for classes, teachers, and subjects
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Planned Features</CardTitle>
                    <CardDescription>What will be available in the timetable system</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <li className="flex items-start gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-gray-400 mt-2" />
                            <span>Drag-and-drop schedule creation and editing</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-gray-400 mt-2" />
                            <span>Automatic conflict detection (teacher/room double-booking)</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-gray-400 mt-2" />
                            <span>Period templates and scheduling patterns</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-gray-400 mt-2" />
                            <span>Class, teacher, and room timetables</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-gray-400 mt-2" />
                            <span>Substitution management for absent teachers</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-gray-400 mt-2" />
                            <span>Print and export timetables (PDF, Excel)</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-gray-400 mt-2" />
                            <span>Mobile-friendly view for students and staff</span>
                        </li>
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
}
