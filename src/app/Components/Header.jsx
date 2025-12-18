"use client";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";

const Header = () => {
  // State til at holde styr på om mobilmenu er åben eller lukket
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Hook til at hente den nuværende side/rute
  const pathname = usePathname();

  // Funktion til at åbne/lukke mobilmenu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Funktion til at tjekke om den nuværende side matcher menu punktet (for aktiv styling)
  const isActive = (path) => {
    return pathname === path;
  };

  return (
    <>
      {/* Hoved header sektion - sticky navigation med sort baggrund */}
      <header className="bg-black to-pink-500 py-4 overflow-hidden sticky top-0 z-50">
        {/* Baggrunds overlay for at gøre baggrunden mørkere */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Pink kant i toppen af headeren */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#FF2A70]"></div>

        {/* Pink kant i bunden af headeren */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF2A70]"></div>

        {/* Dekorativ trekant i venstre hjørne - responsiv størrelse */}
        <div className="absolute top-0 left-0 w-0 h-0 border-t-60 md:border-t-80 border-t-[#FF2A70] border-r-60 md:border-r-80 border-r-transparent"></div>

        {/* Dekorativ trekant i højre hjørne - responsiv størrelse */}
        <div className="absolute right-0 w-0 h-0 border-b-60 md:border-b-80 border-b-[#FF2A70] border-l-60 md:border-l-80 border-l-transparent bottom-0"></div>

        {/* Container for logo og navigation med responsiv padding */}
        <div className="max-w-7xl mx-auto flex justify-between items-center px-16 sm:px-20 md:px-6 relative z-10">
          {/* Logo sektion */}
          <div className="">
            <Image src="/assets/Logo.png" width={180} height={60} alt="Logo" className="md:w-[180px] md:h-[50px]"></Image>
          </div>

          {/* Desktop navigation - skjult på mobil og tablet */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8 lg:space-x-12 text-white font-medium">
              {/* Home menu punkt med aktiv state og hover effekt */}
              <li className="flex flex-col items-center group">
                <a href="/" className={`pb-1 hover:text-[#FF2A70] transition-colors uppercase ${isActive("/") ? "text-[#FF2A70]" : ""}`}>
                  Home
                </a>
                {/* Bundlinje der vises ved aktiv side eller hover */}
                <Image src="/assets/bottom_line2.png" width={50} height={50} alt="bottom line" className={`mt-1 transition-opacity ${isActive("/") ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} />
              </li>

              {/* Blog menu punkt */}
              <li className="flex flex-col items-center group">
                <a href="/Blog" className={`hover:text-[#FF2A70] pb-1 transition-all uppercase ${isActive("/Blog") ? "text-[#FF2A70]" : ""}`}>
                  Blog
                </a>
                <Image src="/assets/bottom_line2.png" width={50} height={50} alt="bottom line" className={`mt-1 transition-opacity ${isActive("/Blog-post") ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} />
              </li>

              {/* Book table menu punkt */}
              <li className="flex flex-col items-center group">
                <a href="/Book-table" className={`hover:text-[#FF2A70] transition-all uppercase ${isActive("/Book-table") ? "text-[#FF2A70]" : ""}`}>
                  Book table
                </a>
                <Image src="/assets/bottom_line2.png" width={50} height={50} alt="bottom line" className={`mt-1 transition-opacity ${isActive("/book-table") ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} />
              </li>

              {/* Contact us menu punkt */}
              <li className="flex flex-col items-center group">
                <a href="/Contact-us" className={`hover:text-[#FF2A70] transition-all uppercase ${isActive("/Contact-us") ? "text-[#FF2A70]" : ""}`}>
                  Contact us
                </a>
                <Image src="/assets/bottom_line2.png" width={50} height={50} alt="bottom line" className={`mt-1 transition-opacity ${isActive("/Contact-us") ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} />
              </li>
            </ul>
          </nav>

          {/* Hamburger menu knap - kun synlig på mobil og tablet */}
          <button onClick={toggleMenu} className="md:hidden text-white p-2 cursor-pointer">
            <div className="space-y-1">
              {/* Tre linjer der danner hamburger ikonet */}
              <div className="w-6 h-0.5 bg-white"></div>
              <div className="w-6 h-0.5 bg-white"></div>
              <div className="w-6 h-0.5 bg-white"></div>
            </div>
          </button>
        </div>
      </header>

      {/* Mobilmenu overlay - kun vist når menu er åben */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 md:hidden">
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            {/* Luk knap (X) i øverste højre hjørne */}
            <button onClick={toggleMenu} className="absolute top-6 right-6 text-white text-3xl cursor-pointer">
              ×
            </button>

            {/* Mobilmenu navigation */}
            <nav className="text-center">
              <ul className="space-y-8 text-white text-2xl font-medium">
                {/* Home link - lukker menu når der klikkes */}
                <li>
                  <a href="/" className={`block hover:text-pink-400 transition-colors ${isActive("/") ? "text-pink-500" : ""}`} onClick={toggleMenu}>
                    HOME
                  </a>
                </li>
                {/* Blog link */}
                <li>
                  <a href="/Blog" className={`block hover:text-pink-500 transition-colors ${isActive("/Blog") ? "text-pink-500" : ""}`} onClick={toggleMenu}>
                    BLOG
                  </a>
                </li>
                {/* Book table link */}
                <li>
                  <a href="/Book-table" className={`block hover:text-pink-500 transition-colors ${isActive("/Book-table") ? "text-pink-500" : ""}`} onClick={toggleMenu}>
                    BOOK TABLE
                  </a>
                </li>
                {/* Contact us link */}
                <li>
                  <a href="/Contact-us" className={`block hover:text-pink-500 transition-colors ${isActive("/Contact-us") ? "text-pink-500" : ""}`} onClick={toggleMenu}>
                    CONTACT US
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
