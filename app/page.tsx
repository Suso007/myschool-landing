import Header from './components/Header';
import HeroSection from './components/Hero';
import FeaturesSection from './components/Features';
import {
  Backpack,
  Pencil,
  BookOpen,
  Eraser,
  Ruler,
  Compass,
  Calculator,
  Scissors,
  Coffee // Using coffee as a stand-in for a water bottle/flask!
} from 'lucide-react';
import MobileAppsShowcase from './components/Apps';
import AttendanceManagement from './components/Attendance';
import WhyChooseSection from './components/WhyUs';
import ContactSection from './components/Contact';
import { Footer } from './components/Footer';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col" style={{ backgroundColor: '#f9faf8' }}>

      {/* Global Notebook Paper Background & Desk Elements */}
      <div
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        style={{
          // Combines the edge shadow, paper texture, and ruled lines
          backgroundImage: `
            linear-gradient(90deg, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0) 4%, rgba(0,0,0,0) 96%, rgba(0,0,0,0.03) 100%),
            url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.02'/%3E%3C/svg%3E"),
            repeating-linear-gradient(transparent, transparent 39px, rgba(203, 213, 225, 0.4) 39px, rgba(203, 213, 225, 0.4) 40px)
          `,
          backgroundPositionY: '0px, 0px, 10px'
        }}
      >
        {/* --- SCATTERED SCHOOL SUPPLIES (Faded out to act as background art) --- */}

        {/* Top Left Area */}
        <Pencil className="absolute top-[10%] left-[5%] w-16 h-16 text-slate-400 opacity-20 -rotate-45 stroke-[1]" />
        <Scissors className="absolute top-[25%] left-[2%] w-12 h-12 text-slate-400 opacity-15 rotate-[15deg] stroke-[1]" />

        {/* Top Right Area */}
        <Backpack className="absolute top-[15%] right-[5%] w-24 h-24 text-slate-400 opacity-15 rotate-12 stroke-[1]" />
        <Ruler className="absolute top-[5%] right-[15%] w-14 h-14 text-slate-400 opacity-20 rotate-[105deg] stroke-[1]" />

        {/* Middle Left Area */}
        <BookOpen className="absolute top-[50%] left-[3%] w-20 h-20 text-slate-400 opacity-15 -rotate-12 stroke-[1]" />

        {/* Middle Right Area */}
        <Compass className="absolute top-[60%] right-[4%] w-16 h-16 text-slate-400 opacity-20 rotate-45 stroke-[1]" />

        {/* Bottom Left Area */}
        <Eraser className="absolute bottom-[15%] left-[8%] w-12 h-12 text-slate-400 opacity-20 -rotate-[20deg] stroke-[1]" />
        <Coffee className="absolute bottom-[5%] left-[3%] w-16 h-16 text-slate-400 opacity-15 rotate-6 stroke-[1]" />

        {/* Bottom Right Area */}
        <Calculator className="absolute bottom-[10%] right-[6%] w-20 h-20 text-slate-400 opacity-15 rotate-[-15deg] stroke-[1]" />

        {/* Occasional hand-drawn doodles (using text for simplicity) */}
        <span className="absolute top-[35%] right-[10%] text-slate-400 opacity-20 text-4xl font-mono rotate-12">∑</span>
        <span className="absolute bottom-[30%] left-[12%] text-slate-400 opacity-20 text-5xl font-mono -rotate-12">π</span>
        <span className="absolute top-[70%] left-[50%] text-slate-400 opacity-20 text-3xl font-mono rotate-45">E=mc²</span>
        <span className="absolute bottom-[40%] right-[15%] text-slate-400 opacity-20 text-4xl font-mono rotate-[-30deg]">√x</span>
      </div>

      {/* The Smart Sticky Header */}
      <Header />

      {/* Page Content */}
      <div className="relative z-10">
        <HeroSection />
        <FeaturesSection />
        <MobileAppsShowcase />
        <AttendanceManagement />
        <WhyChooseSection />
        <ContactSection />
        <Footer />
      </div>

    </main>
  );
}