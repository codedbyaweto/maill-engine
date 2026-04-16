"use client";

import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { ImgLinks } from "@/assets/assets";
import Image from "next/image";
import { useTheme } from "next-themes";
import { ToggleTheme } from "@/components/shared/darkmodeToggle";

export default function AuthLayout({ children }: { children: ReactNode }) {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const logo = theme === "dark" ? ImgLinks.Logo2 : ImgLinks.Logo1;

    return (
        <div className="min-h-screen w-full flex flex-col bg-background text-foreground px-4 bg-gradient-to-b from-yellow-50 via-white to-transparent dark:from-black dark:via-zinc-900 dark:to-transparent">

            <header className="w-full py-4">
                <div className="max-w-5xl mx-auto flex items-center justify-between">

                    <div className="flex items-center">
                        <Link href="/" className="font-semibold text-xl sm:text-2xl">
                            MailEngine
                        </Link>

                        <Image
                            src={logo}
                            alt="MailEngine logo"
                            width={50}
                            height={50}
                            className="object-contain"
                            unoptimized
                        />
                    </div>

                    <ToggleTheme />
                </div>
            </header>

            <main className="flex items-center justify-center">
                <div className="w-full max-w-md ">
                    {children}
                </div>
            </main>

        </div>
    );
}