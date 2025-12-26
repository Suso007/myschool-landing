"use client";
import { useEffect, useRef, useState } from "react";

interface LazySectionProps {
    children: React.ReactNode;
    threshold?: number;
    rootMargin?: string;
}

export function LazySection({
    children,
    threshold = 0.1,
    rootMargin = "100px"
}: LazySectionProps) {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Once visible, stop observing
                    observer.disconnect();
                }
            },
            {
                threshold,
                rootMargin,
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, [threshold, rootMargin]);

    return (
        <div ref={sectionRef}>
            {isVisible ? children : <div style={{ minHeight: "400px" }} />}
        </div>
    );
}
