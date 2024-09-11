import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { CountUpStats } from "./CountUpStats"; // Import the CountUpStats component
import Alex from "../images/Alex.jpeg";

const CARD_SIZE_LG = 365;
const CARD_SIZE_SM = 290;

const BORDER_SIZE = 2;
const CORNER_CLIP = 50;
const CORNER_LINE_LEN = Math.sqrt(
  CORNER_CLIP * CORNER_CLIP + CORNER_CLIP * CORNER_CLIP
);

const ROTATE_DEG = 2.5;

const STAGGER = 15;
const CENTER_STAGGER = -65;

const SECTION_HEIGHT = 600;

export const SaveRecepie = () => {
  const [cardSize, setCardSize] = useState(CARD_SIZE_LG);
  const [testimonials, setTestimonials] = useState(TESTIMONIAL_DATA);

  const handleMove = (position) => {
    const copy = [...testimonials];

    if (position > 0) {
      for (let i = position; i > 0; i--) {
        const firstEl = copy.shift();

        if (!firstEl) return;

        copy.push({ ...firstEl, tempId: Math.random() });
      }
    } else {
      for (let i = position; i < 0; i++) {
        const lastEl = copy.pop();

        if (!lastEl) return;

        copy.unshift({ ...lastEl, tempId: Math.random() });
      }
    }

    setTestimonials(copy);
  };

  useEffect(() => {
    const { matches } = window.matchMedia("(min-width: 640px)");

    if (matches) {
      setCardSize(CARD_SIZE_LG);
    } else {
      setCardSize(CARD_SIZE_SM);
    }

    const handleSetCardSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");

      if (matches) {
        setCardSize(CARD_SIZE_LG);
      } else {
        setCardSize(CARD_SIZE_SM);
      }
    };

    window.addEventListener("resize", handleSetCardSize);

    return () => window.removeEventListener("resize", handleSetCardSize);
  }, []);

  return (
    <div>
      {/* Add CountUpStats component at the top */}
      <CountUpStats />

      <div
        className="relative w-full overflow-hidden bg-neutral-200 "
        style={{
          height: SECTION_HEIGHT,
        }}
      >
        {testimonials.map((t, idx) => {
          let position = 0;

          if (testimonials.length % 2) {
            position = idx - (testimonials.length + 1) / 2;
          } else {
            position = idx - testimonials.length / 2;
          }

          return (
            <TestimonialCard
              key={t.tempId}
              testimonial={t}
              handleMove={handleMove}
              position={position}
              cardSize={cardSize}
            />
          );
        })}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-8">
          <button
            onClick={() => handleMove(-1)}
            className="grid h-14 w-14 place-content-center text-3xl transition-colors hover:bg-black hover:text-white"
          >
            <GoArrowLeft />
          </button>
          <button
            onClick={() => handleMove(1)}
            className="grid h-14 w-14 place-content-center text-3xl transition-colors hover:bg-black hover:text-white"
          >
            <GoArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

const TestimonialCard = ({ position, testimonial, handleMove, cardSize }) => {
  const isActive = position === 0;

  return (
    <motion.div
      initial={false}
      onClick={() => handleMove(position)}
      className={`
      absolute left-1/2 top-1/2 cursor-pointer border-black p-8 text-black transition-colors duration-500 ${
        isActive ? "z-10 bg-indigo-600" : "z-0 bg-white"
      }
      `}
      style={{
        borderWidth: BORDER_SIZE,
        clipPath: `polygon(${CORNER_CLIP}px 0%, calc(100% - ${CORNER_CLIP}px) 0%, 100% ${CORNER_CLIP}px, 100% 100%, calc(100% - ${CORNER_CLIP}px) 100%, ${CORNER_CLIP}px 100%, 0 100%, 0 0)`,
      }}
      animate={{
        width: cardSize,
        height: cardSize,
        x: `calc(-50% + ${position * (cardSize / 1.5)}px)`,
        y: `calc(-50% + ${
          isActive ? CENTER_STAGGER : position % 2 ? STAGGER : -STAGGER
        }px)`,
        rotate: isActive ? 0 : position % 2 ? ROTATE_DEG : -ROTATE_DEG,
        boxShadow: isActive ? "0px 8px 0px 4px black" : "0px 0px 0px 0px black",
      }}
      transition={{
        type: "spring",
        mass: 3,
        stiffness: 400,
        damping: 50,
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45 bg-black object-cover"
        style={{
          right: -BORDER_SIZE,
          top: CORNER_CLIP - BORDER_SIZE,
          width: CORNER_LINE_LEN,
          height: BORDER_SIZE,
        }}
      />
      <img
        src={testimonial.imgSrc}
        alt={`Testimonial image for ${testimonial.by}`}
        className="mb-4 h-14 w-12 bg-neutral-600 object-cover object-top"
        style={{
          boxShadow: "3px 3px 0px white",
        }}
      />
      <h3
        className={`text-base sm:text-xl ${
          isActive ? "text-white" : "text-black"
        }`}
      >
        "{testimonial.testimonial}"
      </h3>
      <p
        className={`absolute bottom-8 left-8 right-8 mt-2 text-sm italic ${
          isActive ? "text-indigo-200" : "text-neutral-700"
        }`}
      >
        - {testimonial.by}
      </p>
    </motion.div>
  );
};

const TESTIMONIAL_DATA = [
  {
    tempId: 0,
    testimonial: "Won a huge prize pool! Best fantasy experience ever.",
    by: "Alex, Fantasy Sports Player",
    imgSrc: Alex,
  },
  {
    tempId: 1,
    testimonial: "Secure platform and great winnings. Highly recommend!",
    by: "Dan, Fantasy Champion",
    imgSrc:
      "https://i.pinimg.com/736x/fe/f1/4a/fef14a425027ecad21786b05ab1db424.jpg",
  },
  {
    tempId: 2,
    testimonial: "Won my first fantasy game and the rewards were amazing!",
    by: "Stephanie, Winner in Fantasy Games",
    imgSrc:
      "https://i.pinimg.com/564x/93/3f/bc/933fbcf0f45a1af2d8228d3434da4397.jpg",
  },
  {
    tempId: 3,
    testimonial: "Easy to play and the prize pool is fantastic.",
    by: "Marie, Top Scorer in Fantasy League",
    imgSrc:
      "https://i.pinimg.com/564x/15/3c/a1/153ca16e09fe3dccde925495c08dc542.jpg",
  },
  {
    tempId: 4,
    testimonial:
      "Winning was fun, and the prize pool made it even better.",
    by: "Andre, Fantasy Game Winner",
    imgSrc:
      "https://i.pinimg.com/564x/7d/7e/91/7d7e91b9a6837f440ed9d849901151d3.jpg",
  },
  {
    tempId: 5,
    testimonial: "So happy with the prize pool, can't wait to play again!",
    by: "Jeremy, Fantasy Game Enthusiast",
    imgSrc:
      "https://i.pinimg.com/564x/44/a2/cc/44a2cc01c4f377bd3facd8fac4662a3c.jpg",
  },
  {
    tempId: 6,
    testimonial: "Big win in the fantasy league! Totally worth it.",
    by: "Pam, Fantasy Sports Champ",
    imgSrc:
      "https://i.pinimg.com/736x/3a/03/dc/3a03dc022af468147763415d14100d32.jpg",
  },
];
