import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Aurora from "./animations/Aurora";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import TeamPage from "./pages/TeamPage";
import NewsPage from "./pages/NewsPage";
import EventPage from "./pages/EventPage";
import LoginPage from "./pages/LoginPage";
import SignPage from "./pages/SignPage";

function App() {
  return (
    <Router>
      <Aurora
        colorStops={["#E50914", "#730b0b", "#1a1a1a"]}
        amplitude={0.5}
        blend={0.7}
      />
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign" element={<SignPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
