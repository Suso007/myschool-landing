"use client";

import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    CheckCircle2,
    Clock,
    FileText,
    TrendingUp,
    CreditCard,
    Fingerprint,
    Shield,
    Zap
} from "lucide-react";

export default function AttendanceManagement() {
    const benefits = [
        {
            icon: CheckCircle2,
            title: "Instant Updates",
            description: "Real-time attendance notifications sent to parents"
        },
        {
            icon: Shield,
            title: "Highly Secure",
            description: "Tamper-proof digital data storage and authentication"
        },
        {
            icon: FileText,
            title: "Comprehensive Reports",
            description: "Multiple report types for teachers and management"
        },
        {
            icon: Clock,
            title: "Time Saving",
            description: "Automated processes save valuable teaching time"
        },
        {
            icon: TrendingUp,
            title: "Improved Discipline",
            description: "Better institutional planning and accountability"
        },
        {
            icon: Zap,
            title: "Reliable Records",
            description: "Transparent records for audits and evaluations"
        }
    ];

    const keyFeatures = [
        "Simple and user-friendly interface",
        "High accuracy with zero errors",
        "Instant report generation",
        "Cost-effective long-term solution"
    ];

    return (
        <section className="py-20 px-4 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-neutral-900 dark:via-indigo-950 dark:to-purple-950">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <Badge className="mb-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0">
                        Smart Attendance
                    </Badge>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
                        Modern Attendance Management
                    </h2>
                    <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
                        Automated attendance tracking that eliminates manual errors and provides real-time insights
                    </p>
                </motion.div>

                {/* What is Attendance Management */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <Card className="border-neutral-200 dark:border-neutral-800">
                        <CardHeader>
                            <CardTitle className="text-2xl">What Is an Attendance Management System?</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                                An attendance management system is a digital platform that automates the entire attendance tracking process.
                                It helps educational institutions record, monitor, and manage attendance with high accuracy and minimum human intervention.
                            </p>
                            <p className="text-neutral-600 dark:text-neutral-300">
                                The system generates quick, standardized, and customizable reports, allowing administrators and teachers to make
                                data-driven decisions effortlessly. Traditional methods like roll calls consume valuable teaching time and are
                                prone to errors—this is why modern institutions are adopting automated solutions.
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Key Features */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6 text-center">
                        Key Features
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {keyFeatures.map((feature, index) => (
                            <Card key={index} className="border-indigo-200 dark:border-indigo-900 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm">
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-1 flex-shrink-0" />
                                        <p className="text-neutral-700 dark:text-neutral-300 font-medium">{feature}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </motion.div>

                {/* How It Works - Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6 text-center">
                        How Does It Work?
                    </h3>
                    <Tabs defaultValue="rfid" className="w-full">
                        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
                            <TabsTrigger value="rfid" className="flex items-center gap-2">
                                <CreditCard className="w-4 h-4" />
                                RFID System
                            </TabsTrigger>
                            <TabsTrigger value="biometric" className="flex items-center gap-2">
                                <Fingerprint className="w-4 h-4" />
                                Biometric
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="rfid">
                            <Card className="border-neutral-200 dark:border-neutral-800">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <CreditCard className="w-6 h-6 text-blue-600" />
                                        RFID Tag-Based Attendance
                                    </CardTitle>
                                    <CardDescription>
                                        Quick and convenient card-based attendance tracking
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0 text-blue-700 dark:text-blue-300 font-bold">
                                                1
                                            </div>
                                            <p className="text-neutral-700 dark:text-neutral-300 pt-1">
                                                Each student receives a unique RFID card containing their encoded identification details
                                            </p>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0 text-blue-700 dark:text-blue-300 font-bold">
                                                2
                                            </div>
                                            <p className="text-neutral-700 dark:text-neutral-300 pt-1">
                                                RFID readers are placed at classroom entrances or school gates
                                            </p>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0 text-blue-700 dark:text-blue-300 font-bold">
                                                3
                                            </div>
                                            <p className="text-neutral-700 dark:text-neutral-300 pt-1">
                                                When a student taps their RFID card, attendance is automatically recorded
                                            </p>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0 text-blue-700 dark:text-blue-300 font-bold">
                                                4
                                            </div>
                                            <p className="text-neutral-700 dark:text-neutral-300 pt-1">
                                                The system logs entry and exit times for accurate tracking
                                            </p>
                                        </div>
                                    </div>
                                    <Separator />
                                    <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded-lg border border-amber-200 dark:border-amber-900">
                                        <p className="text-sm text-amber-800 dark:text-amber-200">
                                            <strong>Note:</strong> While RFID is simple and quick, cards can be lost, damaged, or misused if shared with another student.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="biometric">
                            <Card className="border-neutral-200 dark:border-neutral-800">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Fingerprint className="w-6 h-6 text-purple-600" />
                                        Biometric Attendance System
                                    </CardTitle>
                                    <CardDescription>
                                        Secure fingerprint or face recognition-based tracking
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center flex-shrink-0 text-purple-700 dark:text-purple-300 font-bold">
                                                1
                                            </div>
                                            <p className="text-neutral-700 dark:text-neutral-300 pt-1">
                                                During registration, the student's biometric data (fingerprint or face) is captured and securely stored
                                            </p>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center flex-shrink-0 text-purple-700 dark:text-purple-300 font-bold">
                                                2
                                            </div>
                                            <p className="text-neutral-700 dark:text-neutral-300 pt-1">
                                                Biometric readers are installed at classroom entrances or access points
                                            </p>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center flex-shrink-0 text-purple-700 dark:text-purple-300 font-bold">
                                                3
                                            </div>
                                            <p className="text-neutral-700 dark:text-neutral-300 pt-1">
                                                Students place their finger or show their face to the device to mark attendance
                                            </p>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center flex-shrink-0 text-purple-700 dark:text-purple-300 font-bold">
                                                4
                                            </div>
                                            <p className="text-neutral-700 dark:text-neutral-300 pt-1">
                                                Only genuine students can authenticate, eliminating proxy or duplicate attendance
                                            </p>
                                        </div>
                                    </div>
                                    <Separator />
                                    <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border border-green-200 dark:border-green-900">
                                        <p className="text-sm text-green-800 dark:text-green-200">
                                            <strong>Advantage:</strong> Biometric systems solve the shortcomings of RFID cards by using unique physical features that cannot be duplicated or shared.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </motion.div>

                {/* Benefits Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true }}
                >
                    <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6 text-center">
                        Benefits of Digital Attendance
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {benefits.map((benefit, index) => {
                            const Icon = benefit.icon;
                            return (
                                <Card key={index} className="border-neutral-200 dark:border-neutral-800 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 group">
                                    <CardContent className="p-6">
                                        <div className="flex items-start gap-4">
                                            <div className="p-3 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white group-hover:scale-110 transition-transform duration-300">
                                                <Icon className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">
                                                    {benefit.title}
                                                </h4>
                                                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                                    {benefit.description}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
