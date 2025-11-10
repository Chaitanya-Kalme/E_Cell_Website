"use client";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { useState, useRef, useId, useEffect } from "react";

interface SlideData {
  title: string;
  description: string;
  src: string;
}

interface SlideProps {
  slide: SlideData;
  index: number;
  current: number;
  handleSlideClick: (index: number) => void;
}

const Slide = ({ slide, index, current, handleSlideClick }: SlideProps) => {
  const imageLoaded = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.style.opacity = "1";
  };

  const { src, description, title } = slide;

  return (
    <li
      className="w-full h-auto flex flex-col md:flex-row items-center bg-[#1D1F2F] text-white p-4 rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      onClick={() => handleSlideClick(index)}
      style={{
        transform: current !== index ? "scale(0.98)" : "scale(1)",
        opacity: current === index ? 1 : 0.5,
        transition: "transform 0.5s ease, opacity 0.5s ease",
      }}
    >
      {/* Left - Image */}
      <div className="w-full md:w-1/2 md:h-80 overflow-hidden rounded-md">
        <img
          className="md:size-fit object-cover transition-opacity duration-700 ease-in-out"
          alt={title}
          src={src}
          onLoad={imageLoaded}
          loading="eager"
          decoding="sync"
        />
      </div>


      {/* Right - Text */}
      <article className="w-full md:w-1/2 p-6 text-left max-h-86 md:max-h-full overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <button className="px-4  text-sm text-black bg-white rounded-2xl shadow-lg hover:shadow-xl transition overflow-y-visible">
          {description}
        </button>
      </article>

    </li>
  );
};



interface CarouselControlProps {
  type: string;
  title: string;
  handleClick: () => void;
}

export const CarouselControl = ({
  type,
  title,
  handleClick,
}: CarouselControlProps) => {
  return (
    <button
      className={`w-12 h-12 flex items-center justify-center bg-white/70 dark:bg-black/40 border-3 border-transparent rounded-full focus:outline-none hover:scale-105 transition duration-200 ${type === "previous" ? "rotate-180" : ""}`}

      title={title}
      onClick={handleClick}
    >
      <IconArrowNarrowRight className="text-neutral-600 dark:text-neutral-200" />
    </button>
  );
};

interface CarouselProps {
  slides: SlideData[];
}

export default function Carousel({ slides }: CarouselProps) {
  const [current, setCurrent] = useState(0);

  const handlePreviousClick = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNextClick = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handleSlideClick = (index: number) => {
    if (current !== index) {
      setCurrent(index);
    }
  };

  const id = useId();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div
      className="w-full relative"
      aria-labelledby={`carousel-heading-${id}`}
    >
      <div className="flex items-center gap-4">
        {/* Left Arrow Button */}
        <div className="hidden md:block">
          <CarouselControl
            type="previous"
            title="Previous Slide"
            handleClick={handlePreviousClick}
          />
        </div>

        {/* Slide Container */}
        <div className="w-full overflow-hidden">
          <ul
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              width: `${slides.length * 100}%`,
              transform: `translateX(-${current * (100 / slides.length)}%)`,
            }}
          >
            {slides.map((slide, index) => (
              <Slide
                key={index}
                slide={slide}
                index={index}
                current={current}
                handleSlideClick={handleSlideClick}
              />
            ))}
          </ul>
        </div>

        {/* Right Arrow Button */}
        <div className="hidden md:block">
          <CarouselControl
            type="next"
            title="Next Slide"
            handleClick={handleNextClick}
          />
        </div>
      </div>
    </div>
  );
}

