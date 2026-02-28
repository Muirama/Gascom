/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { FaShoppingCart, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

/**
 * ProductCard — Carte produit réutilisable pour la boutique Gascom.
 *
 * Props :
 *  - product  : { id, name, description, price, image, category }
 *  - index    : position dans la grille (pour le stagger de l'animation)
 *  - onAddToCart : (product) => void  — callback ajout au panier (optionnel)
 */
export default function ProductCard({ product, index = 0, onAddToCart }) {
  const navigate = useNavigate();

  const formatPrice = (price) =>
    new Intl.NumberFormat("fr-MG").format(price) + " Ar";

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (onAddToCart) onAddToCart(product);
  };

  const goToDetail = () => navigate(`/shop/${product.id}`);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
      whileHover={{ scale: 1.03, y: -5 }}
      className="bg-[#1A1A1A] rounded-xl overflow-hidden border border-[#E50914]/20
                 hover:border-[#E50914] hover:shadow-[0_0_25px_rgba(229,9,20,0.4)]
                 transition-all duration-300 flex flex-col"
    >
      {/* ── Image ── */}
      <div
        className="relative h-40 md:h-48 overflow-hidden cursor-pointer"
        onClick={goToDetail}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && goToDetail()}
        aria-label={`Voir les détails de ${product.name}`}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover hover:scale-110 transition duration-500"
        />
        <span className="absolute top-2 right-2 bg-[#E50914] text-white text-xs px-2 py-1 rounded-full font-semibold">
          {product.category}
        </span>
      </div>

      {/* ── Infos ── */}
      <div className="p-4 md:p-5 flex flex-col flex-1">
        <h3
          className="text-base md:text-lg font-bold text-white mb-2 line-clamp-1 cursor-pointer hover:text-[#E50914] transition"
          onClick={goToDetail}
        >
          {product.name}
        </h3>

        <p className="text-gray-400 text-xs md:text-sm mb-3 line-clamp-2 flex-1">
          {product.description}
        </p>

        <p className="text-xl md:text-2xl font-extrabold text-[#E50914] mb-3 md:mb-4">
          {formatPrice(product.price)}
        </p>

        {/* ── Actions ── */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={goToDetail}
            className="flex-1 bg-transparent border border-[#E50914] text-white font-semibold py-2 rounded-lg
                       hover:bg-[#E50914]/10 transition-all flex items-center justify-center gap-2 text-sm"
          >
            <FaEye /> Détails
          </button>

          <button
            type="button"
            aria-label={`Ajouter ${product.name} au panier`}
            onClick={handleAddToCart}
            className="flex-1 bg-[#E50914] hover:bg-[#FF1E56] text-white font-semibold py-2 rounded-lg
                       flex items-center justify-center gap-2 transition-all duration-300
                       hover:shadow-[0_0_15px_rgba(229,9,20,0.6)] active:scale-95 text-sm"
          >
            <FaShoppingCart /> Panier
          </button>
        </div>
      </div>
    </motion.div>
  );
}
