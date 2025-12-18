import * as React from "react"
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const LastestVideo = () => {
    // Array med video data - id, titel, sti til video og thumbnail billede
    const videos = [
        { 
            id: 1, 
            title: "DJ Performance 1", 
            src: "/assets/media/video-crowd.mp4",
            thumbnail: "/assets/content-img/video_poster.jpg" 
        },
        { 
            id: 2, 
            title: "Night Club Mix", 
            src: "/assets/media/video-dj-crowd1.mp4",
            thumbnail: "/assets/content-img/video_poster.jpg" 
        },
        { 
            id: 3, 
            title: "Live Set", 
            src: "/assets/media/video-dj-crowd-2.mp4",
            thumbnail: "/assets/content-img/video_poster.jpg" 
        },
    ];

    return ( 
        // Hoved sektion med sort baggrund 
        <div className="bg-black py-8 md:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header sektion med titel og bottom line */}
                <div className="flex flex-col items-center mb-8 md:mb-12">
                    {/* Sektion titel  */}
                    <h2 className="uppercase text-center text-white text-xl sm:text-2xl md:text-3xl mb-4 tracking-wider">Latest video</h2>
                    
                    {/* Dekorativ bundlinje under titlen */}
                    <Image
                        src="/assets/bottom_line2.png"
                        width={150}
                        height={20}
                        alt="bottom line"
                        className="block w-38 sm:w-4 md:w-48 lg:w-56"
                    />
                </div>

                {/* Carousel sektion med maksimal bredde */}
                <div className="w-full max-w-full xl:max-w-5xl mx-auto">
                    <Carousel className="w-full">
                        <CarouselContent>
                            {/* Mapper gennem videos array og opretter CarouselItem for hver video */}
                            {videos.map((video) => (
                                <CarouselItem key={video.id}>
                                    {/* Video container med aspect ratio og responsiv border radius */}
                                    <div className="relative aspect-video rounded-none sm:rounded-lg overflow-hidden mx-2 sm:mx-0">
                                        {/* Video element med controls og poster billede */}
                                        <video 
                                            controls 
                                            className="w-full h-full object-cover"
                                            poster={video.thumbnail} // Thumbnail billede der vises før video afspilles
                                            preload="metadata" // Preloader kun metadata for bedre performance
                                        >
                                            {/* Video source med fallback besked */}
                                            <source src={video.src} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        
                        {/* Custom navigation knapper til carousel */}
                        <div className="flex justify-center mt-4 md:mt-8 space-x-3 md:space-x-4">
                            {/* Forrige knap - custom styling med hvid border og hover effekt */}
                            <CarouselPrevious className="static translate-y-0 bg-transparent border-2 border-white text-white hover:bg-white hover:text-black w-10 h-10 sm:w-12 sm:h-12 rounded-none text-sm sm:text-base" />
                            
                            {/* Næste knap - samme styling som forrige knap */}
                            <CarouselNext className="static translate-y-0 bg-transparent border-2 border-white text-white hover:bg-white hover:text-black w-10 h-10 sm:w-12 sm:h-12 rounded-none text-sm sm:text-base" />
                        </div>
                    </Carousel>
                </div>
            </div>
        </div>
    );
}
 
export default LastestVideo;

