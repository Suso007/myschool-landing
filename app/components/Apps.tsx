"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    Smartphone,
    BookOpen,
    ClipboardCheck,
    DollarSign,
    FileText,
    Calendar,
    UserCircle2,
    Users,
    Palette,
    Store,
    ShieldCheck,
    Settings,
    Check,
    LayoutDashboard,
    Monitor,
    PieChart,
    CalendarDays
} from "lucide-react";
import { Permanent_Marker, Kalam } from "next/font/google";

const markerFont = Permanent_Marker({ weight: "400", subsets: ["latin"] });
const handwrittenFont = Kalam({ weight: ["400", "700"], subsets: ["latin"] });

const appsData = [
    {
        name: "Admin Web Dashboard",
        icon: LayoutDashboard,
        type: "web", // Tells the renderer to draw a browser instead of a phone
        description: "The central command center for your institution. Manage everything from staff and students to classes, schedules, and exams with unparalleled ease.",
        features: [
            "Comprehensive student & staff records",
            "Automated scheduling & timetables",
            "Exam grading & report card generation",
            "Deep financial & operational analytics"
        ],
        themeColor: "text-rose-600",
        bgColor: "bg-rose-50",
        visualPills: [
            { icon: PieChart, text: "Analytics", top: "10%", left: "-5%", rotate: -4 },
            { icon: Users, text: "Manage Staff", bottom: "15%", right: "-10%", rotate: 6 },
            { icon: CalendarDays, text: "Schedules", top: "50%", left: "-10%", rotate: 3 }
        ]
    },
    {
        name: "Student & Parent App",
        icon: UserCircle2,
        type: "mobile",
        description: "Empower your students and their parents with instant, on-the-go access to their entire academic journey. Keep everyone aligned and informed seamlessly.",
        features: [
            "View and submit assignments directly",
            "Real-time notifications for attendance & grades",
            "Secure online fee payments with receipts",
            "Access to digital library materials"
        ],
        themeColor: "text-blue-600",
        bgColor: "bg-blue-50",
        visualPills: [
            { icon: DollarSign, text: "Fee Paid", top: "10%", left: "-10%", rotate: -6 },
            { icon: Calendar, text: "Present", bottom: "20%", right: "-15%", rotate: 8 },
            { icon: FileText, text: "A+ Grade", top: "50%", left: "-15%", rotate: -3 }
        ]
    },
    {
        name: "Faculty App",
        icon: Users,
        type: "mobile",
        description: "Equip your teachers with powerful digital tools to manage their classrooms directly from their smartphones, from anywhere on campus.",
        features: [
            "Mark digital attendance in seconds",
            "Enter assessments and publish grades",
            "Share study materials and announcements",
            "Apply for leaves and track approvals"
        ],
        themeColor: "text-emerald-600",
        bgColor: "bg-emerald-50",
        visualPills: [
            { icon: ClipboardCheck, text: "Attendance Done", top: "15%", right: "-12%", rotate: 5 },
            { icon: BookOpen, text: "Notes Uploaded", bottom: "15%", left: "-10%", rotate: -8 },
            { icon: Users, text: "Class X-B", top: "45%", right: "-15%", rotate: 4 }
        ]
    },
    {
        name: "White-Label Solution",
        icon: Palette,
        type: "mobile",
        description: "We don't just give you a generic app; we build, publish, and maintain a dedicated application under your school's exact name and branding.",
        features: [
            "Published natively on App Store & Google Play",
            "Customized with your school's logo & colors",
            "Fully managed updates and bug fixes",
            "Strict compliance with security standards"
        ],
        themeColor: "text-purple-600",
        bgColor: "bg-purple-50",
        visualPills: [
            { icon: Store, text: "App Store Live", top: "10%", left: "-5%", rotate: -5 },
            { icon: ShieldCheck, text: "Secure", bottom: "25%", right: "-10%", rotate: 6 },
            { icon: Settings, text: "Auto-Updated", top: "60%", left: "-12%", rotate: -4 }
        ]
    }
];

export default function MobileAppsShowcase() {
    return (
        <section className="py-24 px-4 relative overflow-hidden text-slate-800">

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, type: "spring" }}
                    viewport={{ once: true }}
                    className="text-center mb-24 relative"
                >
                    <div className="inline-block relative mb-6">
                        <span className={`${markerFont.className} text-[#d81b60] text-xl tracking-widest uppercase flex items-center justify-center gap-2`}>
                            <Monitor className="w-6 h-6 stroke-[2]" />
                            <Smartphone className="w-5 h-5 stroke-[2]" />
                            Cross-Platform Experience
                        </span>
                        <svg className="absolute w-full h-3 -bottom-2 left-0 text-[#d81b60]" viewBox="0 0 100 10" preserveAspectRatio="none">
                            <path d="M0 5 Q 50 10 100 2" stroke="currentColor" strokeWidth="2" fill="none" />
                        </svg>
                    </div>

                    <h2 className={`${markerFont.className} text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-slate-900`}>
                        YOUR SCHOOL, <span className="text-blue-700 underline decoration-wavy decoration-blue-300">EVERYWHERE.</span>
                    </h2>
                    <p className={`${handwrittenFont.className} text-xl md:text-2xl text-slate-700 max-w-2xl mx-auto leading-relaxed`}>
                        From a powerful web dashboard for admins to native mobile apps for parents and teachers. We have everyone covered.
                    </p>
                </motion.div>

                {/* Alternating Feature Rows */}
                <div className="space-y-16 lg:space-y-32">
                    {appsData.map((app, index) => {
                        const isEven = index % 2 === 0;
                        const AppIcon = app.icon;

                        return (
                            <div key={app.name} className={`flex flex-col gap-12 lg:gap-20 items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>

                                {/* Text Content Side (Notebook Paper Snippet) */}
                                <motion.div
                                    initial={{ opacity: 0, x: isEven ? -40 : 40, rotate: isEven ? -2 : 2 }}
                                    whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                                    transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    className="flex-1 w-full relative"
                                >
                                    <div className="relative bg-white p-8 md:p-10 shadow-lg border-2 border-slate-800 custom-wiggle-border z-10">
                                        <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-red-400 opacity-50" />

                                        <div className="pl-6 relative z-10">
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="p-3 border-2 border-slate-800 rounded-full custom-wiggle-border">
                                                    <AppIcon className={`w-8 h-8 ${app.themeColor} stroke-[2]`} />
                                                </div>
                                                <h3 className={`${markerFont.className} text-3xl md:text-4xl text-slate-900`}>
                                                    {app.name}
                                                </h3>
                                            </div>

                                            <p className={`${handwrittenFont.className} text-xl text-slate-700 leading-relaxed mb-6`}>
                                                {app.description}
                                            </p>

                                            <ul className="space-y-4">
                                                {app.features.map((feature, idx) => (
                                                    <li key={idx} className="flex items-start gap-3">
                                                        <Check className={`w-6 h-6 shrink-0 mt-1 ${app.themeColor} stroke-[2]`} />
                                                        <span className={`${handwrittenFont.className} text-lg text-slate-800 font-bold`}>
                                                            {feature}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Visual Side (Hidden on Mobile: hidden lg:flex) */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8, rotate: isEven ? 5 : -5 }}
                                    whileInView={{ opacity: 1, scale: 1, rotate: isEven ? 2 : -2 }}
                                    transition={{ duration: 0.6, type: "spring", bounce: 0.5, delay: 0.2 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    className="hidden lg:flex flex-1 w-full max-w-md xl:max-w-lg relative justify-center items-center"
                                >
                                    {app.type === "web" ? (
                                        // --- WEB DASHBOARD SKETCH ---
                                        <div className="relative w-full h-[340px] border-4 border-slate-800 rounded-xl bg-white shadow-xl custom-wiggle-border flex flex-col z-10 overflow-hidden">
                                            {/* Browser Top Bar */}
                                            <div className="h-10 border-b-4 border-slate-800 flex items-center px-4 gap-3 bg-slate-100">
                                                <div className="flex gap-1.5">
                                                    <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-800 bg-red-400"></div>
                                                    <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-800 bg-yellow-400"></div>
                                                    <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-800 bg-green-400"></div>
                                                </div>
                                                <div className="ml-4 flex-1 h-5 border-2 border-slate-800 rounded-full opacity-30 custom-wiggle-border"></div>
                                            </div>
                                            {/* Browser Content */}
                                            <div className={`flex-1 flex ${app.bgColor}`}>
                                                {/* Sidebar */}
                                                <div className="w-24 border-r-4 border-slate-800 p-4 flex flex-col gap-4 bg-white/50">
                                                    <div className="h-3 w-full bg-slate-800 rounded-full opacity-30 custom-wiggle-border"></div>
                                                    <div className="h-2 w-full bg-slate-800 rounded-full opacity-30 custom-wiggle-border"></div>
                                                    <div className="h-2 w-full bg-slate-800 rounded-full opacity-30 custom-wiggle-border"></div>
                                                    <div className="h-2 w-3/4 bg-slate-800 rounded-full opacity-30 custom-wiggle-border mt-auto"></div>
                                                </div>
                                                {/* Main Body */}
                                                <div className="flex-1 p-6 flex flex-col items-center justify-center relative">
                                                    <AppIcon className={`w-32 h-32 ${app.themeColor} opacity-40`} strokeWidth={1} />
                                                    {/* Fake graph lines */}
                                                    <div className="absolute bottom-8 left-8 right-8 flex items-end gap-2 opacity-20">
                                                        <div className="flex-1 bg-slate-800 h-12 rounded-t-sm custom-wiggle-border"></div>
                                                        <div className="flex-1 bg-slate-800 h-24 rounded-t-sm custom-wiggle-border"></div>
                                                        <div className="flex-1 bg-slate-800 h-16 rounded-t-sm custom-wiggle-border"></div>
                                                        <div className="flex-1 bg-slate-800 h-32 rounded-t-sm custom-wiggle-border"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        // --- PHONE SKETCH ---
                                        <div className="relative w-[280px] h-[580px] border-4 border-slate-800 rounded-[3rem] bg-white shadow-xl custom-wiggle-border overflow-visible flex flex-col z-10">
                                            {/* Phone Notch/Speaker */}
                                            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-3 border-2 border-slate-800 rounded-full custom-wiggle-border" />

                                            {/* Phone Screen Area */}
                                            <div className={`mt-12 mx-4 mb-4 flex-1 border-2 border-slate-800 rounded-2xl ${app.bgColor} custom-wiggle-border flex items-center justify-center relative overflow-hidden`}>
                                                <AppIcon className={`w-32 h-32 ${app.themeColor} opacity-40`} strokeWidth={1} />
                                                <div className="absolute top-8 left-4 right-4 space-y-4 opacity-30">
                                                    <div className="h-2 bg-slate-800 rounded-full w-3/4 custom-wiggle-border" />
                                                    <div className="h-2 bg-slate-800 rounded-full w-full custom-wiggle-border" />
                                                    <div className="h-2 bg-slate-800 rounded-full w-5/6 custom-wiggle-border" />
                                                </div>
                                            </div>

                                            {/* Home Button */}
                                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-12 h-12 border-2 border-slate-800 rounded-full custom-wiggle-border" />
                                        </div>
                                    )}

                                    {/* Floating "Sticky Note" Pills attached to the sketch */}
                                    {app.visualPills.map((pill, idx) => {
                                        const PillIcon = pill.icon;
                                        return (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, scale: 0 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.5 + (idx * 0.2), type: "spring", stiffness: 150 }}
                                                viewport={{ once: true }}
                                                className="absolute z-20 flex items-center gap-2 bg-[#fef08a] border-2 border-slate-800 px-3 py-2 shadow-md custom-wiggle-border"
                                                style={{
                                                    top: pill.top,
                                                    bottom: pill.bottom,
                                                    left: pill.left,
                                                    right: pill.right,
                                                    transform: `rotate(${pill.rotate}deg)`
                                                }}
                                            >
                                                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-red-500 border border-slate-800 z-30" />
                                                <PillIcon className={`w-4 h-4 ${app.themeColor} stroke-[2]`} />
                                                <span className={`${handwrittenFont.className} font-bold text-lg text-slate-800 whitespace-nowrap`}>
                                                    {pill.text}
                                                </span>
                                            </motion.div>
                                        );
                                    })}
                                </motion.div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}