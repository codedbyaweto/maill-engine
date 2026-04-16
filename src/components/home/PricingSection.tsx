"use client";

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export const PricingSection = () => {
    return (
        <section
            id="pricing"
            className="w-full py-16 md:py-20 lg:py-24 bg-background"
        >
            <div className="container mx-auto px-4">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

                    <div className="bg-background shadow-2xl dark:shadow-[0_10px_40px_rgba(0,0,0,0.4)] border border-transparent dark:border-white p-6 sm:p-8 flex flex-col gap-4 rounded-none w-full max-w-md mx-auto lg:mx-0">

                        <div className="w-fit text-xs border border-yellow-400 dark:border-white dark:text-white px-2 py-1 font-medium text-yellow-500 rounded-md">
                            Most Popular
                        </div>

                        <div>
                            <h3 className="text-2xl sm:text-3xl font-semibold text-foreground">
                                Standard
                            </h3>
                            <p className="text-sm text-foreground/70 mt-1">
                                Send up to 6,000 emails each month.
                            </p>
                        </div>

                        <div className="flex flex-col gap-0.5 text-sm text-foreground/70">
                            <span>Contacts</span>
                            <span className="font-medium text-foreground">0–500</span>
                        </div>

                        <div className="flex items-end gap-2">
                            <span className="text-4xl sm:text-5xl font-bold text-foreground">
                                ₦10,000
                            </span>
                            <span className="text-sm text-foreground/70 mb-2">
                                /mo
                            </span>
                        </div>

                        <div className="flex flex-col gap-0.5 text-xs text-foreground/70">
                            <p>₦10,000 per month for 12 months</p>
                            <p>Then starts at ₦20,000/month</p>
                        </div>

                        <Button variant="yellow" className="w-full h-12 rounded-lg transition-all duration-300  hover:-translate-y-3 hover:shadow-lg hover:shadow-yellow-400/40 active:translate-y-0 active:shadow-md">
                            Buy Now
                        </Button>

                        <p className="text-[10px] text-foreground/60 leading-relaxed">
                            † Overages apply if contact or email send limit is exceeded.
                        </p>
                    </div>

                    <div className="flex flex-col gap-5 text-center lg:text-left">

                        <div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground">
                                Try our Standard plan for{" "}
                                <span className="underline decoration-4 decoration-yellow-400 dark:decoration-white underline-offset-4">
                                    50% off
                                </span>
                                !
                            </h2>
                            <p className="mt-2 text-sm sm:text-base leading-relaxed text-foreground/70">
                                Spend less to grow more with 50% off for 12 months, even if you change to our{" "}

                                <span className="underline decoration-[1px] decoration-black dark:decoration-white underline-offset-2">
                                    Premium
                                </span>
                                {" "}or{" "}

                                <span className="underline decoration-[1px] decoration-black dark:decoration-white underline-offset-2">
                                    Essentials
                                </span>
                                {" "}plans. Cancel or downgrade to our basic{" "}

                                <span className="underline decoration-[1px] decoration-black dark:decoration-white underline-offset-2">
                                    Free
                                </span>
                                {" "}plan at any time.
                            </p>
                        </div>

                        <div className="flex flex-col gap-2">

                            {[
                                "Generative AI email tools",
                                "Actionable audience insights",
                                "Advanced automation workflows",
                                "Custom-coded email templates",
                                "Popup forms & lead capture",
                                "Personalized onboarding",
                            ].map((feature, i) => (
                                <div
                                    key={i}
                                    className="flex items-start gap-2.5 w-full max-w-md mx-auto lg:max-w-none lg:mx-0"
                                >
                                    <div className="w-5 h-5 rounded-full flex items-center justify-center bg-yellow-400 text-black dark:bg-[#00004f] dark:text-white shrink-0 mt-0.5">
                                        <Check className="w-3 h-3" />
                                    </div>

                                    <p className="text-sm leading-relaxed text-left text-foreground/80">
                                        {feature}
                                    </p>
                                </div>
                            ))}

                        </div>

                        <p className="text-xs text-foreground/60 leading-relaxed">
                            Cancel anytime. Upgrade or downgrade as your needs change.
                        </p>

                    </div>

                </div>
            </div>
        </section>
    );
};