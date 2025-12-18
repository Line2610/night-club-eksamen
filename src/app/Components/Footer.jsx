import Image from "next/image";
import { FaTwitter, FaFacebookF, FaInstagram, FaSnapchatGhost } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative bg-black text-white py-12 px-8 min-h-[500px]">
      {/* Background image */}
      <Image src="/assets/bg/footerbg.jpg" alt="Footer Background" fill className="object-cover opacity-10" style={{ zIndex: 0 }} />

      {/* Desktop/Tablet Layout (hidden on mobile) */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto hidden sm:grid">
        {/* Column 1: Logo + Location + Opening Hours */}
        <div>
          <Image src="/assets/icon/Logo_main.svg" alt="Night Club Logo" width={150} height={50} className="mb-6" />
          <h3 className="text-[#FF2A70] font-bold mb-3">LOCATION</h3>
          <p>Kompagnistræde 278</p>
          <p className="mb-6">1265 København K</p>
          <h3 className="text-[#FF2A70] font-bold mb-3">OPENING HOURS</h3>
          <p>WED - THU 10:30 PM TO 3 AM</p>
          <p>SAT - SUN: 11 PM TO 5 AM</p>
        </div>
        {/* Column 2: Recent Posts */}
        <div>
          <h3 className="text-[#FF2A70] font-bold mb-6">RECENT POSTS</h3>
          <div className="flex gap-4 mb-6">
            <Image src="/assets/content-img/recent_post1.jpg" alt="Post 1" width={80} height={80} className="object-cover" />
            <div>
              <p className="text-sm mb-2">Lorem Ipsum is simply dummy text of the printing and typesetting.</p>
              <p className="text-[#FF2A70] text-xs">April 17, 2018</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Image src="/assets/content-img/recent_post2.jpg" alt="Post 2" width={80} height={80} className="object-cover" />
            <div>
              <p className="text-sm mb-2">Lorem Ipsum is simply dummy text of the printing and typesetting.</p>
              <p className="text-[#FF2A70] text-xs">April 17, 2018</p>
            </div>
          </div>
        </div>
        {/* Column 3: Recent Tweets */}
        <div>
          <h3 className="text-[#FF2A70] font-bold mb-6">RECENT TWEETS</h3>
          <div className="mb-6">
            <div className="flex gap-2 mb-2">
              <FaTwitter className="text-[#FF2A70]" size={25} />
              <span className="text-[#FF2A70]"></span>
              <p className="text-sm">It is a long established fact that a reader will be distracted by the readable...</p>
            </div>
            <p className="text-[#FF2A70] text-xs ml-9">5 hours ago</p>
          </div>
          <div>
            <div className="flex gap-2 mb-2">
              <FaTwitter className="text-[#FF2A70]" size={25} />
              <span className="text-[#FF2A70]"></span>
              <p className="text-sm">It is a long established fact that a reader will be distracted by the readable...</p>
            </div>
            <p className="text-[#FF2A70] text-xs ml-9">5 hours ago</p>
          </div>
        </div>
      </div>

      {/* Bottom Section (desktop/tablet) */}
      <div className="relative z-10 mt-12 pt-8 border-t border-gray-700 flex-col md:flex-row justify-between items-center max-w-7xl mx-auto hidden sm:flex">
        <p className="text-sm mb-4 md:mb-0">Night Club PSD Template - All Rights Reserved</p>
        <div className="flex flex-col items-center mb-4 md:mb-0">
          <p className="text-sm mb-3">Stay Connected With Us</p>
          <div className="flex gap-4">
            <div className="border border-white w-10 h-10 flex items-center justify-center">
              <FaFacebookF />
            </div>
            <div className="border border-white w-10 h-10 flex items-center justify-center">
              <FaSnapchatGhost />
            </div>
            <div className="border border-white w-10 h-10 flex items-center justify-center">
              <FaInstagram />
            </div>
          </div>
        </div>
        <p className="text-sm">Copyright © NightClub</p>
      </div>

      {/* Mobile Layout*/}
      <div className="relative z-10 w-full flex flex-col items-center text-center sm:hidden">
        <Image src="/assets/icon/Logo_main.svg" alt="Night Club Logo" width={140} height={40} className="mb-2 mt-4" />
        <p className="uppercase tracking-[0.2em] text-xs mb-6 text-white/80">Have a good time</p>
        <h3 className="text-[#FF2A70] font-bold text-lg mb-1 mt-2">LOCATION</h3>
        <p className="text-base">Kompagnistræde 278</p>
        <p className="mb-5 text-base">1265 København K</p>
        <h3 className="text-[#FF2A70] font-bold text-lg mb-1">OPENING HOURS</h3>
        <p className="text-base">WED - THU 10:30 PM TO 3 AM</p>
        <p className="mb-5 text-base">SAT - SUN: 11 PM TO 5 AM</p>
        <p className="text-base mb-3 mt-2">Stay Connected With Us</p>
        <div className="flex gap-5 mb-8">
          <a href="#" aria-label="Facebook" className="border border-white w-12 h-12 flex items-center justify-center text-xl hover:bg-[#FF2A70] hover:border-[#FF2A70] transition-colors">
            <FaFacebookF />
          </a>
          <a href="#" aria-label="Snapchat" className="border border-white w-12 h-12 flex items-center justify-center text-xl hover:bg-[#FF2A70] hover:border-[#FF2A70] transition-colors">
            <FaSnapchatGhost />
          </a>
          <a href="#" aria-label="Instagram" className="border border-white w-12 h-12 flex items-center justify-center text-xl hover:bg-[#FF2A70] hover:border-[#FF2A70] transition-colors">
            <FaInstagram />
          </a>
        </div>
        <p className="text-sm mb-1">Night Club PSD Template</p>
        <p className="text-sm mb-1">All Rights Reserved</p>
        <p className="text-sm">Copyright © NightClub</p>
      </div>
    </footer>
  );
}
