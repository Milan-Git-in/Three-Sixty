import { Calendar } from "lucide-react";
import Image from "next/image";
import React from "react";
import { CgProfile } from "react-icons/cg";
import { ImProfile } from "react-icons/im";
import { PiCarProfileFill } from "react-icons/pi";
import {
  RiProfileFill,
  RiShieldCrossFill,
  RiShieldUserFill,
} from "react-icons/ri";

const Footer = () => {
  return (
    <div className="w-full fixed bottom-0  bg-black backdrop:backdrop-blur-2xl flex px-5 justify-evenly">
      <Image src={"/icon.svg"} width={50} height={50} alt="360" />
      <div className="flex flex-col items-center justify-center ">
        <Calendar />
        <p className="-mt-1">Event</p>
      </div>
      <div className="flex flex-col items-center justify-center ">
        <RiShieldUserFill size={27} />
        <p className="-mt-1">Profile</p>
      </div>
    </div>
  );
};

export default Footer;
