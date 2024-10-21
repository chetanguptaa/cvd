import { useState } from "react";
import { motion } from "framer-motion";

const getRandomColor = () => {
  const colors = [
    "bg-blue-400",
    "bg-red-400",
    "bg-green-400",
    "bg-purple-400",
    "bg-yellow-400",
    "bg-pink-400",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const getRandomStartPosition = () => {
  const edge = Math.floor(Math.random() * 4);
  let startPos: { top: number | string; left: number | string } = {
    top: 0,
    left: 0,
  };

  switch (edge) {
    case 0:
      startPos = { top: -50, left: Math.random() * 100 + "%" };
      break;
    case 1:
      startPos = { top: Math.random() * 100 + "%", left: "calc(100% + 50px)" };
      break;
    case 2:
      startPos = { top: "calc(100% + 50px)", left: Math.random() * 100 + "%" };
      break;
    case 3:
      startPos = { top: Math.random() * 100 + "%", left: -50 };
      break;
    default:
      break;
  }
  return startPos;
};

const Bubble = ({ name }: { name: string }) => {
  const [isBurst] = useState(false);
  const [bubbleColor] = useState(getRandomColor());
  const [startPosition] = useState(getRandomStartPosition());

  return (
    <motion.div
      className={`${
        isBurst ? "scale-0 opacity-0" : ""
      } absolute ${bubbleColor} flex items-center justify-center w-24 h-24 text-center rounded-full relative transition-transform duration-500`}
      initial={{
        top: startPosition.top,
        left: startPosition.left,
        opacity: 0,
      }}
      animate={{
        top: "50%",
        left: "50%",
        opacity: 1,
        transform: "translate(-50%, -50%)",
      }}
      transition={{
        duration: Math.random() * 3 + 2,
        ease: "easeInOut",
      }}
    >
      <div className="absolute w-full h-full rounded-full bg-gradient-to-t from-white/20 to-white/10 shadow-xl"></div>
      <div className="absolute w-1/2 h-1/2 rounded-full bg-white/40 blur-md top-1/4 left-1/4"></div>
      <span className="relative z-10 text-white">{name}</span>
    </motion.div>
  );
};

export default Bubble;
