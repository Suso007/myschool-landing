"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, LayoutDashboard, Loader2, Menu, X } from 'lucide-react';
import { Permanent_Marker, Kalam } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import axios from 'axios';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

// Load fonts
const markerFont = Permanent_Marker({ weight: '400', subsets: ['latin'] });
const handwrittenFont = Kalam({ weight: ['400', '700'], subsets: ['latin'] });

export default function HeroSection() {

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

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Animation Variants for Framer Motion
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        show: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100 }
        }
    };

    return (
        <div className="pt-28 relative overflow-x-clip font-sans text-slate-800">

            {/* Main Container */}
            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* Hero Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-12 md:pt-20 pb-16 items-center">

                    {/* Left Column: Text & CTA */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className="flex flex-col justify-center space-y-6 md:space-y-8 max-w-xl text-center md:text-left mx-auto lg:mx-0"
                    >
                        <motion.h1 variants={itemVariants} className={`${markerFont.className} text-4xl sm:text-5xl md:text-6xl leading-[1.1] text-slate-900 tracking-wide`}>
                            EMPOWER YOUR <br className="hidden sm:block" /> INSTITUTE WITH <span className="text-[#d81b60]">NEXTORG</span>
                        </motion.h1>

                        <motion.p variants={itemVariants} className={`${handwrittenFont.className} text-blue-800 text-lg sm:text-xl md:text-2xl font-bold uppercase leading-relaxed tracking-wider`}>
                            Simplify school operations and enhance parent engagement with a comprehensive cloud-based management system.
                        </motion.p>

                        <motion.div variants={itemVariants} className="pt-2 md:pt-4">
                            <a
                                href="https://school.nextorg.in/"
                                className="cursor-pointer"
                                target="_blank"
                                rel="noopener noreferrer">
                                <Button className="bg-[#d81b60] hover:bg-[#b0164e] text-white font-bold py-6 px-8 md:py-7 md:px-10 rounded shadow-lg text-lg md:text-xl tracking-wider transition-transform hover:-translate-y-1 w-full sm:w-auto">
                                    Explore Platform
                                </Button>
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Right Column: Hero Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
                        className="relative flex justify-center items-center w-full aspect-square max-h-[400px] md:max-h-[500px]"
                    >
                        <div className="relative w-full h-full drop-shadow-2xl">
                            <Image
                                src="/image.png"
                                alt="NextOrg Platform Preview"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Section: Onboarding Flow */}
                <div className="mt-8 pt-8 relative">

                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 md:mb-12 gap-6 text-center md:text-left"
                    >
                        <div>
                            <h2 className={`${markerFont.className} text-2xl md:text-3xl uppercase border-b-4 border-[#d81b60] inline-block pb-1 mb-3 text-slate-900`}>
                                Get Started in Days
                            </h2>
                            <p className={`${handwrittenFont.className} text-blue-800 text-lg md:text-xl font-bold uppercase tracking-widest`}>
                                See how NextOrg can transform your school
                            </p>
                        </div>
                        <Button
                            onClick={() => setIsDialogOpen(true)}
                            variant="outline" className={`${markerFont.className} border-2 border-[#d81b60] text-[#d81b60] hover:bg-[#d81b60] hover:text-white text-md md:text-lg py-5 px-6 md:py-6 md:px-8 transition-colors w-full sm:w-auto`}>
                            Schedule Demo <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </motion.div>

                    {/* Sticky Notes Steps */}
                    <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-8 lg:gap-8 pb-20">
                        {[
                            { num: '1', text: 'SCHEDULE DEMO', color: 'bg-[#fce96a]', shadow: 'bg-[#d4c24d]', rotate: -2 },
                            { num: '2', text: 'CUSTOM SETUP', color: 'bg-[#a7f3d0]', shadow: 'bg-[#6ee7b7]', rotate: 2 },
                            { num: '3', text: 'GO LIVE', color: 'bg-[#fbcfe8]', shadow: 'bg-[#f472b6]', rotate: -1 },
                        ].map((step, idx) => (
                            <motion.div
                                key={step.num}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.15, type: "spring", stiffness: 120 }}
                                className={`${step.color} w-48 h-48 md:w-52 md:h-52 p-6 flex flex-col items-center justify-center shadow-md relative transition-transform hover:scale-105 hover:z-10`}
                                style={{
                                    transform: `rotate(${step.rotate}deg)`,
                                    clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)'
                                }}
                            >
                                <div className={`absolute bottom-0 right-0 w-[20px] h-[20px] ${step.shadow} shadow-sm`} />
                                <span className={`${markerFont.className} text-5xl md:text-6xl text-slate-800 opacity-80 mb-2`}>{step.num}</span>
                                <span className={`${handwrittenFont.className} text-slate-900 font-bold text-center uppercase leading-tight text-lg md:text-xl`}>
                                    {step.text.replace(' ', '\n')}
                                </span>
                            </motion.div>
                        ))}

                        <ArrowRight className="hidden lg:block w-10 h-10 text-slate-400 mx-2" />

                        {/* SaaS Dashboard Mockup Placeholder */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="w-full sm:w-64 h-48 bg-white rounded-lg border border-slate-200 shadow-xl flex flex-col overflow-hidden transform rotate-1 mt-4 lg:mt-0"
                        >
                            <div className="h-6 bg-slate-100 border-b border-slate-200 flex items-center px-2 gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                            </div>
                            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 gap-2">
                                <LayoutDashboard className="w-8 h-8 opacity-50" />
                                <span className={`${markerFont.className} text-sm tracking-widest uppercase`}>Dashboard</span>
                            </div>
                        </motion.div>
                    </div>
                </div>

            </div>
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
    );
}