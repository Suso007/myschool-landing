"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Mail } from "lucide-react";
import createGlobe from "cobe";

export default function ContactSection() {
    return (
        <section className="bg-background text-foreground py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center font-sans overflow-hidden">
            <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-start">

                {/* Left Column: text on top, globe at bottom fully visible */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col relative z-10"
                >
                    {/* Glowing Mail Icon */}
                    <div className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center mb-6 relative shadow-[0_0_30px_-5px_hsl(var(--primary)/0.3)]">
                        <div className="absolute inset-0 rounded-xl bg-primary/10 blur-sm" />
                        <Mail className="w-5 h-5 text-primary relative z-10" />
                        <div className="absolute bottom-0 inset-x-2 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
                    </div>

                    <h1 className="text-xl sm:text-3xl font-bold tracking-tight mb-4 text-foreground">
                        Contact us
                    </h1>

                    <p className="text-muted-foreground text-base max-w-sm leading-relaxed mb-8">
                        We are always looking for ways to improve our products and services. Contact us and let us know how we can help you.
                    </p>

                    {/* Globe + contact info overlay */}
                    <div className="relative flex justify-center">
                        {/* Globe — fully visible, no clip */}
                        <Globe />

                        {/* Contact info row floats on top of the globe's upper portion */}
                        <div className="absolute top-6 left-0 right-0 flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground px-4">
                            <span className="bg-background/60 backdrop-blur-sm px-2 py-0.5 rounded border border-border/50">info@nextorg.in</span>
                            <div className="w-1 h-1 rounded-sm bg-border" />
                            <span className="bg-background/60 backdrop-blur-sm px-2 py-0.5 rounded border border-border/50">+91 7063139083</span>
                            <div className="w-1 h-1 rounded-sm bg-border" />
                            <span className="bg-background/60 backdrop-blur-sm px-2 py-0.5 rounded border border-border/50">support@nextorg.in</span>
                        </div>
                    </div>
                </motion.div>

                {/* Right Column: Form Container */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative w-full rounded-2xl bg-card border border-border overflow-hidden p-8 lg:p-10 shadow-xl"
                >
                    {/* Subtle Grid Background Pattern */}
                    <div className="absolute top-0 right-0 w-full h-full bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(circle_at_top_right,black,transparent_70%)] opacity-40 pointer-events-none" />

                    <form className="relative z-10 flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>

                        {/* Full Name */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="fullName" className="text-sm font-medium text-foreground">
                                Full name
                            </label>
                            <input
                                type="text"
                                id="fullName"
                                placeholder="Your Name"
                                className="w-full bg-background border border-input rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-colors"
                            />
                        </div>

                        {/* Email Address */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-sm font-medium text-foreground">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="support@nextorg.in"
                                className="w-full bg-background border border-input rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-colors"
                            />
                        </div>

                        {/* Company */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="company" className="text-sm font-medium text-foreground">
                                Company
                            </label>
                            <input
                                type="text"
                                id="company"
                                placeholder="Nextorg Solutions"
                                className="w-full bg-background border border-input rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-colors"
                            />
                        </div>

                        {/* Message */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="message" className="text-sm font-medium text-foreground">
                                Message
                            </label>
                            <textarea
                                id="message"
                                placeholder="Type your message here"
                                rows={4}
                                className="w-full bg-background border border-input rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-colors resize-none"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium rounded-lg transition-colors shadow-sm"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </motion.div>

            </div>
        </section>
    );
}

export const Globe = ({ className }: { className?: string }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        let phi = 0;

        if (!canvasRef.current) return;

        // Use the canvas's rendered width for correct pixel ratio sizing
        const size = 360;
        const dpr = Math.min(window.devicePixelRatio, 2);

        const globe = createGlobe(canvasRef.current, {
            devicePixelRatio: dpr,
            width: size * dpr,
            height: size * dpr,
            phi: 0,
            theta: 0.3,
            dark: 1,
            diffuse: 1.2,
            mapSamples: 16000,
            mapBrightness: 6,
            baseColor: [0.3, 0.3, 0.3],
            markerColor: [0.1, 0.8, 1],
            glowColor: [1, 1, 1],
            markers: [
                // India — Bengaluru
                { location: [12.9716, 77.5946], size: 0.08 },
                // US — San Francisco
                { location: [37.7595, -122.4367], size: 0.05 },
                // US — New York
                { location: [40.7128, -74.006], size: 0.05 },
            ],
            onRender: (state) => {
                state.phi = phi;
                phi += 0.01;
            },
        });

        return () => {
            globe.destroy();
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={className}
            style={{ width: '360px', height: '360px' }}
        />
    );
};