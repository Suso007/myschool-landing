"use client";

import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    BookOpen,
    GraduationCap,
    CreditCard,
    Bus,
    Library,
    Users,
    Smartphone,
    FingerprintIcon
} from "lucide-react";

const features = [
    {
        icon: CreditCard,
        title: "Admission & Fee Management",
        description: "Manage the entire admission process from enquiry to enrollment. Collect and track fees online, automate invoices, handle concessions, and generate detailed financial reports with ease.",
        color: "from-blue-500 to-cyan-500",
        badge: "Core Module"
    },
    {
        icon: GraduationCap,
        title: "Academic & Examination",
        description: "Track student attendance, allocate subjects, manage internal assessments and board exams, and share digital progress cards with students and parents.",
        color: "from-purple-500 to-pink-500",
        badge: "Essential"
    },
    {
        icon: BookOpen,
        title: "Learning & Course Management",
        description: "Upload syllabi, share course materials, and send academic circulars. Keep all students updated with the latest learning content.",
        color: "from-indigo-500 to-blue-500",
        badge: "Core Module"
    },
    {
        icon: FingerprintIcon,
        title: "Attendance and Leave Management",
        description: "Attendance and Leave Management with easy tracking and reporting.",
        color: "from-purple-500 to-pink-500",
        badge: "Essential"
    },
    {
        icon: Bus,
        title: "Transport & Hostel",
        description: "Plan and monitor student transport and hostel accommodations. Track attendance and manage related fees securely.",
        color: "from-green-500 to-emerald-500",
        badge: "Logistics"
    },
    {
        icon: Library,
        title: "Library Management",
        description: "Simplify book purchase, issue, and return using barcode integration. Maintain a database of books, journals, and members for efficient operations.",
        color: "from-orange-500 to-red-500",
        badge: "Operations"
    },
    {
        icon: Users,
        title: "HR & Payroll Automation",
        description: "Handle staff appointments, leave, promotions, salary processing, and attendance through a streamlined HRMS built for schools.",
        color: "from-violet-500 to-purple-500",
        badge: "Administration"
    },
    {
        icon: Smartphone,
        title: "Mobile Applications",
        description: "Dedicated apps for students, teachers, and management with real-time access to assignments, attendance, assessments, and comprehensive reports.",
        color: "from-pink-500 to-rose-500",
        badge: "All Platforms"
    },
];

export default function ErpFeaturesGrid() {
    return (
        <section className="py-20 px-4 bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
                        Comprehensive School Management Features
                    </h2>
                    <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
                        Everything your institution needs to operate efficiently in one integrated platform
                    </p>
                </motion.div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                            >
                                <Card className="h-full border-neutral-200 dark:border-neutral-800 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 group overflow-hidden relative">
                                    {/* Gradient background on hover */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                                    <CardHeader>
                                        <div className="flex items-start justify-between mb-3">
                                            <div className={`p-3 rounded-lg bg-gradient-to-br ${feature.color} text-white shadow-lg`}>
                                                <Icon className="w-6 h-6" />
                                            </div>
                                            <Badge variant="secondary" className="text-xs">
                                                {feature.badge}
                                            </Badge>
                                        </div>
                                        <CardTitle className="text-xl font-bold text-neutral-900 dark:text-white">
                                            {feature.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                            {feature.description}
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
