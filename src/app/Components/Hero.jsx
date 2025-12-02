// "use client";
// import Image from "next/image";
// import { useState, useEffect } from "react";

// const Hero = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [showContent, setShowContent] = useState(false);

//   const backgrounds = ["/assets/bg/header_bg_1.jpg", "/assets/bg/header_bg_2.jpg"];
//   const randomBg = backgrounds[Math.floor(Math.random() * backgrounds.length)];

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//       setTimeout(() => setShowContent(true), 300);
//     }, 1500);

//     return () => clearTimeout(timer);
//   }, []);

//   if (isLoading) {
//     return (
//       <div className="w-full h-screen bg-black flex items-center justify-center">
//         <Image src="/assets/loader/madbars.gif" width={40} height={40} alt="Loading" />
//       </div>
//     );
//   }

//   return (
//     <div className="relative w-full h-screen">
//       <div className={`transition-all duration-1000 ${showContent ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}>
//         <Image src="/assets/icon/Logo.svg" width={800} height={400} alt="Logo" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"></Image>
//         <Image src="/assets/bottom_line.png" width={800} height={50} alt="Bottom Line" className="absolute mt-115 left-1/2 transform -translate-x-1/2 z-10"></Image>
//         <h2 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/2 mt-10 text-3xl z-20 uppercase text-white text-center" style={{ letterSpacing: "1.5rem" }}>
//           Have a good time
//         </h2>
//         <Image src="/assets/bottom_line.png" width={800} height={50} alt="Bottom Line" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/2 mt-20 z-20" />
//       </div>
//       <Image src={randomBg} fill={true} alt="Background image" className="object-cover z-0"></Image>
//       <Image src="/assets/bg/header_bg_1.png" alt="Background overlay" fill={true} className="object-cover z-5 opacity-50"></Image>
//     </div>
//   );
// };

// export default Hero;

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
      {/* Logo med fold-in animation */}
      <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-1000 ${showLogo ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}>
        <Image src="/assets/icon/Logo.svg" width={800} height={400} alt="Logo" className="transform transition-transform duration-1000" />
      </div>

      {/* Tagline med animation */}
      <h2 className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/2 mt-10 text-3xl z-10 uppercase font-[Ubuntu] text-white text-center transition-all duration-800 ${showTagline ? "opacity-100 translate-y-1/2" : "opacity-0 -translate-y-full"}`} style={{ letterSpacing: "1.5rem" }}>
        Have a good time
      </h2>

      {/* Bottom line med fade-in */}
      <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/2 mt-17 z-10 transition-all duration-800 delay-500 ${showTagline ? "opacity-100" : "opacity-0"}`}>
        <Image src="/assets/bottom_line.png" width={800} height={50} alt="Bottom Line" />
      </div>

      {/* Background images */}
      <Image src={backgroundImage} fill={true} alt="Header Background" className="object-cover z-0" priority />
      <Image src="/assets/bg/header_bg_1.png" fill={true} alt="Header Overlay" className="object-cover z-5 opacity-50" />
    </div>
  );
};

export default Hero;
