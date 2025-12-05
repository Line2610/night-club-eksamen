import Hero from "./Components/Hero";
import Sektion1 from "./Components/Sektion1";
import Sektion2 from "./Components/Sektion2";
import Sektion3 from "./Components/Sektion3";
import Newsletter from "./Components/Newsletter";
import Footer from "./Components/Footer";
import Header from "./Components/Header";


const Home = () => {
  return (
    <>
      <header>
        <Hero />
        <Header />
      </header>
      <Sektion1 />
      <Sektion2 />
      <Sektion3 />
      <Newsletter />
      <Footer />
    </>
  );
};
export default Home;
