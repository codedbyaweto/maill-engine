"use client";

import Link from "next/link";
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
    FaYoutube,
    FaPinterestP,
} from "react-icons/fa";

export const Footer = () => {
    return (
        <footer className="w-full bg-[#FFD54A] dark:bg-[#00004f] dark:text-white text-black py-14 md:py-20 lg:py-28">

            <div className="container mx-auto px-4 flex flex-col gap-12">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-sm">

                    <div className="flex flex-col gap-3">
                        <p className="font-semibold">Get the app</p>

                        <Link href="#" className="hover:underline">
                            Download on the App Store
                        </Link>
                        <Link href="#" className="hover:underline">
                            Get it on Google Play
                        </Link>
                    </div>

                    <div className="flex flex-col gap-3">
                        <p className="font-semibold">Follow us</p>

                        <div className="flex gap-4">
                            {[
                                FaFacebookF,
                                FaTwitter,
                                FaInstagram,
                                FaLinkedinIn,
                                FaYoutube,
                                FaPinterestP,
                            ].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition"
                                >
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <p className="font-semibold">Compliance</p>
                        <Link href="#" className="hover:underline">
                            GDPR Friendly Tools
                        </Link>
                        <p className="text-black/70 dark:text-white/70">
                            Available worldwide
                        </p>
                    </div>

                </div>

                <div className="border-t border-black/10 dark:border-white/10 pt-6 flex flex-col md:flex-row justify-between gap-4 text-xs">

                    <p className="text-black/70 dark:text-white/70">
                        © {new Date().getFullYear()} MailEngine. All rights reserved.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <Link href="/privacy" className="hover:underline">Privacy</Link>
                        <Link href="/terms" className="hover:underline">Terms</Link>
                        <Link href="/legal" className="hover:underline">Legal</Link>
                        <Link href="/cookies" className="hover:underline">
                            Cookie Preferences
                        </Link>
                    </div>

                </div>
            </div>
        </footer>
    );
};