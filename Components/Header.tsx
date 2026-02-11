import Image from "next/image";
import React from "react";
import { IoMdPin } from "react-icons/io";

const Header = () => {
  return (
    <>
      <div className="flex px-4 md:px-10 w-full bg-black  items-center justify-between ">
        <div className="flex items-center ">
          <Image
            src="/favicon.ico"
            alt="Logo"
            width={50}
            height={50}
            className="my-2"
          />
          <h1 className="text-white text-2xl m-2 font-semibold">360 Events</h1>
        </div>
        <div className="bg-neutral-900 w-[40vw] gap-3 h-10 rounded-4xl flex items-center px-2 max-w-100">
          <IoMdPin className="size-5" />
          <p className="text-neutral-300 font-semibold">Ahmedabad</p>
        </div>
      </div>
      <div className="flex px-4 md:px-10 w-full bg-black items-center justify-between ">
        <div className="flex flex-col">
          <h4 className="text-white text-md ">Hi, Guest 👋</h4>
          <h1 className="text-white text-2xl">Welcome back</h1>
        </div>
      </div>
    </>
  );
};

export default Header;
