"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import Image from "next/image";

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const workshopList = [
  {
    title: "Entrepreneurship 101",
    src: "/workshops/entrepreneurship.jpg", 
    description: "Build your startup from scratch.",
    ctaText: "Register Now",
    ctaLink: "#",
    content: () => {
      return (
        <div className="space-y-4">
          <div className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-lg">
            <h4 className="font-bold text-neutral-700 dark:text-neutral-200 mb-2">Workshop Agenda</h4>
            <ul className="list-disc list-inside text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
              <li>Ideation and validation techniques</li>
              <li>Understanding the Business Model Canvas</li>
              <li>Finding your first 100 customers</li>
            </ul>
          </div>
          <div className="flex justify-between items-center text-sm font-medium text-neutral-500">
            <span>📅 Date: 20th Oct</span>
            <span>📍 Venue: Main Auditorium</span>
          </div>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm">
            This introductory session is designed for students with zero experience but high ambition. Learn the foundational pillars of starting a venture at IIT Ropar.
          </p>
        </div>
      );
    },
  },
  {
    title: "Design Thinking & UI/UX",
    src: "/workshops/design.jpg",
    description: "Solve problems with user-centric design.",
    ctaText: "Register Now",
    ctaLink: "#",
    content: () => {
      return (
        <div className="space-y-4">
          <div className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-lg">
            <h4 className="font-bold text-neutral-700 dark:text-neutral-200 mb-2">What you will learn</h4>
            <ul className="list-disc list-inside text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
              <li>Empathy mapping and user research</li>
              <li>Prototyping with Figma</li>
              <li>Usability testing basics</li>
            </ul>
          </div>
          <div className="flex justify-between items-center text-sm font-medium text-neutral-500">
            <span>📅 Date: 25th Oct</span>
            <span>📍 Venue: CS Block, Lab 2</span>
          </div>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm">
             A hands-on workshop where you will form teams and solve a real-world design challenge within 3 hours. Laptop required.
          </p>
        </div>
      );
    },
  },
  {
    title: "Pitch Deck Masterclass",
    src: "/workshops/pitch.jpg",
    description: "Learn to sell your vision to investors.",
    ctaText: "Register Now",
    ctaLink: "#",
    content: () => {
      return (
        <div className="space-y-4">
          <div className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-lg">
            <h4 className="font-bold text-neutral-700 dark:text-neutral-200 mb-2">Key Takeaways</h4>
            <ul className="list-disc list-inside text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
              <li>Storytelling for founders</li>
              <li>The 10-slide rule</li>
              <li>Handling Q&A sessions</li>
            </ul>
          </div>
          <div className="flex justify-between items-center text-sm font-medium text-neutral-500">
            <span>📅 Date: 28th Oct</span>
            <span>📍 Venue: E-Cell Office</span>
          </div>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm">
            Your idea is only as good as your pitch. Join us for a session dissecting successful pitch decks from Unicorn startups like Uber and Airbnb.
          </p>
        </div>
      );
    },
  },
  {
    title: "Product Management",
    src: "/workshops/pm.jpg",
    description: "From feature roadmap to launch.",
    ctaText: "Register Now",
    ctaLink: "#",
    content: () => {
      return (
        <div className="space-y-4">
          <div className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-lg">
            <h4 className="font-bold text-neutral-700 dark:text-neutral-200 mb-2">Topics</h4>
            <ul className="list-disc list-inside text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
              <li>Defining MVP (Minimum Viable Product)</li>
              <li>Agile methodologies</li>
              <li>Metrics that matter (KPIs)</li>
            </ul>
          </div>
          <div className="flex justify-between items-center text-sm font-medium text-neutral-500">
            <span>📅 Date: 2nd Nov</span>
            <span>📍 Venue: Lecture Hall 3</span>
          </div>
           <p className="text-neutral-600 dark:text-neutral-400 text-sm">
            Dive into the intersection of Business, Tech, and UX. This workshop is ideal for those looking to intern as APMs next summer.
          </p>
        </div>
      );
    },
  },
];

function WorkshopPage() {
  const [active, setActive] = useState<
    (typeof workshopList)[number] | boolean | null
  >(null);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <main className="relative min-h-screen">
        {/* Background */}
        <div className="fixed inset-0 z-0 bg-gradient-to-br from-black via-gray-900 to-blue-950">
        </div>

        <h1 className="relative z-10 pt-34 text-center justify-center font-bold text-5xl mb-12 mt-24 text-white">
          Our Workshops
        </h1>

        {/* Overlay (desktop only) */}
        <AnimatePresence>
          {active && typeof active === "object" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 z-10 hidden sm:block"
            />
          )}
        </AnimatePresence>

        {/* Modal */}
        <AnimatePresence>
          {active && typeof active === "object" && (
            <div className="fixed inset-0 z-[100] grid place-items-center ">
              {/* Close Button for Mobile */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6 z-[110]"
                onClick={() => setActive(null)}
              >
                <CloseIcon />
              </motion.button>

              {/* Modal Card */}
              <motion.div
                layoutId={`card-${active.title}-${id}`}
                ref={ref}
                className="w-full max-w-[500px] h-full md:max-h-[90vh] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
              >
                {/* Scrollable content container */}
                <div className="flex flex-col overflow-y-auto max-h-full">
                  
                  {/* Image in Modal */}
                  <motion.div layoutId={`image-${active.title}-${id}`}>
                    <img
                      src={active.src}
                      alt={active.title}
                      className="w-full h-60 object-cover sm:rounded-t-3xl"
                    />
                  </motion.div>

                  {/* Title + CTA */}
                  <div className="p-4 flex justify-between items-start gap-4 border-b border-neutral-200 dark:border-neutral-700">
                    <div>
                      <motion.h3
                        layoutId={`title-${active.title}-${id}`}
                        className="font-bold text-neutral-800 dark:text-neutral-200 text-lg"
                      >
                        {active.title}
                      </motion.h3>
                      <motion.p
                        layoutId={`description-${active.description}-${id}`}
                        className="text-neutral-600 dark:text-neutral-400 text-sm"
                      >
                        {active.description}
                      </motion.p>
                    </div>
                    <motion.a
                      layout
                      href={active.ctaLink}
                      target="_blank"
                      className="px-4 py-2 text-sm rounded-full font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors whitespace-nowrap"
                    >
                      {active.ctaText}
                    </motion.a>
                  </div>

                  {/* Extended Content Area (Agenda, Details) */}
                  <div className="p-4 flex flex-col gap-4 overflow-y-auto max-h-[calc(90vh-300px)]">
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Cards Grid */}
        <ul className="relative z-10 max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 items-start gap-8 px-4 pb-20">
          {workshopList.map((card, index) => (
            <motion.div
              layoutId={`card-${card.title}-${id}`}
              key={card.title}
              onClick={() => setActive(card)}
              className="p-4 flex flex-col hover:bg-white/10 dark:hover:bg-neutral-800/50 rounded-xl cursor-pointer transition-colors border border-transparent hover:border-white/20"
            >
              <div className="flex gap-4 flex-col w-full">
                <motion.div layoutId={`image-${card.title}-${id}`}>
                  <Image
                    width={400}
                    height={400}
                    src={card.src}
                    alt={card.title}
                    className="h-60 w-full rounded-lg object-cover object-center"
                  />
                </motion.div>
                <div className="flex justify-center items-center flex-col">
                  <motion.h3
                    layoutId={`title-${card.title}-${id}`}
                    className="font-bold text-white text-center md:text-left text-xl mt-2"
                  >
                    {card.title}
                  </motion.h3>
                  <motion.p
                    layoutId={`description-${card.description}-${id}`}
                    className="text-neutral-300 text-center md:text-left text-base"
                  >
                    {card.description}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          ))}
        </ul>
      </main>
    </>
  );
}

export default WorkshopPage;