"use client";
import { motion, useAnimation } from "motion/react";
import React from "react";

const Initial = () => {
  const icon = useAnimation();
  const text = useAnimation();
  const line = useAnimation();
  const line1 = useAnimation();
  React.useEffect(() => {
    const run = async () => {
      await icon.start({
        scale: [0.6, 1],
        transition: { duration: 1, ease: "easeOut" },
      });

      await text.start({
        x: 0,
        transition: { duration: 1, ease: "easeOut" },
      });
      await text.start({
        x: -260,
        transition: { duration: 1, ease: "easeIn" },
      });

      await icon.start({
        scale: [1, 0],
        opacity: [1, 0],
        transition: { duration: 1, ease: "easeIn" },
      });
      line.start({
        scaleX: 1,
        transition: { duration: 1, ease: "linear" },
      });
      await line1.start({
        scaleX: 1,
        transition: { duration: 1, ease: "linear" },
      });
      line.start({
        y: "-50vh",
        transition: { duration: 1.2, ease: "easeIn" },
      });
      await line1.start({
        y: "49vh",
        transition: { duration: 1.2, ease: "easeIn" },
      });
    };
    run();
  }, []);

  return (
    <div className="flex items-center justify-center w-screen h-screen overflow-hidden">
      <motion.img
        animate={icon}
        src="/icon.svg"
        alt="Logo"
        className="relative ml-25 z-10 w-24 h-24 "
      />

      <div className="relative overflow-hidden w-[320px] ">
        <motion.h1
          initial={{ x: -260 }}
          animate={text}
          className="text-5xl font-bold text-white whitespace-nowrap"
        >
          360 Events
        </motion.h1>
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={line}
        className="w-screen h-0.5 bg-white absolute"
      />
      <motion.div
        initial={{ scaleX: 0 }}
        animate={line1}
        className="w-screen h-0.5 bg-white absolute"
      />
    </div>
  );
};

export default Initial;
