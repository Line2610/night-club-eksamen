"use client";
import Image from "next/image";
import { useState, useRef } from "react";
import { ImFacebook } from "react-icons/im";
import { FaTwitter, FaSnapchatGhost } from "react-icons/fa";

const Testimonials = () => {
  // State til at holde styr på hvilket testimonial der er aktivt
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  
  // State til at gemme alle testimonials data fra API
  const [testimonials, setTestimonials] = useState([]);
  
  // State til at vise loading mens data hentes
  const [isLoading, setIsLoading] = useState(true);
  
  // Ref til at sikre vi kun henter data én gang
  const hasFetched = useRef(false);

  // Hent testimonials data kun én gang
  if (!hasFetched.current) {
    hasFetched.current = true;
    
    // Fetch data fra API
    fetch("http://localhost:4000/testimonials")
      .then((res) => res.json())
      .then((data) => {
        console.log("Testimonials data:", data); // Debug log for at se data struktur
        setTestimonials(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Fejl ved hentning af testimonials:", err);
        setIsLoading(false);
      });
  }

  // Vis loading besked mens data hentes
  if (isLoading) {
    return (
      <section className="bg-black py-20 flex items-center justify-center">
        <div className="text-white text-xl">Loading testimonials...</div>
      </section>
    );
  }

  // Vis besked hvis ingen testimonials er tilgængelige
  if (!testimonials.length) {
    return (
      <section className="bg-black py-20 flex items-center justify-center">
        <div className="text-white text-xl">No testimonials available</div>
      </section>
    );
  }

  // Hent det nuværende aktive testimonial
  const current = testimonials[activeTestimonial];

  // Hvis der ikke er noget aktivt testimonial, returner ingenting
  if (!current) return null;

// Henter billede URL fra testimonial data med fallback til default billede
// current.asset?.url - API billede (hvis det eksisterer)
// || - fallback operator
// "/assets/content-img/testimonial_2.jpg" - standard billede hvis API billede mangler
  const imageUrl =
  current.asset?.url || "/assets/content-img/testimonial_2.jpg";

  console.log("Current testimonial:", current); // Debug log
  console.log("Image URL:", imageUrl); // Debug log

  return (
    <section className="bg-black py-20 relative overflow-hidden">
      {/* Baggrundsbillede */}
      <div className="absolute inset-0">
        <Image src="/assets/bg/footerbg.jpg" alt="Background" fill className="object-cover opacity-10" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10 px-6">
        {/* Profilbillede med key prop for at tvinge re-render */}
        <Image 
          key={activeTestimonial} // Vigtig: tvinger billedet til at re-render
          src={imageUrl} 
          alt={current.name || "Profile"} 
          width={150} 
          height={150} 
          className="mx-auto rounded-lg mb-8" 
          unoptimized 
        />

        {/* Navn på personen */}
        <h3 className="text-white text-2xl font-bold mb-8 tracking-widest">{current.name?.toUpperCase()}</h3>

        {/* Testimonial tekst */}
        <p className="text-white text-lg leading-relaxed mb-12 max-w-3xl mx-auto">{current.content || "No content available"}</p>

        {/* Sociale medier ikoner */}
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

        {/* Navigationsprikker til at skifte mellem testimonials */}
        <div className="flex justify-center space-x-3">
          {testimonials.map((_, index) => (
            <button 
              key={index} 
              onClick={() => {
                console.log("Switching to testimonial:", index); // Debug log
                setActiveTestimonial(index);
              }} 
              className={`w-3 h-3 cursor-pointer ${activeTestimonial === index ? "bg-[#FF2A70]" : "bg-white"}`} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;