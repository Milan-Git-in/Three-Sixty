"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

// Utility for cleaner tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types & Mock Data ---

type EventItem = {
  id: number;
  title: string;
  date: string;
  location: string;
  imageUrl: string;
  color: string;
};

const EVENTS: EventItem[] = [
  {
    id: 1,
    title: "Grand Holi Waves",
    date: "Wed 04 Mar",
    location: "Holi wave ground",
    imageUrl: "/image.png", // Colorful Holi Image
    color: "",
  },
  {
    id: 2,
    title: "Neon Nights Festival",
    date: "Fri 06 Mar",
    location: "City Stadium",
    imageUrl: "/image.png", // Event crowd
    color: "from-blue-500 to-cyan-600",
  },
  {
    id: 3,
    title: "Cultural Beats",
    date: "Sat 07 Mar",
    location: "Riverfront Park",
    imageUrl: "/image.png", // Concert
    color: "from-pink-500 to-rose-600",
  },
];

const AUTOPLAY_INTERVAL = 5000; // 5 seconds

// --- Components ---

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Logic to handle next slide with loop
  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === EVENTS.length - 1 ? 0 : prev + 1));
  }, []);

  // Logic to handle prev slide with loop
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? EVENTS.length - 1 : prev - 1));
  };

  // Autoplay functionality
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(handleNext, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [isHovered, handleNext]);

  return (
    <div
      style={{
        backgroundImage: `url(${EVENTS[currentIndex].imageUrl})`,
      }}
      className={cn(
        `relative w-full min-h-150 flex items-center justify-center  overflow-hidden font-sans text-white  `,
      )}
    >
      {/* Overlay Gradient for text readability */}
      <div className="absolute w-full h-full  inset-0 z-10  bg-linear-to-t from-black  via-black/90 to-transparent" />
      <div className=" w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        <div className="lg:col-span-4 flex flex-col justify-center  pl-4 lg:pl-10 pt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-1"
            >
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                {EVENTS[currentIndex].title}
              </h2>

              <div className="text-lg md:text-xl text-gray-200 font-medium opacity-90">
                <span className="block">{EVENTS[currentIndex].date}</span>
                <span className="block opacity-75">
                  {EVENTS[currentIndex].location}
                </span>
              </div>

              <div className="">
                <button className="bg-[#baff29] hover:bg-[#a3e624] text-black font-bold py-2 px-7 rounded-xl transition-transform active:scale-95 uppercase tracking-wide">
                  Get Tickets
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-6 mt-8">
            <button
              onClick={handlePrev}
              className="group p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Previous Slide"
            >
              <BiLeftArrow className="w-8 h-8 text-indigo-200 group-hover:text-white transition-colors" />
            </button>
            <button
              onClick={handleNext}
              className="group p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Next Slide"
            >
              <BiRightArrow className="w-8 h-8 text-indigo-200 group-hover:text-white transition-colors" />
            </button>
          </div>
        </div>

        <div
          className="lg:col-span-8 overflow-visible relative min-h-100"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="w-full  overflow-hidden rounded-3xl">
            <motion.div
              className="flex gap-6"
              animate={{
                // -100% * index would slide a full width.
                // We want to slide by the width of the card + the gap.
                // We can achieve this easily by using flex percentages.
                x: `-${currentIndex * 88}%`,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            >
              {EVENTS.map((event, index) => (
                <motion.div
                  key={event.id}
                  // 85% width allows the next image (the remaining 15%) to peek in
                  className={cn(
                    "relative shrink-0 w-[85%]  aspect-video rounded-3xl overflow-hidden -white/20 shadow-lg",
                    // Make inactive slides slightly dim/smaller if desired
                    index !== currentIndex &&
                      "opacity-90 scale-80 origin-left transition-all duration-500",
                  )}
                >
                  <Image
                    src={event.imageUrl}
                    alt={event.title}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
