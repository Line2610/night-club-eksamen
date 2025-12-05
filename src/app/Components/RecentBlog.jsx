import Image from "next/image";
import Link from "next/link";

const RecentBlog = () => {
    return ( 
        <section className="bg-black py-8 sm:py-12 lg:py-16 px-4 sm:px-8 lg:px-16">
            <h3 className="text-white uppercase text-center text-xl sm:text-2xl mb-4">Recent blog</h3>
            <Image src="/assets/bottom_line2.png" width={200} height={80} alt="Bottom line" className="mx-auto block mb-8 sm:mb-12"></Image>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                <div className="text-start">
                    <Link href="/Blog">   
                    <Image src="/assets/content-img/blog_full1.jpg" width={400} height={300} alt="DJ image" className="cursor-pointer w-full h-48 sm:h-56 lg:h-60 object-cover mb-4 sm:mb-6"></Image>
                    </Link> 
                    <h4 className="uppercase text-lg sm:text-xl text-white mb-3 sm:mb-4">More than 20 yea...</h4>
                    <p className="text-[#FF2A70] mb-3 sm:mb-4 text-xs sm:text-sm">BY: Admin  /  3 Comments  /  16 Nov 2018</p>
                    <p className="font-medium text-white text-xs sm:text-sm">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout</p>
                </div>

                <div className="text-start">
                    <Link href="/Blog">
                    <Image src="/assets/content-img/blog_full2.jpg" width={400} height={300} alt="DJ image" className="cursor-pointer w-full h-48 sm:h-56 lg:h-60 object-cover mb-4 sm:mb-6"></Image>
                    </Link>
                    <h4 className="uppercase text-lg sm:text-xl text-white mb-3 sm:mb-4">More than 20 yea...</h4>
                    <p className="text-[#FF2A70] mb-3 sm:mb-4 text-xs sm:text-sm">BY: Admin  /  3 Comments  /  16 Nov 2018</p>
                    <p className="font-medium text-white text-xs sm:text-sm">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout</p>
                </div>

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