"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ImFacebook } from "react-icons/im";
import { FaTwitter, FaSnapchatGhost } from "react-icons/fa";

const Testimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/testimonials")
      .then((res) => res.json())
      .then((data) => setTestimonials(data))
      .catch((err) => console.error("Error fetching testimonials:", err));
  }, []);

  if (!testimonials.length) {
    return (
      <section className="bg-black py-20 flex items-center justify-center">
        <div className="text-white text-xl">Loading testimonials...</div>
      </section>
    );
  }

  const current = testimonials[activeTestimonial];

  if (!current) return null;

  // Byg den fulde URL til billedet
  const imageUrl = current.assets?.url ? `http://localhost:4000${current.assets.url}` : "/assets/content-img/testimonial_2.jpg";

  return (
    <section className="bg-black py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image src="/assets/bg/footerbg.jpg" alt="Background" className="object-cover opacity-10" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10 px-6">
        {/* Profile Image */}
        <Image src={imageUrl} alt={current.name || "Profile"} width={150} height={150} className="mx-auto rounded-lg mb-8" />

        {/* Name */}
        <h3 className="text-white text-2xl font-bold mb-8 tracking-widest">{current.name?.toUpperCase()}</h3>

        {/* Text */}
        <p className="text-white text-lg leading-relaxed mb-12 max-w-3xl mx-auto">{current.content || "No content available"}</p>

        {/* Social Icons */}
        <div className="flex justify-center space-x-6 mb-12">
          <div className="w-12 h-12 border-2 border-white flex items-center justify-center cursor-pointer text-white hover:bg-white hover:text-black transition-all">
            <ImFacebook />
          </div>
          <div className="w-12 h-12 border-2 border-white flex items-center justify-center cursor-pointer text-white hover:bg-white hover:text-black transition-all">
            <FaTwitter />
          </div>
          <div className="w-12 h-12 border-2 border-white flex items-center justify-center cursor-pointer text-white hover:bg-white hover:text-black transition-all">
            <FaSnapchatGhost />
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center space-x-3">
          {testimonials.map((_, index) => (
            <button key={index} onClick={() => setActiveTestimonial(index)} className={`w-3 h-3 cursor-pointer ${activeTestimonial === index ? "bg-[#FF2A70]" : "bg-white"}`} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
