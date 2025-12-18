"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Sektion3Client({ images }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  // Track which mobile image is active (tapped)
  const [activeMobileIndex, setActiveMobileIndex] = useState(null);

  const handleImageClick = (image, index) => {
    setSelectedImage(image);
    setSelectedIndex(index);
  };

  const goToNext = () => {
    const nextIndex = (selectedIndex + 1) % images.length;
    setSelectedIndex(nextIndex);
    setSelectedImage(images[nextIndex]);
  };

  const goToPrev = () => {
    const prevIndex = (selectedIndex - 1 + images.length) % images.length;
    setSelectedIndex(prevIndex);
    setSelectedImage(images[prevIndex]);
  };

  const imageVariants = {
    hidden: { x: -200, opacity: 0 },
    visible: (index) => ({
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: index * 0.15,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section className="bg-black py-8 md:py-16">
      <div className="w-full">
        {/* Header */}
          <h2 className="text-white text-2xl md:text-3xl tracking-wide text-center">
            NIGHT CLUB GALLERY
          </h2>
          <div className="mx-auto mt-4 mb-8" style={{ width: "400px" }}>
            <Image
              src="/assets/bottom_line2.png"
              alt="Underline"
              width={400}
              height={5}
            />
          </div>

        {/* Mobile gallery*/}
        <div className="grid md:hidden grid-cols-1">
          {images.map((image, index) => {
            const isActive = activeMobileIndex === index;
            return (
              <div key={index} className="relative w-full aspect-video overflow-hidden">
                {/* trekant + border. Touch funktion */}
                <div className={`absolute top-0 w-full h-1 bg-[#FF2A70] z-10 transition-opacity duration-200 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                <div className={`absolute bottom-0 w-full h-1 bg-[#FF2A70] z-10 transition-opacity duration-200 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                <div className={`absolute top-0 left-0 z-10 transition-opacity duration-200 ${isActive ? 'opacity-100' : 'opacity-0'}`}
                  style={{ width: '60px', height: '60px', borderTop: '60px solid #FF2A70', borderRight: '60px solid transparent' }} />
                <div className={`absolute bottom-0 right-0 z-10 transition-opacity duration-200 ${isActive ? 'opacity-100' : 'opacity-0'}`}
                  style={{ width: '60px', height: '60px', borderBottom: '60px solid #FF2A70', borderLeft: '60px solid transparent' }} />
                <button
                  type="button"
                  className="w-full h-full"
                  onClick={() => {
                    setActiveMobileIndex(isActive ? null : index);
                    setSelectedImage(image);
                    setSelectedIndex(index);
                  }}
                  onMouseLeave={() => setActiveMobileIndex(null)}
                >
                  <Image
                    src={image.src}
                    alt=""
                    fill
                    className="object-cover"
                    unoptimized
                    sizes="30vw"
                  />
                </button>
              </div>
            );
          })}
        </div>

        {/* Desktop gallery*/}
        <div className="hidden md:grid grid-cols-5 grid-rows-4 gap-0 w-full bg-black h-[550px]">
          {images.map((image, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              variants={imageVariants}
              viewport={{ once: false, amount: 0.3 }}
              className="relative overflow-hidden group cursor-pointer"
              style={{ gridArea: image.gridArea }}
              onClick={() => handleImageClick(image, index)}
            >
              <Image
                src={image.src}
                alt=""
                fill
                className="object-cover"
                unoptimized
                sizes="(min-width: 768px) 20vw, 50vw"
              />

              {/* Hover borders + triangles */}
              <div className="absolute top-0 w-full h-1 bg-[#FF2A70] opacity-0 group-hover:opacity-100" />
              <div className="absolute bottom-0 w-full h-1 bg-[#FF2A70] opacity-0 group-hover:opacity-100" />
              <div className="absolute top-0 left-0 w-0 h-0 border-t-60 border-t-[#FF2A70] border-r-60 border-r-transparent opacity-0 group-hover:opacity-100" />
              <div className="absolute bottom-0 right-0 w-0 h-0 border-b-60 border-b-[#FF2A70] border-l-60 border-l-transparent opacity-0 group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>

        {/* Modal Popup */}
<AnimatePresence>
  {selectedImage && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-2 md:p-4"
      onClick={() => setSelectedImage(null)}
    >
      <div className="relative flex items-center gap-4 md:gap-16">
        {/* Previous Arrow - outside the card */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            goToPrev();
          }}
          className="text-white text-2xl border-white border p-1 flex items-center justify-center cursor-pointer"
        >
          ‹
        </button>

        {/* Card with image and content */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative max-w-full md:max-w-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image with triangle */}
          <div className="relative">
            <Image
              src={selectedImage.src}
              alt={selectedImage.title}
              width={600}
              height={350}
              className="w-full h-auto object-cover"
              unoptimized
            />
            {/* Pink triangle bottom right */}
            <div className="absolute right-0 bottom-0 w-0 h-0 border-b-60 border-b-[#FF2A70] border-l-60 border-l-transparent"></div>
          </div>


    
          {/* Content - samme bredde */}
          <div className="bg-black text-white p-4 md:p-8">
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-3 md:mb-4">
              {selectedImage.title}
            </p>
            <p className="text-xs md:text-s text-gray-300 leading-relaxed mb-4 md:mb-6">
              {selectedImage.description}
            </p>
            <div className="flex justify-end">
              <button className="border-white border-t border-b text-white px-4 md:px-8 py-1 md:py-2 text-sm md:text-base">
                READ MORE
              </button>
            </div>
          </div>
        </motion.div>

        {/* Next knap */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            goToNext();
          }}
          className="text-white text-2xl border-white border p-1 flex items-center justify-center cursor-pointer"
        >
          ›
        </button>
      </div>
    </motion.div>
  )}
</AnimatePresence>

      </div>
    </section>
  );
}
