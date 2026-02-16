/* eslint-disable no-unused-vars */
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaSortAmountDown,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaTrophy,
  FaClock,
  FaGamepad,
  FaCheckCircle,
  FaEye,
} from "react-icons/fa";
import {
  events,
  eventCategories,
  eventGames,
  eventSortOptions,
} from "../../data/EventData";

export default function EventPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [selectedGame, setSelectedGame] = useState("Tous les jeux");
  const [sortBy, setSortBy] = useState("date-asc");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registeredEvents, setRegisteredEvents] = useState(new Set());

  // Filtrage et tri des événements
  const filteredAndSortedEvents = useMemo(() => {
    let filtered = events.filter((event) => {
      const matchesSearch = event.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "Tous" || event.category === selectedCategory;
      const matchesGame =
        selectedGame === "Tous les jeux" || event.game === selectedGame;
      return matchesSearch && matchesCategory && matchesGame;
    });

    switch (sortBy) {
      case "date-asc":
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case "date-desc":
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "title-asc":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "prize-desc":
        filtered.sort((a, b) => {
          const prizeA = parseInt(a.prizePool.replace(/[^0-9]/g, "")) || 0;
          const prizeB = parseInt(b.prizePool.replace(/[^0-9]/g, "")) || 0;
          return prizeB - prizeA;
        });
        break;
      default:
        break;
    }

    return filtered;
  }, [searchTerm, selectedCategory, selectedGame, sortBy]);

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("Tous");
    setSelectedGame("Tous les jeux");
    setSortBy("date-asc");
  };

  const handleRegister = (eventId) => {
    setRegisteredEvents((prev) => {
      const newSet = new Set(prev);
      newSet.add(eventId);
      return newSet;
    });
  };

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
      Complet: "bg-red-600",
      "Dernières places": "bg-orange-600",
      "Billets disponibles": "bg-blue-600",
      "Places disponibles": "bg-green-600",
    };
    return colors[status] || "bg-gray-600";
  };

  const getCategoryColor = (category) => {
    const colors = {
      Tournoi: "bg-[#E50914]",
      Communautaire: "bg-blue-600",
      Convention: "bg-purple-600",
      Événement: "bg-green-600",
    };
    return colors[category] || "bg-gray-600";
  };

  return (
    <section className="relative bg-transparent min-h-screen py-12 md:py-20 px-4 md:px-6 z-10">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12 relative z-10"
        >
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-3 md:mb-4 flex items-center justify-center gap-3">
            <FaCalendarAlt className="text-[#E50914]" />
            Événements <span className="text-[#E50914]">esport</span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg">
            Découvrez tous les tournois, événements et conventions gaming
          </p>
          <p className="text-gray-500 mt-2 text-sm md:text-base">
            {filteredAndSortedEvents.length} événement(s) à venir
          </p>
        </motion.div>

        {/* Barre de recherche et filtres */}
        <div className="mb-8 md:mb-10 space-y-4 relative z-30">
          {/* Ligne 1: Recherche + Tri */}
          <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-stretch md:items-center">
            {/* Recherche */}
            <div className="relative w-full md:flex-1">
              <label htmlFor="event-search" className="sr-only">
                Rechercher un événement
              </label>
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none z-10" />
              <input
                id="event-search"
                name="eventSearch"
                type="text"
                placeholder="Rechercher un événement..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoComplete="off"
                className="w-full pl-12 pr-4 py-3 bg-[#1A1A1A] text-white rounded-lg border border-[#E50914]/30 focus:border-[#E50914] focus:outline-none focus:ring-2 focus:ring-[#E50914]/50 transition-all relative z-30"
              />
            </div>

            {/* Tri */}
            <div className="relative w-full md:w-64">
              <label htmlFor="event-sort" className="sr-only">
                Trier par
              </label>
              <FaSortAmountDown className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none z-10" />
              <select
                id="event-sort"
                name="eventSort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full pl-12 pr-10 py-3 bg-[#1A1A1A] text-white rounded-lg border border-[#E50914]/30 focus:border-[#E50914] focus:outline-none focus:ring-2 focus:ring-[#E50914]/50 transition-all appearance-none relative z-30"
              >
                {eventSortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none z-10">
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Ligne 2: Filtres catégories */}
          <div className="flex gap-2 md:gap-3 flex-wrap justify-center relative z-30">
            {eventCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                type="button"
                aria-pressed={selectedCategory === cat}
                className={`px-4 md:px-6 py-2 rounded-lg font-semibold transition-all duration-300 text-sm md:text-base ${
                  selectedCategory === cat
                    ? "bg-[#E50914] text-white shadow-[0_0_15px_rgba(229,9,20,0.6)] scale-105"
                    : "bg-[#1A1A1A] text-gray-400 hover:bg-[#E50914]/20 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Ligne 3: Filtres jeux */}
          <div className="flex gap-2 md:gap-3 flex-wrap justify-center relative z-30">
            {eventGames.map((game) => (
              <button
                key={game}
                onClick={() => setSelectedGame(game)}
                type="button"
                aria-pressed={selectedGame === game}
                className={`px-3 md:px-4 py-1.5 rounded-lg font-medium transition-all duration-300 text-xs md:text-sm ${
                  selectedGame === game
                    ? "bg-[#E50914]/80 text-white"
                    : "bg-[#1A1A1A]/50 text-gray-500 hover:bg-[#E50914]/20 hover:text-white"
                }`}
              >
                {game}
              </button>
            ))}
          </div>
        </div>

        {/* Grille d'événements */}
        <AnimatePresence mode="wait">
          {filteredAndSortedEvents.length > 0 ? (
            <motion.div
              key="events-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 relative z-20"
            >
              {filteredAndSortedEvents.map((event, index) => (
                <motion.article
                  key={event.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-[#1A1A1A] rounded-xl overflow-hidden border border-[#E50914]/20 hover:border-[#E50914] hover:shadow-[0_0_25px_rgba(229,9,20,0.4)] transition-all duration-300"
                >
                  {/* Image */}
                  <div
                    className="relative h-48 overflow-hidden cursor-pointer"
                    onClick={() => navigate(`/events/${event.id}`)}
                  >
                    <img
                      src={event.image}
                      alt={event.title}
                      loading="lazy"
                      className="w-full h-full object-cover hover:scale-110 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                    <span
                      className={`absolute top-3 left-3 ${getCategoryColor(event.category)} text-white text-xs px-3 py-1 rounded-full font-semibold`}
                    >
                      {event.category}
                    </span>
                    <span
                      className={`absolute top-3 right-3 ${getStatusColor(event.status)} text-white text-xs px-3 py-1 rounded-full font-semibold`}
                    >
                      {event.status}
                    </span>
                    {registeredEvents.has(event.id) && (
                      <div className="absolute bottom-3 right-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-1">
                        <FaCheckCircle /> Inscrit
                      </div>
                    )}
                  </div>

                  {/* Contenu */}
                  <div className="p-5">
                    {/* Titre */}
                    <h3
                      className="text-lg md:text-xl font-bold text-white mb-3 line-clamp-2 cursor-pointer hover:text-[#E50914] transition"
                      onClick={() => navigate(`/events/${event.id}`)}
                    >
                      {event.title}
                    </h3>

                    {/* Infos */}
                    <div className="space-y-2 text-sm text-gray-400 mb-4">
                      <div className="flex items-center gap-2">
                        <FaGamepad className="text-[#E50914]" />
                        <span>{event.game}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-[#E50914]" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaClock className="text-[#E50914]" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-[#E50914]" />
                        <span className="line-clamp-1">{event.location}</span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-[#0D0D0D] p-3 rounded-lg text-center">
                        <div className="text-lg font-bold text-[#E50914]">
                          {event.prizePool}
                        </div>
                        <div className="text-xs text-gray-500">Prize Pool</div>
                      </div>
                      <div className="bg-[#0D0D0D] p-3 rounded-lg text-center">
                        <div className="text-lg font-bold text-white">
                          {event.registered}/{event.slots}
                        </div>
                        <div className="text-xs text-gray-500">Inscrits</div>
                      </div>
                    </div>

                    {/* Boutons */}
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => navigate(`/events/${event.id}`)}
                        className="flex-1 bg-[#1A1A1A] border border-[#E50914] text-white font-semibold py-2 rounded-lg hover:bg-[#E50914]/10 transition-all flex items-center justify-center gap-2"
                      >
                        <FaEye /> Détails
                      </button>
                      {!registeredEvents.has(event.id) &&
                        event.status !== "Complet" && (
                          <button
                            type="button"
                            onClick={() => handleRegister(event.id)}
                            className="flex-1 bg-[#E50914] hover:bg-[#FF1E56] text-white font-semibold py-2 rounded-lg transition-all hover:shadow-[0_0_15px_rgba(229,9,20,0.6)] active:scale-95"
                          >
                            S'inscrire
                          </button>
                        )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="no-results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center mt-12 md:mt-16 py-12 relative z-10"
            >
              <div className="text-gray-500 text-5xl md:text-6xl mb-4">📅</div>
              <p className="text-gray-500 text-lg md:text-xl mb-6">
                Aucun événement trouvé pour votre recherche.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-6 md:px-8 py-3 bg-[#E50914] text-white rounded-lg hover:bg-[#FF1E56] transition-all duration-300 hover:shadow-[0_0_20px_rgba(229,9,20,0.6)] active:scale-95 font-semibold text-sm md:text-base"
              >
                Réinitialiser les filtres
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
