"use client";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to check if current path matches menu item
  const isActive = (path) => {
    return pathname === path;
  };

  return (
    <>
      <header className="bg-black to-pink-500 py-4 relative overflow-hidden">
        {/* Background overlay */}
        <div className="absolute inset-0 bg-black/30"></div>
        {/* Top border */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#FF2A70]"></div>
        {/* Bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF2A70]"></div>
        {/* Triangles top - adjusted for mobile */}
        <div className="absolute top-0 left-0 w-0 h-0 border-t-[60px] md:border-t-[80px] border-t-[#FF2A70] border-r-[60px] md:border-r-[80px] border-r-transparent"></div>

        {/* Triangles bottom - adjusted for mobile */}
        <div className="absolute right-0 w-0 h-0 border-b-[60px] md:border-b-[80px] border-b-[#FF2A70] border-l-[60px] md:border-l-[80px] border-l-transparent bottom-0"></div>

        <div className="max-w-7xl mx-auto flex justify-between items-center px-16 sm:px-20 md:px-6 relative z-10">
          {/* Logo - moved inward on mobile */}
          <div className="">
            <Image src="/assets/Logo.png" width={180} height={60} alt="Logo" className="md:w-[180px] md:h-[50px]"></Image>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8 lg:space-x-12 text-white font-medium">
              <li className="flex flex-col items-center group">
                <a href="/" className={`pb-1 hover:text-[#FF2A70] transition-colors uppercase ${isActive("/") ? "text-[#FF2A70]" : ""}`}>
                  Home
                </a>
                <Image src="/assets/bottom_line2.png" width={50} height={50} alt="bottom line" className={`mt-1 transition-opacity ${isActive("/") ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} />
              </li>
              <li className="flex flex-col items-center group">
                <a href="/blog" className={`hover:text-[#FF2A70] pb-1 transition-all uppercase ${isActive("/blog") ? "text-[#FF2A70]" : ""}`}>
                  Blog
                </a>
                <Image src="/assets/bottom_line2.png" width={50} height={50} alt="bottom line" className={`mt-1 transition-opacity ${isActive("/Blog-post") ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} />
              </li>
              <li className="flex flex-col items-center group">
                <a href="/book-table" className={`hover:text-[#FF2A70] transition-all uppercase ${isActive("/book-table") ? "text-[#FF2A70]" : ""}`}>
                  Book table
                </a>
                <Image src="/assets/bottom_line2.png" width={50} height={50} alt="bottom line" className={`mt-1 transition-opacity ${isActive("/Book-table") ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} />
              </li>
              <li className="flex flex-col items-center group">
                <a href="/contact-us" className={`hover:text-[#FF2A70] transition-all uppercase ${isActive("/contact-us") ? "text-[#FF2A70]" : ""}`}>
                  Contact us
                </a>
                <Image src="/assets/bottom_line2.png" width={50} height={50} alt="bottom line" className={`mt-1 transition-opacity ${isActive("/Contact-us") ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} />
              </li>
              
            </ul>
          </nav>

          {/* Mobile Menu Button - moved inward */}
          <button onClick={toggleMenu} className="md:hidden text-white p-2 cursor-pointer">
            <div className="space-y-1">
              <div className="w-6 h-0.5 bg-white"></div>
              <div className="w-6 h-0.5 bg-white"></div>
              <div className="w-6 h-0.5 bg-white"></div>
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 md:hidden">
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            {/* Close Button */}
            <button onClick={toggleMenu} className="absolute top-6 right-6 text-white text-3xl cursor-pointer">
              ×
            </button>

            {/* Mobile Menu Items */}
            <nav className="text-center">
              <ul className="space-y-8 text-white text-2xl font-medium">
                <li>
                  <a href="/" className={`block hover:text-pink-400 transition-colors ${isActive("/") ? "text-pink-500" : ""}`} onClick={toggleMenu}>
                    HOME
                  </a>
                </li>
                <li>
                  <a href="/blog" className={`block hover:text-pink-500 transition-colors ${isActive("/blog") ? "text-pink-500" : ""}`} onClick={toggleMenu}>
                    BLOG
                  </a>
                </li>
                <li>
                  <a href="/book-table" className={`block hover:text-pink-500 transition-colors ${isActive("/book-table") ? "text-pink-500" : ""}`} onClick={toggleMenu}>
                    BOOK TABLE
                  </a>
                </li>
                <li>
                  <a href="/contact-us" className={`block hover:text-pink-500 transition-colors ${isActive("/contact-us") ? "text-pink-500" : ""}`} onClick={toggleMenu}>
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
