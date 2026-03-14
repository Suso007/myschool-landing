"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, Monitor, Phone, Loader2 } from "lucide-react";
import createGlobe from "cobe";
import { Permanent_Marker, Montserrat } from "next/font/google";

// Load fonts to match the school theme
const markerFont = Permanent_Marker({ weight: '400', subsets: ['latin'] });
const sansFont = Montserrat({ weight: ['400', '700', '800'], subsets: ['latin'] });

export default function ContactSection() {
    // Form state handling for production readiness
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate an API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setFormSubmitted(true);
        console.log("Form submitted");
    };

    return (
        <section className={`${sansFont.className} relative py-20 px-4 md:py-24 md:px-6 lg:px-12 flex items-center justify-center overflow-hidden`}>

            {/* --- Global Ruled Notebook Paper Background --- */}
            <div
                className="fixed inset-0 pointer-events-none z-0"
                style={{
                    backgroundImage: `
                        linear-gradient(90deg, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0) 4%, rgba(0,0,0,0) 96%, rgba(0,0,0,0.03) 100%),
                        url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.02'/%3E%3C/svg%3E"),
                        repeating-linear-gradient(transparent, transparent 39px, rgba(203, 213, 225, 0.4) 39px, rgba(203, 213, 225, 0.4) 40px)
                    `,
                    backgroundPositionY: '10px'
                }}
            />

            {/* --- Main Content Grid --- */}
            <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 lg:gap-20 items-start relative z-10 pt-16 md:pt-24 pb-12">

                {/* --- Left Column: text on top, globe at bottom --- */}
                <motion.div
                    initial={{ opacity: 0, x: -40, rotate: -3 }}
                    whileInView={{ opacity: 1, x: 0, rotate: -1.5 }}
                    transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="flex-1 w-full lg:col-span-5 relative"
                >
                    {/* Notebook Paper Annotation Card */}
                    <div className="relative bg-white p-8 md:p-10 shadow-lg border-2 border-slate-800 custom-wiggle-border">
                        {/* Clear Tape effect */}
                        <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-12 h-6 bg-white/40 border border-white/60 shadow-sm rotate-[-4deg]" />

                        {/* Mail Icon in paper box */}
                        <div className="w-14 h-14 rounded-full bg-blue-50 border-2 border-slate-800 flex items-center justify-center mb-8 mx-auto custom-wiggle-border">
                            <Mail className="w-6 h-6 text-blue-800 stroke-[2]" />
                        </div>

                        <h2 className={`${markerFont.className} text-4xl sm:text-5xl font-bold tracking-tight mb-6 text-slate-900 text-center leading-tight`}>
                            Contact us
                        </h2>

                        <p className={`${sansFont.className} text-slate-700 text-lg sm:text-xl font-bold leading-relaxed mb-10 text-center`}>
                            Let us know how we can help you simplify your school operations.
                        </p>

                        {/* Globe + contact info overlay */}
                        <div className="relative flex justify-center aspect-square">
                            {/* Globe - positioned below */}
                            <Globe className="absolute top-1/2 -translate-y-1/2 z-0" />

                            {/* Contact info row floats on top of the globe's upper portion */}
                            <div className="absolute top-10 left-0 right-0 flex flex-wrap items-center justify-center gap-3 md:gap-4 text-sm px-4 transform translate-y-[-140%] md:translate-y-[-160%] lg:translate-y-[-140%]">
                                <span className="bg-white px-3 py-1.5 rounded-sm border-2 border-slate-800 font-bold text-slate-800 custom-wiggle-border whitespace-nowrap">
                                    <Phone className="w-3.5 h-3.5 inline mr-1 text-[#d81b60]" />
                                    +91 7063139083
                                </span>
                                <span className="bg-white px-3 py-1.5 rounded-sm border-2 border-slate-800 font-bold text-slate-800 custom-wiggle-border whitespace-nowrap">
                                    <Mail className="w-3.5 h-3.5 inline mr-1 text-[#d81b60]" />
                                    support@nextorg.in
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* --- Right Column: Blackboard Form Container --- */}
                <motion.div
                    initial={{ opacity: 0, x: 40, rotate: 3 }}
                    whileInView={{ opacity: 1, x: 0, rotate: 1.5 }}
                    transition={{ duration: 0.6, type: "spring", bounce: 0.4, delay: 0.2 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="relative w-full lg:col-span-7"
                >
                    {/* Sketched Blackboard with wooden frame effect */}
                    <div className="relative w-full rounded-xl bg-[#1A1D21] border-[12px] border-[#8b5a2b] shadow-2xl overflow-hidden p-8 lg:p-10 custom-wiggle-border">

                        {/* Chalk Grid Background Pattern */}
                        <div className="absolute top-0 right-0 w-full h-full bg-[linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] [mask-image:radial-gradient(circle_at_top_right,black,transparent_70%)] opacity-60 pointer-events-none" />

                        {/* Blackboard Label (stamped red chalk effect) */}
                        <div className="inline-block relative mb-8">
                            <span className={`${markerFont.className} text-[#d81b60] text-xl tracking-widest uppercase flex items-center gap-2`}>
                                <Monitor className="w-6 h-6 stroke-[2]" />
                                Admin Dashboard
                            </span>
                            <svg className="absolute w-full h-3 -bottom-2 left-0 text-[#d81b60]" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 2" stroke="currentColor" strokeWidth="2" fill="none" />
                            </svg>
                        </div>

                        {/* chalky text effect style utility */}
                        <style>{`
                            .chalk-text {
                                color: rgba(255, 255, 255, 0.85);
                                text-shadow: 0 0 1px rgba(255, 255, 255, 0.3), 0 0 2px rgba(255, 255, 255, 0.1);
                            }
                            .chalk-label {
                                color: rgba(255, 255, 255, 0.95);
                                font-weight: 700;
                            }
                            .custom-wiggle-border {
                                border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
                            }
                        `}</style>

                        {formSubmitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className={`${sansFont.className} text-center flex flex-col items-center justify-center gap-6 chalk-text min-h-[400px]`}>
                                <Mail className="w-16 h-16 text-[#d81b60] opacity-80" strokeWidth={1} />
                                <h3 className="text-3xl font-extrabold tracking-tight">Message Sketched!</h3>
                                <p className="max-w-sm">We've got your message, scratched onto our board. Our team will get back to you shortly.</p>
                            </motion.div>
                        ) : (
                            <form className="relative z-10 flex flex-col gap-6" onSubmit={handleSubmit}>

                                {/* Full Name */}
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="fullName" className="text-sm md:text-base chalk-label uppercase tracking-widest">
                                        Full name
                                    </label>
                                    <input
                                        type="text" id="fullName" placeholder="Your Name" required
                                        className="w-full bg-[#1A1D21] border-2 border-slate-700 border-dashed chalk-text text-base px-4 py-3 focus:outline-none focus:border-white focus:border-solid transition-colors placeholder:text-slate-600"
                                    />
                                </div>

                                {/* Email Address */}
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="contact" className="text-sm md:text-base chalk-label uppercase tracking-widest">
                                        Contact
                                    </label>
                                    <input
                                        type="phone" id="contact" placeholder="+91 7063139083" required
                                        className="w-full bg-[#1A1D21] border-2 border-slate-700 border-dashed chalk-text text-base px-4 py-3 focus:outline-none focus:border-white focus:border-solid transition-colors placeholder:text-slate-600"
                                    />
                                </div>

                                {/* Company */}
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="company" className="text-sm md:text-base chalk-label uppercase tracking-widest">
                                        Company / School Name
                                    </label>
                                    <input
                                        type="text" id="company" placeholder="Nextorg Solutions" required
                                        className="w-full bg-[#1A1D21] border-2 border-slate-700 border-dashed chalk-text text-base px-4 py-3 focus:outline-none focus:border-white focus:border-solid transition-colors placeholder:text-slate-600"
                                    />
                                </div>

                                {/* Message */}
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="message" className="text-sm md:text-base chalk-label uppercase tracking-widest">
                                        Message
                                    </label>
                                    <textarea
                                        id="message" placeholder="Sketch your message here" rows={4} required
                                        className="w-full bg-[#1A1D21] border-2 border-slate-700 border-dashed chalk-text text-base px-4 py-3 focus:outline-none focus:border-white focus:border-solid transition-colors resize-none placeholder:text-slate-600"
                                    />
                                </div>

                                {/* Submit Button ( Magenta Classmate popup) */}
                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`${markerFont.className} group relative inline-flex items-center justify-center gap-2 px-10 py-4 bg-[#d81b60] text-white text-xl md:text-2xl shadow-lg transition-transform hover:scale-105 hover:-rotate-2 custom-wiggle-border w-full sm:w-auto disabled:opacity-50`}
                                    >
                                        <span className="relative z-10 flex items-center gap-2">
                                            {isSubmitting ? (
                                                <Loader2 className="w-6 h-6 animate-spin text-white" />
                                            ) : (
                                                <>Sketch Message <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-2 transition-transform" strokeWidth={3} /></>
                                            )}
                                        </span>
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </motion.div>

            </div>
        </section>
    );
}

// COBE Globe Component (unmodified from original)
export const Globe = ({ className }: { className?: string }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        let phi = 0;

        if (!canvasRef.current) return;

        // Optimized size for mobile-first aspects
        const size = 350;
        const dpr = Math.min(window.devicePixelRatio, 2);

        const globe = createGlobe(canvasRef.current, {
            devicePixelRatio: dpr,
            width: size * dpr,
            height: size * dpr,
            phi: 0,
            theta: 0.3,
            dark: 1, // Keep it dark as requested, it contrasts well
            diffuse: 1.2,
            mapSamples: 16000,
            mapBrightness: 6,
            baseColor: [0.3, 0.3, 0.3],
            markerColor: [0.85, 0.1, 0.4], // Changed to match magenta primary
            glowColor: [1, 1, 1],
            markers: [
                // India — Location of Nextorg
                { location: [22.5726, 88.3639], size: 0.1 }, // Example marker for India
                { location: [12.9716, 77.5946], size: 0.08 },
            ],
            onRender: (state) => {
                state.phi = phi;
                phi += 0.005; // Slightly slower rotation for better readability
            },
        });

        return () => {
            globe.destroy();
        };
    }, []);

    return (
        <div className={`relative ${className} w-full h-full max-w-[320px] max-h-[320px]`}>
            {/* The canvas itself, sized to match aspects */}
            <canvas
                ref={canvasRef}
                style={{ width: '100%', height: '100%', aspectRatio: '1' }}
            />
            {/* Soft background glow matching primary color */}
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-[60px] opacity-60 z-[-1]" />
        </div>
    );
};