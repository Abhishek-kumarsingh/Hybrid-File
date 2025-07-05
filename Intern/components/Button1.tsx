import React from "react";
import { motion } from "framer-motion";

/**
 * Modern button with animated gradient border and hover effects
 */
const MagicButton = ({
    title,
    icon,
    position,
    handleClick,
    otherClasses,
}: {
    title: string;
    icon: React.ReactNode;
    position: string;
    handleClick?: () => void;
    otherClasses?: string;
}) => {
    return (
        <motion.button
            className="relative inline-flex h-14 w-full overflow-hidden rounded-xl p-[1px] focus:outline-none shadow-lg"
            onClick={handleClick}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
        >
            {/* Animated gradient border */}
            <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0072BC_0%,#006838_50%,#0072BC_100%)]" />

            {/* Button content */}
            <span
                className={`inline-flex h-full w-full cursor-pointer items-center justify-center rounded-xl
                bg-gradient-to-br from-gray-900 to-gray-800 px-8 text-base font-semibold text-white backdrop-blur-3xl gap-3
                shadow-inner shadow-white/10 ${otherClasses}`}
            >
                {position === "left" && (
                    <span className="text-green-400 text-xl">
                        {icon}
                    </span>
                )}
                {title}
                {position === "right" && (
                    <span className="text-green-400 text-xl">
                        {icon}
                    </span>
                )}
            </span>

            {/* Hover glow effect */}
            <span className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 hover:opacity-100 bg-gradient-to-br from-green-500/20 to-blue-500/20 blur-xl"></span>
        </motion.button>
    );
};

const App = () => {
    return (
        <MagicButton
            title="Adopt Park"
            icon={<i className="fas fa-tree"></i>}
            position="left"
            handleClick={() => alert("Adopt Park button clicked!")}
        />
    );
};

export default App;
