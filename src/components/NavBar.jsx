import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import GeS_Icon from "../assets/GeS_Icon.png";
import { Link as ScrollLink } from "react-scroll";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const links = [
    { name: "Home", href: "intro" },
    { name: "Jeux", href: "jeux" },
    { name: "Contact", href: "footer" },
  ];

  return (
    <nav
      className="shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50 
                 backdrop-blur-md bg-[#0D0D0D]"
      role="navigation"
    >
      {/* Logo */}
      <a href="/" className="flex items-center space-x-2">
        <img
          src={GeS_Icon}
          alt="GeS Icon"
          width="45"
          className="rounded-full border-2 border-red-600 shadow-[0_0_12px_rgba(229,9,20,0.7)] animate-pulse"
        />
        <span className="text-2xl font-extrabold tracking-wide text-white drop-shadow-lg">
          Gas<span className="text-[#E50914]">Com</span>
        </span>
      </a>

      {/* Desktop Links */}
      <ul className="hidden md:flex space-x-8 font-medium">
        {links.map((link, i) => (
          <li key={i}>
            <ScrollLink
              to={link.href}
              smooth={true}
              duration={500}
              className="text-[#B3B3B3] hover:text-[#E50914] hover:drop-shadow-[0_0_8px_#E50914] cursor-pointer transition duration-300"
            >
              {link.name}
            </ScrollLink>
          </li>
        ))}
      </ul>

      {/* Mobile Menu Button */}
      <div
        className="md:hidden text-2xl text-white cursor-pointer"
        onClick={toggleMenu}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-3/4 sm:w-1/2 bg-[#0d0d0d]/95 
                    shadow-2xl backdrop-blur-xl transform transition-transform duration-500 
                    ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-end p-6">
          <FaTimes
            className="text-2xl text-white cursor-pointer"
            onClick={toggleMenu}
          />
        </div>
        <ul className="flex flex-col items-center gap-8 mt-12 text-lg font-semibold">
          {links.map((link, i) => (
            <li key={i}>
              <ScrollLink
                to={link.href}
                smooth={true}
                duration={500}
                onClick={toggleMenu}
                className="text-[#B3B3B3] hover:text-[#E50914] hover:drop-shadow-[0_0_10px_#E50914] transition duration-300 cursor-pointer"
              >
                {link.name}
              </ScrollLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={toggleMenu}
        ></div>
      )}
    </nav>
  );
}
