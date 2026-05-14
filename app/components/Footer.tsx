"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Permanent_Marker, Kalam } from "next/font/google";
import {
    Mail,
    Phone,
    MapPin,
    Facebook,
    Twitter,
    Linkedin,
    Instagram,
    Youtube
} from "lucide-react";

// Load fonts
const markerFont = Permanent_Marker({ weight: "400", subsets: ["latin"] });
const handwrittenFont = Kalam({ weight: ["400", "700"], subsets: ["latin"] });

const footerLinks = {
    product: [
        { name: "Features", href: "#features" },
        { name: "Pricing", href: "#pricing" },
        { name: "Mobile Apps", href: "#mobile" },
        { name: "Integrations", href: "#integrations" },
    ],
    company: [
        { name: "About Us", href: "#about" },
        { name: "Careers", href: "#careers" },
        { name: "Blog", href: "#blog" },
        { name: "Contact", href: "#contact" },
    ],
    resources: [
        { name: "Documentation", href: "#docs" },
        { name: "Help Center", href: "#help" },
        { name: "API Reference", href: "#api" },
        { name: "Tutorials", href: "#tutorials" },
    ],
    legal: [
        { name: "Privacy Policy", href: "#privacy" },
        { name: "Terms of Service", href: "#terms" },
        { name: "Cookie Policy", href: "#cookies" },
        { name: "Security", href: "#security" },
    ],
};

const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "https://facebook.com", hoverColor: "hover:text-blue-600 hover:border-blue-600", rotate: -6 },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com", hoverColor: "hover:text-sky-500 hover:border-sky-500", rotate: 4 },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com", hoverColor: "hover:text-blue-800 hover:border-blue-800", rotate: -3 },
    { name: "Instagram", icon: Instagram, href: "https://instagram.com", hoverColor: "hover:text-pink-600 hover:border-pink-600", rotate: 7 },
    { name: "YouTube", icon: Youtube, href: "https://youtube.com", hoverColor: "hover:text-red-600 hover:border-red-600", rotate: -5 },
];

export function Footer(props: {
    builtBy?: string;
    builtByLink?: string;
    githubLink?: string;
    twitterLink?: string;
    linkedinLink?: string;
}) {
    return (
        // We use relative positioning so it sits nicely over the global notebook background
        <footer className="relative pt-16 pb-8 overflow-hidden font-sans text-slate-800">

            {/* Thick Hand-Drawn Marker Line acting as the top border */}
            <div className="absolute top-0 left-0 right-0 w-full overflow-hidden opacity-80">
                <svg viewBox="0 0 1200 20" preserveAspectRatio="none" className="w-full h-4 text-slate-800">
                    <path
                        d="M0,10 Q300,20 600,10 T1200,10"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                        className="custom-wiggle-border"
                    />
                </svg>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-8">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8 mb-16">

                    {/* Column 1: Company Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2 flex flex-col items-start"
                    >
                        {/* Stamped Logo Style */}
                        <Link href="/" className="inline-block mb-6">
                            <div className="bg-[#d81b60] text-white px-5 py-2 font-bold tracking-wider text-xl transform -skew-x-6 shadow-sm border-2 border-slate-800 custom-wiggle-border transition-transform hover:-rotate-2">
                                {props.builtBy || "NEXTORG"}
                            </div>
                        </Link>

                        <p className={`${handwrittenFont.className} text-xl text-slate-700 mb-8 max-w-sm leading-relaxed font-bold`}>
                            Empowering educational institutions with comprehensive school management solutions. Streamline operations and enhance student success.
                        </p>

                        {/* Sketched Contact Info */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 group">
                                <div className="w-8 h-8 rounded-full border-2 border-slate-800 flex items-center justify-center custom-wiggle-border group-hover:bg-blue-100 transition-colors">
                                    <Mail className="w-4 h-4 text-blue-700 stroke-[2]" />
                                </div>
                                <a href="mailto:info@nextorg.in" className={`${handwrittenFont.className} text-lg font-bold text-slate-700 hover:text-[#d81b60] hover:underline decoration-wavy transition-colors`}>
                                    info@nextorg.in
                                </a>
                            </div>

                            <div className="flex items-center gap-3 group">
                                <div className="w-8 h-8 rounded-full border-2 border-slate-800 flex items-center justify-center custom-wiggle-border group-hover:bg-green-100 transition-colors">
                                    <Phone className="w-4 h-4 text-green-700 stroke-[2]" />
                                </div>
                                <a href="tel:+917063139083" className={`${handwrittenFont.className} text-lg font-bold text-slate-700 hover:text-[#d81b60] hover:underline decoration-wavy transition-colors`}>
                                    +91 7063139083
                                </a>
                            </div>

                            <div className="flex items-start gap-3 group">
                                <div className="w-8 h-8 rounded-full border-2 border-slate-800 flex items-center justify-center custom-wiggle-border shrink-0 mt-1 group-hover:bg-red-100 transition-colors">
                                    <MapPin className="w-4 h-4 text-red-700 stroke-[2]" />
                                </div>
                                <span className={`${handwrittenFont.className} text-lg font-bold text-slate-700 leading-tight pt-1`}>
                                    Hari Hara Nivas, 6th A Cross, Kondappa Layout, Vignan Nagar <br /> Bengaluru, Karnataka 560037, India
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Quick Links Sections */}
                    {[
                        { title: "Product", links: footerLinks.product, delay: 0.1 },
                        { title: "Company", links: footerLinks.company, delay: 0.2 },
                        { title: "Resources", links: footerLinks.resources, delay: 0.3 },
                        { title: "Legal", links: footerLinks.legal, delay: 0.4 },
                    ].map((section, idx) => (
                        <motion.div
                            key={section.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: section.delay }}
                            viewport={{ once: true }}
                            className="flex flex-col"
                        >
                            <h4 className={`${markerFont.className} text-2xl text-slate-900 mb-6 relative inline-block`}>
                                {section.title}
                                {/* Small drawn underline under the headers */}
                                <svg className="absolute w-full h-2 -bottom-1 left-0 text-[#d81b60] opacity-50" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 50 10 100 2" stroke="currentColor" strokeWidth="2" fill="none" />
                                </svg>
                            </h4>
                            <ul className="space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className={`${handwrittenFont.className} text-xl text-slate-600 font-bold hover:text-[#d81b60] hover:translate-x-1 inline-block transition-all duration-200`}
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Bar: Sketched Separator */}
                <div className="w-full h-px bg-slate-800 border-b border-dashed border-slate-400 opacity-30 mb-8"></div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-6">

                    {/* Copyright */}
                    <p className={`${handwrittenFont.className} text-lg text-slate-600 font-bold text-center md:text-left`}>
                        © {new Date().getFullYear()}{" "}
                        <a href={props.builtByLink} className="text-slate-900 underline decoration-wavy decoration-slate-400 hover:decoration-[#d81b60] hover:text-[#d81b60] transition-colors">
                            {props.builtBy}
                        </a>
                        Nextorg Solutions. All rights reserved.
                    </p>

                    {/* Social Links as "Hand-drawn Stamps" */}
                    <div className="flex items-center gap-3">
                        {socialLinks.map((social, i) => {
                            const Icon = social.icon;
                            return (
                                <motion.a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ rotate: social.rotate }}
                                    whileHover={{ scale: 1.15, rotate: 0 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`p-2.5 rounded-full border-2 border-slate-800 text-slate-800 bg-white shadow-sm custom-wiggle-border ${social.hoverColor} transition-colors duration-300`}
                                    aria-label={social.name}
                                >
                                    <Icon className="w-5 h-5 stroke-[2]" />
                                </motion.a>
                            );
                        })}
                    </div>
                </div>

            </div>
        </footer>
    );
}