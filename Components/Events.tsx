import React from "react";
import { BiRightArrow } from "react-icons/bi";

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
    <div className="flex flex-col p-8 gap-2">
      <div className="w-full flex justify-between">
        <h1 className="text-3xl font-semibold">Popular Events</h1>
        <span className="flex text-xl items-center gap-2">
          View All <BiRightArrow size={20} />
        </span>
      </div>
      <h1 className="text-xl text-neutral-500">
        Popular events to attend with friends
      </h1>
      <div className="grid lg:grid-cols-5 grid-cols-2">
        {EVENTS.slice(0, 5).map((value) => {
          return (
            <div key={value.id} className="rounded-lg p-4 m-2">
              <img
                src={value.imageUrl}
                alt={value.title}
                className="w-full h-48 object-cover rounded-lg"
              />
              <h2 className="text-xl font-semibold mt-2">{value.title}</h2>
              <p className="text-gray-600">{value.date}</p>
              <p className="text-gray-500">{value.location}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Events;
