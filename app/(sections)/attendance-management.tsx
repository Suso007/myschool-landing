"use client";

import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
    CheckCircle2,
    Clock,
    FileText,
    TrendingUp,
    CreditCard,
    Fingerprint,
    Shield,
    Zap,
    ScanFace,
    Cpu
} from "lucide-react";

export default function AttendanceManagement() {
    const benefits = [
        { icon: CheckCircle2, title: "Instant Updates", description: "Real-time notifications sent to parents." },
        { icon: Shield, title: "Highly Secure", description: "Tamper-proof digital data storage." },
        { icon: FileText, title: "Comprehensive", description: "Multiple report types for management." },
        { icon: Clock, title: "Time Saving", description: "Automated processes save teaching time." },
        { icon: TrendingUp, title: "Discipline", description: "Better institutional accountability." },
        { icon: Zap, title: "Reliable Records", description: "Transparent records for audits." }
    ];

    const keyFeatures = [
        "Simple and user-friendly interface",
        "High accuracy with zero errors",
        "Instant report generation",
        "Cost-effective long-term solution"
    ];

    return (
        <section className="py-8 px-4 bg-background text-foreground overflow-hidden">
            {/* Custom CSS for continuous animations matching your theme */}
            <style>{`
                @keyframes float-icon {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
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
                        Smart Attendance
                    </div>
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight mb-6">
                        Modern Attendance Management
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Automated attendance tracking that eliminates manual errors and provides real-time insights for your institution.
                    </p>
                </motion.div>

                {/* Main Bento Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">

                    {/* Left Column (Spans 7) */}
                    <div className="lg:col-span-7 flex flex-col gap-6">
                        {/* What is it? Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="h-full"
                        >
                            <Card className="h-full group relative overflow-hidden border-border bg-card p-8 rounded-3xl transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_40px_-10px_hsl(var(--primary)/0.1)]">
                                {/* Decorative Background Icon */}
                                <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none">
                                    <Fingerprint className="w-64 h-64 text-primary" />
                                </div>
                                <CardHeader className="p-0 mb-4 relative z-10">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 animate-float-icon group-hover:[animation-play-state:paused]">
                                        <ScanFace className="w-6 h-6 text-primary" />
                                    </div>
                                    <CardTitle className="text-2xl font-bold">What is an Attendance System?</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0 relative z-10 space-y-4 text-muted-foreground leading-relaxed">
                                    <p>
                                        A digital platform that automates the entire attendance tracking process. It helps educational institutions record, monitor, and manage attendance with high accuracy and minimum human intervention.
                                    </p>
                                    <p>
                                        Traditional methods like roll calls consume valuable teaching time and are prone to errors. Our system generates quick, customizable reports, allowing administrators to make data-driven decisions effortlessly.
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Key Features Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <Card className="group border-border bg-card p-8 rounded-3xl transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_40px_-10px_hsl(var(--primary)/0.1)] overflow-hidden">
                                <CardHeader className="p-0 mb-6">
                                    <CardTitle className="text-xl font-bold">Key Features</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {keyFeatures.map((feature, index) => (
                                        <div key={index} className="flex items-center gap-3 p-3 rounded-2xl bg-muted/50 border border-border/50 group-hover:bg-muted transition-colors">
                                            <div className="bg-primary/10 p-1.5 rounded-full">
                                                <CheckCircle2 className="w-4 h-4 text-primary" />
                                            </div>
                                            <span className="text-sm font-medium">{feature}</span>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>

                    {/* Right Column (Spans 5) - How It Works Tabs */}
                    <div className="lg:col-span-5 h-full">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            viewport={{ once: true }}
                            className="h-full"
                        >
                            <Card className="h-full flex flex-col group border-border bg-card p-8 rounded-3xl transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_40px_-10px_hsl(var(--primary)/0.1)]">
                                <CardHeader className="p-0 mb-6">
                                    <CardTitle className="text-2xl font-bold flex items-center gap-3">
                                        <Cpu className="w-6 h-6 text-primary" />
                                        How Does It Work?
                                    </CardTitle>
                                    <CardDescription>Choose between two reliable tracking methods.</CardDescription>
                                </CardHeader>

                                <CardContent className="p-0 flex-1 flex flex-col">
                                    <Tabs defaultValue="biometric" className="w-full flex-1 flex flex-col">
                                        <TabsList className="grid w-full grid-cols-2 mb-6 bg-muted/50 rounded-xl p-1">
                                            <TabsTrigger value="biometric" className="rounded-lg text-xs sm:text-sm font-medium">
                                                Biometric
                                            </TabsTrigger>
                                            <TabsTrigger value="rfid" className="rounded-lg text-xs sm:text-sm font-medium">
                                                RFID System
                                            </TabsTrigger>
                                        </TabsList>

                                        {/* Biometric Tab */}
                                        <TabsContent value="biometric" className="flex-1 mt-0 outline-none animate-in fade-in-50 duration-500">
                                            {/* Sleek Vertical Timeline */}
                                            <div className="relative border-l-2 border-primary/20 ml-3 space-y-6 pb-4">
                                                {[
                                                    "Student's biometric data (fingerprint or face) is securely captured during registration.",
                                                    "Biometric readers are installed at classroom entrances or main access points.",
                                                    "Students place their finger or show their face to the device to mark attendance.",
                                                    "System authenticates identity, eliminating proxy or duplicate attendance."
                                                ].map((text, i) => (
                                                    <div key={i} className="relative pl-6">
                                                        <div className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-background border-2 border-primary flex items-center justify-center text-[10px] font-bold text-primary group-hover:scale-110 transition-transform">
                                                            {i + 1}
                                                        </div>
                                                        <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="mt-4 p-4 rounded-2xl bg-primary/5 border border-primary/10 text-sm text-foreground flex items-start gap-3">
                                                <Shield className="w-5 h-5 text-primary flex-shrink-0" />
                                                <p><strong>Advantage:</strong> Uses unique physical features that cannot be duplicated or shared among students.</p>
                                            </div>
                                        </TabsContent>

                                        {/* RFID Tab */}
                                        <TabsContent value="rfid" className="flex-1 mt-0 outline-none animate-in fade-in-50 duration-500">
                                            <div className="relative border-l-2 border-primary/20 ml-3 space-y-6 pb-4">
                                                {[
                                                    "Each student receives a unique RFID card containing encoded ID details.",
                                                    "RFID readers are placed at classroom entrances or school gates.",
                                                    "When a student taps their RFID card, attendance is automatically recorded.",
                                                    "The system logs exact entry and exit times for accurate tracking."
                                                ].map((text, i) => (
                                                    <div key={i} className="relative pl-6">
                                                        <div className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-background border-2 border-primary flex items-center justify-center text-[10px] font-bold text-primary group-hover:scale-110 transition-transform">
                                                            {i + 1}
                                                        </div>
                                                        <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="mt-4 p-4 rounded-2xl bg-muted border border-border text-sm text-muted-foreground flex items-start gap-3">
                                                <CreditCard className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                                                <p><strong>Note:</strong> While simple and quick, RFID cards can be lost, damaged, or misused if shared.</p>
                                            </div>
                                        </TabsContent>
                                    </Tabs>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>

                {/* Benefits Bottom Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {benefits.map((benefit, index) => {
                        const Icon = benefit.icon;
                        return (
                            <Card key={index} className="group overflow-hidden border-border bg-card rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_0_30px_-5px_hsl(var(--primary)/0.1)]">
                                <CardContent className="p-6 flex items-start gap-4">
                                    <div className="relative flex-shrink-0">
                                        <div className="absolute inset-0 rounded-xl animate-pulse-glow-soft group-hover:[animation-play-state:paused]" />
                                        <div className="relative p-3 rounded-xl bg-background border border-border z-10 group-hover:border-primary/40 transition-colors">
                                            <Icon className="w-5 h-5 text-primary" />
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-foreground mb-1">
                                            {benefit.title}
                                        </h4>
                                        <p className="text-sm text-muted-foreground">
                                            {benefit.description}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </motion.div>

            </div>
        </section>
    );
}