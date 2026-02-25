import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Aurora from "./animations/Aurora";
import HomePage from "./pages/HomePage";

import ShopPage from "./pages/shop/ShopPage";
import ShopDetailPage from "./pages/shop/ShopDetailPage";

import TeamPage from "./pages/team/TeamPage";
import TeamDetailPage from "./pages/team/TeamDetailPage";

import NewsPage from "./pages/news/NewsPage";
import NewsDetailPage from "./pages/news/NewsDetailPage";

import EventPage from "./pages/events/EventPage";
import EventDetailPage from "./pages/events/EventDetailPage";

import LoginPage from "./pages/LoginPage";
import SignPage from "./pages/SignPage";

import AdminHome from "./pages/admin/AdminHome";

// Routes où Navbar, Footer et Aurora sont masqués
const NO_LAYOUT_ROUTES = ["/admin"];

function Layout({ children }) {
  const location = useLocation();
  const hideLayout = NO_LAYOUT_ROUTES.some((path) =>
    location.pathname.startsWith(path),
  );

  return (
    <>
      {!hideLayout && (
        <Aurora
          colorStops={["#E50914", "#730b0b", "#1a1a1a"]}
          amplitude={0.5}
          blend={0.7}
        />
      )}
      {!hideLayout && <NavBar />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/:id" element={<ShopDetailPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/team/:id" element={<TeamDetailPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:id" element={<NewsDetailPage />} />
          <Route path="/events" element={<EventPage />} />
          <Route path="/events/:id" element={<EventDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign" element={<SignPage />} />
          <Route path="/admin" element={<AdminHome />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
