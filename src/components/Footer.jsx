import React from "react";

export default function Footer() {
  return (
    <footer id="footer" className="bg-[#0D0D0D] text-gray-400 py-6 text-center">
      <p>
        &copy; {new Date().getFullYear()} Gascom e-Sport. Tous droits réservés.
      </p>
      <div className="mt-2 space-x-4">
        <a href="#" className="hover:text-red-600 transition duration-300">
          Facebook
        </a>
        <a href="#" className="hover:text-red-600 transition duration-300">
          Discord
        </a>
        <a href="#" className="hover:text-red-600 transition duration-300">
          Twitch
        </a>
      </div>
    </footer>
  );
}
