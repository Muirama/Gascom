const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

// ── Register ──────────────────────────────────────────────
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation basique
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Tous les champs sont requis." });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({
          message: "Le mot de passe doit contenir au moins 8 caractères.",
        });
    }

    // Vérifier si l'email existe déjà
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "Cet email est déjà utilisé." });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 12);

    // Créer l'utilisateur
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });

    // Générer le token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    return res.status(201).json({
      message: "Compte créé avec succès.",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Erreur register :", error);
    return res.status(500).json({ message: "Erreur serveur." });
  }
};

// ── Login ─────────────────────────────────────────────────
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation basique
    if (!email || !password) {
      return res.status(400).json({ message: "Email et mot de passe requis." });
    }

    // Chercher l'utilisateur
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrect." });
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrect." });
    }

    // Générer le token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    return res.status(200).json({
      message: "Connexion réussie.",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Erreur login :", error);
    return res.status(500).json({ message: "Erreur serveur." });
  }
};

// ── Get current user (profil) ─────────────────────────────
const getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] }, // Ne jamais renvoyer le mot de passe
    });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable." });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Erreur getMe :", error);
    return res.status(500).json({ message: "Erreur serveur." });
  }
};

module.exports = { register, login, getMe };
