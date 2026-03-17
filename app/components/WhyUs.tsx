"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Cloud,
    Shield,
    Settings,
    Zap,
    HeadphonesIcon,
    GraduationCap,
    ArrowRight,
    Loader2,
    Check
} from "lucide-react";
import { Permanent_Marker, Kalam } from "next/font/google";

const markerFont = Permanent_Marker({ weight: "400", subsets: ["latin"] });
const handwrittenFont = Kalam({ weight: ["400", "700"], subsets: ["latin"] });

// Extended data with specific analog styles for the collage
const reasons = [
    {
        icon: GraduationCap,
        title: "Built for Indian Schools",
        description: "Specifically designed for CBSE, ICSE, and State Board institutions with localized features.",
        badges: ["CBSE", "ICSE", "State Board"],
        style: "index-card",
        rotate: -2,
        tape: "top-center"
    },
    {
        icon: Cloud,
        title: "Cloud-Based Access",
        description: "Access your school data anytime, anywhere with our secure cloud infrastructure. No servers needed.",
        badges: ["24/7 Access", "Secure"],
        style: "graph-paper",
        rotate: 3,
        pin: "top-right"
    },
    {
        icon: Shield,
        title: "Data Security & Privacy",
        description: "Enterprise-grade security with encrypted storage, regular backups, and strict compliance.",
        badges: ["Encrypted", "Compliant"],
        style: "pink-sticky",
        rotate: -4,
        fold: true
    },
    {
        icon: Settings,
        title: "Fully Customizable",
        description: "Adapt the platform to your institution's unique workflows. Flexible configuration options available.",
        badges: ["Flexible", "Scalable"],
        style: "yellow-sticky",
        rotate: 2,
        fold: true
    },
    {
        icon: Zap,
        title: "Fast Implementation",
        description: "Get up and running quickly with our streamlined setup process and comprehensive training.",
        badges: ["Quick Setup", "Training"],
        style: "blue-scrap",
        rotate: -1,
        tape: "top-left"
    },
    {
        icon: HeadphonesIcon,
        title: "Ongoing Support",
        description: "Dedicated support team ready to assist. Regular updates, bug fixes, and enhancements included.",
        badges: ["24/7 Support", "Updates"],
        style: "green-sticky",
        rotate: 4,
        fold: true
    }
];

// add preferable time slot..

export default function WhyChooseSection() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        preferredTimeSlot: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Map your React state to exactly match what the API route expects
            const payload = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                preferredtimeslot: formData.preferredTimeSlot,
            };

            // Send the request to your Next.js API route
            await axios.post('/api/demoSchedule', payload);

            // On success: Clear the form and close the modal/dialog
            setFormData({ name: "", phone: "", email: "", preferredTimeSlot: "" });
            setIsDialogOpen(false);

            // Tip: You can trigger a success toast notification here

        } catch (error) {
            console.error("Error submitting form:", error);

            // Tip: You can trigger an error toast notification here 
            // alert("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="py-24 px-4 relative overflow-hidden text-slate-800">
            <div className="max-w-7xl mx-auto relative z-10">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, type: "spring" }}
                    viewport={{ once: true }}
                    className="text-center mb-20 relative"
                >
                    <div className="relative inline-block mb-4">
                        <div className="absolute inset-0 bg-[#fef08a] transform -rotate-2 -skew-x-12 scale-110 z-0 opacity-70"></div>
                        <h2 className={`${markerFont.className} text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 relative z-10 px-4 py-2`}>
                            WHY SCHOOLS TRUST US
                        </h2>
                    </div>
                    <p className={`${handwrittenFont.className} text-xl md:text-2xl text-slate-700 max-w-2xl mx-auto mt-6 leading-relaxed`}>
                        Built with modern institutions in mind, designed for maximum efficiency, and tailored to scale with your growth.
                    </p>
                </motion.div>

                {/* Scrapbook Collage Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14 mb-24">
                    {reasons.map((reason, index) => {
                        const Icon = reason.icon;
                        return (
                            <motion.div
                                key={reason.title}
                                initial={{ opacity: 0, scale: 0.8, rotate: reason.rotate * 3 }}
                                whileInView={{ opacity: 1, scale: 1, rotate: reason.rotate }}
                                transition={{ duration: 0.5, delay: index * 0.1, type: "spring", bounce: 0.4 }}
                                viewport={{ once: true, margin: "-50px" }}
                                whileHover={{ scale: 1.05, rotate: 0, zIndex: 30, transition: { duration: 0.2 } }}
                                className="relative flex"
                            >
                                {/* Style 1: Index Card */}
                                {reason.style === "index-card" && (
                                    <div className="w-full bg-white p-6 shadow-md border-2 border-slate-800 custom-wiggle-border flex flex-col relative min-h-[300px]">
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-6 bg-white/50 border border-slate-300 shadow-sm rotate-2 z-20 backdrop-blur-sm" />
                                        <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-red-400 opacity-50" />
                                        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, #3b82f6 27px, #3b82f6 28px)', backgroundPositionY: '40px' }} />

                                        <div className="relative z-10 pl-6 flex flex-col h-full">
                                            <Icon className="w-10 h-10 text-slate-800 mb-4 stroke-[1.5]" />
                                            <h3 className={`${markerFont.className} text-2xl text-slate-900 mb-2`}>{reason.title}</h3>
                                            <p className={`${handwrittenFont.className} text-lg text-slate-700 mb-4 flex-grow`}>{reason.description}</p>
                                            <div className="flex flex-wrap gap-2">
                                                {reason.badges.map(b => <span key={b} className={`${handwrittenFont.className} text-sm font-bold text-blue-800 border border-blue-800 rounded px-2 py-0.5 transform -rotate-1`}>{b}</span>)}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Style 2: Graph Paper */}
                                {reason.style === "graph-paper" && (
                                    <div className="w-full bg-[#f8fafc] p-8 shadow-md border border-slate-300 flex flex-col relative min-h-[300px]" style={{ backgroundImage: 'linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
                                        <div className="absolute -top-3 right-6 w-4 h-4 rounded-full bg-red-600 shadow-md border border-red-800 z-20"><div className="absolute top-1 left-1 w-1 h-1 bg-white rounded-full opacity-60" /></div>

                                        <div className="relative z-10 bg-white/80 p-5 border border-slate-300 backdrop-blur-sm flex flex-col h-full">
                                            <Icon className="w-10 h-10 text-blue-600 mb-4 stroke-[1.5]" />
                                            <h3 className={`${markerFont.className} text-2xl text-slate-900 mb-2`}>{reason.title}</h3>
                                            <p className={`${handwrittenFont.className} text-lg text-slate-700 mb-4 flex-grow`}>{reason.description}</p>
                                            <div className="flex flex-wrap gap-2">
                                                {reason.badges.map(b => <span key={b} className={`${markerFont.className} text-xs text-red-600 uppercase`}>#{b}</span>)}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Style 3: Colored Sticky Notes */}
                                {(reason.style.includes("sticky")) && (
                                    <div className={`w-full p-8 shadow-md flex flex-col relative min-h-[300px] ${reason.style === "pink-sticky" ? "bg-[#fbcfe8]" :
                                        reason.style === "yellow-sticky" ? "bg-[#fce96a]" : "bg-[#a7f3d0]"
                                        }`} style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)' }}>
                                        <div className={`absolute bottom-0 right-0 w-[20px] h-[20px] shadow-sm ${reason.style === "pink-sticky" ? "bg-[#f472b6]" :
                                            reason.style === "yellow-sticky" ? "bg-[#d4c24d]" : "bg-[#6ee7b7]"
                                            }`} />

                                        <Icon className="w-10 h-10 text-slate-800/70 mb-4 stroke-[2]" />
                                        <h3 className={`${markerFont.className} text-3xl text-slate-900 mb-3`}>{reason.title}</h3>
                                        <p className={`${handwrittenFont.className} text-xl text-slate-800/80 mb-4 flex-grow leading-snug`}>{reason.description}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {reason.badges.map(b => <span key={b} className={`${handwrittenFont.className} text-sm font-bold text-slate-900 underline decoration-wavy opacity-70`}>{b}</span>)}
                                        </div>
                                    </div>
                                )}

                                {/* Style 4: Torn Blue Scrap */}
                                {reason.style === "blue-scrap" && (
                                    <div className="w-full bg-[#eff6ff] p-8 shadow-md border-t-4 border-slate-800 flex flex-col relative min-h-[300px]">
                                        <div className="absolute -top-4 left-6 w-12 h-6 bg-white/40 border border-slate-300 shadow-sm -rotate-6 z-20 backdrop-blur-sm" />
                                        <div className="absolute bottom-[-10px] left-0 right-0 h-[10px]" style={{ backgroundImage: 'linear-gradient(135deg, transparent 50%, #eff6ff 50%), linear-gradient(45deg, transparent 50%, #eff6ff 50%)', backgroundSize: '20px 20px', backgroundPosition: 'left bottom', transform: 'rotate(180deg)' }} />

                                        <Icon className="w-10 h-10 text-[#d81b60] mb-4 stroke-[1.5]" />
                                        <h3 className={`${markerFont.className} text-2xl text-slate-900 mb-2`}>{reason.title}</h3>
                                        <p className={`${handwrittenFont.className} text-lg text-slate-700 mb-4 flex-grow`}>{reason.description}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {reason.badges.map(b => <span key={b} className="text-xs font-mono font-bold text-blue-700 bg-blue-100 px-2 py-1 rounded">{b}</span>)}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>

                <div className="w-full flex justify-center mb-24 opacity-40">
                    <svg width="200" height="20" viewBox="0 0 200 20" fill="none">
                        <path d="M10 10 Q 50 20 100 10 T 190 10" stroke="#1e293b" strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray="1 10" />
                    </svg>
                </div>

                {/* Giant Drawn CTA Box */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto relative"
                >
                    <div className="absolute inset-0 border-4 border-slate-800 rounded-2xl transform rotate-1 custom-wiggle-border"></div>
                    <div className="absolute inset-0 border-2 border-[#d81b60] rounded-2xl transform -rotate-1 custom-wiggle-border"></div>

                    <div className="relative bg-white/80 backdrop-blur-md p-10 md:p-14 text-center rounded-2xl flex flex-col items-center">
                        <h3 className={`${markerFont.className} text-3xl md:text-4xl text-slate-900 mb-4`}>
                            READY TO TRANSFORM YOUR SCHOOL?
                        </h3>
                        <p className={`${handwrittenFont.className} text-xl text-slate-700 mb-8 max-w-xl font-bold`}>
                            Join us to automate your workflows, empower your staff, and delight your parents.
                        </p>

                        <button
                            onClick={() => setIsDialogOpen(true)}
                            className={`${markerFont.className} group relative px-10 py-4 bg-[#d81b60] text-white text-xl md:text-2xl shadow-lg transition-transform hover:scale-105 hover:-rotate-2 custom-wiggle-border flex items-center gap-3`}
                        >
                            <span className="relative z-10">SCHEDULE DEMO</span>
                            <ArrowRight className="w-6 h-6 stroke-[3] group-hover:translate-x-2 transition-transform relative z-10" />
                        </button>
                    </div>
                </motion.div>

                {/* "Registration Form" Modal */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="
                        !w-screen !h-[100dvh] !max-w-none !left-0 !top-0 !translate-x-0 !translate-y-0 !border-0 !rounded-none !m-0
                        md:!w-[420px] md:!h-auto md:!max-h-[90vh] md:!top-[50%] md:!-translate-y-1/2 md:!left-auto md:!right-[8%] lg:!right-[12%] xl:!right-[15%] md:!translate-x-0 md:!border-4 md:!rounded-2xl
                        overflow-y-auto bg-[#fffdf0] border-slate-800 md:custom-wiggle-border p-6 pt-16 md:p-8 md:pt-12 shadow-2xl flex flex-col">

                        {/* Clip at top of clipboard */}
                        <div className="absolute top-0 md:-top-4 left-1/2 -translate-x-1/2 w-24 h-6 md:h-8 bg-slate-300 border-x-2 border-b-2 md:border-2 border-slate-800 rounded-b-md md:rounded-md shadow-sm z-50 flex items-center justify-center">
                            <div className="w-12 h-1.5 md:h-2 bg-slate-800 rounded-full opacity-50"></div>
                        </div>

                        <DialogHeader className="border-b-2 border-slate-800 border-dashed pb-4 shrink-0 mt-4 md:mt-0">
                            <DialogTitle className={`${markerFont.className} text-3xl text-slate-900 text-center`}>
                                DEMO REQUEST FORM
                            </DialogTitle>
                            <DialogDescription className={`${handwrittenFont.className} text-lg text-slate-600 text-center`}>
                                Please fill in your details below.
                            </DialogDescription>
                        </DialogHeader>

                        {/* Form body */}
                        <form onSubmit={handleSubmit} className="flex-1 flex flex-col space-y-6 mt-6 pb-6">

                            <div className="relative flex flex-col gap-1">
                                <label htmlFor="name" className={`${handwrittenFont.className} text-xl font-bold text-slate-800`}>Name:</label>
                                <input
                                    type="text" id="name" name="name" required value={formData.name} onChange={handleInputChange}
                                    className={`${handwrittenFont.className} w-full text-xl text-blue-800 bg-transparent border-b-2 border-slate-400 border-dashed focus:border-slate-800 focus:border-solid focus:outline-none px-2 py-2 placeholder:text-slate-400`}
                                    placeholder="Jane Doe"
                                />
                            </div>

                            <div className="relative flex flex-col gap-1">
                                <label htmlFor="email" className={`${handwrittenFont.className} text-xl font-bold text-slate-800`}>Email:</label>
                                <input
                                    type="email" id="email" name="email" required value={formData.email} onChange={handleInputChange}
                                    className={`${handwrittenFont.className} w-full text-xl text-blue-800 bg-transparent border-b-2 border-slate-400 border-dashed focus:border-slate-800 focus:border-solid focus:outline-none px-2 py-2 placeholder:text-slate-400`}
                                    placeholder="principal@school.edu"
                                />
                            </div>

                            <div className="relative flex flex-col gap-1">
                                <label htmlFor="phone" className={`${handwrittenFont.className} text-xl font-bold text-slate-800`}>Phone:</label>
                                <input
                                    type="tel" id="phone" name="phone" required value={formData.phone} onChange={handleInputChange}
                                    className={`${handwrittenFont.className} w-full text-xl text-blue-800 bg-transparent border-b-2 border-slate-400 border-dashed focus:border-slate-800 focus:border-solid focus:outline-none px-2 py-2 placeholder:text-slate-400`}
                                    placeholder="98765 43210"
                                />
                            </div>

                            <div className="relative flex flex-col gap-1">
                                <label htmlFor="preferredTimeSlot" className={`${handwrittenFont.className} text-lg md:text-xl text-slate-800 font-bold`}>
                                    Preferred Time Slot
                                </label>
                                <input
                                    type="text" id="preferredTimeSlot" name="preferredTimeSlot" value={formData.preferredTimeSlot} onChange={handleInputChange}
                                    className={`${handwrittenFont.className} w-full text-xl text-blue-800 bg-transparent border-b-2 border-slate-400 border-dashed focus:border-slate-800 focus:border-solid focus:outline-none px-2 py-2 placeholder:text-slate-400`}
                                    placeholder="10:00 AM - 11:00 AM"
                                />
                            </div>

                            <div className="mt-auto pt-4 shrink-0">
                                <button
                                    type="submit" disabled={isSubmitting}
                                    className={`${markerFont.className} w-full flex items-center justify-center gap-2 py-4 bg-slate-900 text-white text-xl md:custom-wiggle-border rounded-md md:rounded-none hover:bg-[#d81b60] transition-colors disabled:opacity-50`}
                                >
                                    {isSubmitting ? <><Loader2 className="w-6 h-6 animate-spin" /> SENDING...</> : "SUBMIT FORM"}
                                </button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>

            </div>
        </section>
    );
}