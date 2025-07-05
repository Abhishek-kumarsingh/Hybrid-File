"use client";
import React from "react";
import { LayoutGrid } from "@/components/ui/laygrid";

export function Attraction() {
    return (
        <div className="py-20 w-full">
            <div className="mb-10 text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600 dark:from-blue-400 dark:to-green-400">
                    Featured Attractions
                </h2>
                <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                    Explore these beautiful attractions in our parks and green spaces.
                </p>
            </div>
            <LayoutGrid cards={cards} />
        </div>
    );
}

const SkeletonOne = () => {
    return (
        <div>
            <p className="font-bold text-4xl text-white">House in the woods</p>
            <p className="font-normal text-base text-white"></p>
            <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
                A serene and tranquil retreat, this house in the woods offers a peaceful
                escape from the hustle and bustle of city life.
            </p>
        </div>
    );
};

const SkeletonTwo = () => {
    return (
        <div>
            <p className="font-bold text-4xl text-white">House above the clouds</p>
            <p className="font-normal text-base text-white"></p>
            <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
                Perched high above the world, this house offers breathtaking views and a
                unique living experience. It&apos;s a place where the sky meets home,
                and tranquility is a way of life.
            </p>
        </div>
    );
};

const SkeletonThree = () => {
    return (
        <div>
            <p className="font-bold text-4xl text-white">Greens all over</p>
            <p className="font-normal text-base text-white"></p>
            <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
                A house surrounded by greenery and nature&apos;s beauty. It&apos;s the
                perfect place to relax, unwind, and enjoy life.
            </p>
        </div>
    );
};

const cards = [
    {
        id: 1,
        content: <SkeletonOne />,
        className: "md:col-span-2",
        thumbnail: "/images/image1.jpg",
    },
    {
        id: 2,
        content: <SkeletonTwo />,
        className: "col-span-1",
        thumbnail: "/images/image2.jpg",
    },
    {
        id: 3,
        content: <SkeletonThree />,
        className: "col-span-1",
        thumbnail: "/images/image3.jpg",
    },
];

export default Attraction;
