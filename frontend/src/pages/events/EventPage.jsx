/* eslint-disable no-unused-vars */
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaSortAmountDown, FaCalendarAlt } from "react-icons/fa";
import {
  events,
  eventCategories,
  eventGames,
  eventSortOptions,
} from "../../data/EventData";
import EventCard from "../../components/EventCard";

export default function EventPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [selectedGame, setSelectedGame] = useState("Tous les jeux");
  const [sortBy, setSortBy] = useState("date-asc");
  const [registeredEvents, setRegisteredEvents] = useState(new Set());

  // ── Filtrage & tri ────────────────────────────────────────────────────────
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

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("Tous");
    setSelectedGame("Tous les jeux");
    setSortBy("date-asc");
  };

  const handleRegister = (eventId) => {
    setRegisteredEvents((prev) => new Set([...prev, eventId]));
  };

  // ── Render ────────────────────────────────────────────────────────────────
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
          <h1
            className="text-3xl md:text-5xl font-extrabold text-white mb-3 md:mb-4
                         flex items-center justify-center gap-3"
          >
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

        {/* ── Filtres ── */}
        <div className="mb-8 md:mb-10 space-y-4 relative z-30">
          {/* Recherche + Tri */}
          <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-stretch md:items-center">
            <div className="relative w-full md:flex-1">
              <label htmlFor="event-search" className="sr-only">
                Rechercher un événement
              </label>
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none z-10" />
              <input
                id="event-search"
                name="eventSearch"
                type="text"
                placeholder="Rechercher un événement..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoComplete="off"
                className="w-full pl-12 pr-4 py-3 bg-[#1A1A1A] text-white rounded-lg
                           border border-[#E50914]/30 focus:border-[#E50914]
                           focus:outline-none focus:ring-2 focus:ring-[#E50914]/50
                           transition-all relative z-30"
              />
            </div>

            <div className="relative w-full md:w-64">
              <label htmlFor="event-sort" className="sr-only">
                Trier par
              </label>
              <FaSortAmountDown className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none z-10" />
              <select
                id="event-sort"
                name="eventSort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full pl-12 pr-10 py-3 bg-[#1A1A1A] text-white rounded-lg
                           border border-[#E50914]/30 focus:border-[#E50914]
                           focus:outline-none focus:ring-2 focus:ring-[#E50914]/50
                           transition-all appearance-none relative z-30"
              >
                {eventSortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none z-10">
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

          {/* Filtres catégories */}
          <div className="flex gap-2 md:gap-3 flex-wrap justify-center relative z-30">
            {eventCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
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

          {/* Filtres jeux */}
          <div className="flex gap-2 md:gap-3 flex-wrap justify-center relative z-30">
            {eventGames.map((game) => (
              <button
                key={game}
                type="button"
                onClick={() => setSelectedGame(game)}
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

        {/* ── Grille d'événements ── */}
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
                <EventCard
                  key={event.id}
                  event={event}
                  index={index}
                  isRegistered={registeredEvents.has(event.id)}
                  onRegister={handleRegister}
                />
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
                className="px-6 md:px-8 py-3 bg-[#E50914] text-white rounded-lg
                           hover:bg-[#FF1E56] transition-all duration-300
                           hover:shadow-[0_0_20px_rgba(229,9,20,0.6)]
                           active:scale-95 font-semibold text-sm md:text-base"
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
