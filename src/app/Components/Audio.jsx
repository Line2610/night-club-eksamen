
// Audio.jsx: Musikafspiller med galleri af tracks
'use client';


import React, { useState, useRef } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "./audio.css";
import Image from "next/image";

// Liste over tracks der kan afspilles
export default function App() {
  const tracks = [
    {
      id: 1,
      title: "YOU BELONG WITH ME 2",
      image: "/assets/content-img/track_thumb.jpg",
      audio: "assets/media/black-box-funky.mp3"
    },
    {
      id: 2,
      title: "TRACK 1",
      image: "/assets/content-img/track1.jpg",
      audio: "assets/media/euphoria.mp3"
    },
    {
      id: 3,
      title: "TRACK 2",
      image: "/assets/content-img/track2.jpg",
      audio: "assets/media/black-box-funky.mp3"
    },
    {
      id: 4,
      title: "TRACK 3",
      image: "/assets/content-img/track2.jpg",
      audio: "assets/media/fashion-red-tape.mp3"
    },
    {
      id: 5,
      title: "TRACK 4",
      image: "/assets/content-img/track4.jpg",
      audio: "assets/media/black-box-funky.mp3"
    },
    {
      id: 6,
      title: "TRACK 5",
      image: "/assets/content-img/track5.jpg",
      audio: "assets/media/fashion-red-tape.mp3"
    }
  ];

  // State til nuværende track, hover, scroll, overlay og afspilning
  const [currentTrack, setCurrentTrack] = useState(tracks[0]);
  const [hoveredTrack, setHoveredTrack] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [mobileOverlay, setMobileOverlay] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef();

  // Når man klikker på et track, skift til det og stop nuværende afspilning
  const handleTrackClick = (track) => {
    setCurrentTrack(track);
    setIsPlaying(false);
    setMobileOverlay(false);
    if (audioRef.current) {
      audioRef.current.audio.current.pause();
      audioRef.current.audio.current.currentTime = 0;
    }
  };

  // Scroll galleri til venstre
  const scrollLeft = () => {
    const container = document.querySelector('.gallery-scroll');
    if (container) {
      container.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  // Scroll galleri til højre
  const scrollRight = () => {
    const container = document.querySelector('.gallery-scroll');
    if (container) {
      container.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-black py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Titel og dekorativ linje */}
        <h2 className="text-white text-2xl md:text-3xl font-medium text-center tracking-widest mb-20">
          NIGHT CLUB TRACK
          <Image src="/assets/bottom_line2.png" width={300} height={50} alt="decorative line" className="mx-auto block" />
        </h2>
        
        {/* Øverste række: Hovedbillede og afspiller */}
        <div className="flex flex-col lg:flex-row gap-8 items-start mb-0 ml-17 mr-17">
          {/* Billedet til venstre skjules på mobil */}
          <div className="shrink-0 w-full lg:w-[300px] hidden lg:block">
            <Image 
              src={currentTrack.image}
              alt={currentTrack.title}
              width={300} 
              height={300}
              className="w-full h-auto object-cover"
            />
          </div>
          {/* Afspiller og titel */}
          <div className="flex flex-col gap-5 w-full lg:flex-1">
            <h3 className="text-white text-2xl font-semibold tracking-wide">
              {currentTrack.title}
            </h3>
            <AudioPlayer
              key={currentTrack.id}
              ref={audioRef}
              autoPlay={isPlaying}
              src={currentTrack.audio}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              showJumpControls={true}
              showSkipControls={false}
              customAdditionalControls={[]}
            />
          </div>
        </div>

        {/* Nederste række: Galleri af tracks (desktop) */}
        <div className="hidden md:flex items-center gap-5">
          <button 
            onClick={scrollLeft}
            className="bg-white/10 border-2 border-white/30 text-white w-12 h-12 flex items-center justify-center text-3xl duration-300 shrink-0"
          >
            &#8249;
          </button>
          <div className="flex overflow-x-auto flex-1 scroll-smooth gallery-scroll gap-5">
            {tracks.slice(1).map((track) => (
              <div 
                key={track.id}
                className="relative shrink-0 cursor-pointer group"
                onMouseEnter={() => setHoveredTrack(track.id)}
                onMouseLeave={() => setHoveredTrack(null)}
                onClick={() => handleTrackClick(track)}
              >
                <Image 
                  src={track.image}
                  alt={track.title}
                  width={240} 
                  height={240}
                  className="w-55 h-55 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Pinke trekanter og play overlay ved hover */}
                {hoveredTrack === track.id && (
                  <>
                    {/* Øverste venstre trekant */}
                    <div className="absolute top-0 left-0 w-0 h-0 border-l-60 border-l-[#FF2A70] border-b-60 border-b-transparent"></div>
                    {/* Nederste højre trekant */}
                    <div className="absolute bottom-0 right-0 w-0 h-0 border-r-60 border-r-[#FF2A70] border-t-60 border-t-transparent"></div>
                    {/* Play knap overlay */}
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <Image src="/assets/icon/Play_btn.svg" alt="Play Button" width={80} height={80} className="w-20 h-20" />
                    </div>
                    {/* Track titel overlay */}
                    <div className="absolute bottom-4 left-0 right-0 text-center">
                      <p className="text-white font-semibold text-sm tracking-wide">
                        {track.title}
                      </p>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
          <button 
            onClick={scrollRight}
            className="bg-white/10 border-2 border-white/30 text-white w-12 h-12 flex items-center justify-center text-3xl hover:bg-pink-600 hover:border-pink-600 transition-all duration-300 shrink-0"
          >
            &#8250;
          </button>
        </div>

        {/* Mobil: ét billede ad gangen, knapper under billedet */}
        <div className="flex flex-col items-center gap-4 md:hidden mt-8 w-full h-70">
          <div
            className="relative w-full max-w-[400px] mx-auto aspect-2/1 cursor-pointer"
            style={{ height: '200px' }}
            onClick={() => {
              if (!isPlaying) {
                setMobileOverlay(false);
                setIsPlaying(true);
                if (audioRef.current) {
                  audioRef.current.audio.current.play();
                }
              }
            }}
            onMouseEnter={() => setMobileOverlay(true)}
            onMouseLeave={() => setMobileOverlay(false)}
          >
            <Image 
              src={currentTrack.image}
              alt={currentTrack.title}
              width={400}
              height={200}
              sizes="(max-width: 600px) 100vw, 400px"
              className="object-cover w-full h-full"
              priority
            />
            {/* Pinke trekanter og play overlay vises hvis overlay aktivt */}
            {mobileOverlay && (
              <>
                {/* Øverste venstre trekant */}
                <div className="absolute top-0 left-0 w-0 h-0 border-l-60 border-l-[#FF2A70] border-b-60 border-b-transparent z-10" />
                {/* Nederste højre trekant */}
                <div className="absolute bottom-0 right-0 w-0 h-0 border-r-60 border-r-[#FF2A70] border-t-60 border-t-transparent z-10" />
                {/* Play knap overlay */}
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <Image src="/assets/icon/Play_btn.svg" alt="Play Button" width={56} height={56} />
                </div>
              </>
            )}
          </div>
          {/* Navigation knapper under billedet */}
          <div className="flex justify-center gap-6 w-full mt-2">
            <button
              onClick={() => {
                setCurrentTrack(tracks[(tracks.findIndex(t => t.id === currentTrack.id) - 1 + tracks.length) % tracks.length]);
                setIsPlaying(false);
                setMobileOverlay(false);
                if (audioRef.current) {
                  audioRef.current.audio.current.pause();
                  audioRef.current.audio.current.currentTime = 0;
                }
              }}
              className="bg-white/10 border-2 border-white/30 text-white w-12 h-12 flex items-center justify-center text-3xl duration-300"
            >
              &#8249;
            </button>
            <button
              onClick={() => {
                setCurrentTrack(tracks[(tracks.findIndex(t => t.id === currentTrack.id) + 1) % tracks.length]);
                setIsPlaying(false);
                setMobileOverlay(false);
                if (audioRef.current) {
                  audioRef.current.audio.current.pause();
                  audioRef.current.audio.current.currentTime = 0;
                }
              }}
              className="bg-white/10 border-2 border-white/30 text-white w-12 h-12 flex items-center justify-center text-3xl duration-300"
            >
              &#8250;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}