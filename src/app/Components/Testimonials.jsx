"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ImFacebook } from "react-icons/im";
import { FaTwitter, FaSnapchatGhost } from "react-icons/fa";

// Testimonials komponent til at vise kundeanmeldelser med navigation
const Testimonials = () => {
  // State til at holde styr på hvilket testimonial der er aktivt
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  
  // State til at gemme alle testimonials data fra API
  const [testimonials, setTestimonials] = useState([]);

  // useEffect hook til at hente testimonials når komponenten indlæses
  useEffect(() => {
    // Fetch testimonials data fra API
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
      .then((data) => setTestimonials(data))
      .catch((err) => console.error("Fejl ved hentning af testimonials:", err));
  }, []); // Tom dependency array - kører kun én gang

  // Viser loading besked hvis ingen testimonials er hentet endnu
  if (!testimonials.length) {
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

  // Henter det nuværende aktive testimonial fra arrayet
  const current = testimonials[activeTestimonial];

  // Hvis der ikke er noget aktivt testimonial, returner ingenting
  if (!current) return null;

  // Henter billede URL fra testimonial data med fallback til default billede
  // current.asset?.url - API billede (hvis det eksisterer)
  // || - fallback operator
  // "/assets/content-img/testimonial_2.jpg" - standard billede hvis API billede mangler
  const imageUrl = current.asset?.url || "/assets/content-img/testimonial_2.jpg";

  return (
    // Hoved sektion med sort baggrund og relativ positionering
    <section className="bg-black py-20 relative overflow-hidden">
      
      {/* Baggrundsbillede med lav opacity for subtil effekt */}
      <div className="absolute inset-0">
        <Image src="/assets/bg/footerbg.jpg" alt="Background" fill className="object-cover opacity-10" />
      </div>

      {/* Indhold container med maksimal bredde og centreret layout */}
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
        
        {/* Profilbillede af personen der giver testimonial */}
        <Image src={imageUrl} alt={current.name || "Profile"} width={150} height={150} className="mx-auto rounded-lg mb-8" />

        {/* Navn på personen - store bogstaver med bred letter-spacing */}
        <h3 className="text-white text-2xl font-bold mb-8 tracking-widest">{current.name?.toUpperCase()}</h3>

        {/* Testimonial tekst - centreret med maksimal bredde */}
        <p className="text-white text-lg leading-relaxed mb-12 max-w-3xl mx-auto">{current.content || "No content available"}</p>

        {/* Sociale medier ikoner - hoverable med smooth transitions */}
        <div className="flex justify-center space-x-6 mb-12">
          {/* Facebook ikon med border og hover effekt */}
          <div className="w-12 h-12 border-2 border-white flex items-center justify-center cursor-pointer text-white hover:bg-white hover:text-black transition-all">
            <ImFacebook />
          </div>
          {/* Twitter ikon med samme styling */}
          <div className="w-12 h-12 border-2 border-white flex items-center justify-center cursor-pointer text-white hover:bg-white hover:text-black transition-all">
            <FaTwitter />
          </div>
          {/* Snapchat ikon med samme styling */}
          <div className="w-12 h-12 border-2 border-white flex items-center justify-center cursor-pointer text-white hover:bg-white hover:text-black transition-all">
            <FaSnapchatGhost />
          </div>
        </div>

        {/* Navigationsprikker til at skifte mellem testimonials */}
        <div className="flex justify-center space-x-3">
          {testimonials.map((_, index) => (
            // Hver prik er en knap der skifter til det testimonial
            <button 
              key={index} 
              onClick={() => {
                console.log("Switching to testimonial:", index); // Debug log
                setActiveTestimonial(index);
              }} 
              className={`w-3 h-3 cursor-pointer ${activeTestimonial === index ? "bg-[#FF2A70]" : "bg-white"}`} 
              onClick={() => setActiveTestimonial(index)} 
              className={`w-3 h-3 cursor-pointer ${
                activeTestimonial === index ? "bg-[#FF2A70]" : "bg-white" // Aktiv prik er pink, andre er hvide
              }`} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;