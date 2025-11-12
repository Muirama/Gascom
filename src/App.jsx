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
        amplitude={0.3} // Réduit de 0.5 à 0.3 pour moins de calculs
        blend={0.8} // Augmenté pour plus de fluidité
      />
      <NavBar />
      <Intro />
      <Carousel />
      <Footer />
    </>
  );
}

export default App;
