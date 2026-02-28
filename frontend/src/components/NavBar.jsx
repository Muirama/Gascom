import React, { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaStore,
  FaUsers,
  FaNewspaper,
  FaCalendarAlt,
  FaSignInAlt,
} from "react-icons/fa";
import logo_GES_rouge from "/LOGO/Logo_GES_rouge.svg";
import { Link, useLocation } from "react-router-dom";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const pageLinks = [
    { name: "Home", href: "/", icon: <FaHome /> },
    { name: "Shop", href: "/shop", icon: <FaStore /> },
    { name: "Team", href: "/team", icon: <FaUsers /> },
    { name: "News", href: "/news", icon: <FaNewspaper /> },
    { name: "Events", href: "/events", icon: <FaCalendarAlt /> },
  ];

  return (
    <nav
      className="shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-[60]
                 backdrop-blur-md bg-[#0D0D0D]/90"
      role="navigation"
      aria-label="Navigation principale"
    >
      {/* Logo */}
      <Link
        to="/"
        className="flex items-center space-x-2"
        aria-label="Retour à l'accueil"
      >
        <img
          src={logo_GES_rouge}
          alt="Logo GasCom e-Sport"
          width="45"
          height="45"
        />
        <span className="text-2xl font-extrabold tracking-wide text-white drop-shadow-lg">
          Gascom
        </span>
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-8">
        <ul className="flex space-x-8 font-medium">
          {pageLinks.map((link, i) => {
            const isActive = location.pathname === link.href;
            return (
              <li key={i}>
                <Link
                  to={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    isActive
                      ? "text-white bg-[#E50914] shadow-[0_0_15px_rgba(229,9,20,0.6)]"
                      : "text-[#B3B3B3] hover:text-white hover:bg-[#E50914]/80 hover:shadow-[0_0_12px_rgba(229,9,20,0.4)]"
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Login Button Desktop */}
        <Link
          to="/login"
          className="flex items-center gap-2 px-6 py-2 bg-[#E50914] hover:bg-[#FF1E56] text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(229,9,20,0.6)]"
        >
          <FaSignInAlt />
          Login
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-2xl text-white"
        onClick={toggleMenu}
        aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        type="button"
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Drawer Menu */}
      <div
        id="mobile-menu"
        className={`fixed top-0 right-0 h-full w-3/4 sm:w-1/2 bg-gray-800
                    shadow-2xl transform transition-transform duration-500 z-50
                    ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navigation mobile"
      >
        <div className="flex justify-end p-6">
          <button
            onClick={toggleMenu}
            aria-label="Fermer le menu"
            type="button"
            className="text-2xl text-white"
          >
            <FaTimes />
          </button>
        </div>
        <nav aria-label="Menu mobile">
          <ul className="flex flex-col items-center gap-6 mt-8 text-lg font-semibold px-6 bg-gray-800">
            {pageLinks.map((link, i) => {
              const isActive = location.pathname === link.href;
              return (
                <li key={i} className="w-full">
                  <Link
                    to={link.href}
                    onClick={toggleMenu}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex items-center gap-3 px-6 py-3 rounded-lg transition-all duration-300 w-full ${
                      isActive
                        ? "text-white bg-[#E50914] shadow-[0_0_20px_rgba(229,9,20,0.7)]"
                        : "text-[#B3B3B3] hover:text-white hover:bg-[#E50914]/80 hover:shadow-[0_0_15px_rgba(229,9,20,0.5)]"
                    }`}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                </li>
              );
            })}

            {/* Login Button Mobile */}
            <li className="w-full mt-4">
              <Link
                to="/login"
                onClick={toggleMenu}
                className="flex items-center justify-center gap-3 px-6 py-3 bg-[#E50914] hover:bg-[#FF1E56] text-white font-bold rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(229,9,20,0.6)] w-full"
              >
                <FaSignInAlt />
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden z-40"
          onClick={toggleMenu}
          aria-hidden="true"
        ></div>
      )}
    </nav>
  );
}
