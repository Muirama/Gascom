/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaGamepad,
  FaShoppingBag,
  FaTrophy,
  FaUsers,
  FaChartLine,
  FaBoxOpen,
  FaCog,
  FaBell,
  FaSignOutAlt,
  FaTachometerAlt,
  FaTicketAlt,
  FaMoneyBillWave,
  FaEye,
  FaEdit,
  FaTrash,
  FaPlus,
  FaSearch,
  FaArrowUp,
  FaArrowDown,
  FaCircle,
  FaBars,
  FaTimes,
} from "react-icons/fa";

// ── Données fictives ────────────────────────────────────────
const stats = [
  {
    label: "Revenus du mois",
    value: "4 820 000 Ar",
    change: "+12.4%",
    up: true,
    icon: <FaMoneyBillWave size={22} />,
    color: "#E50914",
  },
  {
    label: "Commandes",
    value: "138",
    change: "+8.1%",
    up: true,
    icon: <FaShoppingBag size={22} />,
    color: "#FF6B35",
  },
  {
    label: "Joueurs inscrits",
    value: "512",
    change: "+23.5%",
    up: true,
    icon: <FaUsers size={22} />,
    color: "#E50914",
  },
  {
    label: "Tournois actifs",
    value: "4",
    change: "-1",
    up: false,
    icon: <FaTrophy size={22} />,
    color: "#FF6B35",
  },
];

const recentOrders = [
  {
    id: "#4521",
    product: "League of Legends RP",
    user: "Rakoto M.",
    amount: "50 000 Ar",
    status: "Complété",
    date: "25 fév.",
  },
  {
    id: "#4520",
    product: "Chaise Gaming Pro",
    user: "Fara B.",
    amount: "850 000 Ar",
    status: "En attente",
    date: "25 fév.",
  },
  {
    id: "#4519",
    product: "Casque Gaming 7.1",
    user: "Hery R.",
    amount: "250 000 Ar",
    status: "Complété",
    date: "24 fév.",
  },
  {
    id: "#4518",
    product: "Valorant Points",
    user: "Nirina T.",
    amount: "60 000 Ar",
    status: "Complété",
    date: "24 fév.",
  },
  {
    id: "#4517",
    product: "Free Fire Diamonds",
    user: "Lova S.",
    amount: "35 000 Ar",
    status: "Annulé",
    date: "23 fév.",
  },
  {
    id: "#4516",
    product: "Souris Gaming RGB",
    user: "Ando K.",
    amount: "180 000 Ar",
    status: "En attente",
    date: "23 fév.",
  },
];

const recentTournaments = [
  {
    name: "FIFA 24 Open",
    game: "FIFA 24",
    players: "32/32",
    prize: "500 000 Ar",
    status: "En cours",
  },
  {
    name: "LoL Mada Cup S2",
    game: "LoL",
    players: "18/20",
    prize: "1 000 000 Ar",
    status: "Inscription",
  },
  {
    name: "PUBG Mobile Wars",
    game: "PUBG Mobile",
    players: "64/64",
    prize: "750 000 Ar",
    status: "Terminé",
  },
  {
    name: "CS2 Championship",
    game: "CS2",
    players: "8/16",
    prize: "600 000 Ar",
    status: "Inscription",
  },
];

const topProducts = [
  { name: "Chaise Gaming Pro", sales: 24, revenue: "20 400 000 Ar", pct: 88 },
  { name: "Clavier Mécanique", sales: 41, revenue: "13 120 000 Ar", pct: 72 },
  { name: "LoL RP", sales: 93, revenue: "4 650 000 Ar", pct: 60 },
  { name: "Casque Gaming 7.1", sales: 19, revenue: "4 750 000 Ar", pct: 45 },
  { name: "Valorant Points", sales: 67, revenue: "4 020 000 Ar", pct: 38 },
];

const navItems = [
  { label: "Dashboard", icon: <FaTachometerAlt />, active: true },
  { label: "Produits", icon: <FaBoxOpen /> },
  { label: "Commandes", icon: <FaShoppingBag /> },
  { label: "Tournois", icon: <FaTrophy /> },
  { label: "Utilisateurs", icon: <FaUsers /> },
  { label: "Statistiques", icon: <FaChartLine /> },
  { label: "Paramètres", icon: <FaCog /> },
];

const statusColor = {
  Complété: "text-green-400 bg-green-400/10 border-green-400/30",
  "En attente": "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
  Annulé: "text-red-400 bg-red-400/10 border-red-400/30",
  "En cours": "text-blue-400 bg-blue-400/10 border-blue-400/30",
  Inscription: "text-purple-400 bg-purple-400/10 border-purple-400/30",
  Terminé: "text-gray-400 bg-gray-400/10 border-gray-400/30",
};

// ── Composant ───────────────────────────────────────────────
export default function AdminHome() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex font-sans overflow-hidden">
      {/* ══ SIDEBAR ══════════════════════════════════════════ */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -260 }}
            animate={{ x: 0 }}
            exit={{ x: -260 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed md:relative z-40 w-64 h-screen bg-[#111111] border-r border-white/5 flex flex-col"
          >
            {/* Logo */}
            <div className="px-6 py-6 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-[#E50914] rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(229,9,20,0.5)]">
                  <FaGamepad size={18} />
                </div>
                <div>
                  <p className="font-extrabold text-lg leading-none">GASCOM</p>
                  <p className="text-[10px] text-[#E50914] tracking-[0.2em] uppercase font-semibold">
                    Admin Panel
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
              <p className="text-[10px] text-gray-600 uppercase tracking-[0.2em] font-bold px-3 mb-3">
                Menu principal
              </p>
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => setActiveNav(item.label)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group
                    ${
                      activeNav === item.label
                        ? "bg-[#E50914] text-white shadow-[0_0_20px_rgba(229,9,20,0.35)]"
                        : "text-gray-500 hover:text-white hover:bg-white/5"
                    }`}
                >
                  <span
                    className={`text-base transition ${activeNav === item.label ? "text-white" : "text-gray-600 group-hover:text-[#E50914]"}`}
                  >
                    {item.icon}
                  </span>
                  {item.label}
                  {item.label === "Commandes" && (
                    <span className="ml-auto bg-[#E50914]/20 text-[#E50914] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#E50914]/30">
                      3
                    </span>
                  )}
                </button>
              ))}
            </nav>

            {/* User */}
            <div className="px-4 py-4 border-t border-white/5">
              <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition cursor-pointer">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#E50914] to-[#FF6B35] flex items-center justify-center font-bold text-sm flex-shrink-0">
                  A
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold truncate">Admin Gascom</p>
                  <p className="text-[11px] text-gray-500 truncate">
                    admin@gascom.mg
                  </p>
                </div>
                <FaSignOutAlt className="text-gray-600 hover:text-[#E50914] transition flex-shrink-0" />
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ══ MAIN ═════════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col min-h-screen overflow-y-auto">
        {/* ── Topbar ── */}
        <header className="sticky top-0 z-20 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/5 px-4 md:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-400 hover:text-white transition"
            >
              {sidebarOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
            </button>
            <div>
              <h1 className="text-lg font-extrabold leading-none">Dashboard</h1>
              <p className="text-xs text-gray-500 mt-0.5">
                Mercredi 25 février 2026
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Recherche */}
            <div className="hidden md:flex items-center gap-2 bg-[#1A1A1A] border border-white/5 rounded-lg px-4 py-2 w-56">
              <FaSearch className="text-gray-600 text-sm" />
              <input
                type="text"
                placeholder="Rechercher..."
                className="bg-transparent text-sm text-white placeholder-gray-600 focus:outline-none w-full"
              />
            </div>

            {/* Notifs */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative w-9 h-9 bg-[#1A1A1A] border border-white/5 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:border-[#E50914]/50 transition"
              >
                <FaBell size={15} />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#E50914] rounded-full text-[9px] font-bold flex items-center justify-center">
                  3
                </span>
              </button>
              <AnimatePresence>
                {notifOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-72 bg-[#161616] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50"
                  >
                    <div className="px-4 py-3 border-b border-white/5">
                      <p className="font-bold text-sm">Notifications</p>
                    </div>
                    {[
                      {
                        msg: "Nouvelle commande #4521 reçue",
                        time: "Il y a 5 min",
                        dot: "bg-green-400",
                      },
                      {
                        msg: "Tournoi FIFA 24 Open — 32/32 joueurs",
                        time: "Il y a 1h",
                        dot: "bg-blue-400",
                      },
                      {
                        msg: "Commande #4517 annulée par Lova S.",
                        time: "Il y a 3h",
                        dot: "bg-red-400",
                      },
                    ].map((n, i) => (
                      <div
                        key={i}
                        className="px-4 py-3 hover:bg-white/5 transition flex gap-3 items-start cursor-pointer"
                      >
                        <div
                          className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.dot}`}
                        />
                        <div>
                          <p className="text-sm text-gray-200">{n.msg}</p>
                          <p className="text-xs text-gray-600 mt-0.5">
                            {n.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Avatar */}
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#E50914] to-[#FF6B35] flex items-center justify-center font-bold text-sm shadow-[0_0_12px_rgba(229,9,20,0.4)] cursor-pointer">
              A
            </div>
          </div>
        </header>

        {/* ── Contenu ── */}
        <main className="flex-1 px-4 md:px-8 py-6 md:py-8 space-y-6 md:space-y-8">
          {/* KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-[#111111] border border-white/5 rounded-2xl p-5 hover:border-[#E50914]/30 hover:shadow-[0_0_20px_rgba(229,9,20,0.1)] transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: `${s.color}18`,
                      color: s.color,
                      border: `1px solid ${s.color}30`,
                    }}
                  >
                    {s.icon}
                  </div>
                  <span
                    className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
                      s.up
                        ? "text-green-400 bg-green-400/10"
                        : "text-red-400 bg-red-400/10"
                    }`}
                  >
                    {s.up ? <FaArrowUp size={9} /> : <FaArrowDown size={9} />}
                    {s.change}
                  </span>
                </div>
                <p className="text-2xl font-extrabold leading-none mb-1">
                  {s.value}
                </p>
                <p className="text-xs text-gray-500 mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Grille principale */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Commandes récentes — 2/3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2 bg-[#111111] border border-white/5 rounded-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                <h2 className="font-extrabold text-base">Commandes récentes</h2>
                <button className="text-xs text-[#E50914] font-semibold hover:text-[#FF1E56] transition flex items-center gap-1">
                  Voir tout →
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="text-left px-6 py-3 text-gray-500 font-semibold text-xs uppercase tracking-wider">
                        ID
                      </th>
                      <th className="text-left px-4 py-3 text-gray-500 font-semibold text-xs uppercase tracking-wider">
                        Produit
                      </th>
                      <th className="text-left px-4 py-3 text-gray-500 font-semibold text-xs uppercase tracking-wider hidden md:table-cell">
                        Client
                      </th>
                      <th className="text-left px-4 py-3 text-gray-500 font-semibold text-xs uppercase tracking-wider">
                        Montant
                      </th>
                      <th className="text-left px-4 py-3 text-gray-500 font-semibold text-xs uppercase tracking-wider">
                        Statut
                      </th>
                      <th className="text-left px-4 py-3 text-gray-500 font-semibold text-xs uppercase tracking-wider hidden lg:table-cell">
                        Date
                      </th>
                      <th className="px-4 py-3" />
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order, i) => (
                      <motion.tr
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 + i * 0.05 }}
                        className="border-b border-white/5 hover:bg-white/[0.03] transition group"
                      >
                        <td className="px-6 py-3.5 text-gray-400 font-mono text-xs">
                          {order.id}
                        </td>
                        <td className="px-4 py-3.5 font-semibold text-white max-w-[140px] truncate">
                          {order.product}
                        </td>
                        <td className="px-4 py-3.5 text-gray-400 hidden md:table-cell">
                          {order.user}
                        </td>
                        <td className="px-4 py-3.5 font-bold text-[#E50914] whitespace-nowrap">
                          {order.amount}
                        </td>
                        <td className="px-4 py-3.5">
                          <span
                            className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${statusColor[order.status]}`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 text-gray-600 text-xs hidden lg:table-cell">
                          {order.date}
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                            <button className="text-gray-500 hover:text-white transition">
                              <FaEye size={13} />
                            </button>
                            <button className="text-gray-500 hover:text-[#E50914] transition">
                              <FaEdit size={13} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Top produits — 1/3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="bg-[#111111] border border-white/5 rounded-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                <h2 className="font-extrabold text-base">Top Produits</h2>
                <FaChartLine className="text-[#E50914] opacity-60" />
              </div>
              <div className="px-6 py-4 space-y-5">
                {topProducts.map((p, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center mb-1.5">
                      <p className="text-sm font-semibold text-white truncate max-w-[140px]">
                        {p.name}
                      </p>
                      <p className="text-xs text-gray-500 flex-shrink-0 ml-2">
                        {p.sales} ventes
                      </p>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${p.pct}%` }}
                        transition={{
                          delay: 0.5 + i * 0.1,
                          duration: 0.7,
                          ease: "easeOut",
                        }}
                        className="h-full rounded-full bg-gradient-to-r from-[#E50914] to-[#FF6B35]"
                        style={{ boxShadow: "0 0 8px rgba(229,9,20,0.4)" }}
                      />
                    </div>
                    <p className="text-[11px] text-gray-600 mt-1">
                      {p.revenue}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Tournois */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-[#111111] border border-white/5 rounded-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
              <h2 className="font-extrabold text-base flex items-center gap-2">
                <FaTrophy className="text-[#E50914]" /> Tournois
              </h2>
              <button className="flex items-center gap-2 text-xs bg-[#E50914] hover:bg-[#FF1E56] text-white font-semibold px-3 py-1.5 rounded-lg transition hover:shadow-[0_0_12px_rgba(229,9,20,0.5)]">
                <FaPlus size={10} /> Nouveau
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left px-6 py-3 text-gray-500 font-semibold text-xs uppercase tracking-wider">
                      Tournoi
                    </th>
                    <th className="text-left px-4 py-3 text-gray-500 font-semibold text-xs uppercase tracking-wider hidden md:table-cell">
                      Jeu
                    </th>
                    <th className="text-left px-4 py-3 text-gray-500 font-semibold text-xs uppercase tracking-wider">
                      Joueurs
                    </th>
                    <th className="text-left px-4 py-3 text-gray-500 font-semibold text-xs uppercase tracking-wider hidden sm:table-cell">
                      Prize Pool
                    </th>
                    <th className="text-left px-4 py-3 text-gray-500 font-semibold text-xs uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {recentTournaments.map((t, i) => (
                    <tr
                      key={i}
                      className="border-b border-white/5 hover:bg-white/[0.03] transition group"
                    >
                      <td className="px-6 py-3.5 font-bold text-white">
                        {t.name}
                      </td>
                      <td className="px-4 py-3.5 text-gray-400 hidden md:table-cell">
                        {t.game}
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="text-white font-semibold">
                          {t.players}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 font-bold text-[#E50914] hidden sm:table-cell">
                        {t.prize}
                      </td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${statusColor[t.status]}`}
                        >
                          {t.status}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                          <button className="text-gray-500 hover:text-white transition">
                            <FaEye size={13} />
                          </button>
                          <button className="text-gray-500 hover:text-[#E50914] transition">
                            <FaEdit size={13} />
                          </button>
                          <button className="text-gray-500 hover:text-red-500 transition">
                            <FaTrash size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Footer admin */}
          <p className="text-center text-gray-700 text-xs pb-2">
            Gascom Admin Panel v1.0 · 2026 · Antananarivo, Madagascar
          </p>
        </main>
      </div>
    </div>
  );
}
