/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaTrophy,
  FaClock,
  FaGamepad,
  FaTicketAlt,
  FaCheckCircle,
  FaUsers,
} from "react-icons/fa";
import { events } from "../../data/EventData";

export default function EventDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [registered, setRegistered] = useState(false);

  const event = events.find((e) => e.id === parseInt(id));

  if (!event) {
    return (
      <section className="relative bg-transparent min-h-screen py-20 px-4 z-10 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Événement non trouvé</h1>
          <Link to="/events" className="text-[#E50914] hover:text-[#FF1E56]">
            Retour aux événements
          </Link>
        </div>
      </section>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  const getStatusColor = (status) => {
    const colors = {
      "Inscriptions ouvertes": "bg-green-600",
      "Complet": "bg-red-600",
      "Dernières places": "bg-orange-600",
      "Billets disponibles": "bg-blue-600",
      "Places disponibles": "bg-green-600",
    };
    return colors[status] || "bg-gray-600";
  };

  return (
    <section className="relative bg-transparent min-h-screen py-12 md:py-20 px-4 md:px-6 z-10">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Bouton retour */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate("/events")}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition"
        >
          <FaArrowLeft /> Retour aux événements
        </motion.button>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-12">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative rounded-2xl overflow-hidden border border-[#E50914]/30 shadow-[0_0_30px_rgba(229,9,20,0.3)]">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-[400px] md:h-[600px] object-cover"
              />
              <span
                className={`absolute top-4 right-4 ${getStatusColor(
                  event.status
                )} text-white px-4 py-2 rounded-full font-semibold`}
              >
                {event.status}
              </span>
            </div>
          </motion.div>

          {/* Détails */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
              {event.title}
            </h1>

            <p className="text-[#E50914] text-lg font-semibold mb-6 flex items-center gap-2">
              <FaGamepad /> {event.game}
            </p>

            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              {event.description}
            </p>

            {/* Infos principales */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 p-4 bg-[#1A1A1A] rounded-lg">
                <FaCalendarAlt className="text-[#E50914] text-xl" />
                <div>
                  <div className="text-white font-semibold">Date</div>
                  <div className="text-gray-400">{formatDate(event.date)}</div>
                  {event.endDate !== event.date && (
                    <div className="text-gray-500 text-sm">au {formatDate(event.endDate)}</div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-[#1A1A1A] rounded-lg">
                <FaClock className="text-[#E50914] text-xl" />
                <div>
                  <div className="text-white font-semibold">Heure</div>
                  <div className="text-gray-400">{event.time}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-[#1A1A1A] rounded-lg">
                <FaMapMarkerAlt className="text-[#E50914] text-xl" />
                <div>
                  <div className="text-white font-semibold">Lieu</div>
                  <div className="text-gray-400">{event.location}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-[#1A1A1A] rounded-lg">
                <FaTrophy className="text-[#E50914] text-xl" />
                <div>
                  <div className="text-white font-semibold">Prize Pool</div>
                  <div className="text-[#E50914] font-bold text-xl">{event.prizePool}</div>
                </div>
              </div>
            </div>

            {/* Progression */}
            <div className="mb-6 p-4 bg-[#1A1A1A] rounded-lg">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Inscriptions</span>
                <span>{event.registered}/{event.slots}</span>
              </div>
              <div className="w-full bg-[#0D0D0D] rounded-full h-3 overflow-hidden">
                <div
                  className="bg-[#E50914] h-full rounded-full transition-all duration-500"
                  style={{ width: `${(event.registered / event.slots) * 100}%` }}
                />
              </div>
            </div>

            {/* Bouton inscription */}
            {!registered && event.status !== "Complet" ? (
              <button
                onClick={() => setRegistered(true)}
                className="w-full bg-[#E50914] hover:bg-[#FF1E56] text-white font-bold py-4 rounded-lg transition-all duration-300 hover:shadow-[0_0_25px_rgba(229,9,20,0.6)] active:scale-95 text-lg"
              >
                S'inscrire maintenant
              </button>
            ) : registered ? (
              <div className="w-full bg-green-600 text-white font-bold py-4 rounded-lg text-center flex items-center justify-center gap-2">
                <FaCheckCircle /> Inscription confirmée !
              </div>
            ) : (
              <div className="w-full bg-gray-600 text-white font-bold py-4 rounded-lg text-center">
                Événement complet
              </div>
            )}
          </motion.div>
        </div>

        {/* Conditions & Programme */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Conditions */}
          <div className="bg-[#1A1A1A] p-6 md:p-8 rounded-2xl border border-[#E50914]/20">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <FaTicketAlt className="text-[#E50914]" /> Conditions d'inscription
            </h3>
            <ul className="space-y-3">
              {event.requirements.map((req, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-300">
                  <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Programme */}
          <div className="bg-[#1A1A1A] p-6 md:p-8 rounded-2xl border border-[#E50914]/20">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <FaCalendarAlt className="text-[#E50914]" /> Programme
            </h3>
            <div className="space-y-3">
              {event.schedule.map((item, idx) => (
                <div key={idx} className="bg-[#0D0D0D] px-4 py-3 rounded-lg text-gray-300">
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-6 text-center text-gray-500 text-sm">
              Organisé par <span className="text-[#E50914] font-semibold">{event.organizer}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
