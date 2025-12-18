'use client';

import { useEffect } from 'react';
import { useUIStore } from '@/lib/store';
import { FileText, BookOpen, CheckSquare, BarChart3, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function ExamsPage() {
    const setBreadcrumbs = useUIStore((state) => state.setBreadcrumbs);

    useEffect(() => {
        setBreadcrumbs([{ label: 'Dashboard', href: '/dashboard' }, { label: 'Exams' }]);
    }, [setBreadcrumbs]);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Exam Management</h1>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Manage exams, assessments, and results</p>
            </div>

            <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Backend API Required</AlertTitle>
                <AlertDescription>
                    The exam management system requires backend models and APIs to be implemented first. This includes exam scheduling, question banks, grading, and result processing.
                </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Upcoming Exams</CardTitle>
                        <FileText className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">-</div>
                        <p className="text-xs text-muted-foreground">Awaiting backend</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Ongoing Exams</CardTitle>
                        <BookOpen className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">-</div>
                        <p className="text-xs text-muted-foreground">Awaiting backend</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Results Pending</CardTitle>
                        <CheckSquare className="h-4 w-4 text-yellow-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">-</div>
                        <p className="text-xs text-muted-foreground">Awaiting backend</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Published Results</CardTitle>
                        <BarChart3 className="h-4 w-4 text-purple-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">-</div>
                        <p className="text-xs text-muted-foreground">Awaiting backend</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Exam Types</CardTitle>
                        <CardDescription>Different assessment categories</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <li className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-blue-500" />
                                <span>Internal Assessments</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-green-500" />
                                <span>Mid-term Exams</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-purple-500" />
                                <span>Final Exams</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-yellow-500" />
                                <span>Practical Exams</span>
                            </li>
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Planned Features</CardTitle>
                        <CardDescription>What will be available in the exam system</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <li className="flex items-start gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-gray-400 mt-2" />
                                <span>Exam scheduling and calendar</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-gray-400 mt-2" />
                                <span>Question bank management</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-gray-400 mt-2" />
                                <span>Online assessments and quizzes</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-gray-400 mt-2" />
                                <span>Grading and marks entry</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-gray-400 mt-2" />
                                <span>Result processing and analytics</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-gray-400 mt-2" />
                                <span>Report card generation</span>
                            </li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
