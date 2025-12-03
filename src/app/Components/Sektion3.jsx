"use client";
import Image from "next/image";

import { motion } from "framer-motion";

export default function Sektion3() {
  // Billeder til galleriet - opdater stier til dine billeder
  const topRowImages = ["/assets/content-img/gallery-1.jpg", "/assets/content-img/gallery-2.jpg", "/assets/content-img/gallery-3.jpg", "/assets/content-img/gallery-4.jpg"];

  const bottomRowImages = ["/assets/content-img/gallery-5.jpg", "/assets/content-img/gallery-6.jpg", "/assets/content-img/gallery-7.jpg"];

  // Animation variant for hvert billede
  const imageVariants = {
    hidden: {
      x: -200,
      opacity: 0.3,
    },
    visible: (index) => ({
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: index * 0.15, // Forsinkelse så de kommer efter hinanden
        ease: "easeOut",
      },
    }),
  };

  return (
    <section className="bg-black py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <h2 className="text-white text-4xl md:text-5xl font-bold tracking-wide">NIGHT CLUB GALLERY</h2>
          <div className="w-32 h-1 bg-pink-600 mx-auto mt-4"></div>
        </motion.div>

        {/* Top Row - 4 billeder */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {topRowImages.map((image, index) => (
            <motion.div key={`top-${index}`} custom={index} initial="hidden" whileInView="visible" variants={imageVariants} viewport={{ once: true, amount: 0.2 }} className="relative overflow-hidden rounded-lg aspect-4/3 group">
              <img src={image} alt={`Gallery image ${index + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </motion.div>
          ))}
        </div>

        {/* Bottom Row - 3 billeder (større) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {bottomRowImages.map((image, index) => (
            <motion.div
              key={`bottom-${index}`}
              custom={index + 4} // Fortsætter delay efter top row
              initial="hidden"
              whileInView="visible"
              variants={imageVariants}
              viewport={{ once: true, amount: 0.2 }}
              className="relative overflow-hidden rounded-lg aspect-16/10 group"
            >
              <img src={image} alt={`Gallery image ${index + 5}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
