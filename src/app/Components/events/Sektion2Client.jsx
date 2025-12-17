'use client';
import { useState } from "react";
import Image from "next/image";
import EventCard from "./EventCard";

export default function Sektion2Client({ events }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const eventsPerSlide = 2;
  const totalSlides = Math.ceil(events.length / eventsPerSlide);

  return (
    <>
      {/* Desktop */}
      <div className="hidden sm:block">
        <h2 className="text-center text-3xl mb-2 text-white">EVENTS OF THE MONTH</h2>
        <Image
          src="/assets/bottom_line2.png"
          alt="Underline"
          width={200}
          height={5}
          className="mx-auto mb-15"
        />
        <div className="max-w-6xl mx-auto px-4">
          <div className="overflow-hidden mb-8">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {events.map((event, index) => (
                <EventCard
                  key={event.id}
                  event={event}
                  index={index}
                  isHovered={hoveredIndex === index}
                  onHover={setHoveredIndex}
                />
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-2">
  {Array.from({ length: totalSlides }).map((_, index) => (
    <button
      key={index}
      onClick={() => setCurrentSlide(index)}
      className={`w-3 h-3 transition-colors ${
        index === currentSlide ? "bg-[#FF2A70]" : "bg-white"
      }`}
      style={{ borderRadius: 0 }}
    />
  ))}
</div>
        </div>
      </div>

      {/* Mobile */}
      <div className="sm:hidden">
        <h2 className="text-center text-2xl mb-2 text-white font-bold tracking-wide">
          EVENTS OF THE MONTH
        </h2>
          <Image
          src="/assets/bottom_line2.png"
          alt="Underline"
          width={200}
          height={5}
          className="mx-auto mb-15"
        />
        {events.length > 0 && (
          <div className="flex flex-col items-center">
            <div className="w-full max-w-md overflow-hidden shadow-lg bg-black/80">
              <div className="relative w-full h-96">
                <Image
                  src={events[currentSlide].asset.url}
                  alt={events[currentSlide].title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="flex w-full bg-[#FF2A70] text-white text-xs font-semibold">
                <div className="flex-1 py-2 text-center">
                  {new Date(events[currentSlide].date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                  })}
                </div>
                <div className="flex-1 py-2 text-center">
                  {new Date(events[currentSlide].date).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </div>
                <div className="flex-2 py-2 text-center">{events[currentSlide].location}</div>
              </div>

              {/* Navigation dots */}
             <div className="flex justify-center gap-3 mt-6 mb-2">
  {Array.from({ length: events.length }).map((_, index) => (
    <button
      key={index}
      onClick={() => setCurrentSlide(index)}
      className={`w-4 h-4 ${
        index === currentSlide ? "bg-[#FF2A70]" : "bg-white"
      }`}
      style={{ borderRadius: 0 }}
    />
  ))}
</div>

            </div>
          </div>
        )}
      </div>
    </>
  );
}


