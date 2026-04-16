"use client";

import { useEffect, useState } from "react";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import {ImgLinks} from "@/assets/assets";

export const Carousel1 = () => {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);

    const logos = [
        ImgLinks.Logo4,
        ImgLinks.Logo5,
        ImgLinks.Logo6,
        ImgLinks.Logo7,
        ImgLinks.Logo8,
        ImgLinks.Logo9,
        ImgLinks.Logo10,
        ImgLinks.Logo11,
        ImgLinks.Logo12,
        ImgLinks.Logo13,
    ];

    const repeatedLogos = [...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos,
        ...logos, ...logos, ...logos, ...logos];
    useEffect(() => {
        if (!api) return;

        const interval = setInterval(() => {
            const snapList = api.scrollSnapList();
            const currentIndex = api.selectedScrollSnap();

            if (currentIndex + 1 === snapList.length) {
                setCurrent(0);
                api.scrollTo(0);
            } else {
                api.scrollNext();
                setCurrent(currentIndex + 1);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [api]);
    return (
        <div className="w-full  ">
            <div className="container mx-auto">
                <div className="flex flex-col  gap-10">

                    <Carousel setApi={setApi} className="w-full">
                        <CarouselContent>
                            {repeatedLogos.map((logo, index) => (
                                <CarouselItem
                                    key={index}
                                    className="basis-1/4 lg:basis-1/6"
                                >
                                    <div className="flex items-center justify-center h-20">
                                        <Image
                                            src={logo}
                                            alt={`logo-${index}`}
                                            width={120}
                                            height={60}
                                            className="object-contain transition-transform duration-200 hover:scale-105"
                                        />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>
            </div>
        </div>
    );
};
