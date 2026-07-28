"use client";

import React, { useState } from "react";
import {
    Search,
    LineChart,
    Fingerprint,
    IndianRupee,
    Paperclip,
    PenTool,
    Backpack,
    GraduationCap,
    BookOpen,
    Bus,
    Library,
    Users,
    Smartphone
} from "lucide-react";
import { Permanent_Marker, Kalam } from "next/font/google";
import { motion } from "framer-motion";

// Load fonts
const markerFont = Permanent_Marker({ weight: "400", subsets: ["latin"] });
const handwrittenFont = Kalam({ weight: ["400", "700"], subsets: ["latin"] });

// Unified Data Array with specific analog "themes" for the Scrapbook Bento look
const allFeatures = [
    {
        id: "onboard",
        title: "Student Onboard",
        desc: "Streamline admissions with digital forms and automated workflows.",
        icon: Paperclip,
        style: "sticky",
        color: "bg-[#fce96a]",
        shadow: "bg-[#d4c24d]",
        rotate: -2,
        colSpan: "md:col-span-1 lg:col-span-1",
        isUpcoming: false,
        interactive: true,
    },
    {
        id: "analytics",
        title: "Real-time Analytics",
        desc: "Empower your administration with the live data needed to optimize strategies, track growth, and adapt quickly.",
        icon: LineChart,
        style: "graph",
        rotate: 1,
        colSpan: "md:col-span-2 lg:col-span-2", // Wider card
        isUpcoming: false,
    },
    {
        id: "fees",
        title: "Fees Collection",
        desc: "Automate fee tracking and provide secure payment gateways.",
        icon: IndianRupee,
        style: "sticky",
        color: "bg-[#a7f3d0]",
        shadow: "bg-[#6ee7b7]",
        rotate: 2,
        colSpan: "md:col-span-1 lg:col-span-1",
        isUpcoming: false,
    },
    {
        id: "attendance",
        title: "Attendance & Leave",
        desc: "Simple daily attendance tracking with automated reporting.",
        icon: Fingerprint,
        style: "sticky",
        color: "bg-[#fbcfe8]",
        shadow: "bg-[#f472b6]",
        rotate: -3,
        colSpan: "md:col-span-1 lg:col-span-1",
        isUpcoming: false,
    },
    {
        id: "academic",
        title: "Academic & Exam",
        desc: "Track attendance, allocate subjects, manage exams, and share progress cards seamlessly.",
        icon: GraduationCap,
        style: "flashcard",
        rotate: 1,
        colSpan: "md:col-span-1 lg:col-span-1",
        isUpcoming: false,
    },
    {
        id: "hr",
        title: "HR & Payroll",
        desc: "Streamline staff appointments, leave, payroll, and attendance.",
        icon: Users,
        style: "flashcard",
        rotate: -2,
        colSpan: "md:col-span-1 lg:col-span-1",
        isUpcoming: true,
    },
    {
        id: "transport",
        title: "Transport & Hostel",
        desc: "Monitor transport routes and hostel accommodations securely in real-time.",
        icon: Bus,
        style: "flashcard",
        rotate: 3,
        colSpan: "md:col-span-1 lg:col-span-1",
        isUpcoming: true,
    },
    {
        id: "library",
        title: "Library Management",
        desc: "Simplify book issuing, tracking, and returns with barcode integration.",
        icon: Library,
        style: "flashcard",
        rotate: -1,
        colSpan: "md:col-span-1 lg:col-span-1",
        isUpcoming: true,
    },
    {
        id: "course",
        title: "Learning & Course",
        desc: "Upload syllabi, share materials, and keep students updated with learning content.",
        icon: BookOpen,
        style: "flashcard",
        rotate: 2,
        colSpan: "md:col-span-1 lg:col-span-1",
        isUpcoming: true,
    },
    {
        id: "mobile",
        title: "Mobile Applications",
        desc: "Dedicated cross-platform apps for parents, teachers, and students to access real-time data anywhere.",
        icon: Smartphone,
        style: "graph", // Reusing the graph paper style for a wide bottom capstone
        rotate: -1,
        colSpan: "md:col-span-2 lg:col-span-2",
        isUpcoming: false,
    },
];

export default function FeaturesSection() {

    return (
        <section id="features" className="py-24 relative font-sans text-slate-800 overflow-hidden">

            <div className="container px-4 md:px-6 mx-auto max-w-7xl relative z-10">

                {/* Section Header (Scroll Animated) */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                    className="flex flex-col items-center justify-center text-center space-y-6 mb-20 relative"
                >
                    {/* Taped "Label" */}
                    <div className="relative inline-flex items-center bg-white border-2 border-slate-800 px-6 py-2 transform -rotate-2 custom-wiggle-border shadow-sm">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-[#e2e8f0] opacity-80 rotate-3 border border-slate-300" />
                        <span className={`${markerFont.className} text-[#d81b60] tracking-widest uppercase`}>
                            The Ecosystem
                        </span>
                    </div>

                    <h2 className={`${markerFont.className} text-4xl md:text-5xl lg:text-6xl text-slate-900 max-w-4xl leading-tight`}>
                        EVERYTHING YOU NEED <br className="hidden md:block" /> IN ONE WORKSPACE
                    </h2>
                    <p className={`${handwrittenFont.className} max-w-2xl text-blue-800 text-xl md:text-2xl font-bold leading-relaxed`}>
                        A unified, intelligent platform to manage students, staff, and operations effortlessly.
                    </p>
                </motion.div>

                {/* The Asymmetrical Scrapbook Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 auto-rows-auto">
                    {allFeatures.map((feature, index) => {
                        const Icon = feature.icon;

                        return (
                            <motion.div
                                key={feature.id}
                                className={`w-full ${feature.colSpan} h-full flex`}
                                // THE SCROLL EFFECT: Cards start 100px lower and invisible. 
                                // As you scroll down, they spring up one by one.
                                initial={{ opacity: 0, y: 100, rotate: feature.rotate * 2 }}
                                whileInView={{ opacity: 1, y: 0, rotate: feature.rotate }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{
                                    duration: 0.6,
                                    type: "spring",
                                    bounce: 0.3,
                                    delay: (index % 4) * 0.1 // Staggers them slightly if they appear on screen at the same time
                                }}
                                whileHover={{
                                    scale: 1.03,
                                    rotate: 0,
                                    zIndex: 20,
                                    transition: { duration: 0.2 }
                                }}
                            >

                                {/* RENDER LOGIC: Switch between Analog Styles based on feature.style */}

                                {/* STYLE 1: The Sticky Note */}
                                {feature.style === "sticky" && (
                                    <div className={`relative w-full p-8 shadow-md flex flex-col min-h-[280px] ${feature.color}`} style={{
                                        clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)'
                                    }}>
                                        <div className={`absolute bottom-0 right-0 w-[20px] h-[20px] ${feature.shadow} shadow-sm`} />
                                        <Icon className="w-10 h-10 text-slate-800/60 mb-4 stroke-[2]" />
                                        <h3 className={`${markerFont.className} text-3xl mb-3 text-slate-800`}>{feature.title}</h3>
                                        <p className={`${handwrittenFont.className} text-slate-800/80 text-xl leading-relaxed flex-grow`}>
                                            {feature.desc}
                                        </p>

                                        {/* Optional Interactive Element (Just for the Onboard card) */}
                                        {/* {feature.interactive && (
                                            <form onSubmit={(e) => { e.preventDefault(); }} className="mt-6 relative flex items-end group">
                                                <input
                                                    type="text"
                                                    value={studentInput}
                                                    onChange={(e) => setStudentInput(e.target.value)}
                                                    placeholder="Try it: Enter ID..."
                                                    className={`${handwrittenFont.className} w-full bg-transparent border-b-2 border-slate-800/40 border-dashed text-slate-900 text-xl focus:outline-none focus:border-solid pb-1 pr-10 placeholder:text-slate-800/50`}
                                                />
                                                <button type="submit" className="absolute right-0 bottom-1 text-[#d81b60] hover:scale-110 transition-transform">
                                                    <Search className="w-6 h-6 stroke-[2]" />
                                                </button>
                                            </form>
                                        )} */}
                                    </div>
                                )}

                                {/* STYLE 2: Graph Paper Wide Card */}
                                {feature.style === "graph" && (
                                    <div className="relative w-full p-8 shadow-md border border-slate-300 bg-[#f8fafc] flex flex-col min-h-[280px]" style={{
                                        backgroundImage: 'linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)',
                                        backgroundSize: '20px 20px'
                                    }}>
                                        {/* Pushpin */}
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-500 shadow-md border border-red-700 z-20">
                                            <div className="absolute top-1 left-1 w-1 h-1 bg-white rounded-full opacity-50" />
                                        </div>

                                        <div className="relative z-10 bg-white/90 p-6 rounded-xl border border-slate-300 backdrop-blur-sm h-full flex flex-col md:flex-row md:items-center gap-6">
                                            <div className="p-4 bg-slate-100 rounded-lg shrink-0">
                                                <Icon className="w-12 h-12 text-[#d81b60] stroke-[1.5]" />
                                            </div>
                                            <div>
                                                <h3 className={`${markerFont.className} text-3xl mb-2 text-slate-800 leading-tight`}>{feature.title}</h3>
                                                <p className={`${handwrittenFont.className} text-slate-700 text-xl leading-relaxed`}>
                                                    {feature.desc}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* STYLE 3: Index Flashcard */}
                                {feature.style === "flashcard" && (
                                    <div className="relative w-full h-[260px] flex flex-col border-2 border-slate-800 bg-white p-6 overflow-visible custom-wiggle-border shadow-md">
                                        {/* Blue ruled lines */}
                                        <div className="absolute inset-0 pointer-events-none opacity-20" style={{
                                            backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, #3b82f6 27px, #3b82f6 28px)',
                                            backgroundPositionY: '40px'
                                        }} />
                                        {/* Red Margin line */}
                                        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-red-400 opacity-50" />

                                        {/* UPCOMING Stamp */}
                                        {feature.isUpcoming && (
                                            <div className={`${markerFont.className} absolute -top-4 -right-4 border-2 border-red-500 text-red-500 bg-white/90 backdrop-blur-sm px-3 py-1 text-sm rotate-12 z-20 shadow-sm rounded`}>
                                                UPCOMING
                                            </div>
                                        )}

                                        <div className="pl-6 relative z-10 flex-grow flex flex-col">
                                            <Icon className="w-8 h-8 text-blue-700 stroke-[1.5] mb-4" />
                                            <h3 className={`${markerFont.className} text-2xl text-slate-900 leading-tight mb-2`}>
                                                {feature.title}
                                            </h3>
                                            <p className={`${handwrittenFont.className} text-slate-700 leading-relaxed text-lg mt-auto`}>
                                                {feature.desc}
                                            </p>
                                        </div>
                                    </div>
                                )}

                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}