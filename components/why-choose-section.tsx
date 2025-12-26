"use client";

import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Cloud,
    Shield,
    Settings,
    Zap,
    HeadphonesIcon,
    GraduationCap
} from "lucide-react";

const reasons = [
    {
        icon: GraduationCap,
        title: "Built for Indian Schools",
        description: "Specifically designed for CBSE, ICSE, State Board, and other Indian educational institutions with localized features.",
        color: "from-blue-500 to-cyan-500",
        badges: ["CBSE", "ICSE", "State Board"]
    },
    {
        icon: Cloud,
        title: "Cloud-Based Access",
        description: "Access your school data anytime, anywhere with our secure cloud infrastructure. No servers, no hardware maintenance.",
        color: "from-purple-500 to-pink-500",
        badges: ["24/7 Access", "Secure"],
        highlight: true
    },
    {
        icon: Shield,
        title: "Data Security & Privacy",
        description: "Enterprise-grade security with encrypted data storage, regular backups, and compliance with data protection regulations. Your institution's data is always safe.",
        color: "from-green-500 to-emerald-500",
        badges: ["Encrypted", "GDPR Compliant"],
    },
    {
        icon: Settings,
        title: "Fully Customizable",
        description: "Adapt the platform to your institution's unique workflows and requirements. Flexible configuration options available.",
        color: "from-orange-500 to-red-500",
        badges: ["Flexible", "Scalable"]
    },
    {
        icon: Zap,
        title: "Fast Implementation",
        description: "Get up and running quickly with our streamlined setup process. Comprehensive training ensures smooth onboarding for your staff.",
        color: "from-indigo-500 to-purple-500",
        badges: ["Quick Setup", "Training Included"]
    },
    {
        icon: HeadphonesIcon,
        title: "Ongoing Support",
        description: "Dedicated support team ready to assist you. Regular updates, bug fixes, and feature enhancements included.",
        color: "from-pink-500 to-rose-500",
        badges: ["24/7 Support", "Regular Updates"]
    }
];

export default function WhyChooseSection() {
    return (
        <section className="py-20 px-4 bg-white dark:bg-neutral-950">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
                        Why Choose Us
                    </Badge>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
                        Why Schools Trust Our ERP
                    </h2>
                    <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
                        Built with Indian schools in mind, designed for efficiency, and priced for accessibility
                    </p>
                </motion.div>

                {/* Reasons Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                                <Card className={`h-full border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group relative overflow-hidden ${reason.highlight
                                    ? 'border-green-300 dark:border-green-700 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950'
                                    : 'border-neutral-200 dark:border-neutral-800 hover:border-purple-300 dark:hover:border-purple-700'
                                    }`}>
                                    {/* Highlight Badge */}
                                    {reason.highlight && (
                                        <div className="absolute top-4 right-4">
                                            <Badge className="bg-gradient-to-r from-red-500 to-pink-600 text-white border-0 animate-pulse">
                                                Hot
                                            </Badge>
                                        </div>
                                    )}

                                    {/* Gradient background on hover */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${reason.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                                    <CardContent className="p-8">
                                        {/* Icon */}
                                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${reason.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                            <Icon className="w-8 h-8 text-white" />
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
                                            {reason.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
                                            {reason.description}
                                        </p>

                                        {/* Badges */}
                                        <div className="flex flex-wrap gap-2">
                                            {reason.badges.map((badge, idx) => (
                                                <Badge
                                                    key={idx}
                                                    variant="secondary"
                                                    className="text-xs"
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

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <Card className="border-2 border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950 dark:to-indigo-950">
                        <CardContent className="p-8">
                            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-3">
                                Ready to transform your institution?
                            </h3>
                            <p className="text-neutral-600 dark:text-neutral-300 mb-6">
                                Join hundreds of schools already using our platform
                            </p>
                            <button className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                                Schedule a Free Demo
                            </button>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </section>
    );
}
