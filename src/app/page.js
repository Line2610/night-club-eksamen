import Hero from "./Components/Hero";
import Sektion1 from "./Components/Sektion1";
import Sektion2 from './Components/events/Sektion2';
import Sektion3 from "./Components/gallery/Sektion3";
import Newsletter from "./Components/Newsletter";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Testimonials from "./Components/Testimonials";
import RecentBlog from "./Components/RecentBlog";
import Audio from "./Components/Audio";
import LastestVideo from "./Components/LatestVideo";

const Home = () => {
  return (
    <>
        
        <Hero />
        <Header />
        <main>
      <Sektion1 />
      <Sektion2 />
      <Sektion3 />
      <Audio />
      <LastestVideo />
      <Testimonials />
      <RecentBlog />
      <Newsletter />
      </main>
      <Footer />
    </>
  );
};
export default Home;
