import Hero from "./Components/Hero";
import Sektion1 from "./Components/Sektion1";
import Sektion2 from "./Components/Sektion2";
import Sektion3 from "./Components/Sektion3";
import Newsletter from "./Components/Newsletter";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Testimonials from "./Components/Testimonials";
import RecentBlog from "./Components/RecentBlog";

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
      <Testimonials />
      <RecentBlog />
      <Newsletter />
      <Footer />
    </>
  );
};
export default Home;
