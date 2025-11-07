"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

let interval;

export const CardStack = ({
  items,
  offset,
  scaleFactor,
}) => {
  const CARD_OFFSET = offset || 10;
  const SCALE_FACTOR = scaleFactor || 0.06;
  const [cards, setCards] = useState(items);

  useEffect(() => {
    startFlipping();

    return () => clearInterval(interval);
  }, []);
  
  const startFlipping = () => {
    interval = setInterval(() => {
      setCards((prevCards) => {
        const newArray = [...prevCards]; // create a copy of the array
        newArray.unshift(newArray.pop()); // move the last element to the front
        return newArray;
      });
    }, 10000);
  };

  return (
    <div className="relative w-[1152px] h-[756px]">
      {cards.map((card, index) => {
        return (
          <motion.div
            key={card.id}
            className="absolute bg-white w-[1152px] h-[756px] rounded-3xl p-12 shadow-xl border border-neutral-200 shadow-black/[0.1] grid grid-cols-2 gap-12"
            style={{
              transformOrigin: "top center",
            }}
            animate={{
              top: index * -CARD_OFFSET,
              scale: 1 - index * SCALE_FACTOR, // decrease scale for cards that are behind
              zIndex: cards.length - index, //  decrease z-index for the cards that are behind
            }}
          >
            {/* Left Side - Text Content */}
            <div className="flex flex-col justify-center space-y-6">
              <div className="font-normal text-gray-900 text-xl leading-relaxed">
                {card.content}
              </div>
              <div>
                <p className="text-gray-900 font-semibold text-2xl mb-2">
                  {card.name}
                </p>
                <p className="text-gray-600 font-normal text-lg">
                  {card.designation}
                </p>
              </div>
            </div>
            
            {/* Right Side - Illustration */}
            <div className="flex items-center justify-center">
              <img 
                src={card.illustration} 
                alt={`Illustration for ${card.name}`}
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
