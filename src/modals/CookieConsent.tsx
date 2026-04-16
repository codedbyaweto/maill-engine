"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export function CookieConsent() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("cookie-consent");
        if (!consent) {
            setVisible(true);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem("cookie-consent", "accepted");
        setVisible(false);
    };

    const declineCookies = () => {
        localStorage.setItem("cookie-consent", "declined");
        setVisible(false);
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 100 }}
                    transition={{ duration: 2.0 }}
                    className="fixed bottom-4 left-4 z-50 w-[320px] sm:w-[380px] bg-background border shadow-xl  p-6 flex flex-col gap-4"
                >
                    <h3 className="text-lg font-bold">We value your privacy</h3>
                    <p className="text-sm text-muted-foreground">
                      We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All". you consent to our use of cookies.
                    </p>

                    <div className="flex justify-start gap-2 mt-2">
                        <button
                            onClick={declineCookies}
                            className="px-4 py-2 border border-yellow-400 dark:border-blue-400 rounded-none text-sm font-medium"
                        >
                            Decline
                        </button>
                        <button
                            onClick={acceptCookies}
                            className="px-4 py-2 text-black bg-yellow-400 dark:bg-blue-600 dark:text-white rounded-none text-sm font-medium"
                        >
                            Accept All
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}