"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Hero = () => {
    const [titleNumber, setTitleNumber] = useState(0);

    const titles = useMemo(
        () => [
            "without limits",
            "that actually deliver",
            "built for scale",
            "without the bloat",
            "that just work",
        ],
        []
    );

    const colors = [
        "text-blue-500",
        "text-yellow-500",
        "text-red-500",
        "text-green-500",
        "text-indigo-500",
    ];

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setTitleNumber((prev) =>
                prev === titles.length - 1 ? 0 : prev + 1
            );
        }, 2000);

        return () => clearTimeout(timeoutId);
    }, [titleNumber, titles]);

    return (
        <div className="w-full min-h-screen relative flex items-center justify-center bg-gradient-to-b from-yellow-50 via-white to-transparent dark:from-black dark:via-zinc-900 dark:to-transparent">

            <div className="container mx-auto px-4 relative">
                <div className="flex flex-col items-center justify-center text-center gap-6 min-h-[calc(100vh-5rem)]">

                    <div className="flex flex-col gap-4">

                        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl max-w-2xl tracking-tight font-medium">

                    <span>
                        Email marketing that scales
                    </span>

                            <span className="relative flex w-full justify-center overflow-hidden h-[1.2em] mt-2">
                        {titles.map((title, index) => (
                            <motion.span
                                key={index}
                                className={`absolute font-semibold ${colors[index % colors.length]}`}
                                initial={{ opacity: 0, y: "-100%" }}
                                animate={
                                    titleNumber === index
                                        ? { y: "0%", opacity: 1 }
                                        : {
                                            y:
                                                titleNumber > index
                                                    ? "-100%"
                                                    : "100%",
                                            opacity: 0,
                                        }
                                }
                                transition={{
                                    type: "spring",
                                    stiffness: 60,
                                    damping: 15,
                                }}
                            >
                                {title}
                            </motion.span>
                        ))}
                    </span>
                        </h1>
                        <p className="text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground max-w-xl text-center mx-auto">
                            Build, send, and track emails effortlessly with MailEngine.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 items-center">
                        <Button
                            asChild
                            variant="yellow"
                            size="lg"
                            className="gap-2"
                        >
                            <Link href="/login" className="flex items-center gap-2">
                                Start sending emails
                                <MoveRight className="w-4 h-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};