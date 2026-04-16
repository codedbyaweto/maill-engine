"use client";

import { useEffect, useState } from "react";

export const NewsletterConsent = () => {
    const [email, setEmail] = useState("");
    const [consent, setConsent] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const seen = localStorage.getItem("newsletter-first-visit");
        if (!seen) setOpen(true);
    }, []);

    const handleClose = () => {
        localStorage.setItem("newsletter-first-visit", "true");
        setOpen(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) return;

        if (!consent) {
            alert("Please agree to receive marketing emails.");
            return;
        }

        localStorage.setItem("marketing-consent", "accepted");
        localStorage.setItem("newsletter-first-visit", "true");

        setOpen(false);
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4 py-6 bg-black/50">

            <form
                onSubmit={handleSubmit}
                className="relative w-full max-w-md sm:max-w-lg bg-background border p-6 flex flex-col gap-4"
            >
                <button
                    type="button"
                    onClick={handleClose}
                    className="absolute top-3 right-3 text-sm text-muted-foreground hover:text-foreground"
                >
                    ✕
                </button>

                <h3 className="text-lg font-semibold text-center text-foreground">
                    Join our Newsletter
                </h3>

                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="youremail@email.com"
                    className="border px-3 h-12 bg-transparent outline-none"
                />

                <div className="flex items-start gap-2">
                    <input
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        className="mt-1"
                    />
                    <p className="text-sm text-muted-foreground">
                        Get product updates, feature releases, and useful tips about MailEngine.
                    </p>
                </div>

                <button
                    type="submit"
                    className="h-12 border bg-yellow-500 text-black font-medium"
                >
                    Subscribe
                </button>

                <button
                    type="button"
                    onClick={handleClose}
                    className="text-sm text-muted-foreground underline text-center"
                >
                    Maybe later
                </button>
            </form>
        </div>
    );
};