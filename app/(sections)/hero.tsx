"use client";
import { motion } from "motion/react";
import { HeroHighlight, Highlight } from "../../components/ui/hero-highlight";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "../../components/ui/button";

export function HeroHighlightDemo() {
    return (
        <HeroHighlight>
            <div>
                <motion.h1
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: [20, -5, 0],
                    }}
                    transition={{
                        duration: 0.5,
                        ease: [0.4, 0.0, 0.2, 1],
                    }}
                    className="text-2xl md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
                >
                    Empower Institution Growth With Our{" "}
                    <Highlight className="text-black dark:text-white">
                        Next Org School Solutions
                    </Highlight>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2, ease: [0.4, 0.0, 0.2, 1] }}
                    className="text-base md:text-lg lg:text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl text-center mx-auto mt-8"
                >
                    Simplify school operations and enhance parent engagement with a comprehensive cloud-based management system covering admissions, academics, fees, HR, transport, and communication — tailored for schools across India.
                </motion.p>
                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4, ease: [0.4, 0.0, 0.2, 1] }}
                    className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-12"
                >
                    <Button className="cursor-pointer group relative px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2">
                        Schedule Demo
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>

                    <Button className="cursor-pointer group px-8 py-4 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white border-2 border-neutral-200 dark:border-neutral-700 rounded-lg font-semibold hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-300 flex items-center gap-2">
                        <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        Explore Features
                    </Button>
                </motion.div>
            </div>
        </HeroHighlight>
    );
}
