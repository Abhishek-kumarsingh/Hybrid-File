import Image from "next/image";
import React, { useState } from "react";
import {
    motion,
    useTransform,
    AnimatePresence,
    useMotionValue,
    useSpring,
} from "framer-motion";

export const AnimatedTooltip = ({
    items,
}: {
    items: {
        id: number;
        name: string;
        designation: string;
        image: string;
    }[];
}) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const springConfig = { stiffness: 100, damping: 5 };
    const x = useMotionValue(0);
    const rotate = useSpring(
        useTransform(x, [-100, 100], [-45, 45]),
        springConfig
    );
    const translateX = useSpring(
        useTransform(x, [-100, 100], [-50, 50]),
        springConfig
    );
    const handleMouseMove = (event: any) => {
        const halfWidth = event.target.offsetWidth / 2;
        x.set(event.nativeEvent.offsetX - halfWidth);
    };

    return (
        <div className="flex flex-row flex-wrap justify-center space-x-4">
            {items.map((item) => (
                <div
                    className="relative group m-2 md:m-4 flex-shrink-0" // Added flex-shrink-0 to prevent wrapping on small screens
                    key={item.id}
                    onMouseEnter={() => setHoveredIndex(item.id)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    <AnimatePresence mode="popLayout">
                        {hoveredIndex === item.id && (
                            <motion.div
                                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                    transition: {
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 10,
                                    },
                                }}
                                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                                style={{
                                    translateX: translateX,
                                    rotate: rotate,
                                    whiteSpace: "nowrap",
                                }}
                                className="absolute -top-20 left-1/2 -translate-x-1/2 flex text-xs flex-col items-center justify-center rounded-xl bg-3d-gradient backdrop-blur-md border border-white/20 z-50 shadow-xl px-5 py-3"
                            >
                                {/* Decorative elements */}
                                <div className="absolute inset-x-10 z-30 w-[40%] -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
                                <div className="absolute left-10 w-[60%] z-30 -bottom-px bg-gradient-to-r from-transparent via-green-500 to-transparent h-px" />

                                {/* Content */}
                                <div className="font-bold text-gray-800 dark:text-white relative z-30 text-base">
                                    {item.name}
                                </div>
                                <div className="text-gray-600 dark:text-gray-300 text-xs font-medium">{item.designation}</div>

                                {/* Arrow */}
                                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white/80 dark:bg-gray-800/80 rotate-45 border-r border-b border-white/20 dark:border-gray-700/20"></div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-green-500 rounded-full blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <Image
                            onMouseMove={handleMouseMove}
                            height={100}
                            width={100}
                            src={item.image}
                            alt={item.name}
                            className="object-cover !m-0 !p-0 object-top rounded-full h-16 w-16 border-2 group-hover:scale-110 group-hover:z-30 border-white relative transition-all duration-300 shadow-md"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};
