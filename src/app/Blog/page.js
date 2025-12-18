import Hero from '../Components/Hero';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Image from 'next/image';
import Hero2 from '../Components/Hero2';
import BlogList from "../Components/BlogList";


const Blog = () => {
    return ( 
          <>
            <Header />
            <main className='bg-black'>
                <Hero2 title="Blog" />
                <BlogList />
            </main>
            <Footer />
        </>
     );
}
 
export default Blog;