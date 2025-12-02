import Image from "next/image";

const Hero = () => {
  return (
    <div className="relative w-full h-screen">
      <Image src="/assets/icon/Logo.svg" width={800} height={400} alt="Logo" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"></Image>
      <Image src="/assets/bottom_line.png" width={800} height={50} alt="Bottom Line" className="absolute mt-115 left-1/2 transform -translate-x-1/2 z-10"></Image>
      <h2 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/2 mt-10 text-3xl z-10 uppercase font-[Ubuntu] text-white text-center" style={{ letterSpacing: "1.5rem" }}>
        Have a good time
      </h2>
      <Image src="/assets/bg/header_bg_2.jpg" fill={true} alt="Header Background" className="object-cover z-0"></Image>
      <Image src="/assets/bg/header_bg_1.png" fill={true} alt="Header Overlay" className="object-cover z-5 opacity-50"></Image>
    </div>
  );
};

export default Hero;
