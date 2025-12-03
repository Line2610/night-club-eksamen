import Hero from "./Components/Hero";
import Sektion1 from "./Components/Sektion1";
import Sektion2 from "./Components/Sektion2";
import Sektion3 from "./Components/Sektion3";

const Home = () => {
  return (
    <>
      <header>
        <Hero />
      </header>
      <Sektion1 />
      <Sektion2 />
      <Sektion3 />
    </>
  );
};
export default Home;
