"use client";

import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Crown,
    CheckCircle2,
    BookOpen,
    Users,
    ClipboardCheck,
    Award,
    Sparkles
} from "lucide-react";

const lmsFeatures = [
    {
        icon: BookOpen,
        title: "Course Creation & Enrollment",
        description: "Create comprehensive courses and enroll students seamlessly within the system"
    },
    {
        icon: ClipboardCheck,
        title: "Assignment Management",
        description: "Upload assignments, set deadlines, and track student submissions efficiently"
    },
    {
        icon: Users,
        title: "Quiz & Assessment Tools",
        description: "Design quizzes and assessments with auto-grading capabilities"
    },
    {
        icon: Award,
        title: "Completion Certificates",
        description: "Issue digital certificates automatically upon course completion"
    },
    {
        icon: Sparkles,
        title: "All-in-One Integration",
        description: "Fully integrated with your existing ERP - no separate login required"
    }
];

export default function EnterpriseLMSSection() {
    return (
        <section className="py-20 px-4 bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 dark:from-purple-950 dark:via-indigo-950 dark:to-pink-950">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <Badge className="mb-4 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white border-0 px-6 py-2 text-base shadow-lg">
                        <Crown className="w-4 h-4 mr-2" />
                        Enterprise Plan
                    </Badge>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
                        Integrated Learning Management System
                    </h2>
                    <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
                        Take your institution to the next level with our comprehensive LMS for digital and hybrid learning
                    </p>
                </motion.div>

                {/* Main LMS Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <Card className="border-4 border-purple-200 dark:border-purple-800 bg-gradient-to-br from-white via-purple-50 to-indigo-50 dark:from-neutral-900 dark:via-purple-950 dark:to-indigo-950 shadow-2xl overflow-hidden relative">
                        {/* Decorative gradient overlay */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-indigo-400/20 to-blue-400/20 rounded-full blur-3xl"></div>

                        <CardHeader className="relative z-10 pb-6">
                            <div className="flex items-center justify-between flex-wrap gap-4">
                                <div>
                                    <Badge className="mb-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-0">
                                        Premium Feature
                                    </Badge>
                                    <CardTitle className="text-3xl font-bold text-neutral-900 dark:text-white">
                                        Complete Learning Management System
                                    </CardTitle>
                                </div>
                                <Crown className="w-16 h-16 text-amber-500" />
                            </div>
                        </CardHeader>

                        <CardContent className="relative z-10">
                            <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-8 leading-relaxed">
                                For schools offering digital or hybrid learning, our Enterprise Plan includes a fully integrated Learning Management System.
                                Create courses, manage content, conduct assessments, and issue certificates—all within one unified platform.
                            </p>

                            {/* Features Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                {lmsFeatures.map((feature, index) => {
                                    const Icon = feature.icon;
                                    return (
                                        <motion.div
                                            key={feature.title}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.3, delay: index * 0.1 }}
                                            viewport={{ once: true }}
                                            className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-purple-200 dark:border-purple-800 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 group"
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 text-white group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                                                    <Icon className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">
                                                        {feature.title}
                                                    </h4>
                                                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                                        {feature.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {/* Benefits List */}
                            <div className="bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-xl p-6 mb-8 border border-purple-200 dark:border-purple-800">
                                <h4 className="font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 text-purple-600" />
                                    What Makes It Special
                                </h4>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3 text-neutral-700 dark:text-neutral-300">
                                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span>Single sign-on - no need for separate credentials</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-neutral-700 dark:text-neutral-300">
                                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span>Seamlessly integrates with existing student and teacher data</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-neutral-700 dark:text-neutral-300">
                                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span>Perfect for schools transitioning to hybrid or online education</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-neutral-700 dark:text-neutral-300">
                                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span>Track learning progress alongside academic performance</span>
                                    </li>
                                </ul>
                            </div>

                            {/* CTA Button */}
                            <div className="text-center">
                                <button className="px-10 py-5 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white rounded-xl font-bold text-lg shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 group relative overflow-hidden">
                                    <span className="relative z-10 flex items-center gap-2">
                                        <Crown className="w-5 h-5" />
                                        Upgrade to Enterprise Plan
                                        <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </button>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-4">
                                    Contact us to learn more about Enterprise pricing
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </section>
    );
}
