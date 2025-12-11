import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Hero2 from "../Components/Hero2";


const blogPost = () => {
    return ( 
        <>
        <Header />
            <main className='bg-black'>
                <Hero2 title="Blog post" />
                
            </main>
            <Footer />
        </>
     );
}
 
export default blogPost;