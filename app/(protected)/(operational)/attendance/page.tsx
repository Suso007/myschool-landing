'use client';

import { useEffect } from 'react';
import { useUIStore } from '@/lib/store';
import { Calendar, Users, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function AttendancePage() {
    const setBreadcrumbs = useUIStore((state) => state.setBreadcrumbs);

    useEffect(() => {
        setBreadcrumbs([{ label: 'Dashboard', href: '/dashboard' }, { label: 'Attendance' }]);
    }, [setBreadcrumbs]);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Attendance Management</h1>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Track and manage student and staff attendance</p>
            </div>

            <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Feature Coming Soon</AlertTitle>
                <AlertDescription>
                    The attendance management system requires a specialized UI with calendar views, student rosters, and bulk marking capabilities. This feature is planned for a future release.
                </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Present Today</CardTitle>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">-</div>
                        <p className="text-xs text-muted-foreground">Data not available</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Absent Today</CardTitle>
                        <XCircle className="h-4 w-4 text-red-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">-</div>
                        <p className="text-xs text-muted-foreground">Data not available</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Late Today</CardTitle>
                        <Clock className="h-4 w-4 text-yellow-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">-</div>
                        <p className="text-xs text-muted-foreground">Data not available</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                        <Users className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">-</div>
                        <p className="text-xs text-muted-foreground">Data not available</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Planned Features
                    </CardTitle>
                    <CardDescription>What will be available in the attendance system</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 mt-0.5 text-gray-400" />
                            <span>Daily attendance marking with calendar view</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 mt-0.5 text-gray-400" />
                            <span>Bulk attendance marking for classes</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 mt-0.5 text-gray-400" />
                            <span>Attendance reports and analytics</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 mt-0.5 text-gray-400" />
                            <span>Student and staff attendance tracking</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 mt-0.5 text-gray-400" />
                            <span>Leave management and approval workflow</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 mt-0.5 text-gray-400" />
                            <span>Automated attendance notifications</span>
                        </li>
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
}
