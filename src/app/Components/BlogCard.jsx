import Image from 'next/image';
import Link from 'next/link';

const BlogCard = ({ post, index, isLast = false }) => {
    return (
        <div className={`bg-black flex flex-col md:flex-row items-stretch ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''} ${index === 0 ? 'mt-8 md:mt-16' : ''} ${isLast ? 'mb-8 md:mb-16' : ''}`}>
            {/* Image Section */}
            <div className="relative w-full md:w-1/2 h-80">
               <Link href={`/Blog-post/${post.id}`}> {/*url parameter*/}
                    <Image
                        src={post.assets?.url || '/assets/content-img/blog_full1.jpg'}
                        alt={post.title}
                        fill
                        className="object-cover"
                    />
                </Link>
            </div>

             {/* Content section */}
            <div className="w-full md:w-1/2 p-12">
                <h2 className="text-white text-2xl font-bold mb-4 uppercase">
                    {post.title}
                </h2>
                <div className="mb-4">
                    <span className="text-[#FF2A70] text-sm uppercase">
                        BY: {post.author} / 3 Comments / {new Date(post.date || Date.now()).toLocaleDateString('en-US', { 
                            day: 'numeric', 
                            month: 'short', 
                            year: 'numeric' 
                        })}
                    </span>
                </div>
                <p className="text-gray-300 font-semibold text-sm mb-6 leading-relaxed">
                    {post.content?.substring(0, 300) + '...'}
                </p>
            <div className='flex justify-end'>
                <div className="inline-block">
                    <div className="border-t border-white w-30 mb-2"></div>
                    {/*url parameter*/}
                    <Link 
                        href={`/Blog-post/${post.id}`} 
                        className="bg-transparent font-bold text-center text-white text-sm uppercase block hover:text-[#FF2A70] py-2"
                    >
                        READ MORE
                    </Link>
                    <div className="border-b border-white w-30 mt-2"></div>
                </div>
            </div>
            </div>
        </div>
    );
};

export default BlogCard;