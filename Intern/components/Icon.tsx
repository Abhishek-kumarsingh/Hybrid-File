import React, { useState } from "react";
import { workExperience } from "@/data"; // Assuming you have imported your work experience data
import Image from "next/image";

const Icon = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="w-full mt-12 flex justify-center">
      <div className="w-full text-black dark:text-white border-neutral-200 dark:border-slate-800 p-6">
        <div className="flex justify-around items-center gap-10 flex-wrap">
          {workExperience.map((card, index) => (
            <div
              key={card.id}
              className={`flex flex-col items-center gap-2 group rounded-lg p-2 transition duration-600 ease-in-out w-full sm:w-1/2 md:w-1/3 lg:w-1/4 ${index === hoveredIndex
                ? "bg-gray-200 text-gray-800 shadow-md"
                : "hover:bg-gray-200 hover:text-gray-800 hover:shadow-md"
                }`}
              style={{ minWidth: "150px" }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Image
                src={card.thumbnail}
                alt={card.title}
                width={128}
                height={128}
                className="w-20 h-20 lg:w-32 lg:h-32 object-cover rounded-full"
              />
              <h1 className="text-center text-xl md:text-2xl font-bold">
                {card.title}
              </h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Icon;
