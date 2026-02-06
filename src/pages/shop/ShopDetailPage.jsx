/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaShoppingCart,
  FaCheck,
  FaStar,
  FaBox,
  FaShieldAlt,
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
          <h1 className="text-4xl font-bold text-white mb-4">
            Produit non trouvé
          </h1>
          <Link to="/shop" className="text-[#E50914] hover:text-[#FF1E56]">
            Retour à la boutique
          </Link>
        </div>
      </section>
    );
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("fr-MG").format(price) + " Ar";
  };

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
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition"
        >
          <FaArrowLeft /> Retour à la boutique
        </motion.button>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-12">
          {/* Image produit */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-[#E50914]/30 shadow-[0_0_30px_rgba(229,9,20,0.3)]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[400px] md:h-[600px] object-cover"
              />
              <span className="absolute top-4 right-4 bg-[#E50914] text-white px-4 py-2 rounded-full font-semibold">
                {product.category}
              </span>
            </div>
          </motion.div>

          {/* Détails produit */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
              {product.name}
            </h1>

            {/* Prix */}
            <div className="text-4xl md:text-5xl font-extrabold text-[#E50914] mb-6">
              {formatPrice(product.price)}
            </div>

            {/* Description */}
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Stock */}
            <div className="flex items-center gap-3 mb-6 p-4 bg-[#1A1A1A] rounded-lg border border-[#E50914]/20">
              <FaBox className="text-[#E50914] text-xl" />
              <span className="text-white">
                Stock disponible:{" "}
                <span className="font-bold text-green-500">
                  {product.stock}
                </span>{" "}
                unités
              </span>
            </div>

            {/* Quantité */}
            <div className="mb-6">
              <label className="block text-white font-semibold mb-3">
                Quantité:
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 bg-[#1A1A1A] text-white rounded-lg hover:bg-[#E50914] transition font-bold text-xl"
                >
                  -
                </button>
                <span className="text-2xl font-bold text-white w-16 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity(Math.min(product.stock, quantity + 1))
                  }
                  className="w-12 h-12 bg-[#1A1A1A] text-white rounded-lg hover:bg-[#E50914] transition font-bold text-xl"
                >
                  +
                </button>
              </div>
            </div>

            {/* Total */}
            <div className="p-4 bg-[#1A1A1A] rounded-lg border border-[#E50914]/30 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-lg">Total:</span>
                <span className="text-3xl font-extrabold text-[#E50914]">
                  {formatPrice(product.price * quantity)}
                </span>
              </div>
            </div>

            {/* Bouton ajouter au panier */}
            <button
              onClick={handleAddToCart}
              className={`w-full py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 ${
                addedToCart
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-[#E50914] hover:bg-[#FF1E56] hover:shadow-[0_0_25px_rgba(229,9,20,0.6)]"
              } text-white active:scale-95`}
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
            </button>

            {/* Garanties */}
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <FaShieldAlt className="text-[#E50914]" />
                <span>Paiement 100% sécurisé</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <FaCheck className="text-green-500" />
                <span>Livraison instantanée par email</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <FaStar className="text-yellow-500" />
                <span>Support client 24/7</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Produits similaires */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-6">
              Produits similaires
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((related) => (
                <motion.div
                  key={related.id}
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
                    <h3 className="text-white font-bold mb-2 line-clamp-1">
                      {related.name}
                    </h3>
                    <p className="text-[#E50914] font-extrabold">
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
