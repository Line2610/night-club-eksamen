import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Hero2 from "../Components/Hero2";

const contactUs = () => {
    return ( 
        <>
        <Header />
            <main className='bg-black'>
                <Hero2 title="Contact us" />
            </main>
            <Footer />
        </>
     );
}
 
export default contactUs;