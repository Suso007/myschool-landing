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
        description: "Manage admissions, track fees, automate invoices, and generate reports easily.",
        badge: "Core Module"
    },
    {
        icon: GraduationCap,
        title: "Academic & Examination",
        description: "Track attendance, allocate subjects, manage exams, and share progress cards.",
        badge: "Essential"
    },
    {
        icon: BookOpen,
        title: "Learning & Course Management",
        description: "Upload syllabi, share materials, and keep students updated with learning content.",
        badge: "Core Module"
    },
    {
        icon: FingerprintIcon,
        title: "Attendance & Leave",
        description: "Simple and effective attendance and leave tracking with automated reporting.",
        badge: "Essential"
    },
    {
        icon: Bus,
        title: "Transport & Hostel",
        description: "Monitor transport routes and hostel accommodations securely in real-time.",
        badge: "Logistics"
    },
    {
        icon: Library,
        title: "Library Management",
        description: "Simplify book issuing, tracking, and returns with barcode integration.",
        badge: "Operations"
    },
    {
        icon: Users,
        title: "HR & Payroll Automation",
        description: "Streamline staff appointments, leave, payroll, and attendance in one dashboard.",
        badge: "Administration"
    },
    {
        icon: Smartphone,
        title: "Mobile Applications",
        description: "Dedicated apps for real-time access to assignments, attendance, and reports.",
        badge: "All Platforms"
    },
];

// Pre-calculated animation data to prevent hydration errors from Math.random()
// This pulls all cards towards the center initially, then scatters them with slight rotations
const scatterAnimationData = [
    { initX: 150, initY: 150, initRot: -20, finalY: -10, finalRot: -2 },
    { initX: 50, initY: 150, initRot: 15, finalY: 30, finalRot: 3 },
    { initX: -50, initY: 150, initRot: -10, finalY: -15, finalRot: -3 },
    { initX: -150, initY: 150, initRot: 25, finalY: 40, finalRot: 2 },
    { initX: 150, initY: -150, initRot: 10, finalY: -5, finalRot: 1 },
    { initX: 50, initY: -150, initRot: -25, finalY: 25, finalRot: -2 },
    { initX: -50, initY: -150, initRot: 20, finalY: -20, finalRot: 4 },
    { initX: -150, initY: -150, initRot: -15, finalY: 35, finalRot: -1 },
];

export default function ErpFeaturesGrid() {
    return (
        <section className="py-8 px-4 bg-background overflow-hidden relative">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-center mb-24 relative z-10"
                >
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-6 tracking-tight">
                        Everything you need in one place
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Everything your institution needs to operate efficiently, unified into one intelligent platform.
                    </p>
                </motion.div>

                {/* Scattered Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-center place-items-center">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        const animData = scatterAnimationData[index];

                        return (
                            <motion.div
                                key={feature.title}
                                className="w-full max-w-[320px]"
                                initial={{
                                    opacity: 0,
                                    scale: 0.5,
                                    x: animData.initX,
                                    y: animData.initY,
                                    rotate: animData.initRot
                                }}
                                whileInView={{
                                    opacity: 1,
                                    scale: 1,
                                    x: 0,
                                    y: animData.finalY,
                                    rotate: animData.finalRot
                                }}
                                transition={{
                                    type: "spring",
                                    damping: 15,
                                    stiffness: 70,
                                    mass: 1,
                                    delay: index * 0.05 // Slight stagger for the explosion effect
                                }}
                                viewport={{ once: true, margin: "-50px" }}
                                whileHover={{
                                    y: animData.finalY - 10,
                                    rotate: 0,
                                    scale: 1.02,
                                    transition: { duration: 0.2, type: "tween" }
                                }}
                            >
                                <Card className="h-[280px] flex flex-col justify-between border-border bg-card hover:shadow-[0_0_40px_-10px_hsl(var(--primary)/0.15)] hover:border-primary/40 transition-colors duration-300 relative group overflow-hidden cursor-default">
                                    {/* Subtle internal glow matching the previous bento designs */}
                                    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    <CardHeader className="p-6 pb-2">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300 shadow-sm">
                                                <Icon className="w-6 h-6" />
                                            </div>
                                            <Badge variant="secondary" className="text-[10px] uppercase tracking-wider font-semibold bg-muted text-muted-foreground border-border">
                                                {feature.badge}
                                            </Badge>
                                        </div>
                                        <CardTitle className="text-xl font-bold text-foreground leading-tight">
                                            {feature.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-6 pt-2 mt-auto">
                                        <CardDescription className="text-muted-foreground leading-relaxed text-sm">
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