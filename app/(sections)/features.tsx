import React, { useState } from "react";
import {
    Shield,
    Search,
    Layers,
    LineChart,
    Blocks,
    Fingerprint,
    ArrowRight,
} from "lucide-react";

export default function FeaturesBento() {

    const [studentInput, setStudentInput] = useState("");

    return (
        <section className="py-8 bg-background text-foreground">
            <div className="container px-4 md:px-6 mx-auto max-w-7xl">
                {/* Header */}
                <div className="flex flex-col items-center justify-center text-center space-y-4 mb-16">
                    <div className="inline-flex items-center rounded-full border border-border bg-muted/50 px-6 py-2 text-sm font-medium">
                        Our Features
                    </div>
                    <h2 className="text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl">
                        Be Part Of The Future With Our Tools
                    </h2>
                    <p className="max-w-[800px] text-muted-foreground md:text-lg/relaxed">
                        Integrating with popular tools can be a great way to boost efficiency
                        and make your work easier. Manage students, staff, and finances seamlessly.
                    </p>
                </div>

                {/* Dynamic Masonry/Bento Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* COLUMN 1 */}
                    <div className="flex flex-col gap-6">
                        {/* Card 1: Data Security (Medium Height) */}
                        <div className="group relative flex flex-col justify-between rounded-3xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_40px_-10px_hsl(var(--primary)/0.1)] overflow-hidden h-[380px]">
                            <div className="relative z-10">
                                <h3 className="text-2xl font-semibold mb-3">Data Security</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Protect sensitive school data with enterprise-grade security protocols, ensuring information remains confidential.
                                </p>
                            </div>
                            <div className="relative flex-1 mt-2 flex items-end justify-center">
                                {/* Visual */}
                                <div className="w-full h-32 relative flex items-center justify-center">
                                    {/* Glowing background lines */}
                                    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                                    <div className="absolute w-48 h-48 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-500" />
                                    {/* Floating Shield/Folder */}
                                    <div className="relative z-10 bg-background border border-border rounded-2xl p-4 shadow-lg group-hover:-translate-y-8 transition-transform duration-500">
                                        <Shield className="w-8 h-8 text-foreground" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Card 2: Real-time Analytics (Tall Height) */}
                        <div className="group relative flex flex-col justify-between rounded-3xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_40px_-10px_hsl(var(--primary)/0.1)] overflow-hidden h-[460px]">
                            <div className="relative z-10">
                                <h3 className="text-2xl font-semibold mb-3">Real-time Analytics and Reporting</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Empower your administration with the information needed to optimize strategies and adapt quickly.
                                </p>
                            </div>
                            <div className="relative flex-1 mt-6 flex items-end">
                                {/* Visual */}
                                <div className="w-full h-full relative border-b border-border flex items-end gap-2 pb-4">
                                    {/* Simulated Chart */}
                                    <div className="absolute top-1/2 left-4 bg-background border border-border rounded-lg px-3 py-1.5 text-xs font-medium flex items-center gap-2 shadow-sm z-20 group-hover:-translate-y-1 transition-transform">
                                        Students <span className="bg-muted px-1.5 py-0.5 rounded text-foreground">123</span>
                                    </div>
                                    {/* Background Bars */}
                                    {[30, 70, 45, 90, 60].map((h, i) => (
                                        <div key={i} className="flex-1 rounded-t-lg bg-primary/5 border border-primary/10 group-hover:bg-primary/10 transition-colors duration-500 relative overflow-hidden" style={{ height: `${h}%` }}>
                                            <div className="absolute bottom-0 w-full bg-primary/20 h-0 group-hover:h-full transition-all duration-700 ease-in-out" style={{ transitionDelay: `${i * 100}ms` }} />
                                        </div>
                                    ))}
                                    {/* Wavy Line (Simulated) */}
                                    <svg className="absolute inset-0 w-full h-full text-primary/40 drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)]" preserveAspectRatio="none" viewBox="0 0 100 100">
                                        <path d="M0,70 C20,70 30,30 50,45 C70,60 80,10 100,40" fill="none" stroke="currentColor" strokeWidth="1.5" className="group-hover:stroke-primary transition-colors duration-500" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* COLUMN 2 */}
                    <div className="flex flex-col gap-6">
                        {/* Card 3: Student Onboard (Short Height) */}
                        <div className="group relative flex flex-col justify-between rounded-3xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_40px_-10px_hsl(var(--primary)/0.1)] overflow-hidden h-[260px]">
                            <div className="relative z-10 text-center flex flex-col items-center">
                                <h3 className="text-2xl font-semibold mb-3">Student Onboard</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed max-w-[250px]">
                                    Streamline admissions with digital forms and automated workflows.
                                </p>
                            </div>
                            <div className="relative flex-1 mt-6 flex items-center justify-center">
                                {/* Visual - Input Bar */}
                                <form
                                    onSubmit={(e) => { e.preventDefault(); console.log("Submitted:", studentInput); }}
                                    className="w-full relative flex items-center group/form"
                                >
                                    <input
                                        type="text"
                                        value={studentInput}
                                        onChange={(e) => setStudentInput(e.target.value)}
                                        placeholder="Enter student ID..."
                                        className="w-full bg-background border border-border rounded-full py-3 pl-12 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all shadow-sm"
                                    />
                                    <Search className="w-4 h-4 text-muted-foreground absolute left-4" />
                                    <button
                                        type="submit"
                                        className="absolute right-2 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground rounded-full p-1.5 transition-colors"
                                    >
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Card 4: Fees Collection (Tall Height) */}
                        <div className="group relative flex flex-col justify-between rounded-3xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_40px_-10px_hsl(var(--primary)/0.1)] overflow-hidden h-[580px]">
                            <div className="relative z-10 text-center flex flex-col items-center">
                                <h3 className="text-2xl font-semibold mb-3">Fees Collection</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Automate fee tracking and provide multiple secure payment gateways for parents to easily manage tuition.
                                </p>
                            </div>
                            <div className="relative flex-1 mt-10 flex items-center justify-center">
                                {/* Visual - Stacked Glass Plates */}
                                <div className="relative w-48 h-64">
                                    {/* Back Plate */}
                                    <div className="absolute inset-0 bg-background border border-border rounded-2xl shadow-sm rotate-[15deg] translate-y-8 opacity-40 group-hover:rotate-[20deg] group-hover:translate-x-4 transition-all duration-500 ease-out" />
                                    {/* Middle Plate */}
                                    <div className="absolute inset-0 bg-background border border-border rounded-2xl shadow-sm rotate-[5deg] translate-y-4 opacity-70 group-hover:rotate-[10deg] group-hover:translate-x-2 transition-all duration-500 ease-out" />
                                    {/* Front Plate */}
                                    <div className="absolute inset-0 bg-background border border-primary/20 rounded-2xl shadow-xl flex items-center justify-center -rotate-[5deg] group-hover:rotate-0 group-hover:-translate-y-2 transition-all duration-500 ease-out z-10 backdrop-blur-sm">
                                        <Layers className="w-12 h-12 text-foreground" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* COLUMN 3 */}
                    <div className="flex flex-col gap-6">
                        {/* Card 5: Integration (Medium Height) */}
                        <div className="group relative flex flex-col justify-between rounded-3xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_40px_-10px_hsl(var(--primary)/0.1)] overflow-hidden h-[380px]">
                            <div className="relative z-10">
                                <h3 className="text-2xl font-semibold mb-3">Integration</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Seamlessly integrate with popular tools to enhance productivity and streamline your workflow.
                                </p>
                            </div>
                            <div className="relative flex-1 mt-6 flex items-center justify-between px-2">
                                {/* Visual - API Nodes */}
                                <div className="w-14 h-14 bg-background border border-border rounded-xl shadow-sm flex items-center justify-center relative z-10 group-hover:-translate-x-1 transition-transform">
                                    <Blocks className="w-6 h-6 text-foreground" />
                                </div>

                                {/* Connecting Lines */}
                                <div className="flex-1 h-24 relative flex flex-col justify-center gap-6 px-4">
                                    <div className="w-full h-px bg-gradient-to-r from-border via-primary/40 to-border relative">
                                        <div className="absolute left-0 -top-1 w-2 h-2 rounded-full bg-primary/50 group-hover:left-full transition-all duration-1000 ease-in-out" />
                                    </div>
                                    <div className="w-full h-px bg-gradient-to-l from-border via-primary/40 to-border relative">
                                        <div className="absolute right-0 -top-1 w-2 h-2 rounded-full bg-primary/50 group-hover:right-full transition-all duration-1000 ease-in-out delay-200" />
                                    </div>
                                </div>

                                <div className="w-14 h-14 bg-background border border-border rounded-xl shadow-sm flex items-center justify-center relative z-10 group-hover:translate-x-1 transition-transform">
                                    <span className="text-xs font-bold font-mono">API</span>
                                </div>
                            </div>
                        </div>

                        {/* Card 6: Attendance (Tall Height) */}
                        <div className="group relative flex flex-col justify-between rounded-3xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_40px_-10px_hsl(var(--primary)/0.1)] overflow-hidden h-[460px]">
                            <div className="relative z-10">
                                <h3 className="text-2xl font-semibold mb-3">Attendance Management</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Keep track of daily attendance for students and staff to ensure accurate records and enriching experiences.
                                </p>
                            </div>
                            <div className="relative flex-1 mt-6 flex items-center justify-center">
                                {/* Visual - Concentric shapes matching the bottom right of screenshot */}
                                <div className="relative w-40 h-40 flex items-center justify-center">
                                    {/* Outer Diamond */}
                                    <div className="absolute inset-0 border border-primary/10 rotate-45 rounded-xl group-hover:scale-125 transition-transform duration-700 ease-out" />
                                    {/* Inner Diamond */}
                                    <div className="absolute inset-4 border border-primary/20 rotate-45 rounded-xl group-hover:scale-110 transition-transform duration-500 ease-out" />

                                    {/* Center Glow */}
                                    <div className="absolute inset-0 bg-primary/5 rounded-full blur-xl group-hover:bg-primary/10 transition-colors" />

                                    {/* Core Icon */}
                                    <div className="relative z-10 bg-background border border-border p-4 rounded-full shadow-lg group-hover:shadow-[0_0_20px_-5px_hsl(var(--primary)/0.3)] transition-all">
                                        <Fingerprint className="w-8 h-8 text-foreground" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}