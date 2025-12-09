'use client';

import React, { useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "./audio.css";
import Image from "next/image";

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

  const [currentTrack, setCurrentTrack] = useState(tracks[0]);
  const [hoveredTrack, setHoveredTrack] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleTrackClick = (track) => {
    setCurrentTrack(track);
  };

  const scrollLeft = () => {
    const container = document.querySelector('.gallery-scroll');
    if (container) {
      container.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    const container = document.querySelector('.gallery-scroll');
    if (container) {
      container.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-black py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-white text-4xl text-center tracking-widest mb-20">
          NIGHT CLUB TRACK
                  <Image src="/assets/bottom_line2.png" width={400} height={50} alt="decorative line" className="mx-auto block" />
        </h2>
        
        {/* Top row: Main image and audio player */}
        <div className="flex flex-col lg:flex-row gap-8 items-start mb-0">
          <div className="shrink-0 w-full lg:w-[300px]">
            <Image 
              src={currentTrack.image}
              alt={currentTrack.title}
              width={300} 
              height={300}
              className="w-full h-auto object-cover"
            />
          </div>
          
          <div className="flex flex-col gap-5 w-full lg:flex-1">
            <h3 className="text-white text-2xl font-semibold tracking-wide">
              {currentTrack.title}
            </h3>
            <AudioPlayer
              key={currentTrack.id}
              autoPlay
              src={currentTrack.audio}
              onPlay={e => console.log("onPlay")}
              showJumpControls={true}
              showSkipControls={false}
              customAdditionalControls={[]}
            />
          </div>
        </div>

      {/* Bottom row: Gallery images */}
      <div className="flex items-center gap-5">
        <button 
          onClick={scrollLeft}
          className="bg-white/10 border-2 border-white/30 text-white w-12 h-12 flex items-center justify-center text-3xl duration-300 shrink-0"
        >
          ‹
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
              
              {/* Pink triangles on hover */}
              {hoveredTrack === track.id && (
                <>
                  {/* Top left triangle */}
                  <div className="absolute top-0 left-0 w-0 h-0 border-l-60 border-l-[#FF2A70] border-b-60 border-b-transparent"></div>
                  
                  {/* Bottom right triangle */}
                  <div className="absolute bottom-0 right-0 w-0 h-0 border-r-60 border-r-[#FF2A70] border-t-60 border-t-transparent"></div>
                  
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <Image src="/assets/icon/Play_btn.svg" alt="Play Button" width={80} height={80} className="w-20 h-20" />
                  </div>
                  
                  {/* Track title overlay */}
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
          ›
        </button>
      </div>
    </div>
    </div>
  );
}