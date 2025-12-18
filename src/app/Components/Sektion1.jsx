"use client";
import Image from "next/image";
import { useSpring, animated } from "@react-spring/web";
import { useState } from "react";

const ImageCard = ({ src, alt, title, description }) => {
  const [isHovered, setIsHovered] = useState(false);

  const overlayAnimation = useSpring({
    opacity: isHovered ? 1 : 0,
    config: { duration: 1000 },
  });

  const borderTopAnimation = useSpring({
    transform: isHovered ? "translateY(0%)" : "translateY(-100%)",
    config: { duration: 1000 },
  });

  const borderBottomAnimation = useSpring({
    transform: isHovered ? "translateY(0%)" : "translateY(100%)",
    config: { duration: 1000 },
  });

  const textAnimation = useSpring({
    opacity: isHovered ? 1 : 0,
    config: { duration: 1000 },
  });

  return (
    <div className="relative overflow-hidden cursor-pointer group w-90 h-100" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onTouchStart={() => setIsHovered(true)} onTouchEnd={() => setIsHovered(false)}>
      <Image src={src} width={500} height={300} alt={alt} className="w-full h-full object-cover" />

      {/* Sort overlay */}
      <animated.div style={overlayAnimation} className="absolute inset-0 bg-black bg-opacity-80 flex flex-col justify-center items-center">
        {/* Top border */}
        <animated.div style={borderTopAnimation} className="absolute top-0 left-0 right-0 h-1 bg-[#FF2A70]" />

        {/* Triangles top*/}
        <div className="absolute top-0 left-0 w-0 h-0 border-t-80 border-t-[#FF2A70] border-r-80 border-r-transparent"></div>

        {/* Triangles bottom */}
        <div className="absolute right-0 w-0 h-0 border-b-80 border-b-[#FF2A70] border-l-80 border-l-transparent bottom-0"></div>

        {/* Bottom border */}
        <animated.div style={borderBottomAnimation} className="absolute bottom-0 left-0 right-0 h-1 bg-[#FF2A70]" />

        {/* Text content */}
        <animated.div style={textAnimation} className="text-white text-center p-6">
          <h3 className="text-xl font-bold mb-2 uppercase tracking-wider">{title}</h3>
          <p className="text-sm text-gray-300">{description}</p>
        </animated.div>
      </animated.div>
    </div>
  );
};

const Sektion1 = () => {
  return (
    <section className="bg-black py-16">
      <div className="container mx-auto px-4">
        <h2 className="uppercase text-center text-3xl text-white font-medium tracking-wider mb-2">Welcome in nightclub</h2>

        <Image src="/assets/bottom_line2.png" width={400} height={50} alt="decorative line" className="mx-auto block" />

        <div className="flex flex-wrap gap-4 justify-center mt-8 mb-16">
          <ImageCard src="/assets/content-img/thumb1.jpg" alt="nightclub dining" title="NIGHT CLUB" icon="/assets/icon/favicon.png" description="There are many variations of passages of Lorem Ipsum avalible, but the majority have suffered alteration in som form, by injected humour, or randomised words which dont look slightly belivable." />
          <ImageCard src="/assets/content-img/reastaurant_1.jpg" alt="restaurant food" title="RESTAURANT" icon="/assets/icon/favicon.png" description="There are many variations of passages of Lorem Ipsum avalible, but the majority have suffered alteration in som form, by injected humour, or randomised words which dont look slightly belivable." />
          <ImageCard src="/assets/content-img/thumb2.jpg" alt="nightclub bar" title="BAR" icon="/assets/icon/favicon.png" description="There are many variations of passages of Lorem Ipsum avalible, but the majority have suffered alteration in som form, by injected humour, or randomised words which dont look slightly belivable." />
        </div>
      </div>
    </section>
  );
};

export default Sektion1;
