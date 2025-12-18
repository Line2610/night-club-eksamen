"use client";
import Image from "next/image";
import { useState, useRef } from "react";

const Hero = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showLogo, setShowLogo] = useState(false);
  const [showTagline, setShowTagline] = useState(false);
  const hasStartedAnimation = useRef(false);
  const backgroundImageRef = useRef(null);

  const backgroundImages = ["/assets/bg/header_bg_1.jpg", "/assets/bg/header_bg_2.jpg"];

  // Vælg tilfældigt baggrundsbillede
  if (backgroundImageRef.current === null) {
    backgroundImageRef.current = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
  }

  // Start loading animation og efterfølgende logo og tagline animationer
  if (isLoading && !hasStartedAnimation.current) {
    hasStartedAnimation.current = true;

    // Loading animation with timers
    setTimeout(() => {
      setIsLoading(false);
      // Start logo animation
      setTimeout(() => {
        setShowLogo(true);
        // Start tagline animation efter logo
        setTimeout(() => {
          setShowTagline(true);
        }, 800);
      }, 200);
    }, 2000);
  }

  if (isLoading) {
    return (
      <div className="relative w-full h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse">
          <Image src="/assets/loader/madbars.gif" width={40} height={40} alt="Loading" style={{ width: "auto", height: "auto" }} />
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Logo med fold-in animation  */}
      <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-1000 ${showLogo ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}>
        <Image src="/assets/icon/Logo.svg" width={400} height={200} alt="Logo" className="w-64 h-auto sm:w-80 md:w-96 lg:w-[500px] xl:w-[600px] 2xl:w-[800px] transform transition-transform duration-1000" />
      </div>

      {/* Tagline med animation */}
      <h2 className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/2 mt-3 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-14 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl z-10 uppercase text-white text-center transition-all duration-800 px-4 tracking-wide sm:tracking-wider md:tracking-widest lg:tracking-[0.8rem] xl:tracking-[1.0rem] 2xl:tracking-[1.3rem] ${showTagline ? "opacity-100 translate-y-1/2" : "opacity-0 -translate-y-full"}`}>Have a good time</h2>

      {/* Bottom line med fade-in */}
      <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/2 mt-9 sm:mt-14 md:mt-16 lg:mt-18 xl:mt-20 2xl:mt-24 z-10 transition-all duration-800 delay-500 ${showTagline ? "opacity-100" : "opacity-0"}`}>
        <Image src="/assets/bottom_line.png" width={300} height={30} alt="Bottom Line" className="w-48 h-auto sm:w-60 md:w-80 lg:w-96 xl:w-[500px] 2xl:w-[600px]" />
      </div>

      {/* Baggrundsbillede */}
      <Image src={backgroundImageRef.current} fill={true} alt="Header Background" className="object-cover z-0" priority />
    </div>
  );
};

export default Hero;
