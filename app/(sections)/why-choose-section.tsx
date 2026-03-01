"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
    Loader2
} from "lucide-react";
import SectionDivider from "./divider";

const reasons = [
    {
        icon: GraduationCap,
        title: "Built for Indian Schools",
        description: "Specifically designed for CBSE, ICSE, State Board, and other Indian educational institutions with localized features.",
        badges: ["CBSE", "ICSE", "State Board"],
        highlight: false
    },
    {
        icon: Cloud,
        title: "Cloud-Based Access",
        description: "Access your school data anytime, anywhere with our secure cloud infrastructure. No servers, no hardware maintenance.",
        badges: ["24/7 Access", "Secure"],
        highlight: true
    },
    {
        icon: Shield,
        title: "Data Security & Privacy",
        description: "Enterprise-grade security with encrypted data storage, regular backups, and compliance with data protection regulations.",
        badges: ["Encrypted", "Compliant"],
        highlight: false
    },
    {
        icon: Settings,
        title: "Fully Customizable",
        description: "Adapt the platform to your institution's unique workflows and requirements. Flexible configuration options available.",
        badges: ["Flexible", "Scalable"],
        highlight: false
    },
    {
        icon: Zap,
        title: "Fast Implementation",
        description: "Get up and running quickly with our streamlined setup process. Comprehensive training ensures smooth onboarding.",
        badges: ["Quick Setup", "Training Included"],
        highlight: false
    },
    {
        icon: HeadphonesIcon,
        title: "Ongoing Support",
        description: "Dedicated support team ready to assist you. Regular updates, bug fixes, and feature enhancements included.",
        badges: ["24/7 Support", "Updates"],
        highlight: false
    }
];

export default function WhyChooseSection() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        requestCallback: false,
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
            // Replace '/api/demo-request' with your actual backend endpoint
            await axios.post('/api/demo-request', formData);

            // Optional: Add a success toast notification here
            console.log("Form submitted successfully:", formData);

            // Reset form and close dialog
            setFormData({ name: "", phone: "", email: "", requestCallback: false });
            setIsDialogOpen(false);
        } catch (error) {
            console.error("Error submitting form:", error);
            // Optional: Add an error toast notification here
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="py-8 px-4 bg-background text-foreground overflow-hidden">
            {/* Custom CSS for continuous animations */}
            <style>{`
                @keyframes float-icon {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-8px); }
                }
                @keyframes pulse-glow-soft {
                    0%, 100% { background-color: hsl(var(--primary) / 0.05); }
                    50% { background-color: hsl(var(--primary) / 0.15); }
                }
                .animate-float-icon { animation: float-icon 4s ease-in-out infinite; }
                .animate-pulse-glow-soft { animation: pulse-glow-soft 4s ease-in-out infinite; }
            `}</style>

            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 relative z-10"
                >
                    <div className="inline-flex items-center rounded-full border border-border bg-muted/50 px-6 py-2 text-sm font-medium mb-4">
                        Why Choose Us
                    </div>
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight mb-6">
                        Why Schools Trust Our ERP
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Built with modern institutions in mind, designed for maximum efficiency, and tailored to scale with your growth.
                    </p>
                </motion.div>

                {/* Reasons Grid (Code remains the same) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {reasons.map((reason, index) => {
                        const Icon = reason.icon;
                        return (
                            <motion.div
                                key={reason.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Card className={`h-full group relative overflow-hidden border bg-card p-8 rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_-10px_hsl(var(--primary)/0.15)] ${reason.highlight
                                    ? 'border-primary/40 shadow-[0_0_20px_-5px_hsl(var(--primary)/0.1)]'
                                    : 'border-border hover:border-primary/50'
                                    }`}>

                                    {reason.highlight && (
                                        <div className="absolute top-6 right-6 z-20">
                                            <Badge className="bg-primary text-primary-foreground animate-pulse hover:bg-primary">
                                                Featured
                                            </Badge>
                                        </div>
                                    )}

                                    <div className="absolute -right-8 -bottom-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none transform group-hover:scale-110 group-hover:rotate-12">
                                        <Icon className="w-48 h-48 text-primary" />
                                    </div>

                                    <CardContent className="p-0 relative z-10 flex flex-col h-full">
                                        <div className="relative mb-6 inline-block">
                                            <div className="absolute inset-0 rounded-2xl animate-pulse-glow-soft group-hover:[animation-play-state:paused]" />
                                            <div className="relative w-14 h-14 rounded-2xl bg-background border border-border flex items-center justify-center animate-float-icon group-hover:[animation-play-state:paused] group-hover:border-primary/40 transition-colors">
                                                <Icon className="w-6 h-6 text-primary" />
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-bold text-foreground mb-3">
                                            {reason.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                                            {reason.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mt-auto">
                                            {reason.badges.map((badge, idx) => (
                                                <Badge
                                                    key={idx}
                                                    variant="secondary"
                                                    className="text-xs font-medium bg-muted/50 border-border/50 text-muted-foreground"
                                                >
                                                    {badge}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>

                <SectionDivider />

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <Card className="relative overflow-hidden border-primary/20 bg-primary/5 rounded-[2.5rem] p-10 md:p-14 text-center">
                        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

                        <CardContent className="p-0 relative z-10 flex flex-col items-center">
                            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
                                Ready to transform your institution?
                            </h3>
                            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
                                Join us to automate your workflows and empower your staff.
                            </p>

                            {/* Trigger Button */}
                            <button
                                onClick={() => setIsDialogOpen(true)}
                                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold shadow-lg hover:shadow-[0_0_30px_-5px_hsl(var(--primary)/0.4)] transition-all duration-300 hover:scale-105 overflow-hidden"
                            >
                                <span className="relative z-10">Schedule a Free Demo</span>
                                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                            </button>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Demo Request Modal */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="sm:max-w-md bg-card border-border rounded-3xl">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold text-foreground">Schedule a Demo</DialogTitle>
                            <DialogDescription className="text-muted-foreground">
                                Fill out the form below and our team will get back to you shortly.
                            </DialogDescription>
                        </DialogHeader>

                        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium text-foreground">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-foreground">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    placeholder="john@school.edu"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="phone" className="text-sm font-medium text-foreground">Phone Number</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    required
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    placeholder="+91 98765 43210"
                                />
                            </div>

                            <div className="flex items-center space-x-2 pt-2">
                                <input
                                    type="checkbox"
                                    id="requestCallback"
                                    name="requestCallback"
                                    checked={formData.requestCallback}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 rounded border-border text-primary focus:ring-primary accent-primary"
                                />
                                <label
                                    htmlFor="requestCallback"
                                    className="text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Request a call back
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full mt-6 flex items-center justify-center gap-2 h-11 bg-primary text-primary-foreground rounded-md font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    "Submit Request"
                                )}
                            </button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </section>
    );
}