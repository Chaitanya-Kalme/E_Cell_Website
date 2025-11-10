"use client";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { useState, useRef, useId, useEffect } from "react";

interface SlideData {
  src: string;
}

interface SlideProps {
  slide: SlideData;
  index: number;
  current: number;
  handleSlideClick: (index: number) => void;
}

const Slide = ({ slide, index, current, handleSlideClick }: SlideProps) => {
  const slideRef = useRef<HTMLLIElement>(null);
  const xRef = useRef(0);
  const yRef = useRef(0);

  const imageLoaded = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.style.opacity = "1";
  };

  const { src } = slide;

  return (
    <li
      ref={slideRef}
      className="w-full h-50 md:h-screen relative flex items-center justify-center text-white z-10 overflow-hidden"
      onClick={() => handleSlideClick(index)}
      style={{
        transform:
          current !== index ? "scale(0.98) rotateX(8deg)" : "scale(1) rotateX(0deg)",
        transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        transformOrigin: "bottom",
      }}
    >
      <div
        className="absolute top-0 left-0 w-full h-full bg-[#1D1F2F] overflow-hidden transition-all duration-150 ease-out"
        style={{
          transform:
            current === index
              ? "translate3d(calc(var(--x) / 30), calc(var(--y) / 30), 0)"
              : "none",
        }}
      >
        <img
          className="absolute inset-0 w-full h-full object-contain md:object-cover transition-opacity duration-600 ease-in-out"
          style={{ opacity: current === index ? 1 : 0.5 }}
          alt={`Image${index}`}
          src={src}
          onLoad={imageLoaded}
          loading="eager"
          decoding="sync"
        />
        {current === index && (
          <div className="absolute inset-0 bg-black/30 transition-all duration-1000" />
        )}
      </div>

    </li>
  );
};


interface CarouselControlProps {
  type: string;
  title: string;
  handleClick: () => void;
}

const CarouselControl = ({
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
  const [carouselHeight, setCarouselHeight] = useState<string>("100vh");

  useEffect(() => {
    // Function to update height based on window width
    const updateHeight = () => {
      if (window.innerWidth >= 768) {
        // md breakpoint and above
        setCarouselHeight(`calc(100vh - 6rem)`);
      } else {
        // mobile: let height fit images naturally
        setCarouselHeight("auto");
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prevCurrent) => (prevCurrent + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="w-full overflow-hidden relative" style={{ height: carouselHeight }}>
      <ul
        className="flex transition-transform duration-1000 ease-in-out"
        style={{
          width: `${slides.length * 100}vw`,
          height: carouselHeight,
          transform: `translateX(-${current * 100}vw)`,
        }}
      >
        {slides.map((slide, index) => (
          <Slide
            key={index}
            slide={slide}
            index={index}
            current={current}
            handleSlideClick={(i) => setCurrent(i)}
          />
        ))}
      </ul>

      <div className="absolute top-1/2 left-0 right-0 flex justify-between items-center">
        <CarouselControl
          type="previous"
          title="Go to previous slide"
          handleClick={() =>
            setCurrent((prev) => (prev - 1 < 0 ? slides.length - 1 : prev - 1))
          }
        />
        <CarouselControl
          type="next"
          title="Go to next slide"
          handleClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
        />
      </div>
    </div>
  );
}
