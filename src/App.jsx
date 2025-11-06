import NavBar from "./components/NavBar";
import Carousel from "./components/Carousel";
import Intro from "./components/Intro";
import Footer from "./components/Footer";
import Aurora from "./animations/Aurora";

function App() {
  return (
    <>
      <Aurora
        colorStops={["#E50914", "#730b0b", "#1a1a1a"]}
        amplitude={0.5}
        blend={1}
      />
      <NavBar />
      <Intro />
      <Carousel />
      <Footer />
    </>
  );
}

export default App;
