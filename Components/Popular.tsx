"use client";

import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { BsEye } from "react-icons/bs";

/* ================== TYPES ================== */
interface Service {
  id: number;
  image: string;
  Title: string;
  genre: string;
  location: string;
  date: string;
  views: number;
  Celebrity?: string;
}

/* ================== DATA ================== */
const ORIGINAL_DATA: Service[] = [
  {
    id: 1,
    image: "/image.png",
    Title: "Mehfil-e-Sufi",
    genre: "Music",
    location: "Ahmedabad",
    date: "Wed 04 Mar",
    views: 1200,
    Celebrity: "Nusrat Fateh Ali Khan",
  },
  {
    id: 2,
    image: "/image3.png",
    Title: "Holi Festival",
    genre: "Festival",
    location: "Delhi",
    date: "Wed 20 Mar",
    views: 2500,
    Celebrity: "Shahid Kapoor",
  },
  {
    id: 3,
    image: "/image2.png",
    Title: "Grand Holi Waves",
    genre: "Festival",
    location: "Mumbai",
    date: "Wed 25 Mar",
    views: 3000,
  },
];

/* ================== CONFIG ================== */
const DUPES = 9; // must be odd
const MIDDLE_DUPE = Math.floor(DUPES / 2);

const CARD_WIDTH_MOBILE = 280;
const CARD_WIDTH_DESKTOP = 384;
const GAP = 16;
const IDLE_TIME = 100;

/* ================== HELPERS ================== */
const isMobile = () => typeof window !== "undefined" && window.innerWidth < 640;

const cardSize = () =>
  (isMobile() ? CARD_WIDTH_MOBILE : CARD_WIDTH_DESKTOP) + GAP;

/* ================== COMPONENT ================== */
export default function InfiniteNativeCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const idleTimer = useRef<NodeJS.Timeout | null>(null);

  const SERVICES = Array.from({ length: DUPES }, () => ORIGINAL_DATA).flat();

  const { scrollX } = useScroll({ container: containerRef });

  /* ---------- START IN MIDDLE ---------- */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const singleSetWidth = ORIGINAL_DATA.length * cardSize();

    el.scrollTo({
      left: singleSetWidth * MIDDLE_DUPE,
      behavior: "instant",
    });
  }, []);

  /* ---------- LOGICAL INDEX ---------- */
  const getLogicalIndex = (scrollLeft: number) => {
    return Math.round(scrollLeft / cardSize()) % ORIGINAL_DATA.length;
  };

  /* ---------- SNAP BACK ---------- */
  const snapBackToMiddle = () => {
    const el = containerRef.current;
    if (!el) return;

    const logicalIndex = getLogicalIndex(el.scrollLeft);

    const target =
      (MIDDLE_DUPE * ORIGINAL_DATA.length + logicalIndex) * cardSize();

    el.classList.add("snap-none");

    el.scrollTo({
      left: target,
      behavior: "instant",
    });

    requestAnimationFrame(() => {
      el.classList.remove("snap-none");
    });
  };

  /* ---------- IDLE DETECTION ---------- */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onScroll = () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);

      idleTimer.current = setTimeout(() => {
        snapBackToMiddle();
      }, IDLE_TIME);
    };

    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="w-full min-h-150 bg-black flex items-center overflow-hidden">
      <div
        ref={containerRef}
        className="
          w-full flex gap-4 overflow-x-auto py-10
          snap-x snap-proximity scroll-smooth no-scrollbar
          px-[calc(50vw-140px)] sm:px-[calc(50%-192px)]
        "
        style={{ scrollbarWidth: "none" }}
      >
        {SERVICES.map((item, i) => (
          <CarouselCard
            key={`${item.id}-${i}`}
            item={item}
            index={i}
            scrollX={scrollX}
          />
        ))}
      </div>
    </div>
  );
}

/* ================== CARD ================== */
interface CardProps {
  item: Service;
  index: number;
  scrollX: MotionValue<number>;
}

function CarouselCard({ item, index, scrollX }: CardProps) {
  const width = isMobile() ? CARD_WIDTH_MOBILE : CARD_WIDTH_DESKTOP;
  const offset = index * (width + GAP);

  const inputRange = [offset - (width + GAP), offset, offset + (width + GAP)];

  const scale = useTransform(scrollX, inputRange, [0.85, 1, 0.85]);
  const opacity = useTransform(scrollX, inputRange, [0.5, 1, 0.5]);
  const blur = useTransform(scrollX, inputRange, [2, 0, 2]);

  return (
    <motion.div
      className="snap-center shrink-0 w-70 sm:w-96 h-[58vh] rounded-2xl overflow-hidden relative"
      style={{
        scale,
        opacity,
        filter: useTransform(blur, (v) => `blur(${v}px)`),
      }}
    >
      <img
        src={item.image}
        alt={item.Title}
        className="absolute inset-0 w-full h-full object-cover "
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

      <div className="absolute bottom-0 inset-x-0 p-6">
        <span className="inline-block px-2 py-1 mb-2 text-[10px] text-white uppercase bg-white/20 rounded-full">
          {item.genre}
        </span>

        <h2 className="text-xl font-bold text-white mb-1">{item.Title}</h2>

        <p className="text-neutral-300 text-sm mb-4 truncate">
          {item.Celebrity || "Special Event"}
        </p>

        <div className="flex justify-between items-center border-t border-white/10 pt-4">
          <span className="text-xs text-neutral-400 uppercase">
            {item.location}
          </span>

          <span className="flex items-center gap-1 text-xs text-neutral-300 bg-black/30 px-2 py-1 rounded-md">
            <BsEye />
            {item.views.toLocaleString()}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
