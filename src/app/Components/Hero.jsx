"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

const Hero = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showLogo, setShowLogo] = useState(false);
  const [showTagline, setShowTagline] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState("");

  const backgroundImages = ["/assets/bg/header_bg_1.jpg", "/assets/bg/header_bg_2.jpg"];

  useEffect(() => {
    // Select random background image
    const randomBg = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
    setBackgroundImage(randomBg);

    // Loading sequence
    const loadingTimer = setTimeout(() => {
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

    return () => clearTimeout(loadingTimer);
  }, []);

  if (isLoading) {
    return (
      <div className="relative w-full h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse">
          <Image src="/assets/loader/madbars.gif" width={40} height={40} alt="Loading" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Logo med fold-in animation - Fuldt responsiv */}
      <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-1000 px-4 ${showLogo ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}>
        <Image 
          src="/assets/icon/Logo.svg" 
          width={800} 
          height={400} 
          alt="Logo" 
          className="w-64 h-auto sm:w-72 md:w-80 lg:w-96 xl:w-[500px] 2xl:w-[600px] max-w-full transform transition-transform duration-1000" 
          priority
        />
      </div>

      {/* Tagline med animation - Responsiv letter-spacing med Tailwind */}
      <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 z-10 px-4 sm:px-6 md:px-8 transition-all duration-800 ${showTagline ? "opacity-100 translate-y-4 sm:translate-y-5 md:translate-y-6 lg:translate-y-7 xl:translate-y-8" : "opacity-0 -translate-y-full"}`}>
        <h2 className="text-xl sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl uppercase font-[Ubuntu] text-white text-center whitespace-nowrap tracking-tight sm:tracking-wide md:tracking-wider lg:tracking-widest xl:tracking-[0.5rem] 2xl:tracking-[1rem]">
          Have a good time
        </h2>
      </div>

      {/* Bottom line med fade-in - NU MED WIDTH OG HEIGHT */}
      <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 z-10 px-4 transition-all duration-800 delay-500 ${showTagline ? "opacity-100 translate-y-10 sm:translate-y-12 md:translate-y-14 lg:translate-y-16 xl:translate-y-18 2xl:translate-y-40" : "opacity-0"}`}>
        <Image 
          src="/assets/bottom_line.png" 
          width={800} 
          height={50} 
          alt="Bottom Line" 
          className="w-48 h-auto sm:w-56 md:w-64 lg:w-72 xl:w-80 2xl:w-96 max-w-full" 
        />
      </div>

      {/* Background images - NU MED WIDTH OG HEIGHT */}
      <Image 
        src={backgroundImage} 
        width={1920}
        height={1080}
        alt="Header Background" 
        className="absolute inset-0 w-full h-full object-cover object-center z-0" 
        priority 
      />
      <Image 
        src="/assets/bg/header_bg_1.png" 
        width={1920}
        height={1080}
        alt="Header Background Overlay"
        className="absolute inset-0 w-full h-full object-cover object-center z-5 opacity-50" 
      />
    </div>
  );
};

export default Hero;