"use client";
import React, { useRef } from "react";
import { BiCalendar } from "react-icons/bi";
import { GiChecklist, GiCheckMark } from "react-icons/gi";
import { SiChainlink } from "react-icons/si";

const SERVICES = [
  {
    id: 1,
    icon: <SiChainlink />,
    h1: "Promotions",
    p: "Boost your event's visibility with our targeted promotion services.",
  },
  {
    id: 2,
    icon: <BiCalendar />,
    h1: "Spread Smiles",
    p: "Smiles to your audience by bringing artists and celebrities together.",
  },
  {
    id: 3,
    icon: <GiChecklist />,
    h1: "Create & List Events",
    p: "Easily create and list your events on our platform.",
  },
  {
    id: 4,
    icon: <GiCheckMark />,
    h1: "Sales & Bookings",
    p: "Streamline your event sales and bookings.",
  },
];

const Popular = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDown.current = true;
    startX.current = e.pageX;
    scrollLeft.current = containerRef.current?.scrollLeft || 0;
  };

  const onMouseUp = () => {
    isDown.current = false;
  };

  const onMouseLeave = () => {
    isDown.current = false;
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDown.current) return;
    e.preventDefault();
    const walk = (e.pageX - startX.current) * 1.2;
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollLeft.current - walk;
    }
  };

  return (
    <div className="p-8 flex flex-col gap-4">
      <h1 className="text-3xl font-semibold">Our Popular Services</h1>

      <div
        ref={containerRef}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        onMouseMove={onMouseMove}
        className="flex overflow-x-auto snap-x snap-mandatory space-x-6 cursor-grab active:cursor-grabbing select-none scroll-smooth"
        style={{
          scrollbarWidth: "none",
        }}
      >
        {SERVICES.map((service) => (
          <div
            key={service.id}
            className="shrink-0 w-80 p-4 bg-zinc-900 rounded-lg snap-start"
          >
            <div className="text-5xl text-blue-500 mb-2">{service.icon}</div>
            <h2 className="text-xl font-semibold">{service.h1}</h2>
            <p className="text-lg text-gray-600 mt-2">{service.p}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Popular;
