"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Permanent_Marker, Kalam } from "next/font/google";
import {
    CheckCircle2,
    Clock,
    FileText,
    TrendingUp,
    CreditCard,
    Fingerprint,
    Shield,
    Zap,
    ScanFace,
    Cpu
} from "lucide-react";

// Load fonts
const markerFont = Permanent_Marker({ weight: "400", subsets: ["latin"] });
const handwrittenFont = Kalam({ weight: ["400", "700"], subsets: ["latin"] });

export default function AttendanceManagement() {
    const [activeTab, setActiveTab] = useState<"biometric" | "rfid">("biometric");

    const benefits = [
        { icon: CheckCircle2, title: "Instant Updates", description: "Real-time notifications sent to parents instantly." },
        { icon: Shield, title: "Highly Secure", description: "Tamper-proof digital data storage." },
        { icon: FileText, title: "Comprehensive", description: "Multiple report types for deep management insights." },
        { icon: Clock, title: "Time Saving", description: "Automated processes save valuable teaching time." },
        { icon: TrendingUp, title: "Discipline", description: "Better institutional accountability and tracking." },
        { icon: Zap, title: "Reliable Records", description: "Transparent, permanent records for audits." }
    ];

    const keyFeatures = [
        "Simple, user-friendly interface",
        "High accuracy with zero errors",
        "Instant report generation",
        "Cost-effective long-term solution"
    ];

    return (
        <section id="solutions" className="py-24 px-4 relative overflow-hidden font-sans">
            <div className="max-w-7xl mx-auto relative z-10">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, type: "spring" }}
                    viewport={{ once: true }}
                    className="text-center mb-20 relative"
                >
                    <div className="inline-flex items-center justify-center gap-2 mb-6">
                        <ScanFace className="w-8 h-8 text-[#d81b60]" />
                        <span className={`${markerFont.className} text-[#d81b60] text-xl tracking-widest uppercase`}>
                            Smart Attendance
                        </span>
                    </div>
                    <h2 className={`${markerFont.className} text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-slate-900`}>
                        WANT TO ELIMINATE THE <span className="text-blue-700 underline decoration-wavy decoration-blue-300">ROLL CALL ?</span>
                    </h2>
                    <p className={`${handwrittenFont.className} text-xl md:text-2xl text-slate-700 max-w-3xl mx-auto leading-relaxed`}>
                        Automated attendance tracking that eliminates manual errors and provides real-time insights for your institution.
                    </p>
                </motion.div>

                {/* Main 2-Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-24 items-stretch">

                    {/* Left Column: THE CHALKBOARD (Spans 7) */}
                    <motion.div
                        initial={{ opacity: 0, x: -40, rotate: -2 }}
                        whileInView={{ opacity: 1, x: 0, rotate: -1 }}
                        transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="lg:col-span-7"
                    >
                        {/* Chalkboard Frame & Texture */}
                        <div className="h-full bg-[#1e293b] rounded-xl border-[12px] border-[#334155] p-8 md:p-10 shadow-2xl relative overflow-hidden">
                            {/* Faint chalk dust texture overlay */}
                            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                            }} />

                            {/* Faded Background Icon */}
                            <Fingerprint className="absolute -right-10 -bottom-10 w-64 h-64 text-slate-700 opacity-30 rotate-12" />

                            <div className="relative z-10 flex flex-col h-full">
                                <h3 className={`${markerFont.className} text-3xl md:text-4xl text-white mb-6 flex items-center gap-4`}>
                                    <span className="text-[#fce96a]">What is it?</span>
                                </h3>

                                <div className={`${handwrittenFont.className} text-xl text-slate-300 leading-relaxed space-y-6 mb-10`}>
                                    <p>
                                        A digital platform that automates the entire tracking process. It helps educational institutions record, monitor, and manage attendance with high accuracy and <span className="text-[#a7f3d0] font-bold">minimum human intervention</span>.
                                    </p>
                                    <p>
                                        Traditional methods consume valuable teaching time and are prone to errors. Our system generates quick, customizable reports instantly.
                                    </p>
                                </div>

                                {/* Chalk-drawn Features List */}
                                <div className="mt-auto">
                                    <h4 className={`${markerFont.className} text-2xl text-[#fbcfe8] mb-4`}>Key Features:</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {keyFeatures.map((feature, index) => (
                                            <div key={index} className="flex items-start gap-3">
                                                <CheckCircle2 className="w-6 h-6 text-[#a7f3d0] shrink-0 stroke-[2]" />
                                                <span className={`${handwrittenFont.className} text-lg text-slate-200`}>{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: THE MANILA FOLDER (Spans 5) */}
                    <motion.div
                        initial={{ opacity: 0, x: 40, rotate: 2 }}
                        whileInView={{ opacity: 1, x: 0, rotate: 1 }}
                        transition={{ duration: 0.6, type: "spring", bounce: 0.4, delay: 0.2 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="lg:col-span-5 flex flex-col pt-4 md:pt-8"
                    >
                        {/* Folder Header/Tabs Area */}
                        <div className="flex px-4 relative z-10 -mb-[2px]">
                            {/* Tab 1 */}
                            <button
                                onClick={() => setActiveTab("biometric")}
                                className={`px-6 py-3 rounded-t-xl border-t-2 border-l-2 border-r-2 border-[#b45309] font-bold transition-colors ${activeTab === "biometric" ? "bg-[#fef3c7] text-[#92400e] z-20 pb-4" : "bg-[#fde68a] text-[#b45309]/70 mt-2 z-0 hover:bg-[#fef3c7]"}`}
                            >
                                <span className={`${markerFont.className} text-lg tracking-wide`}>Biometric</span>
                            </button>
                            {/* Tab 2 */}
                            <button
                                onClick={() => setActiveTab("rfid")}
                                className={`px-6 py-3 rounded-t-xl border-t-2 border-l-2 border-r-2 border-[#b45309] font-bold transition-colors -ml-2 ${activeTab === "rfid" ? "bg-[#fef3c7] text-[#92400e] z-20 pb-4" : "bg-[#fde68a] text-[#b45309]/70 mt-2 z-0 hover:bg-[#fef3c7]"}`}
                            >
                                <span className={`${markerFont.className} text-lg tracking-wide`}>RFID System</span>
                            </button>
                        </div>

                        {/* Folder Body */}
                        <div className="flex-1 bg-[#fef3c7] border-2 border-[#b45309] rounded-b-2xl rounded-tr-2xl p-8 shadow-xl relative">
                            {/* Top Silver Clip (Clipboard element) */}
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-gradient-to-b from-slate-200 to-slate-400 border border-slate-500 rounded-full shadow-md z-30 flex items-center justify-center">
                                <div className="w-16 h-1 bg-slate-600/30 rounded-full"></div>
                            </div>

                            <h3 className={`${markerFont.className} text-2xl text-[#92400e] flex items-center gap-3 mb-6 mt-2`}>
                                <Cpu className="w-6 h-6 stroke-[2]" />
                                How Does It Work?
                            </h3>

                            <AnimatePresence mode="wait">
                                {activeTab === "biometric" ? (
                                    <motion.div
                                        key="bio"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-3 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[#d97706] before:to-transparent">
                                            {[
                                                "Data (fingerprint/face) is securely captured during registration.",
                                                "Biometric readers are installed at main access points.",
                                                "Students place their finger or show face to mark attendance.",
                                                "System authenticates identity, eliminating duplicate attendance."
                                            ].map((text, i) => (
                                                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                                    <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-[#d97706] bg-[#fef3c7] text-[#92400e] font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                                                        {i + 1}
                                                    </div>
                                                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)]">
                                                        <p className={`${handwrittenFont.className} text-lg text-[#92400e] leading-tight`}>{text}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="rfid"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-3 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[#d97706] before:to-transparent">
                                            {[
                                                "Each student receives a unique RFID card with encoded details.",
                                                "RFID readers are placed at classroom entrances or gates.",
                                                "When a student taps their card, attendance is recorded instantly.",
                                                "The system logs exact entry and exit times for accurate tracking."
                                            ].map((text, i) => (
                                                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                                    <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-[#d97706] bg-[#fef3c7] text-[#92400e] font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                                                        {i + 1}
                                                    </div>
                                                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)]">
                                                        <p className={`${handwrittenFont.className} text-lg text-[#92400e] leading-tight`}>{text}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>

                </div>

                {/* Bottom Section: CARDLESS BENEFITS */}
                <div className="pt-8 border-t-2 border-slate-300/50 border-dashed">
                    <h3 className={`${markerFont.className} text-3xl text-center text-slate-800 mb-12`}>
                        Why Upgrade?
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
                        {benefits.map((benefit, index) => {
                            const Icon = benefit.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="flex items-start gap-6 group"
                                >
                                    {/* Hand-drawn Icon Wrapper instead of a card */}
                                    <div className="relative shrink-0 flex items-center justify-center w-16 h-16">
                                        {/* Scribbled animated circle SVG */}
                                        <svg className="absolute inset-0 w-full h-full text-[#d81b60] opacity-50 group-hover:opacity-100 group-hover:rotate-45 transition-all duration-500" viewBox="0 0 100 100">
                                            <path
                                                d="M 50,5 C 75,7 95,25 92,50 C 90,75 70,95 45,92 C 20,90 5,70 8,45 C 10,20 30,5 50,5 Z"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            />
                                            <path
                                                d="M 48,8 C 70,12 88,30 85,55 C 82,80 60,90 38,85 C 15,80 8,55 12,35 C 15,15 30,8 48,8 Z"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                opacity="0.5"
                                            />
                                        </svg>
                                        <Icon className="w-7 h-7 text-blue-800 relative z-10 group-hover:scale-110 transition-transform" />
                                    </div>

                                    {/* Text floating on the background */}
                                    <div>
                                        <h4 className={`${markerFont.className} text-2xl text-slate-900 mb-2`}>
                                            {benefit.title}
                                        </h4>
                                        <p className={`${handwrittenFont.className} text-lg text-slate-700 leading-snug`}>
                                            {benefit.description}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </section>
    );
}