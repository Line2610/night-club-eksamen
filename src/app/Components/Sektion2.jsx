"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

async function getEvents() {
  const res = await fetch("http://localhost:4000/events", {});

  return res.json();
}

export default function Sektion2() {
  const [events, setEvents] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    getEvents().then((data) => {
      const updatedEvents = data.map((event, index) => {
        if (index % 2 === 0) {
          return {
            ...event,
            date: "2025-12-25T22:30:00.000Z",
            location: "City Plaza, New York",
          };
        } else {
          return {
            ...event,
            date: "2025-12-31T22:30:00.000Z",
            location: "Las Vegas, Nevada",
          };
        }
      });
      setEvents(updatedEvents);
    });
  }, []);

  const totalSlides = Math.ceil(events.length / 2);

  return (
    <section className="relative py-16">
      <Image src="/assets/bg/slider_bg_overlay.png" alt="background overlay" fill className="object-cover -z-10" />

      <h2 className="text-center text-3xl mb-10 text-white">EVENTS OF THE MONTH</h2>

      <div className="max-w-6xl mx-auto px-4">
        {/* Carousel container */}
        <div className="overflow-hidden mb-8">
          <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {events.map((event) => {
              const date = new Date(event.date);
              const day = date.getDate();
              const month = date.toLocaleString("en-US", { month: "short" });
              const time = "10:30 PM";

              return (
                <div key={event.id} className="min-w-[50%] px-3">
                  <div className="relative overflow-hidden h-80">
                    <Image src={event.asset.url} alt={event.title} fill className="object-cover" />
                    <div className="absolute bottom-0 left-0 right-0 bg-[#FF2A70] p-3">
                      <div className="flex items-center gap-4 text-white text-xs">
                        <span className="font-semibold">
                          {day} {month}
                        </span>
                        <span className="font-semibold">{time}</span>
                        <span className="font-semibold">{event.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button key={index} onClick={() => setCurrentSlide(index)} className={`w-3 h-3 transition-colors ${index === currentSlide ? "bg-[#FF2A70]" : "bg-white"}`} aria-label={`Go to slide ${index + 1}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
