import Image from "next/image";
import Link from "next/link";

const RecentBlog = () => {
    return ( 
        // Hoved sektion med sort baggrund og responsiv padding
        <section className="bg-black py-8 sm:py-12 lg:py-16 px-4 sm:px-8 lg:px-16">
            {/* Sektion titel - responsiv tekststørrelse */}
            <h2 className="text-white uppercase text-center text-2xl sm:text-3xl mb-4">Recent blog</h2>
            
            {/* Dekorativ bundlinje under titlen */}
            <Image src="/assets/bottom_line2.png" width={300} height={50} alt="Bottom line" className="mx-auto block mb-8 sm:mb-12"></Image>
            
            {/* Grid container - responsivt layout: 1 kolonne på mobil, 2 på tablet, 3 på desktop */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                
                {/* Første blog artikel */}
                <div className="text-start">
                    {/* Link til blog siden */}
                    <Link href="/Blog">   
                        {/* Blog billede med responsiv højde */}
                        <Image src="/assets/content-img/blog_full1.jpg" width={400} height={300} alt="DJ image" className="cursor-pointer w-full h-48 sm:h-56 lg:h-60 object-cover mb-4 sm:mb-6"></Image>
                    </Link> 
                    {/* Artikel titel med responsiv tekst */}
                    <h4 className="uppercase text-lg sm:text-xl text-white mb-3 sm:mb-4">More than 20 yea...</h4>
                    {/* Metadata: forfatter, kommentarer og dato i pink farve */}
                    <p className="text-[#FF2A70] mb-3 sm:mb-4 text-xs sm:text-sm">BY: Admin  /  3 Comments  /  16 Nov 2018</p>
                    {/* Artikel uddrag */}
                    <p className="font-medium text-white text-xs sm:text-sm">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout</p>
                </div>

                {/* Anden blog artikel - samme struktur som første */}
                <div className="text-start">
                    <Link href="/Blog">
                        <Image src="/assets/content-img/blog_full2.jpg" width={400} height={300} alt="DJ image" className="cursor-pointer w-full h-48 sm:h-56 lg:h-60 object-cover mb-4 sm:mb-6"></Image>
                    </Link>
                    <h4 className="uppercase text-lg sm:text-xl text-white mb-3 sm:mb-4">More than 20 yea...</h4>
                    <p className="text-[#FF2A70] mb-3 sm:mb-4 text-xs sm:text-sm">BY: Admin  /  3 Comments  /  16 Nov 2018</p>
                    <p className="font-medium text-white text-xs sm:text-sm">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout</p>
                </div>

                {/* Tredje blog artikel - fylder 2 kolonner på tablet, 1 kolonne på desktop */}
                <div className="text-start md:col-span-2 xl:col-span-1">
                    <Link href="/Blog">
                        <Image src="/assets/content-img/blog_full3.jpg" width={400} height={300} alt="DJ image" className="cursor-pointer w-full h-48 sm:h-56 lg:h-60 object-cover mb-4 sm:mb-6"></Image>
                    </Link>
                    <h4 className="uppercase text-lg sm:text-xl text-white mb-3 sm:mb-4">More than 20 yea...</h4>
                    <p className="text-[#FF2A70] mb-3 sm:mb-4 text-xs sm:text-sm">BY: Admin  /  3 Comments  /  16 Nov 2018</p>
                    <p className="font-medium text-white text-xs sm:text-sm">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout</p>
                </div>
            </div>
        </section>
     );
}
 
export default RecentBlog;