'use client';
import Image from "next/image";
import { useSpring, animated } from "@react-spring/web";

export default function EventCard({ event, index, isHovered, onHover }) {
  const date = new Date(event.date);
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const time = date.toLocaleString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });

  const truncateText = (text, maxLength = 100) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const overlayAnimation = useSpring({
    from: { opacity: 0 },
    to: { opacity: isHovered ? 1 : 0 },
    config: { duration: 1000 },
  });

  return (
<div
  className="min-w-full md:min-w-[50%] px-3 cursor-pointer"
  onMouseEnter={() => onHover(index)}
  onMouseLeave={() => onHover(null)}
  onClick={() => onHover(isHovered ? null : index)}
>

      <div className="relative h-96">
        <Image src={event.asset.url} alt={event.title} fill className="object-cover cursor-pointer" unoptimized />

        <animated.div style={overlayAnimation} className="absolute inset-0 flex flex-col items-center justify-end border-t-2 border-[#FF2A70]/50 pointer-events-none cursor-pointer">
          <div className="absolute top-0 left-0 w-0 h-0 border-t-80 border-t-[#FF2A70] border-r-80 border-r-transparent" />
          <div className="absolute right-0 w-0 h-0 border-b-80 border-b-[#FF2A70] border-l-80 border-l-transparent bottom-10" />

          <button className="bg-[#FF2A70] text-white px-6 py-2 font-semibold hover:bg-[#e02563] transition-colors mb-20 pointer-events-auto">
            Book Now
          </button>
          <div className="bg-black/80 w-full py-6 px-8 pb-15 border-b-2 border-[#FF2A70]">
            <h3 className="text-white text-xl font-bold mb-2">{event.title}</h3>
            <p className="text-white text-xs leading-relaxed">{truncateText(event.content || event.description, 120)}</p>
          </div>
        </animated.div>

        <div className="absolute bottom-0 left-0 right-0 bg-[#FF2A70] p-3">
          <div className="flex items-center gap-4 text-white text-xs">
            <span className="font-semibold">{day} {month}</span>
            <span className="font-semibold">{time}</span>
            <span className="font-semibold">{event.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
