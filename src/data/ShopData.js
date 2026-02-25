export const products = [
  {
    id: 1,
    name: "League of Legends RP",
    price: 50000,
    image: "/images/lol.jpg",
    category: "PC",
    description:
      "Riot Points officiels pour League of Legends. Débloquez champions, skins et emotes.",
  },
  {
    id: 2,
    name: "CS2 Skins Pack",
    price: 75000,
    image: "/images/CS2.jpg",
    category: "PC",
    description:
      "Pack de skins exclusifs pour Counter-Strike 2. Personnalisez votre arsenal.",
  },
  {
    id: 3,
    name: "Valorant Points",
    price: 60000,
    image: "/images/valorant.jpg",
    category: "PC",
    description:
      "Valorant Points officiels pour débloquer agents, skins et collections.",
  },
  {
    id: 7,
    name: "Dota 2 Battle Pass",
    price: 55000,
    image: "/images/dota.jpg",
    category: "PC",
    description:
      "Battle Pass Dota 2 saison actuelle. Débloquez des récompenses exclusives.",
  },

  // ── Crédits Console ──────────────────────────────────────
  {
    id: 4,
    name: "FIFA 24",
    price: 120000,
    image: "/images/fifa.jpg",
    category: "Console",
    description:
      "Jeu complet FIFA 24 pour PlayStation et Xbox. La simulation football ultime.",
  },
  {
    id: 6,
    name: "Call of Duty Points",
    price: 85000,
    image: "/images/cod.jpg",
    category: "Console",
    description:
      "COD Points pour Modern Warfare. Accédez aux passes de combat et skins.",
  },
  {
    id: 8,
    name: "Apex Legends Coins",
    price: 65000,
    image: "/images/apex.jpg",
    category: "Console",
    description:
      "Apex Coins pour débloquer des légendes, skins et cosmétiques rares.",
  },

  // ── Crédits Mobile ───────────────────────────────────────
  {
    id: 5,
    name: "PUBG UC",
    price: 40000,
    image: "/images/pubg.jpg",
    category: "Mobile",
    description:
      "Unknown Cash pour PUBG Mobile. Achetez des royale passes et tenues exclusives.",
  },
  {
    id: 9,
    name: "Free Fire Diamonds",
    price: 35000,
    image: "/images/freefire.jpg",
    category: "Mobile",
    description:
      "Diamants Free Fire pour débloquer personnages, skins et pass élite.",
  },
  {
    id: 10,
    name: "Mobile Legends Diamonds",
    price: 45000,
    image: "/images/mlbb.jpg",
    category: "Mobile",
    description:
      "Diamants officiels Mobile Legends Bang Bang pour héros et skins.",
  },

  // ── Accessoires ──────────────────────────────────────────
  {
    id: 11,
    name: "Souris Gaming RGB",
    price: 180000,
    image: "/images/mouse.jpg",
    category: "Accessoires",
    description:
      "Souris gaming haute précision avec éclairage RGB personnalisable. DPI ajustable jusqu'à 16 000.",
  },
  {
    id: 12,
    name: "Casque Gaming 7.1",
    price: 250000,
    image: "/images/headset.jpg",
    category: "Accessoires",
    description:
      "Casque surround 7.1 virtuel avec micro antibruit. Confort optimal pour les longues sessions.",
  },
  {
    id: 13,
    name: "Clavier Mécanique RGB",
    price: 320000,
    image: "/images/keyboard.jpg",
    category: "Accessoires",
    description:
      "Clavier mécanique switch bleu, rétroéclairage RGB par touche. Réactivité maximale.",
  },
  {
    id: 14,
    name: "Tapis de Souris XXL",
    price: 65000,
    image: "/images/mousepad.jpg",
    category: "Accessoires",
    description:
      "Tapis de souris grand format 900×400mm, surface lisse optimisée pour le gaming compétitif.",
  },
  {
    id: 15,
    name: "Manette Pro PS5",
    price: 290000,
    image: "/images/controller.jpg",
    category: "Accessoires",
    description:
      "Manette DualSense compatible PS5 et PC. Retour haptique et gâchettes adaptatives.",
  },
  {
    id: 16,
    name: "Support Casque RGB",
    price: 75000,
    image: "/images/headset-stand.jpg",
    category: "Accessoires",
    description:
      "Support casque avec hub USB intégré et éclairage RGB ambiance gaming.",
  },
  {
    id: 17,
    name: "Webcam 1080p Gaming",
    price: 195000,
    image: "/images/webcam.jpg",
    category: "Accessoires",
    description:
      "Webcam Full HD 1080p 60fps avec autofocus et correction lumière automatique. Idéale pour le streaming.",
  },
  {
    id: 18,
    name: "Chaise Gaming Pro",
    price: 850000,
    image: "/images/chair.jpg",
    category: "Accessoires",
    description:
      "Chaise gaming ergonomique avec support lombaire, appuie-tête et accoudoirs 4D réglables.",
  },
];

export const categories = ["Tous", "PC", "Console", "Mobile", "Accessoires"];

export const sortOptions = [
  { value: "default", label: "Tri par défaut" },
  { value: "name-asc", label: "Nom (A-Z)" },
  { value: "name-desc", label: "Nom (Z-A)" },
  { value: "price-asc", label: "Prix croissant" },
  { value: "price-desc", label: "Prix décroissant" },
];
