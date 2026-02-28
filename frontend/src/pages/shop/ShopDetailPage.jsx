/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaShoppingCart,
  FaCheck,
  FaStar,
  FaShieldAlt,
  FaBolt,
} from "react-icons/fa";
import { products } from "../../data/ShopData";

export default function ShopDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <section className="relative bg-transparent min-h-screen py-20 px-4 z-10 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-3xl font-bold text-white mb-4">
            Produit non trouvé
          </h1>
          <Link
            to="/shop"
            className="text-[#E50914] hover:text-[#FF1E56] transition font-semibold"
          >
            ← Retour à la boutique
          </Link>
        </div>
      </section>
    );
  }

  const formatPrice = (price) =>
    new Intl.NumberFormat("fr-MG").format(price) + " Ar";

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <section className="relative bg-transparent min-h-screen py-12 md:py-20 px-4 md:px-6 z-10">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Bouton retour */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate("/shop")}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Retour à la boutique
        </motion.button>

        {/* ── Détail principal ── */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative rounded-2xl overflow-hidden border border-[#E50914]/30 shadow-[0_0_40px_rgba(229,9,20,0.2)]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[320px] md:h-[500px] object-cover"
              />
              <span className="absolute top-4 right-4 bg-[#E50914] text-white px-4 py-2 rounded-full font-semibold text-sm">
                {product.category}
              </span>
              {/* Glow overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* Infos */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
              {product.name}
            </h1>

            <div className="text-3xl md:text-4xl font-extrabold text-[#E50914] mb-6 drop-shadow-[0_0_15px_rgba(229,9,20,0.5)]">
              {formatPrice(product.price)}
            </div>

            <p className="text-gray-300 text-base md:text-lg mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Quantité */}
            <div className="mb-6">
              <label className="block text-white font-semibold mb-3 text-sm uppercase tracking-wider">
                Quantité
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-11 h-11 bg-[#1A1A1A] border border-[#E50914]/30 text-white rounded-lg hover:bg-[#E50914] hover:border-[#E50914] transition font-bold text-xl"
                >
                  −
                </button>
                <span className="text-2xl font-bold text-white w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-11 h-11 bg-[#1A1A1A] border border-[#E50914]/30 text-white rounded-lg hover:bg-[#E50914] hover:border-[#E50914] transition font-bold text-xl"
                >
                  +
                </button>
              </div>
            </div>

            {/* Total */}
            <div className="p-4 bg-[#1A1A1A] rounded-xl border border-[#E50914]/30 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total :</span>
                <span className="text-2xl font-extrabold text-[#E50914]">
                  {formatPrice(product.price * quantity)}
                </span>
              </div>
            </div>

            {/* CTA */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleAddToCart}
              className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 ${
                addedToCart
                  ? "bg-green-600 hover:bg-green-700 shadow-[0_0_20px_rgba(34,197,94,0.5)]"
                  : "bg-[#E50914] hover:bg-[#FF1E56] hover:shadow-[0_0_30px_rgba(229,9,20,0.6)]"
              } text-white`}
            >
              {addedToCart ? (
                <>
                  <FaCheck /> Ajouté au panier !
                </>
              ) : (
                <>
                  <FaShoppingCart /> Ajouter au panier
                </>
              )}
            </motion.button>

            {/* Garanties */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  icon: <FaShieldAlt className="text-[#E50914]" />,
                  label: "Paiement sécurisé",
                },
                {
                  icon: <FaBolt className="text-yellow-400" />,
                  label: "Livraison instantanée",
                },
                {
                  icon: <FaStar className="text-yellow-500" />,
                  label: "Support 24/7",
                },
              ].map((g, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-gray-400 text-sm bg-[#1A1A1A]/60 rounded-lg px-3 py-2 border border-white/5"
                >
                  {g.icon}
                  <span>{g.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Produits similaires ── */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-6">
              Produits similaires
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((related, i) => (
                <motion.div
                  key={related.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  onClick={() => navigate(`/shop/${related.id}`)}
                  className="bg-[#1A1A1A] rounded-xl overflow-hidden border border-[#E50914]/20 hover:border-[#E50914] hover:shadow-[0_0_20px_rgba(229,9,20,0.4)] transition-all cursor-pointer"
                >
                  <img
                    src={related.image}
                    alt={related.name}
                    className="w-full h-32 md:h-40 object-cover"
                  />
                  <div className="p-3 md:p-4">
                    <h3 className="text-white font-bold mb-2 line-clamp-1 text-sm md:text-base">
                      {related.name}
                    </h3>
                    <p className="text-[#E50914] font-extrabold text-sm md:text-base">
                      {formatPrice(related.price)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
