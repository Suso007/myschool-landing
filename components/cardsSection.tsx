import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";

const CARDS = [
    { id: 1, name: "Neural Interface", color: "#6366f1", description: "Advanced AI Integration" },
    { id: 2, name: "Quantum Ledger", color: "#a855f7", description: "Blockchain Technology" },
    { id: 3, name: "Aether OS", color: "#ec4899", description: "Cloud Operating System" },
    { id: 4, name: "Cyber Sync", color: "#06b6d4", description: "Real-time Collaboration" },
    { id: 5, name: "Void Shell", color: "#10b981", description: "Security Framework" },
    { id: 6, name: "Bio Data", color: "#f59e0b", description: "Analytics Platform" },
];

export default function ThreeDSlider() {
    const [activeIdx, setActiveIdx] = useState(0);
    const [isInView, setIsInView] = useState(false);
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null);

    // Intersection Observer for scroll-triggered animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Drag Logic: Calculate direction and update index
    const handleDragEnd = (e: any, info: any) => {
        const threshold = 50;
        if (info.offset.x < -threshold && activeIdx < CARDS.length - 1) {
            setActiveIdx(prev => prev + 1);
        } else if (info.offset.x > threshold && activeIdx > 0) {
            setActiveIdx(prev => prev - 1);
        }
    };

    // Scroll Logic: Using the wheel to slide
    const handleWheel = (e: React.WheelEvent) => {
        // Prevent default only if we're actually navigating
        if (Math.abs(e.deltaX) > 20 || Math.abs(e.deltaY) > 20) {
            if ((e.deltaX > 20 || e.deltaY > 20) && activeIdx < CARDS.length - 1) {
                setActiveIdx(prev => prev + 1);
            } else if ((e.deltaX < -20 || e.deltaY < -20) && activeIdx > 0) {
                setActiveIdx(prev => prev - 1);
            }
        }
    };

    // Mouse position tracking for 3D tilt effect
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardId: number) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePosition({ x: x * 20, y: y * 20 });
    };

    const handleCardMouseLeave = () => {
        setMousePosition({ x: 0, y: 0 });
        setHoveredCard(null);
    };

    return (
        <div
            ref={sectionRef}
            className="w-full flex justify-center items-center py-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden"
        >
            {/* Background decorative elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />

            <div className="w-full relative h-[350px] md:h-[500px] lg:h-[600px] perspective-[2000px] z-10">
                {/* Title with entrance animation */}
                <motion.div
                    className="text-center mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -20 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
                        Explore Our <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">Projects</span>
                    </h2>
                    <p className="text-slate-400 text-sm md:text-base">Drag, scroll, or hover to interact</p>
                </motion.div>

                <div
                    ref={containerRef}
                    onWheel={handleWheel}
                    className="w-full h-full overflow-hidden cursor-grab active:cursor-grabbing flex items-center justify-center relative"
                >
                    <AnimatePresence initial={false}>
                        {CARDS.map((card, i) => {
                            const distance = i - activeIdx;
                            const isVisible = Math.abs(distance) <= 2;
                            const isHovered = hoveredCard === card.id;
                            const isActive = distance === 0;

                            if (!isVisible) return null;

                            return (
                                <motion.div
                                    key={card.id}
                                    drag="x"
                                    dragConstraints={{ left: 0, right: 0 }}
                                    onDragEnd={handleDragEnd}
                                    onMouseMove={(e) => {
                                        setHoveredCard(card.id);
                                        handleCardMouseMove(e, card.id);
                                    }}
                                    onMouseLeave={handleCardMouseLeave}
                                    initial={{ opacity: 0, scale: 0.8, z: -500 }}
                                    animate={{
                                        x: distance * 300,
                                        scale: isActive ? 1.05 : 1 - Math.abs(distance) * 0.1,
                                        z: -Math.abs(distance) * 200,
                                        rotateY: distance * -20 + (isHovered && isActive ? mousePosition.x : 0),
                                        rotateX: isHovered && isActive ? -mousePosition.y : 0,
                                        opacity: isInView ? 1 - Math.abs(distance) * 0.3 : 0,
                                        zIndex: 100 - Math.abs(distance),
                                    }}
                                    whileHover={{
                                        scale: 1.1,
                                        transition: { duration: 0.2 }
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 200,
                                        damping: 25,
                                        opacity: { duration: 0.6 }
                                    }}
                                    style={{
                                        background: `linear-gradient(135deg, ${card.color} 0%, ${card.color}dd 100%)`,
                                        transformStyle: "preserve-3d",
                                        boxShadow: isHovered
                                            ? `0 20px 60px ${card.color}66, 0 0 40px ${card.color}44`
                                            : `0 10px 40px rgba(0,0,0,0.5)`,
                                    }}
                                    className="absolute w-[240px] h-[320px] md:w-[300px] md:h-[420px] rounded-3xl flex flex-col justify-between p-8 border border-white/20 backdrop-blur-sm transition-shadow duration-300"
                                >
                                    {/* Glassmorphism overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl pointer-events-none" />

                                    {/* Top badge */}
                                    <div className="relative z-10">
                                        <div className="inline-block bg-black/30 backdrop-blur-xl px-3 py-1 rounded-full border border-white/10">
                                            <p className="text-white/60 font-mono text-xs">PROJECT_0{i + 1}</p>
                                        </div>
                                    </div>

                                    {/* Center icon/symbol */}
                                    <div className="relative z-10 flex items-center justify-center flex-1">
                                        <motion.div
                                            className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20"
                                            animate={{
                                                rotate: isHovered ? 360 : 0,
                                                scale: isHovered ? 1.1 : 1,
                                            }}
                                            transition={{ duration: 0.6 }}
                                        >
                                            <span className="text-4xl">✦</span>
                                        </motion.div>
                                    </div>

                                    {/* Bottom info */}
                                    <div className="relative z-10">
                                        <div className="bg-black/40 backdrop-blur-xl p-4 rounded-2xl border border-white/10">
                                            <p className="text-white/50 text-xs mb-1">{card.description}</p>
                                            <h3 className="text-white font-bold text-xl tracking-tight">{card.name}</h3>
                                        </div>
                                    </div>

                                    {/* Hover indicator */}
                                    {isActive && (
                                        <motion.div
                                            className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-xs"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.5 }}
                                        >
                                            ← Drag to explore →
                                        </motion.div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {/* Navigation dots */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                    {CARDS.map((_, i) => (
                        <motion.button
                            key={i}
                            onClick={() => setActiveIdx(i)}
                            className={`h-2 rounded-full transition-all duration-300 ${i === activeIdx ? 'w-8 bg-white' : 'w-2 bg-white/20 hover:bg-white/40'
                                }`}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}