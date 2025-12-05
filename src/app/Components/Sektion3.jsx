"use client";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Sektion3() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

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

  const images = [
    {
      src: "/assets/content-img/gallery1_big.jpg",
      gridArea: "1 / 1 / 3 / 2",
      title: "NIGHT CLUB PARTY",
      description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.",
    },
    {
      src: "/assets/content-img/gallery2_big.jpg",
      gridArea: "1 / 2 / 3 / 3",
      title: "NIGHT CLUB PARTY",
      description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.",
    },
    {
      src: "/assets/content-img/gallery3_big.jpg",
      gridArea: "1 / 3 / 3 / 5",
      title: "NIGHT CLUB PARTY",
      description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.",
    },
    {
      src: "/assets/content-img/gallery4_big.jpg",
      gridArea: "1 / 5 / 3 / 6",
      title: "NIGHT CLUB PARTY",
      description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.",
    },
    {
      src: "/assets/content-img/gallery5_big.jpg",
      gridArea: "3 / 1 / 5 / 2",
      title: "NIGHT CLUB PARTY",
      description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.",
    },
    {
      src: "/assets/content-img/gallery6_big.jpg",
      gridArea: "3 / 2 / 5 / 4",
      title: "NIGHT CLUB PARTY",
      description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.",
    },
    {
      src: "/assets/content-img/gallery7_big.jpg",
      gridArea: "3 / 4 / 5 / 6",
      title: "NIGHT CLUB PARTY",
      description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.",
    },
  ];

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
    <section className="bg-black py-16">
      <div className="w-full">
        {/* Header */}
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <h2 className="text-white text-3xl tracking-wide">NIGHT CLUB GALLERY</h2>
          <div className="mx-auto mt-4" style={{ width: "200px" }}>
            <Image src="/assets/bottom_line2.png" alt="Underline" width={200} height={5} className="w-full h-auto" />
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-5 grid-rows-4 gap-0 w-full bg-black" style={{ height: "600px" }}>
          {images.map((image, index) => (
            <motion.div key={index} custom={index} initial="hidden" whileInView="visible" variants={imageVariants} viewport={{ once: false, amount: 0.3 }} className="relative overflow-hidden group bg-black cursor-pointer" style={{ gridArea: image.gridArea }} onClick={() => handleImageClick(image, index)}>
              <Image src={image.src} alt={`Gallery image ${index + 1}`} fill className="object-cover" style={{ objectPosition: "center" }} />

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
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
              <div className="relative flex items-center gap-16">
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
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} transition={{ duration: 0.3 }} className="relative max-w-2xl" onClick={(e) => e.stopPropagation()}>
                  {/* Image with triangle */}
                  <div className="relative">
                    <Image src={selectedImage.src} alt={selectedImage.title} width={600} height={350} className="w-full h-auto object-cover" />
                    {/* Pink triangle bottom right */}
                    <div className="absolute right-0 bottom-0 w-0 h-0 border-b-60 border-b-[#FF2A70] border-l-60 border-l-transparent"></div>
                  </div>

                  {/* Content - same width as image */}
                  <div className="bg-black text-white p-8">
                    <h3 className="text-2xl font-bold mb-4 tracking-wide">{selectedImage.title}</h3>
                    <p className="text-s text-gray-300 leading-relaxed mb-6">{selectedImage.description}</p>
                    <div className="flex justify-end">
                      <button className="border-white border-t border-b text-white px-8 py-2">READ MORE</button>
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
