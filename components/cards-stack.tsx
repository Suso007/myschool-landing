"use client";
import Image from "next/image";
import { CardStack } from "./ui/card-stack";
import { cn } from "@/lib/utils";
export function CardStackDemo() {
    return (
        <div className="h-[40rem] flex items-center justify-center w-full">
            <CardStack items={CARDS} />
        </div>
    );
}

// Small utility to highlight the content of specific section of a testimonial content
export const Highlight = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <span
            className={cn(
                "font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-700/[0.2] dark:text-emerald-500 px-1 py-0.5",
                className
            )}
        >
            {children}
        </span>
    );
};

const data = [
    {
        category: "Dashboard",
        title: "Insights to every aspect",
        src: "/dashboard.png",
    },
    {
        category: "Staff",
        title: "Manage your staff records",
        src: "/staff.png",
    },
    {
        category: "Student",
        title: "Manage your student records",
        src: "/student.png",
    },
    {
        category: "Time Table",
        title: "Manage your class schedule",
        src: "/timetable.png",
    },
];

const CARDS = data.map((card, index) => {
    return {
        id: index,
        name: card.title,
        designation: card.category,
        content: (<div>
            <Image src={card.src} width={800} height={800} alt={card.title} />
        </div>)
    };
});