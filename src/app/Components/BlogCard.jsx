"use client";

import Image from 'next/image';
import Link from 'next/link';

// BlogCard komponent til at vise enkelt blog posts med responsivt layout
const BlogCard = ({ post, index, isLast = false }) => {
    return (
        // Hoved container med flexbox layout - skifter retning på hver anden post
        <div className={`bg-black flex flex-col md:flex-row items-stretch ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''} ${index === 0 ? 'mt-8 md:mt-16' : ''} ${isLast ? 'mb-8 md:mb-16' : ''}`}>
            
            {/* Billede sektion - halv bredde på desktop, fuld bredde på mobil */}
            <div className="relative w-full md:w-1/2 h-80">
               {/* Link til fuld blog post - bruger URL parameter med post ID */}
               <Link href={`/Blog-post/${post.id}`}> 
                    {/* Responsivt billede med fallback hvis post ikke har billede */}
                    <Image
                        src={post.asset?.url}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                        unoptimized
                    />
                </Link>
            </div>

             {/* Indhold sektion - halv bredde på desktop, fuld bredde på mobil */}
            <div className="w-full md:w-1/2 p-12">
                
                {/* Blog post titel */}
                <h2 className="text-white text-2xl font-bold mb-4 uppercase">
                    {post.title}
                </h2>
                
                {/* Metadata sektion - forfatter, kommentarer og dato */}
                <div className="mb-4">
                    <span className="text-[#FF2A70] text-sm uppercase">
                        BY: {post.author} / 3 Comments / {new Date(post.date || Date.now()).toLocaleDateString('en-US', { 
                            day: 'numeric', 
                            month: 'short', 
                            year: 'numeric' 
                        })}
                    </span>
                </div>
                
                {/* Blog post uddrag - begrænset til 300 karakterer med "..." */}
                <p className="text-gray-300 font-semibold text-sm mb-6 leading-relaxed">
                    {post.content?.substring(0, 300) + '...'}
                </p>

            
            {/* "Read More" knap sektion - højre-justeret */}
            <div className='flex justify-end'>

            <div className='flex justify-center md:justify-center lg:justify-end'>
                <div className="inline-block">
                    {/* Øverste dekorativ linje */}
                    <div className="border-t border-white w-30 mb-2"></div>
                    

                    {/* "Read More" link - bruger URL parameter med post ID */}

                    <Link 
                        href={`/Blog-post/${post.id}`} 
                        className="bg-transparent font-bold text-center text-white text-sm uppercase block hover:text-[#FF2A70] py-2"
                    >
                        READ MORE
                    </Link>
                    
                    {/* Nederste dekorativ linje */}
                    <div className="border-b border-white w-30 mt-2"></div>
                </div>
            </div>
            </div>
        </div>
    );
};

export default BlogCard;