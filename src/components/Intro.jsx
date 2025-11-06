/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaGamepad, FaTrophy, FaUsers } from "react-icons/fa";
import BounceGallery from "./BounceGallery";

export default function Intro() {
  const services = [
    {
      icon: <FaGamepad size={40} className="text-[#E50914]" />,
      title: "Vente de Jeux",
      desc: "Découvrez les meilleurs titres aux meilleurs prix, adaptés à tous les gamers.",
    },
    {
      icon: <FaTrophy size={40} className="text-[#E50914]" />,
      title: "Tournois e-Sport",
      desc: "Participez à des compétitions intenses avec des récompenses prestigieuses.",
    },
    {
      icon: <FaUsers size={40} className="text-[#E50914]" />,
      title: "Communauté",
      desc: "Rejoignez une communauté passionnée et grandissante de joueurs à Madagascar.",
    },
  ];

  const images = [
    "/images/ps5_white.png",
    "/images/ps5_red.jpg",
    "/images/ps5_color.png",
  ];

  const transformStyles = [
    "rotate(5deg) translate(-150px)",
    "rotate(0deg) translate(-70px)",
    "rotate(-5deg)",
  ];

  return (
    <section
      id="intro"
      className="relative bg-[#0D0D0D] text-white py-24 overflow-hidden"
    >
      {/* Fond lumineux */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(229,9,20,0.15)_0%,transparent_60%)] blur-2xl animate-pulse"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#141414] to-[#0D0D0D] opacity-90"></div>

      {/* Hero principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        {/* Texte */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Bienvenue chez{" "}
            <span className="text-[#E50914] drop-shadow-[0_0_25px_rgba(229,9,20,0.8)]">
              GasCom e-Sport
            </span>
          </h1>
          <p className="mt-6 text-gray-300 text-lg md:text-xl max-w-lg mx-auto md:mx-0 leading-relaxed">
            Nous connectons les passionnés de jeux vidéo à travers des{" "}
            <span className="text-[#FF1E56] font-semibold">
              tournois épiques
            </span>
            , des{" "}
            <span className="text-[#FF1E56] font-semibold">
              événements communautaires
            </span>{" "}
            et les meilleurs titres gaming à Madagascar.
          </p>
          <motion.div
            className="mt-8 flex justify-center md:justify-start items-center gap-3 text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <FaMapMarkerAlt className="text-red-600 text-xl" />
            <span>Antananarivo, Madagascar</span>
          </motion.div>
        </motion.div>

        {/* Galerie interactive */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative flex justify-center"
        >
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="w-[250px] h-[250px] md:w-[350px] md:h-[350px] rounded-full bg-[#E50914]/20 blur-3xl animate-pulse-slow"></div>
          </div>

          <BounceGallery
            className="custom-bounceCards"
            images={images}
            containerWidth={500}
            containerHeight={300}
            transformStyles={transformStyles}
            animationDelay={0.8}
            animationStagger={0.08}
            easeType="elastic.out(1, 0.6)"
            enableHover={true}
          />
        </motion.div>
      </div>

      {/* Services */}
      <div className="relative z-10 mt-20 max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">
        {services.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            whileHover={{ scale: 1.05, rotateY: 5 }}
            className="bg-[#1A1A1A]/50 p-8 rounded-2xl text-center border border-red-800/40 hover:border-[#E50914]/80 hover:shadow-[0_0_35px_rgba(229,9,20,0.6)] backdrop-blur-md transition-all duration-500 cursor-pointer"
          >
            <div className="mb-5 flex justify-center">{s.icon}</div>
            <h3 className="text-2xl font-semibold mb-3">{s.title}</h3>
            <p className="text-gray-400 leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
