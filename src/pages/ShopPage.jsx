/* eslint-disable no-unused-vars */
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaShoppingCart, FaSearch, FaSortAmountDown } from "react-icons/fa";
import { products, categories, sortOptions } from "../data/ShopData";

export default function ShopPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [sortBy, setSortBy] = useState("default");

  // Filtrage et tri des produits
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "Tous" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    switch (sortBy) {
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      default:
        filtered.sort((a, b) => a.id - b.id);
    }

    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("fr-MG").format(price) + " Ar";
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("Tous");
    setSortBy("default");
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
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-3 md:mb-4">
            Boutique <span className="text-[#E50914]">GasCom</span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg">
            Découvrez nos offres exclusives de jeux et crédits gaming
          </p>
          <p className="text-gray-500 mt-2 text-sm md:text-base">
            {filteredAndSortedProducts.length} produit(s) disponible(s)
          </p>
        </motion.div>

        {/* Barre de recherche et filtres */}
        <div className="mb-8 md:mb-10 space-y-4 relative z-30">
          {/* Ligne 1: Recherche + Tri */}
          <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-stretch md:items-center">
            {/* Recherche */}
            <div className="relative w-full md:flex-1">
              <label htmlFor="search-input" className="sr-only">
                Rechercher un produit
              </label>
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none z-10" />
              <input
                id="search-input"
                name="search"
                type="text"
                placeholder="Rechercher un produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoComplete="off"
                className="w-full pl-12 pr-4 py-3 bg-[#1A1A1A] text-white rounded-lg border border-[#E50914]/30 focus:border-[#E50914] focus:outline-none focus:ring-2 focus:ring-[#E50914]/50 transition-all relative z-30"
              />
            </div>

            {/* Tri */}
            <div className="relative w-full md:w-64">
              <label htmlFor="sort-select" className="sr-only">
                Trier par
              </label>
              <FaSortAmountDown className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none z-10" />
              <select
                id="sort-select"
                name="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full pl-12 pr-10 py-3 bg-[#1A1A1A] text-white rounded-lg border border-[#E50914]/30 focus:border-[#E50914] focus:outline-none focus:ring-2 focus:ring-[#E50914]/50 transition-all appearance-none relative z-30"
              >
                {sortOptions.map((option) => (
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
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                type="button"
                aria-pressed={selectedCategory === cat}
                aria-label={`Filtrer par catégorie ${cat}`}
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
        </div>

        {/* Grille de produits */}
        <AnimatePresence mode="wait">
          {filteredAndSortedProducts.length > 0 ? (
            <motion.div
              key="products-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8 relative z-20"
            >
              {filteredAndSortedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  className="bg-[#1A1A1A] rounded-xl overflow-hidden border border-[#E50914]/20 hover:border-[#E50914] hover:shadow-[0_0_25px_rgba(229,9,20,0.4)] transition-all duration-300"
                >
                  <div className="relative h-40 md:h-48 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-cover hover:scale-110 transition duration-500"
                    />
                    <span className="absolute top-2 md:top-3 right-2 md:right-3 bg-[#E50914] text-white text-xs px-2 md:px-3 py-1 rounded-full font-semibold">
                      {product.category}
                    </span>
                    <span className="absolute top-2 md:top-3 left-2 md:left-3 bg-black/70 text-white text-xs px-2 md:px-3 py-1 rounded-full">
                      Stock: {product.stock}
                    </span>
                  </div>
                  <div className="p-4 md:p-5">
                    <h3 className="text-lg md:text-xl font-bold text-white mb-2 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-gray-400 text-xs md:text-sm mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    <p className="text-xl md:text-2xl font-extrabold text-[#E50914] mb-3 md:mb-4">
                      {formatPrice(product.price)}
                    </p>
                    <button
                      type="button"
                      aria-label={`Ajouter ${product.name} au panier`}
                      className="w-full bg-[#E50914] hover:bg-[#FF1E56] text-white font-semibold py-2 md:py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-[0_0_15px_rgba(229,9,20,0.6)] active:scale-95 text-sm md:text-base"
                    >
                      <FaShoppingCart />
                      Ajouter au panier
                    </button>
                  </div>
                </motion.div>
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
              <div className="text-gray-500 text-5xl md:text-6xl mb-4">🔍</div>
              <p className="text-gray-500 text-lg md:text-xl mb-6">
                Aucun produit trouvé pour votre recherche.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                aria-label="Réinitialiser tous les filtres"
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
