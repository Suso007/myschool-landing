"use client";

import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Smartphone,
    BookOpen,
    ClipboardCheck,
    DollarSign,
    FileText,
    Calendar,
    BarChart3,
    UserCircle2,
    Users,
    Clock,
    Sparkles
} from "lucide-react";

const apps = [
    {
        name: "Student App",
        icon: UserCircle2,
        color: "from-blue-500 to-cyan-500",
        description: "Empower students with easy access to their academic journey",
        features: [
            { icon: BookOpen, text: "View and submit assignments" },
            { icon: FileText, text: "Access progress reports and grades" },
            { icon: Calendar, text: "Check attendance records" },
            { icon: DollarSign, text: "Pay fees online securely" },
        ]
    },
    {
        name: "Faculty App",
        icon: Users,
        color: "from-purple-500 to-pink-500",
        description: "Streamline teaching workflows with powerful tools",
        features: [
            { icon: ClipboardCheck, text: "Mark attendance digitally" },
            { icon: FileText, text: "Enter assessments and grades" },
            { icon: BookOpen, text: "Share study materials" },
            { icon: Calendar, text: "Manage leave applications" },
        ]
    },
    {
        name: "Management App",
        icon: BarChart3,
        color: "from-green-500 to-emerald-500",
        description: "Real-time insights for informed decision making",
        features: [
            { icon: BarChart3, text: "View comprehensive reports" },
            { icon: DollarSign, text: "Monitor fee collection" },
            { icon: Users, text: "Track staff attendance" },
            { icon: FileText, text: "Access payroll information" },
        ]
    }
];

export default function MobileAppsShowcase() {
    return (
        <section className="py-20 px-4 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-950 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/5 via-transparent to-transparent" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white border-0 animate-pulse">
                        <Clock className="w-3 h-3 mr-1" />
                        Coming Soon
                    </Badge>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
                        Mobile Apps <span className="bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">Launching Soon</span>
                    </h2>
                    <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
                        We're working on dedicated mobile applications for students, teachers, and management. Stay tuned!
                    </p>
                </motion.div>

                {/* Coming Soon Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <Card className="border-2 border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-purple-950/50 dark:via-pink-950/50 dark:to-indigo-950/50 overflow-hidden relative">
                        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
                        <CardContent className="p-8 md:p-12 text-center relative z-10">
                            <motion.div
                                animate={{
                                    scale: [1, 1.2, 1],
                                    rotate: [0, 10, -10, 0]
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    repeatType: "reverse"
                                }}
                                className="inline-block mb-6"
                            >
                                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-2xl shadow-purple-500/50">
                                    <Sparkles className="w-10 h-10 md:w-12 md:h-12 text-white" />
                                </div>
                            </motion.div>

                            <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-4">
                                Exciting Features on the Way!
                            </h3>
                            <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-6">
                                Our mobile applications are currently in development. They will provide seamless access to all school management features on iOS and Android devices.
                            </p>

                            <div className="flex flex-wrap items-center justify-center gap-3">
                                <Badge variant="secondary" className="px-4 py-2">
                                    <Smartphone className="w-3 h-3 mr-1" />
                                    iOS & Android
                                </Badge>
                                <Badge variant="secondary" className="px-4 py-2">
                                    <Clock className="w-3 h-3 mr-1" />
                                    2024
                                </Badge>
                                <Badge variant="secondary" className="px-4 py-2">
                                    <Sparkles className="w-3 h-3 mr-1" />
                                    Premium Features
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Preview Cards - Faded/Disabled Look */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {apps.map((app, index) => {
                        const AppIcon = app.icon;
                        return (
                            <motion.div
                                key={app.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                viewport={{ once: true }}
                            >
                                <Card className="h-full border-2 border-neutral-200 dark:border-neutral-800 overflow-hidden relative group opacity-75 hover:opacity-90 transition-opacity">
                                    {/* Coming Soon Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/50 to-neutral-900/30 dark:from-neutral-950/70 dark:to-neutral-950/50 backdrop-blur-[2px] z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <Badge className="bg-gradient-to-r from-purple-500 to-pink-600 text-white border-0 text-lg px-6 py-2">
                                            <Clock className="w-4 h-4 mr-2" />
                                            Coming Soon
                                        </Badge>
                                    </div>

                                    {/* Header with gradient */}
                                    <div className={`bg-gradient-to-br ${app.color} p-8 relative overflow-hidden`}>
                                        <div className="absolute inset-0 bg-black/20"></div>
                                        <div className="relative z-10">
                                            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4">
                                                <AppIcon className="w-8 h-8 text-white" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-2">
                                                {app.name}
                                            </h3>
                                            <p className="text-white/90 text-sm">
                                                {app.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Features List */}
                                    <CardContent className="p-6">
                                        <h4 className="font-semibold text-neutral-900 dark:text-white mb-4">
                                            Planned Features:
                                        </h4>
                                        <ul className="space-y-3">
                                            {app.features.map((feature, idx) => {
                                                const FeatureIcon = feature.icon;
                                                return (
                                                    <li key={idx} className="flex items-start gap-3">
                                                        <div className={`p-1.5 rounded-lg bg-gradient-to-br ${app.color} text-white flex-shrink-0 mt-0.5`}>
                                                            <FeatureIcon className="w-3.5 h-3.5" />
                                                        </div>
                                                        <span className="text-neutral-600 dark:text-neutral-400 text-sm">
                                                            {feature.text}
                                                        </span>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Notify Me Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    viewport={{ once: true }}
                    className="mt-12 text-center"
                >
                    <Card className="border-2 border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
                        <CardContent className="p-8">
                            <h4 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                                Want to be notified when we launch?
                            </h4>
                            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                                Be the first to know when our mobile apps go live
                            </p>
                            <button className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                                Notify Me on Launch
                            </button>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </section>
    );
}
