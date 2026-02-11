"use client";
import { motion } from "motion/react";

// --- Types & Mock Data ---

type EventItem = {
  id: number;
  title: string;
  date: string;
  location: string;
  imageUrl: string;
};

const EVENTS: EventItem[] = [
  {
    id: 1,
    title: "Grand Holi Waves",
    date: "Wed 04 Mar",
    location: "Holi wave ground",
    imageUrl: "/image.png", // Colorful Holi Image
  },
  {
    id: 2,
    title: "Neon Nights Festival",
    date: "Fri 06 Mar",
    location: "City Stadium",
    imageUrl: "/image2.png", // Event crowd
  },
  {
    id: 3,
    title: "Cultural Beats",
    date: "Sat 07 Mar",
    location: "Riverfront Park",
    imageUrl: "/image3.png", // Concert
  },
];
const Events = () => {
  return (
    <motion.div
      className="flex flex-col p-8 gap-2 mt-20"
      initial={{
        opacity: 0,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: -80,
      }}
      transition={{
        duration: 0.3,
      }}
    >
      <div className="w-full flex justify-between">
        <h1 className="text-3xl font-semibold">Upcoming Events</h1>
      </div>

      <h1 className="text-xl text-neutral-500">
        Popular events to attend with friends
      </h1>

      {/* SCROLL CONTAINER */}
      <div
        className="
      w-full
      overflow-x-auto
      overflow-y-hidden
      no-scrollbar
    "
        style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
      >
        {/* HORIZONTAL ROW */}
        <div className="flex gap-4">
          {EVENTS.map((event) => (
            <div
              key={event.id}
              className="
            shrink-0
            w-72
            rounded-lg
            p-4
          "
            >
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-48 object-cover rounded-lg"
              />
              <h2 className="text-xl font-semibold mt-2">{event.title}</h2>
              <p className="text-gray-600">{event.date}</p>
              <p className="text-gray-500">{event.location}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Events;
