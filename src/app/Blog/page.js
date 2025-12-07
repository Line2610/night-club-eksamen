import Hero from '../Components/Hero';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Image from 'next/image';

const Blog = () => {
    return ( 
         <>
        <Header />
        <main className='bg-black'>
            <div className='relative'>
                <Image
                    src="/assets/bg/footerbg.jpg"
                    width={1920}
                    height={600}
                    className='w-full h-60 object-cover opacity-10'
                />
                <div className='absolute inset-0 flex flex-col items-center justify-center'>
                    <h1 className="text-white text-3xl uppercase text-center mb-4">Blog</h1>
                    <Image
                        src="/assets/bottom_line2.png"
                        width={200}
                        height={100}
                        className='block'
                    />
                </div>
            </div>
        </main>
        <Footer />
        </>
     );
}
 
export default Blog;