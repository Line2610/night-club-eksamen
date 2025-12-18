"use client";

import { useState } from "react";
import Image from "next/image";
import EventCard from "./EventCard";

export default function Sektion2Client({ events }) {

  // Sæt initial værdi baseret på window.innerWidth
  const getInitialEventsPerSlide = () => {
    if (typeof window !== "undefined") {
      return window.innerWidth >= 768 ? 2 : 1;
    }
    return 1; // fallback for SSR
  };

  const [eventsPerSlide] = useState(getInitialEventsPerSlide);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const totalSlides = Math.max(1, Math.ceil((events?.length || 0) / eventsPerSlide));

  return (
    <>
      <h2 className="text-center text-2xl font-medium md:text-3xl mb-2 text-white tracking-wide">
        EVENTS OF THE MONTH
      </h2>

      <Image
        src="/assets/bottom_line2.png"
        alt="Underline"
        width={200}
        height={5}
        className="mx-auto mb-10 md:mb-12"
      />

      <div className="max-w-6xl mx-auto px-4">
        <div className="overflow-hidden mb-8">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {Array.from({ length: totalSlides }).map((_, slideIndex) => {
              const start = slideIndex * eventsPerSlide;
              const slice = (events || []).slice(start, start + eventsPerSlide);

              return (
                <div key={slideIndex} className="min-w-full flex">
                  {slice.map((event, indexInSlide) => {
                    const realIndex = start + indexInSlide;

                    return (
                      <EventCard
                        key={event.id ?? `${slideIndex}-${realIndex}`}
                        event={event}
                        index={realIndex}
                        isHovered={hoveredIndex === realIndex}
                        onHover={setHoveredIndex}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 transition-colors cursor-pointer ${
                index === currentSlide ? "bg-[#FF2A70]" : "bg-white"
              }`}
              style={{ borderRadius: 0 }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}



