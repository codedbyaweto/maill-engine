"use client";

import Image from "next/image";
import { ImgLinks } from "@/assets/assets";

export const Features = () => {
    const features = [
        {
            title: "Easy-to-use email marketing",
            description:
                "No matter what your expertise level, MailEngine is an affordable way to fuel business growth.",
            image: ImgLinks.img1,
        },
        {
            title: "Drive more sales",
            description:
                "Grow your list, learn about your audience, and send personalized, high-impact campaigns.",
            image: ImgLinks.img2,
        },
        {
            title: "Switch with confidence",
            description:
                "Dedicated onboarding support and migration tools make the switch to MailEngine seamless.",
            image: ImgLinks.img3,
        },
    ];

    return (
        <div
            id="features"
            className="w-full py-16 md:py-20 lg:py-32 bg-[#2b251a] dark:bg-[#00004f] text-white"
        >
            <div className="container mx-auto px-4">

                <h2 className="text-2xl sm:text-3xl md:text-5xl text-center mb-10 md:mb-16 max-w-2xl mx-auto leading-tight">
                    Businesses like yours are growing faster and stressing less
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">

                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            className="flex flex-col items-center text-center gap-4 p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
                        >
                            <div className="w-40 h-28 sm:w-48 sm:h-32 relative rounded-md overflow-hidden">
                                <Image
                                    src={feature.image}
                                    alt={feature.title}
                                    fill
                                    className="object-contain"
                                />
                            </div>

                            <h3 className="text-lg md:text-xl font-semibold">
                                {feature.title}
                            </h3>

                            <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};