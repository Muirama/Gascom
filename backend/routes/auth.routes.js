const express = require("express");
const router = express.Router();
const { register, login, getMe } = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");

// POST /api/auth/register → créer un compte
router.post("/register", register);

// POST /api/auth/login → se connecter
router.post("/login", login);

// GET /api/auth/me → profil de l'utilisateur connecté (protégé)
router.get("/me", authMiddleware, getMe);

module.exports = router;