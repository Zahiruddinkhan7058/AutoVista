"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Image from "next/image";

type CarData = {
    title: string;
    src: string;
    description?: string;
    link?: string;
};

interface GalleryProps {
    car: CarData;
}

import Link from "next/link";

export const Gallery = React.memo(function Gallery({ car }: GalleryProps) {
    return (
        <CardContainer className="inter-var">
            <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-auto rounded-xl p-6 border">
                <CardItem
                    translateZ="50"
                    className="text-xl font-bold text-neutral-600 dark:text-white"
                >
                    {car.title}
                </CardItem>
                <CardItem
                    as="p"
                    translateZ="60"
                    className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                >
                    {car.description || "Hover over this card to unleash the power of CSS perspective"}
                </CardItem>
                <CardItem translateZ="100" className="w-full mt-4">
                    <div className="relative h-60 w-full overflow-hidden rounded-xl">
                        <Image
                            src={car.src}
                            alt={`${car.title} thumbnail`}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover rounded-xl group-hover/card:shadow-xl transition-transform duration-300"
                            loading="lazy"
                        />
                    </div>
                </CardItem>
                <div className="flex justify-between items-center mt-6">
                    <CardItem
                        translateZ={20}
                        as={Link}
                        href="/customize"
                        className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold hover:opacity-90 transition-opacity"
                    >
                        Customize
                    </CardItem>
                </div>
            </CardBody>
        </CardContainer>
    );
});

