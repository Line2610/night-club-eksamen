import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Hero2 from "../../Components/Hero2";
import Image from "next/image";
import { Suspense } from "react";

const BlogPostPage = ({ params }) => {
    return (
        <>
            <Header />
            <main className='bg-black'>
                <Hero2 title="Blog post" />
                <Suspense fallback={<div className="text-white text-center py-8">Loading...</div>}>
                    <FetchBlogPost params={params} />
                </Suspense>
            </main>
            <Footer />
        </>
    );
};

const FetchBlogPost = async ({ params }) => {
    const { id } = await params;
    
    // Fetch blog post and comments for this specific post
    const [blogResponse, commentsResponse] = await Promise.all([
        fetch(`http://localhost:4000/blogposts/${id}`),
        fetch(`http://localhost:4000/comments?blogpostId=${id}`)
    ]);
    
    const blogPost = await blogResponse.json();
    const postComments = await commentsResponse.json();

    const truncateText = (text, maxLength = 1500) => {
        if (!text) return '';
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    }; 

    const splitIntoParagraphs = (text) => {
        if (!text) return [];
        const truncated = truncateText(text, 1500);
        return truncated.split('\n').filter(p => p.trim().length > 0);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Blog Post Header */}
            <div className="mb-8">
                <div className="relative w-full h-96 mb-6 mt-4">
                     <Image
                        src={blogPost.asset?.url}
                        alt={blogPost.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 800px"
                        className="object-cover"
                        unoptimized
                    />
                </div>
                
                <h1 className="text-white text-3xl md:text-4xl font-bold mb-4">
                    {blogPost.title}
                </h1>

                <div className="text-[#FF2A70] text-sm font-semibold mb-2">
                   / By: {blogPost.author} / {postComments.length} comments / {new Date().toLocaleDateString()}
                </div>
            </div>

            {/* Blog Content */}
            <div className="text-gray-300 space-y-4 mb-12">
                {splitIntoParagraphs(blogPost.content || blogPost.description).map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
            </div>

            {/* Comments Section */}
            <div className="border-t border-gray-800 pt-8">
                <h2 className="text-white text-2xl font-bold mb-8 uppercase">
                    {postComments.length} Comments
                </h2>

                {/* Display Comments */}
                <div className="space-y-8 mb-12">
                    {postComments.map((comment) => (
                        <div key={comment.id}>
                            <div className="mb-3">
                                <span className="text-white font-bold text-lg">{comment.name}</span>
                                <span className="text-[#FF2A70] text-sm ml-2">
                                    - Posted {new Date(comment.date).toLocaleDateString('en-US', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric'
                                    })}
                                </span>
                            </div>
                            <p className="text-gray-300 leading-relaxed mb-8">
                                {comment.content}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Leave a Comment Form */}
                <div>
                    <h3 className="text-white text-xl font-bold mb-6 uppercase">
                        Leave a Comment
                    </h3>
                    
                    <form className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="bg-transparent border border-gray-600 text-white px-4 py-3 focus:border-[#FF2A70] focus:outline-none"
                            />
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="bg-transparent border border-gray-600 text-white px-4 py-3 focus:border-[#FF2A70] focus:outline-none"
                            />
                        </div>
                        
                        <textarea
                            placeholder="Your Comment"
                            rows="6"
                            className="w-full bg-transparent border border-gray-600 text-white px-4 py-3 focus:border-[#FF2A70] focus:outline-none resize-none"
                        ></textarea>
                        
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-transparent border-t border-b border-white px-8 py-2 text-white font-bold uppercase hover:text-[#FF2A70] hover:border-[#FF2A70] transition-colors"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BlogPostPage;