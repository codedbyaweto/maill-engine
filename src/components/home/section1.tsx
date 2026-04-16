"use client";

import Image from "next/image";
import { PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ImgLinks } from "@/assets/assets";

export const Section = () => (
    <div className="w-full py-12 md:py-16 lg:py-20 mb-4 bg-gradient-to-b from-yellow-50 via-white to-transparent dark:from-black dark:via-zinc-900 dark:to-transparent">
        <div className="container mx-auto px-4">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

                <div className="flex flex-col gap-6">

                    <Badge variant="outline" className="w-fit">
                        Now powering fast-growing teams
                    </Badge>

                    <div className="flex flex-col gap-4">

                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl max-w-lg tracking-tight font-medium">
                            Marketing that scales with your ambition
                        </h1>

                        <p className="text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground max-w-md">
                            Most marketing tools slow you down with complexity. We do the opposite.
                            Build campaigns, automate customer journeys, and unlock insights all in
                            one platform designed to help you move faster, convert better, and grow
                            without limits.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <Button size="lg" className="gap-2 w-full sm:w-auto" variant="outline">
                            Speak with an expert
                            <PhoneCall className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:gap-6">

                    <div className="relative bg-muted rounded-lg aspect-square overflow-hidden">
                        <Image
                            src={ImgLinks.img7}
                            alt="image 1"
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="relative bg-muted rounded-lg row-span-2 min-h-[200px] sm:min-h-[250px] overflow-hidden">
                        <Image
                            src={ImgLinks.img8}
                            alt="image 2"
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="relative bg-muted rounded-lg aspect-square overflow-hidden">
                        <Image
                            src={ImgLinks.img9}
                            alt="image 3"
                            fill
                            className="object-cover"
                        />
                    </div>

                </div>
            </div>
        </div>
    </div>
);