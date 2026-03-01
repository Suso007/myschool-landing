"use client";

import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import {
    Smartphone,
    BookOpen,
    ClipboardCheck,
    DollarSign,
    FileText,
    Calendar,
    UserCircle2,
    Users,
    Palette,
    Settings,
    ShieldCheck,
    ArrowRight,
    Store,
    Check
} from "lucide-react";

const appsData = [
    {
        name: "Student & Parent App",
        icon: UserCircle2,
        description: "Empower your students and their parents with instant, on-the-go access to their entire academic journey. Keep everyone aligned and informed seamlessly.",
        features: [
            "View and submit assignments directly",
            "Real-time notifications for attendance & grades",
            "Secure online fee payments with receipts",
            "Access to digital library materials"
        ],
        visualPills: [
            { icon: DollarSign, text: "Fee Paid", top: "15%", left: "5%", delay: "0s" },
            { icon: Calendar, text: "Present", bottom: "15%", right: "5%", delay: "1s" },
            { icon: FileText, text: "A+ Grade", top: "45%", left: "-2%", delay: "2s" }
        ]
    },
    {
        name: "Faculty App",
        icon: Users,
        description: "Equip your teachers with powerful digital tools to manage their classrooms directly from their smartphones, from anywhere on campus.",
        features: [
            "Mark digital attendance in seconds",
            "Enter assessments and publish grades",
            "Share study materials and announcements",
            "Apply for leaves and track approvals"
        ],
        visualPills: [
            { icon: ClipboardCheck, text: "Attendance Done", top: "20%", right: "2%", delay: "0.5s" },
            { icon: BookOpen, text: "Notes Uploaded", bottom: "20%", left: "10%", delay: "1.5s" },
            { icon: Users, text: "Class X-B", top: "50%", right: "-2%", delay: "2.5s" }
        ]
    },
    {
        name: "White-Label Solution",
        icon: Palette,
        description: "We don't just give you a generic app; we build, publish, and maintain a dedicated application under your school's exact name and branding.",
        features: [
            "Published natively on App Store & Google Play",
            "Customized with your school's logo & colors",
            "Fully managed updates and bug fixes",
            "Strict compliance with security standards"
        ],
        visualPills: [
            { icon: Store, text: "App Store Live", top: "15%", left: "8%", delay: "0s" },
            { icon: ShieldCheck, text: "Secure", bottom: "25%", right: "5%", delay: "1s" },
            { icon: Settings, text: "Auto-Updated", top: "60%", left: "5%", delay: "2s" }
        ]
    }
];

export default function MobileAppsShowcase() {
    return (
        <section className="py-16 px-4 bg-background text-foreground overflow-hidden">
            {/* Custom CSS for seamless floating animations */}
            <style>{`
                @keyframes float-slow {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-10px) rotate(2deg); }
                }
                @keyframes float-medium {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-12px) rotate(-2deg); }
                }
                @keyframes pulse-glow-bg {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 0.6; transform: scale(1.05); }
                }
                .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
                .animate-float-medium { animation: float-medium 5s ease-in-out infinite; }
                .animate-pulse-glow-bg { animation: pulse-glow-bg 4s ease-in-out infinite; }
            `}</style>

            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 relative z-10"
                >
                    <Badge variant="outline" className="mb-4 px-3 py-1 rounded-full border-primary/30 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wider">
                        <Smartphone className="w-3.5 h-3.5 mr-1.5 inline-block" />
                        Native Mobile Experience
                    </Badge>
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight mb-4">
                        Your School, <span className="text-primary italic">Your App.</span>
                    </h2>
                    <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                        Provide a world-class mobile experience to your students and staff. Customized with your branding, completely managed by us.
                    </p>
                </motion.div>

                {/* Alternating Feature Rows */}
                <div className="space-y-16 lg:space-y-24">
                    {appsData.map((app, index) => {
                        const isEven = index % 2 === 0;
                        const AppIcon = app.icon;

                        return (
                            <div key={app.name} className={`flex flex-col gap-8 lg:gap-12 items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>

                                {/* Text Content Side */}
                                <motion.div
                                    initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    className="flex-1 space-y-5"
                                >
                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-1">
                                        <AppIcon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                                        {app.name}
                                    </h3>
                                    <p className="text-base text-muted-foreground leading-relaxed">
                                        {app.description}
                                    </p>

                                    <ul className="space-y-3 pt-2">
                                        {app.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-3 group">
                                                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mt-0.5 group-hover:bg-primary transition-colors duration-300">
                                                    <Check className="w-3 h-3 text-primary group-hover:text-primary-foreground" />
                                                </div>
                                                <span className="text-sm text-foreground/90 font-medium">
                                                    {feature}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>

                                {/* Abstract Visual Side */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    className="flex-1 w-full max-w-md lg:max-w-none relative"
                                >
                                    {/* Shorter, wider container for compactness */}
                                    <div className="relative w-full aspect-video md:aspect-[16/10] rounded-3xl bg-gradient-to-br from-primary/5 to-transparent border border-primary/10 flex items-center justify-center overflow-visible">

                                        {/* Background Ambient Glow */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-48 h-48 bg-primary/20 rounded-full blur-[60px] animate-pulse-glow-bg" />
                                        </div>

                                        {/* Giant Center Icon */}
                                        <div className="relative z-10 text-primary/30 transform -rotate-6 transition-transform hover:rotate-0 duration-500">
                                            <AppIcon className="w-32 h-32 md:w-40 md:h-40" strokeWidth={1} />
                                        </div>

                                        {/* Floating Abstract UI Pills */}
                                        {app.visualPills.map((pill, idx) => {
                                            const PillIcon = pill.icon;
                                            return (
                                                <div
                                                    key={idx}
                                                    className="absolute z-20 animate-float-medium flex items-center gap-2 bg-background/90 backdrop-blur-md border border-border px-3 py-2 rounded-xl shadow-lg shadow-primary/5"
                                                    style={{
                                                        top: pill.top,
                                                        bottom: pill.bottom,
                                                        left: pill.left,
                                                        right: pill.right,
                                                        animationDelay: pill.delay
                                                    }}
                                                >
                                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                                                        <PillIcon className="w-3 h-3 text-primary" />
                                                    </div>
                                                    <span className="font-semibold text-xs text-foreground whitespace-nowrap">
                                                        {pill.text}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            </div>
                        );
                    })}
                </div>

                {/* Borderless Bold CTA Section */}
                {/* <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="mt-20 relative text-center"
                >
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[100%] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

                    <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                        <h3 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
                            Ready to launch your own app?
                        </h3>
                        <p className="text-base text-muted-foreground">
                            Give your institution the digital presence it deserves. Contact us today to start the white-labeling and deployment process.
                        </p>

                        <div className="pt-2">
                            <button className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground rounded-full font-bold shadow-[0_0_30px_-10px_hsl(var(--primary)/0.5)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_-10px_hsl(var(--primary)/0.6)] overflow-hidden">
                                <span className="relative z-10 text-sm md:text-base">Get Your Custom App</span>
                                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                            </button>
                        </div>
                    </div>
                </motion.div> */}
            </div>
        </section>
    );
}