import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Hero2 from "../Components/Hero2";

const bookTable = () => {
    return ( 
        <>
        <Header />
            <main className='bg-black'>
                <Hero2 title="Book table" />
            </main>
            <Footer />
        </>
     );
}
 
export default bookTable;