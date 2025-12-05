import Image from "next/image";
import { FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaSnapchatGhost } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative bg-black text-white py-12 px-8 min-h-[500px]">
      <Image src="/assets/bg/footerbg.jpg" alt="Footer Background" fill className="object-cover opacity-10" style={{ zIndex: 0 }} />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
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

      {/* Bottom Section */}
      <div className="relative z-10 mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto">
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
    </footer>
  );
}
