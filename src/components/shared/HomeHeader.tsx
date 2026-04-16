"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ToggleTheme } from "@/components/shared/darkmodeToggle";
import Image from "next/image";
import { ImgLinks } from "@/assets/assets";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

export const Header = () => {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const logo =
        theme === "dark"
            ? ImgLinks.Logo2
            : ImgLinks.Logo1;

    const navLinks = [
        { name: "Features", href: "#features" },
        { name: "Benefits", href: "#benefits" },
        { name: "Pricing", href: "#pricing" },
        { name: "FAQ", href: "#faq" },
    ];

    return (
        <header className="w-full z-40 fixed top-0 left-0 bg-background border-b border-gray-200 dark:border-blue-500/10">
            <div className="container mx-auto min-h-20 grid grid-cols-3 items-center px-4">

                <div className="flex items-center">
                    <Link href="/" className="font-semibold text-lg sm:text-2xl">
                        MailEngine
                    </Link>

                    <Image
                        src={logo}
                        alt="Logo"
                        width={40}
                        height={40}
                        className="sm:w-[60px] sm:h-[60px]"
                        unoptimized
                    />
                </div>

                <div className="hidden md:flex items-center justify-center gap-6 text-sm">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="flex items-center gap-1 hover:underline underline-offset-4"
                        >
                            {link.name}
                            <ChevronDown className="w-3 h-3 opacity-70" />
                        </a>
                    ))}
                </div>

                {/* RIGHT — ACTIONS */}
                <div className="hidden md:flex items-center justify-end gap-4">
                    <ToggleTheme />

                    <Button variant="outline" asChild>
                        <Link href="/login">Sign in</Link>
                    </Button>
                </div>

                <div className="flex items-center justify-end gap-2 md:hidden col-span-2">
                    <ToggleTheme />

                    <button onClick={() => setOpen((prev) => !prev)}>
                        {open ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {open && (
                <div className="md:hidden px-4 pb-4 space-y-4 bg-background border-t border-gray-200 dark:border-blue-500/10">

                    <div className="flex flex-col gap-3 text-sm">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setOpen(false)}
                                className="flex items-center justify-between"
                            >
                                {link.name}
                                <ChevronDown className="w-3 h-3 opacity-70" />
                            </a>
                        ))}
                    </div>

                    <Button className="w-full" variant="outline" asChild>
                        <Link href="/login" onClick={() => setOpen(false)}>
                            Sign in
                        </Link>
                    </Button>
                </div>
            )}
        </header>
    );
};