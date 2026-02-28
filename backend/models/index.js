const sequelize = require("../config/database");

// ── Import de tous les models ─────────────────────────────
const User = require("./User");
const Product = require("./Product");
const News = require("./News");
const Team = require("./Team");
const Event = require("./Event");

// ── Associations ──────────────────────────────────────────
// Un User peut avoir plusieurs commandes (à étendre plus tard)
// User.hasMany(Order);
// Order.belongsTo(User);

// ── Export ────────────────────────────────────────────────
module.exports = {
  sequelize,
  User,
  Product,
  News,
  Team,
  Event,
};
