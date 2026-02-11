import Image from "next/image";
import React from "react";

const GRID = [
  {
    id: 1,
    h1: "Festival & Celebrations",
    bgclass: "self-center h-40  bg-linear-145 from-yellow-500 to-green-500",
    h1class:
      "bg-clip-text text-transparent bg-linear-110  from-green-500  to-white/40",
    image: "/sofaman.png",
  },
  {
    id: 2,
    h1: "Concerts & Music",
    bgclass: "self-center h-40  bg-linear-145 from-yellow-700 to-red-900",
    h1class:
      "bg-clip-text text-transparent bg-linear-145 from-yellow-200  to-pink-900",
    image: "/edsheeran.png",
  },
  {
    id: 3,
    h1: "Music",
    bgclass: "self-center h-40  bg-linear-145 from-blue-900 to-blue-500",
    h1class:
      "bg-clip-text text-transparent bg-linear-145 from-blue-400  to-blue-200",
    image: "/guitar.png",
  },
  {
    id: 4,
    h1: "Sports & Fitness",
    bgclass: "self-center h-40  bg-linear-145 from-blue-900 to-blue-500",
    h1class:
      "bg-clip-text text-transparent bg-linear-145 from-blue-400  to-blue-200",
    image: "/sports.png",
  },
  {
    id: 5,
    h1: "Family & Kids",
    bgclass: "self-center h-40  bg-linear-145 from-blue-900 to-blue-500",
    h1class:
      "bg-clip-text text-transparent bg-linear-145 from-blue-400  to-blue-200",
  },
  {
    id: 6,
    h1: "Comedy Shows",
    bgclass: "self-center h-40  bg-linear-145 from-blue-900 to-teal-500",
    h1class:
      "bg-clip-text text-transparent bg-linear-145 from-blue-400  to-blue-200",
    image: "/comedy.png",
  },
  {
    id: 7,
    h1: "Food & Beverages",
    bgclass: "self-center h-40  bg-linear-145 from-black to-white/40",
    h1class: "bg-clip-text text-transparent bg-linear-145 from-white  to-black",
    image: "/food.png",
  },
  {
    id: 8,
    h1: "Arts & Theater",
    bgclass: "self-center h-40  bg-linear-145 from-blue-900 to-blue-500",
    h1class:
      "bg-clip-text text-transparent bg-linear-145 from-blue-400  to-blue-200",
  },
  {
    id: 9,
    h1: "Workshops & Learning",
    bgclass: "self-center h-40  bg-linear-145 from-blue-900 to-blue-500",
    h1class:
      "bg-clip-text text-transparent bg-linear-145 from-blue-400  to-blue-200",
  },
  {
    id: 10,
    h1: "Online Events",
    bgclass: "self-center h-40  bg-linear-145 from-blue-900 to-blue-500",
    h1class:
      "bg-clip-text text-transparent bg-linear-145 from-blue-400  to-blue-200",
  },
  {
    id: 11,
    h1: "Fashion & Lifestyle",
    bgclass: "self-center h-40  bg-linear-145 from-blue-900 to-blue-500",
    h1class:
      "bg-clip-text text-transparent bg-linear-145 from-blue-400  to-blue-200",
  },
];

const Grids = () => {
  return (
    <div className="justify-self-center max-w-[87vw]">
      <h1 className="text-2xl font-semibold text-white mb-4">
        Choose from your favorite
      </h1>
      <div className="grid grid-cols-2 gap-4">
        {GRID.map((item, i) => (
          <div
            key={item.id}
            className={`p-4 relative flex items-top justify-start rounded-lg  ${item.bgclass}`}
          >
            <h2 className={`text-xl font-bold ${item.h1class}`}>{item.h1}</h2>
            {item.image && (
              <Image
                src={item.image}
                alt={item.h1}
                width={200}
                height={200}
                className="size-42 object-contain absolute -right-6 top-4 opacity-80 pointer-events-none"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grids;
