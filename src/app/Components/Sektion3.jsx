"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

async function getGallery() {
  const res = await fetch("http://localhost:4000/gallery", {});
  return res.json();
}

export default function Sektion3() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [images, setImages] = useState([]);

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

  useEffect(() => {
    getGallery().then((data) => {
      const formattedImages = data.slice(0, 7).map((item, index) => ({
        src: item.asset.url,
        gridArea: getGridArea(index),
        title: "NIGHT CLUB PARTY",
        description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.",
      }));
      setImages(formattedImages);
    });
  }, []);

  const getGridArea = (index) => {
    const gridAreas = [
      "1 / 1 / 3 / 2",
      "1 / 2 / 3 / 3",
      "1 / 3 / 3 / 5",
      "1 / 5 / 3 / 6",
      "3 / 1 / 5 / 2",
      "3 / 2 / 5 / 4",
      "3 / 4 / 5 / 6",
    ];
    return gridAreas[index % gridAreas.length];
  };

  const imageVariants = {
    hidden: {
      x: -200,
      opacity: 0,
    },
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
        <motion.div className="text-center mb-8 md:mb-12 px-4" initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <h2 className="text-white text-2xl md:text-3xl tracking-wide">NIGHT CLUB GALLERY</h2>
          <div className="mx-auto mt-4" style={{ width: "200px" }}>
            <Image src="/assets/bottom_line2.png" alt="Underline" width={200} height={5} className="w-full h-auto" />
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 md:grid-rows-4 gap-0 w-full bg-black px-4 md:px-0" style={{ height: "auto" }}>
          {images.map((image, index) => (
            <motion.div key={index} custom={index} initial="hidden" whileInView="visible" variants={imageVariants} viewport={{ once: false, amount: 0.3 }} className="relative overflow-hidden group bg-black cursor-pointer h-64 md:h-auto" style={{ gridArea: window.innerWidth >= 768 ? image.gridArea : 'auto' }} onClick={() => handleImageClick(image, index)}>
              <Image src={image.src} alt={`Gallery image ${index + 1}`} fill className="object-cover" unoptimized style={{ objectPosition: "center" }} />

              {/* Top border - appears on hover */}
              <div className="absolute top-0 left-0 w-full h-1 bg-[#FF2A70] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Bottom border - appears on hover */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-[#FF2A70] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Top-left triangle - appears on hover */}
              <div className="absolute top-0 left-0 w-0 h-0 border-t-60 border-t-[#FF2A70] border-r-60 border-r-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Bottom-right triangle - appears on hover */}
              <div className="absolute bottom-0 right-0 w-0 h-0 border-b-60 border-b-[#FF2A70] border-l-60 border-l-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>
          ))}
        </div>

        {/* Modal Popup */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-2 md:p-4" onClick={() => setSelectedImage(null)}>
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
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} transition={{ duration: 0.3 }} className="relative max-w-full md:max-w-2xl" onClick={(e) => e.stopPropagation()}>
                  {/* Image with triangle */}
                  <div className="relative">
                    <Image src={selectedImage.src} alt={selectedImage.title} width={600} height={350} className="w-full h-auto object-cover" unoptimized />
                    {/* Pink triangle bottom right */}
                    <div className="absolute right-0 bottom-0 w-0 h-0 border-b-60 border-b-[#FF2A70] border-l-60 border-l-transparent"></div>
                  </div>

                  {/* Content - same width as image */}
                  <div className="bg-black text-white p-4 md:p-8">
                    <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 tracking-wide">{selectedImage.title}</h3>
                    <p className="text-xs md:text-s text-gray-300 leading-relaxed mb-4 md:mb-6">{selectedImage.description}</p>
                    <div className="flex justify-end">
                      <button className="border-white border-t border-b text-white px-4 md:px-8 py-1 md:py-2 text-sm md:text-base">READ MORE</button>
                    </div>
                  </div>
                </motion.div>

                {/* Next Arrow - outside the card */}
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
