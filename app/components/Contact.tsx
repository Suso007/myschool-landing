"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import {
    Phone,
    Paperclip,
    Mail,
    MapPin,
    MessageCircle,
    Send
} from "lucide-react";
import dynamic from "next/dynamic";
import { Permanent_Marker, Kalam } from "next/font/google";

const markerFont = Permanent_Marker({ weight: "400", subsets: ["latin"] });
const handwrittenFont = Kalam({ weight: ["400", "700"], subsets: ["latin"] });

// Dynamically import the Aceternity UI World component
const World = dynamic(() => import("@/components/ui/globe").then((m) => m.World), {
    ssr: false,
});

// --- GLOBE CONFIGURATION ---
const globeConfig = {
    pointSize: 4,
    globeColor: "#1e293b", // Deep slate blue to match text
    showAtmosphere: true,
    atmosphereColor: "#FFFFFF",
    atmosphereAltitude: 0.1,
    emissive: "#0f172a",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: "rgba(255,255,255,0.7)",
    ambientLight: "#38bdf8",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 1500,
    arcLength: 0.9,
    rings: 2,
    maxRings: 4,
    initialPosition: { lat: 17.77, lng: 82.97 }, // Centered between Kolkata and Bengaluru
    autoRotate: true,
    autoRotateSpeed: 0.5,

    // FIX: Added markers back so the solid center pins are visible!
    markerColor: [1, 1, 1], // White center dot
    markers: [
        { location: [22.5726, 88.3639], size: 0.07 }, // Kolkata Pin
        { location: [12.9716, 77.5946], size: 0.07 }  // Bengaluru Pin
    ]
};

// FIX: Aceternity generates the blinking rings based on the 'start' location of the arcs.
// This creates a Pink ring at Kolkata and a Green ring at Bengaluru.
const sampleArcs = [
    {
        order: 1,
        startLat: 22.5726, // Kolkata
        startLng: 88.3639,
        endLat: 12.9716,
        endLng: 77.5946,
        arcAlt: 0.15,
        color: "#d81b60"   // Pink/Magenta Blinking Ring
    },
    {
        order: 1,
        startLat: 12.9716, // Bengaluru
        startLng: 77.5946,
        endLat: 22.5726,
        endLng: 88.3639,
        arcAlt: 0.25,
        color: "#10b981"   // Green Blinking Ring
    }
];

export default function ContactSection() {
    return (
        <section className="relative py-20 px-4 md:py-24 md:px-6 lg:px-12 flex items-center justify-center overflow-hidden font-sans text-slate-800">

            {/* --- Global Ruled Notebook Paper Background --- */}
            <div
                className="absolute inset-0 pointer-events-none z-0"
                style={{
                    backgroundImage: `
                        linear-gradient(90deg, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0) 4%, rgba(0,0,0,0) 96%, rgba(0,0,0,0.03) 100%),
                        url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.02'/%3E%3C/svg%3E"),
                        repeating-linear-gradient(transparent, transparent 39px, rgba(203, 213, 225, 0.4) 39px, rgba(203, 213, 225, 0.4) 40px)
                    `,
                    backgroundPositionY: '10px'
                }}
            />

            <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center relative z-10 pt-10">

                {/* --- Left Column: Directory Cards --- */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="flex flex-col relative"
                >
                    {/* Sketched "Highlight" Background behind text */}
                    <div className="relative inline-block mb-4 self-start">
                        <div className="absolute inset-0 bg-[#a7f3d0] transform rotate-2 skew-x-6 scale-110 z-0 opacity-70"></div>
                        <h2 className={`${markerFont.className} text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 relative z-10 px-2 py-1`}>
                            GET IN TOUCH
                        </h2>
                    </div>

                    <p className={`${handwrittenFont.className} text-xl md:text-2xl text-slate-700 max-w-lg mb-12 font-bold leading-relaxed`}>
                        Have questions? Need a demo? Let us know how we can help simplify your school operations.
                    </p>

                    {/* Stacked Contact Flashcards */}
                    <div className="space-y-6 z-20">

                        {/* Phone Card */}
                        <motion.a
                            href="tel:+917063139083"
                            whileHover={{ scale: 1.03, rotate: -1 }}
                            className="group relative flex items-center gap-6 p-6 bg-white border-2 border-slate-800 shadow-md custom-wiggle-border"
                        >
                            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-red-400 opacity-50" />
                            <div className="w-14 h-14 shrink-0 rounded-full bg-green-100 border-2 border-slate-800 flex items-center justify-center custom-wiggle-border group-hover:bg-green-200 transition-colors ml-4 z-10">
                                <Phone className="w-6 h-6 text-green-700 stroke-[2]" />
                            </div>
                            <div className="z-10">
                                <p className={`${markerFont.className} text-sm text-slate-500 uppercase tracking-widest mb-1`}>Call Us Directly</p>
                                <p className={`${handwrittenFont.className} text-2xl md:text-3xl text-slate-900 font-bold group-hover:text-[#d81b60] transition-colors`}>
                                    +91 7063139083
                                </p>
                            </div>
                        </motion.a>

                        {/* Email Card */}
                        <motion.a
                            href="mailto:support@nextorg.in"
                            whileHover={{ scale: 1.03, rotate: 1 }}
                            className="group relative flex items-center gap-6 p-6 bg-[#fef08a] border-2 border-slate-800 shadow-md custom-wiggle-border"
                        >
                            <Paperclip className="absolute -top-4 -right-2 w-8 h-8 text-slate-600 rotate-45 z-20" />
                            <div className="w-14 h-14 shrink-0 rounded-full bg-blue-50 border-2 border-slate-800 flex items-center justify-center custom-wiggle-border group-hover:bg-blue-100 transition-colors z-10">
                                <Mail className="w-6 h-6 text-blue-700 stroke-[2]" />
                            </div>
                            <div className="z-10">
                                <p className={`${markerFont.className} text-sm text-slate-600 uppercase tracking-widest mb-1`}>Drop an Email</p>
                                <p className={`${handwrittenFont.className} text-2xl md:text-3xl text-slate-900 font-bold group-hover:text-blue-700 transition-colors`}>
                                    support@nextorg.in
                                </p>
                            </div>
                        </motion.a>

                        {/* Location Card */}
                        <motion.div
                            whileHover={{ scale: 1.03, rotate: -1 }}
                            className="group relative flex items-center gap-6 p-6 bg-[#f8fafc] border-2 border-slate-800 shadow-md custom-wiggle-border"
                            style={{ backgroundImage: 'linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px' }}
                        >
                            <div className="w-14 h-14 shrink-0 bg-white border-2 border-slate-800 flex items-center justify-center transform rotate-6 group-hover:bg-red-50 transition-colors z-10">
                                <MapPin className="w-6 h-6 text-red-600 stroke-[2]" />
                            </div>
                            <div className="z-10 bg-white/80 px-4 py-2 rounded border border-slate-300 backdrop-blur-sm">
                                <p className={`${markerFont.className} text-sm text-slate-500 uppercase tracking-widest mb-1`}>Headquarters</p>
                                <p className={`${handwrittenFont.className} text-xl md:text-2xl text-slate-900 font-bold`}>
                                    Katwa, Burdwan, West Bengal
                                </p>
                            </div>
                        </motion.div>

                    </div>

                    {/* Quick WhatsApp CTA Button */}
                    <div className="mt-10 z-20">
                        <a href="https://wa.me/917063139083" target="_blank" rel="noreferrer">
                            <button className={`${markerFont.className} group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#d81b60] text-white text-xl shadow-lg transition-transform hover:scale-105 hover:rotate-1 custom-wiggle-border w-full sm:w-auto`}>
                                <MessageCircle className="w-6 h-6 stroke-[2.5]" />
                                <span className="relative z-10">CHAT ON WHATSAPP</span>
                            </button>
                        </a>
                    </div>
                </motion.div>

                {/* --- Right Column: The Aceternity Globe --- */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, type: "spring", bounce: 0.4, delay: 0.2 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="relative w-full flex justify-center items-center h-[400px] lg:h-[600px] pointer-events-none"
                >
                    {/* Floating "We are here" Sticky Note */}
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-[5%] right-[5%] lg:right-[15%] z-20 bg-[#fbcfe8] border-2 border-slate-800 p-4 shadow-md rotate-12 custom-wiggle-border pointer-events-auto"
                    >
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-600 border border-slate-900 shadow-sm" />
                        <p className={`${handwrittenFont.className} text-xl text-slate-900 font-bold whitespace-nowrap`}>
                            We are here!
                        </p>
                        {/* Hand-drawn arrow pointing to globe */}
                        <svg className="absolute -bottom-10 -left-6 w-16 h-16 text-slate-800 rotate-[-30deg]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                        </svg>
                    </motion.div>

                    {/* Paper Airplane Doodle */}
                    <Send className="absolute bottom-[10%] left-[5%] w-12 h-12 text-slate-400 opacity-50 rotate-45 stroke-[1.5] z-0" />

                    {/* The Interactive Globe Wrapper */}
                    <div className="absolute inset-0 w-full h-full z-10 flex items-center justify-center">
                        <div className="w-[120%] h-[120%] md:w-full md:h-full relative pointer-events-auto">
                            <World data={sampleArcs} globeConfig={globeConfig} />
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}