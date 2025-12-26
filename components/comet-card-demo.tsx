"use client";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
export function TypewriterEffectSmoothDemo() {
    const words = [
        {
            text: "The",
        },
        {
            text: "road",
        },
        {
            text: "to",
        },
        {
            text: "freedom",
            className: "text-blue-500 dark:text-blue-500",

        },
        {
            text: "starts",
        },
        {
            text: "from",
        },
        {
            text: "here",
        },
    ];
    return (
        <div className="flex flex-col items-center justify-center h-[40rem]  ">
            <TypewriterEffectSmooth words={words} />
        </div>
    );
}
