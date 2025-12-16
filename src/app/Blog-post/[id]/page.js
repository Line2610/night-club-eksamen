import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Hero2 from "../../Components/Hero2";
import Image from "next/image";
import { Suspense } from "react";
import { redirect, revalidatePath } from "next/navigation";

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

// Server Action til at tilføje kommentar
async function addComment(formData) {
    'use server';
    
    const name = formData.get('name');
    const email = formData.get('email');
    const comment = formData.get('comment');
    const blogpostId = formData.get('blogpostId');

    try {
        const response = await fetch('http://localhost:4000/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                blogpostId: parseInt(blogpostId),
                name: name,
                email: email,
                comment: comment,
                date: new Date().toISOString()
            })
        });

        if (response.ok) {
            // Revalidate cache for denne side
            revalidatePath(`/Blog-post/${blogpostId}`);
            // Redirect til samme side for at vise ny kommentar
            redirect(`/Blog-post/${blogpostId}`);
        }
    } catch (error) {
        console.error('Error adding comment:', error);
    }
}

// Async function - Server Component (INGEN useEffect!)
async function FetchBlogPost({ params }) {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    
    try {
        // Fetch data på serveren - INGEN useEffect
        const [blogResponse, commentsResponse] = await Promise.all([
            fetch(`http://localhost:4000/blogposts/${id}`, { cache: 'no-store' }),
            fetch(`http://localhost:4000/comments?blogpostId=${id}`, { cache: 'no-store' })
        ]);
        
        const blogPost = await blogResponse.json();
        const initialComments = await commentsResponse.json();

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
                       / By: {blogPost.author} / {initialComments.length} comments / {new Date(blogPost.date || Date.now()).toLocaleDateString('en-US', {
                            day: 'numeric',
                            month: 'short', 
                            year: 'numeric'
                        })}
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
                        {initialComments.length} Comments
                    </h2>

                    {/* Display Comments */}
                    <div className="space-y-8 mb-12">
                        {initialComments.map((comment) => (
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
                                    {comment.comment}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Leave a Comment Form - Nu interaktiv med Server Actions */}
                    <div>
                        <h3 className="text-white text-xl font-bold mb-6 uppercase">
                            Leave a Comment
                        </h3>
                        
                        <form action={addComment} className="space-y-4">
                            <input type="hidden" name="blogpostId" value={id} />
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    required
                                    className="bg-transparent border border-gray-600 text-white px-4 py-3 focus:border-[#FF2A70] focus:outline-none"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your Email"
                                    required
                                    className="bg-transparent border border-gray-600 text-white px-4 py-3 focus:border-[#FF2A70] focus:outline-none"
                                />
                            </div>
                            
                            <textarea
                                name="comment"
                                placeholder="Your Comment"
                                rows="6"
                                required
                                className="w-full bg-transparent border border-gray-600 text-white px-4 py-3 focus:border-[#FF2A70] focus:outline-none resize-y min-h-[150px] max-h-[300px]"
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
    } catch (error) {
        console.error('Error fetching blog post:', error);
        return <div className="text-white text-center py-8">Error loading blog post</div>;
    }
}

export default BlogPostPage;