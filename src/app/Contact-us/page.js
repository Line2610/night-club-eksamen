import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Hero2 from "../Components/Hero2";
import ContactForm from "../Components/ContactForm";

const ContactUs = () => {
    return ( 
        <>
            <Header />
            <main className='bg-black'>
                <Hero2 title="Contact us" />
                <ContactForm />
            </main>
            <Footer />
        </>
    );
}
 
export default ContactUs;