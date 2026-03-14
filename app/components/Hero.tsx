"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, LayoutDashboard, Menu, X } from 'lucide-react';
import { Permanent_Marker, Kalam } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, Variants } from 'framer-motion';

// Load fonts
const markerFont = Permanent_Marker({ weight: '400', subsets: ['latin'] });
const handwrittenFont = Kalam({ weight: ['400', '700'], subsets: ['latin'] });

export default function HeroSection() {
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
                            <Button className="bg-[#d81b60] hover:bg-[#b0164e] text-white font-bold py-6 px-8 md:py-7 md:px-10 rounded shadow-lg text-lg md:text-xl tracking-wider transition-transform hover:-translate-y-1 w-full sm:w-auto">
                                Explore Platform
                            </Button>
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
                        <Button variant="outline" className={`${markerFont.className} border-2 border-[#d81b60] text-[#d81b60] hover:bg-[#d81b60] hover:text-white text-md md:text-lg py-5 px-6 md:py-6 md:px-8 transition-colors w-full sm:w-auto`}>
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
        </div>
    );
}