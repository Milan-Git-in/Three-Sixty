import Header from "@/Components/Header";
import Events from "@/Components/Events";
import Popular from "@/Components/Popular";
import Grids from "@/Components/Grids";
import Footer from "@/Components/Footer";

const Homepage = () => {
  return (
    <>
      <Header />
      <Popular />
      {/* <Carousel /> */}
      <Events />
      <Grids />
      <Footer />
    </>
  );
};

export default Homepage;
