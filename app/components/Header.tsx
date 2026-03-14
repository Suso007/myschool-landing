"use client";

import React, { useState } from 'react';
import { Mail, Menu, PhoneCall, X } from 'lucide-react';
import { Permanent_Marker } from 'next/font/google';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { IconBrandWhatsapp } from '@tabler/icons-react';

const markerFont = Permanent_Marker({ weight: '400', subsets: ['latin'] });

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const { scrollY } = useScroll();

    // This hook listens to scroll events to hide/show the header
    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        // If scrolling down AND passed the 100px mark, hide it. Otherwise, show it.
        if (latest > previous && latest > 100) {
            setIsHidden(true);
            setIsMobileMenuOpen(false); // Auto-close mobile menu when scrolling down
        } else {
            setIsHidden(false);
        }
    });

    return (
        <motion.header
            className="fixed top-0 z-50 w-full pt-2 bg-[#f9faf8]/95 backdrop-blur-sm"
            initial="initial"
            animate={isHidden ? "hidden" : "visible"}
            variants={{
                initial: { y: -100 },
                visible: { y: 0, transition: { duration: 0.4, ease: "easeOut" } },
                hidden: { y: "-100%", transition: { duration: 0.3, ease: "easeInOut" } }
            }}
        >
            <div className="max-w-7xl mx-auto px-6 pt-3 pb-3 flex justify-between items-center relative z-20">

                {/* Logo with Spring Entrance */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
                    animate={{ opacity: 1, scale: 1, rotate: -6 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.1 }}
                    className="bg-[#d81b60] text-white px-4 py-1.5 font-bold tracking-wider text-sm shadow-sm"
                >
                    NEXTORG
                </motion.div>

                {/* Desktop Nav with Staggered Entrance & Animated Underlines */}
                <nav className="hidden md:flex items-center gap-8">
                    {['Features', 'Solutions', 'Contact'].map((item, i) => (
                        <motion.div
                            key={item}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + (i * 0.1), type: "spring", stiffness: 120 }}
                        >
                            <Link
                                href={`#${item.toLowerCase()}`}
                                className={`${markerFont.className} relative text-sm tracking-widest uppercase group pb-1 text-slate-700 hover:text-[#d81b60] transition-colors`}
                            >
                                {item}
                                {/* Animated underline sliding in from the left */}
                                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-[#d81b60] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out" />
                            </Link>
                        </motion.div>
                    ))}
                    <div className="flex items-center gap-6">
                        {[
                            {
                                icon: PhoneCall,
                                href: "tel:+917063139083", // Replace with your actual phone number
                                hoverColor: "hover:text-blue-600"
                            },
                            {
                                icon: IconBrandWhatsapp,
                                href: "https://wa.me/917063139083", // Replace with your actual WhatsApp number (include country code, no +)
                                hoverColor: "hover:text-green-500"
                            },
                            {
                                icon: Mail,
                                href: "mailto:info@nextorg.in", // Replace with your actual email
                                hoverColor: "hover:text-[#d81b60]" // Uses your signature magenta
                            }
                        ].map((contact, index) => {
                            const Icon = contact.icon;

                            return (
                                <motion.a
                                    key={index}
                                    href={contact.href}
                                    target={contact.href.startsWith("http") ? "_blank" : undefined}
                                    rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                    // 1. One-by-one dropping animation
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        delay: 0.2 + (index * 0.15), // Staggers each icon by 0.15s
                                        type: "spring",
                                        stiffness: 150,
                                        damping: 12
                                    }}
                                    // 2. Hover bounce/wiggle effect
                                    whileHover={{ scale: 1.2, rotate: index % 2 === 0 ? 10 : -10 }}
                                    whileTap={{ scale: 0.9 }}
                                    // 3. Hover color animation
                                    className={`text-slate-700 transition-colors duration-300 ${contact.hoverColor}`}
                                >
                                    <Icon className="w-5 h-5 cursor-pointer stroke-[2.5]" />
                                </motion.a>
                            );
                        })}
                    </div>
                </nav>

                {/* Mobile Menu Toggle (Fade in) */}
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="md:hidden p-2 text-slate-800 hover:text-[#d81b60] transition-colors relative group"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </motion.button>
            </div>

            {/* Mobile Nav Dropdown (Animated) */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-[#f9faf8] border-b-2 border-[#d81b60] shadow-xl overflow-hidden absolute w-full z-10"
                    >
                        <nav className="flex flex-col px-6 py-4 gap-4">
                            {['Features', 'Solutions', 'Contact'].map((item) => (
                                <Link
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`${markerFont.className} group relative inline-block text-lg tracking-widest uppercase py-2 border-b border-slate-200 text-slate-700 hover:text-[#d81b60]`}
                                >
                                    <span className="relative z-10">{item}</span>
                                    {/* Mobile hover highlight effect */}
                                    <span className="absolute left-0 bottom-0 w-8 h-[3px] bg-[#d81b60] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out" />
                                </Link>
                            ))}
                            <div className="flex justify-between">
                                <PhoneCall className="w-5 h-5 cursor-pointer" />
                                <IconBrandWhatsapp className="w-5 h-5 cursor-pointer" />
                                <Mail className="w-5 h-5 cursor-pointer" />
                            </div>
                        </nav>

                    </motion.div>
                )}
            </AnimatePresence>

            {/* Double red rule - Drawing Animation */}
            <div className="w-full mt-2 opacity-90 relative z-20 flex flex-col items-start">
                <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                    style={{ height: '3px', backgroundColor: '#d81b60' }}
                />
                <div style={{ height: '2px', backgroundColor: 'transparent', width: '100%' }} />
                <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                    style={{ height: '2px', backgroundColor: '#d81b60' }}
                />
            </div>
        </motion.header>
    );
}