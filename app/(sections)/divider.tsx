"use client";

import React from "react";

export default function SectionDivider() {
    return (
        <div className="w-full relative flex items-center justify-center py-12 bg-background overflow-hidden">
            {/* Custom CSS for the moving light beam */}
            <style>{`
        @keyframes beam-pan {
          0% { transform: translateX(-100%); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateX(400%); opacity: 0; }
        }
        .animate-beam {
          animation: beam-pan 5s ease-in-out infinite;
        }
      `}</style>

            <div className="w-full max-w-7xl mx-auto px-4 md:px-6 relative">
                {/* Base Gradient Line */}
                <div className="relative h-px w-full bg-gradient-to-r from-transparent via-border to-transparent flex items-center justify-center">

                    {/* Static Center Glow */}
                    <div className="absolute w-48 h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent blur-[2px]" />

                    {/* Animated Light Beam */}
                    <div className="absolute left-0 top-0 h-full w-1/4 bg-gradient-to-r from-transparent via-primary to-transparent animate-beam" />

                    {/* Center Ornament (Glowing Diamond) */}
                    <div className="absolute z-10 w-2.5 h-2.5 rotate-45 border border-primary/40 bg-background shadow-[0_0_15px_hsl(var(--primary)/0.6)]" />
                </div>
            </div>
        </div>
    );
}