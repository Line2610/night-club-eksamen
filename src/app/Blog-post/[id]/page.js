import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Hero2 from "../../Components/Hero2";
import Image from "next/image";
import { Suspense } from "react";
import { redirect, revalidatePath } from "next/navigation";

// Hoved side komponent for individuel blog post - modtager params fra URL
const BlogPostPage = ({ params }) => {
    return (
        <>
            <Header />
            
            <main className='bg-black'>

                <Hero2 title="Blog post" />
                
                {/* Suspense wrapper til async data loading med fallback */}
                <Hero2 title="Blog post" />           
                <Suspense fallback={<div className="text-white text-center py-8">Loading...</div>}>
                    <FetchBlogPost params={params} />
                </Suspense>
            </main>
            
            <Footer />
        </>
    );
};

// Server Action til at tilføje ny kommentar til blog post
async function addComment(formData) {
    'use server'; // Markerer som server-side funktion
    
    // Henter form data fra submitted form
    const name = formData.get('name');
    const email = formData.get('email');
    const comment = formData.get('comment');
    const blogpostId = formData.get('blogpostId');

    try {
        // POST request til API for at oprette ny kommentar
        const response = await fetch('http://localhost:4000/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                blogpostId: parseInt(blogpostId), // Konverterer til heltal
                name: name,
                email: email,
                comment: comment,
                date: new Date().toISOString() // Nuværende dato som ISO string
            })
        });

        if (response.ok) {
            // Invaliderer cache for denne specifikke side
            revalidatePath(`/Blog-post/${blogpostId}`);
            // Redirecter til samme side for at vise den nye kommentar
            redirect(`/Blog-post/${blogpostId}`);
        }
    } catch (error) {
        // Logger fejl hvis API kald fejler
        console.error('Error adding comment:', error);
    }
}


// Server komponent til at hente blog post og kommentarer 
async function FetchBlogPost({ params }) {
    // Afventer params da de kommer fra URL routing
    const resolvedParams = await params;
    const { id } = resolvedParams;
    
    try {

        // Parallel fetch af blog post og kommentarer for bedre performance
        const [blogResponse, commentsResponse] = await Promise.all([
            fetch(`http://localhost:4000/blogposts/${id}`, { cache: 'no-store' }), // Henter specifik blog post
            fetch(`http://localhost:4000/comments?blogpostId=${id}`, { cache: 'no-store' }) // Henter kommentarer for dette post
        ]);
        
        // Parser JSON data fra begge API kald
        const blogPost = await blogResponse.json();
        const initialComments = await commentsResponse.json();

        // Hjælpe funktion til at afkorte lange tekster
        const truncateText = (text, maxLength = 1500) => {
            if (!text) return '';
            return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
        }; 

        // Hjælpe funktion til at opdele tekst i paragraffer
        const splitIntoParagraphs = (text) => {
            if (!text) return [];
            const truncated = truncateText(text, 1500);
            return truncated.split('\n').filter(p => p.trim().length > 0); // Filtrerer tomme linjer
        };

        return (
            // Hoved container med responsiv bredde og centrering
            <div className="max-w-4xl mx-auto px-4 py-8">
                
                {/* Blog Post Header sektion */}
                <div className="mb-8">
                    {/* Responsivt hero billede */}
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
                    
                    {/* Blog post titel */}
                    <h1 className="text-white text-3xl md:text-4xl font-bold mb-4">
                        {blogPost.title}
                    </h1>

                    {/* Metadata: forfatter, kommentar antal og dato */}
                    <div className="text-[#FF2A70] text-sm font-semibold mb-2">
                       / By: {blogPost.author} / {initialComments.length} comments / {new Date(blogPost.date || Date.now()).toLocaleDateString('en-US', {
                            day: 'numeric',
                            month: 'short', 
                            year: 'numeric'
                        })}
                    </div>
                </div>

                {/* Blog indhold sektion */}
                <div className="text-gray-300 space-y-4 mb-12">
                    {/* Mapper gennem paragraffer og renderer hver som separate <p> elementer */}
                    {splitIntoParagraphs(blogPost.content || blogPost.description).map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </div>

                {/* Kommentarer sektion */}
                <div className="border-t border-gray-800 pt-8">
                    {/* Kommentar overskrift med antal */}
                    <h2 className="text-white text-2xl font-bold mb-8 uppercase">
                        {initialComments.length} Comments
                    </h2>

                    {/* Viser eksisterende kommentarer */}
                    <div className="space-y-8 mb-12">
                        {initialComments.map((comment) => (
                            <div key={comment.id}>
                                {/* Kommentar header med navn og dato */}
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
                                {/* Kommentar indhold */}
                                <p className="text-gray-300 leading-relaxed mb-8">
                                    {comment.comment}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* "Skriv kommentar" sektion med interaktiv form */}
                    <div>
                        {/* Form overskrift */}
                        <h3 className="text-white text-xl font-bold mb-6 uppercase">
                            Leave a Comment
                        </h3>
                        
                        {/* Kommentar form der bruger Server Action */}

                        <form action={addComment} className="space-y-4">
                            {/* Skjult felt med blog post ID */}
                            <input type="hidden" name="blogpostId" value={id} />
                            
                            {/* Navn og email felter i grid layout */}
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
                            
                            {/* Kommentar textarea med begrænsning på højde */}
                            <textarea
                                name="comment"
                                placeholder="Your Comment"
                                rows="6"
                                required
                                className="w-full bg-transparent border border-gray-600 text-white px-4 py-3 focus:border-[#FF2A70] focus:outline-none resize-y min-h-[150px] max-h-[300px]"
                            ></textarea>
                            
                            {/* Submit knap i højre hjørne */}
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
        // Error handling hvis data ikke kan hentes
        console.error('Error fetching blog post:', error);
        return <div className="text-white text-center py-8">Error loading blog post</div>;
    }
}

export default BlogPostPage;