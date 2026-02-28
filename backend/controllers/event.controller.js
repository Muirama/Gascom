const { Event } = require("../models");
const { Op } = require("sequelize");

// ── GET tous les événements ───────────────────────────────
const getAllEvents = async (req, res) => {
  try {
    const { search, category, game, sortBy } = req.query;

    const where = {};

    if (search) {
      where.title = { [Op.like]: `%${search}%` };
    }

    if (category && category !== "Tous") {
      where.category = category;
    }

    if (game && game !== "Tous les jeux") {
      where.game = game;
    }

    let order = [["date", "ASC"]];
    switch (sortBy) {
      case "date-asc":
        order = [["date", "ASC"]];
        break;
      case "date-desc":
        order = [["date", "DESC"]];
        break;
      case "title-asc":
        order = [["title", "ASC"]];
        break;
      case "title-desc":
        order = [["title", "DESC"]];
        break;
      case "prize-desc":
        order = [["prizePool", "DESC"]];
        break;
      default:
        break;
    }

    const events = await Event.findAll({ where, order });
    return res.status(200).json({ events });
  } catch (error) {
    console.error("Erreur getAllEvents :", error);
    return res.status(500).json({ message: "Erreur serveur." });
  }
};

// ── GET un événement par ID ───────────────────────────────
const getEventById = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Événement introuvable." });
    }
    return res.status(200).json({ event });
  } catch (error) {
    console.error("Erreur getEventById :", error);
    return res.status(500).json({ message: "Erreur serveur." });
  }
};

// ── POST créer un événement (admin) ───────────────────────
const createEvent = async (req, res) => {
  try {
    const {
      title,
      category,
      game,
      image,
      date,
      time,
      location,
      prizePool,
      slots,
      description,
    } = req.body;

    if (!title || !category || !game || !date) {
      return res.status(400).json({
        message: "Titre, catégorie, jeu et date sont requis.",
      });
    }

    const event = await Event.create({
      title,
      category,
      game,
      image,
      date,
      time,
      location,
      prizePool: prizePool || "0",
      slots: slots || 0,
      registered: 0,
      status: "Inscriptions ouvertes",
      description,
    });

    return res
      .status(201)
      .json({ message: "Événement créé avec succès.", event });
  } catch (error) {
    console.error("Erreur createEvent :", error);
    return res.status(500).json({ message: "Erreur serveur." });
  }
};

// ── PUT modifier un événement (admin) ─────────────────────
const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Événement introuvable." });
    }
    await event.update(req.body);
    return res.status(200).json({ message: "Événement mis à jour.", event });
  } catch (error) {
    console.error("Erreur updateEvent :", error);
    return res.status(500).json({ message: "Erreur serveur." });
  }
};

// ── DELETE supprimer un événement (admin) ─────────────────
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Événement introuvable." });
    }
    await event.destroy();
    return res.status(200).json({ message: "Événement supprimé avec succès." });
  } catch (error) {
    console.error("Erreur deleteEvent :", error);
    return res.status(500).json({ message: "Erreur serveur." });
  }
};

// ── PATCH s'inscrire à un événement (user connecté) ───────
const registerToEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Événement introuvable." });
    }

    if (event.status === "Complet") {
      return res.status(400).json({ message: "Cet événement est complet." });
    }

    if (event.registered >= event.slots) {
      // Mettre à jour le statut automatiquement
      await event.update({ status: "Complet" });
      return res.status(400).json({ message: "Plus de places disponibles." });
    }

    const newRegistered = event.registered + 1;

    // Mettre à jour le statut selon les places restantes
    let newStatus = event.status;
    const placesRestantes = event.slots - newRegistered;
    if (placesRestantes === 0) {
      newStatus = "Complet";
    } else if (placesRestantes <= Math.ceil(event.slots * 0.1)) {
      // Moins de 10% des places restantes
      newStatus = "Dernières places";
    }

    await event.update({ registered: newRegistered, status: newStatus });

    return res.status(200).json({
      message: "Inscription réussie.",
      registered: newRegistered,
      status: newStatus,
    });
  } catch (error) {
    console.error("Erreur registerToEvent :", error);
    return res.status(500).json({ message: "Erreur serveur." });
  }
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  registerToEvent,
};
