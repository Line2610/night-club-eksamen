"use client";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Sektion3() {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    { src: "/assets/content-img/gallery1_big.jpg", gridArea: "1 / 1 / 3 / 2", title: "NIGHT CLUB PARTY", description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet." },
    { src: "/assets/content-img/gallery2_big.jpg", gridArea: "1 / 2 / 3 / 3", title: "NIGHT CLUB PARTY", description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet." },
    { src: "/assets/content-img/gallery3_big.jpg", gridArea: "1 / 3 / 3 / 5", title: "NIGHT CLUB PARTY", description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet." },
    { src: "/assets/content-img/gallery4_big.jpg", gridArea: "1 / 5 / 3 / 6", title: "NIGHT CLUB PARTY", description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet." },
    { src: "/assets/content-img/gallery5_big.jpg", gridArea: "3 / 1 / 5 / 2", title: "NIGHT CLUB PARTY", description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet." },
    { src: "/assets/content-img/gallery6_big.jpg", gridArea: "3 / 2 / 5 / 4", title: "NIGHT CLUB PARTY", description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet." },
    { src: "/assets/content-img/gallery7_big.jpg", gridArea: "3 / 4 / 5 / 6", title: "NIGHT CLUB PARTY", description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet." },
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
            <motion.div key={index} custom={index} initial="hidden" whileInView="visible" variants={imageVariants} viewport={{ once: false, amount: 0.3 }} className="relative overflow-hidden group bg-black cursor-pointer" style={{ gridArea: image.gridArea }} onClick={() => setSelectedImage(image)}>
              <Image src={image.src} alt={`Gallery image ${index + 1}`} fill className="object-cover" style={{ objectPosition: "center" }} />
            </motion.div>
          ))}
        </div>

        {/* Modal Popup */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} transition={{ duration: 0.3 }} className="relative max-w-4xl w-full bg-black" onClick={(e) => e.stopPropagation()}>
                {/* Close button */}
                <button onClick={() => setSelectedImage(null)} className="absolute -top-12 right-0 text-white text-4xl hover:text-[#FF2A70] transition-colors">
                  ×
                </button>

                {/* Image */}
                <div className="relative w-full h-[400px]">
                  <Image src={selectedImage.src} alt={selectedImage.title} fill className="object-contain" />
                  {/* Pink triangle bottom right */}
                  <div className="absolute right-0 bottom-0 w-0 h-0 border-b-60 border-b-[#FF2A70] border-l-60 border-l-transparent"></div>
                </div>

                {/* Content */}
                <div className="bg-black text-white p-8">
                  <h3 className="text-2xl font-bold mb-4 tracking-wide">{selectedImage.title}</h3>
                  <p className="text-sm text-gray-300 leading-relaxed mb-6">{selectedImage.description}</p>
                  <button className="bg-[#FF2A70] text-white px-8 py-3 font-semibold hover:bg-[#e02563] transition-colors">READ MORE</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
