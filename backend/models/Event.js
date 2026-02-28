const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Event = sequelize.define(
  "Event",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM(
        "Tournoi",
        "Communautaire",
        "Convention",
        "Événement",
      ),
      allowNull: false,
    },
    game: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    date: {
      type: DataTypes.DATEONLY, // "2024-03-15"
      allowNull: false,
    },
    time: {
      type: DataTypes.STRING(10), // "14:00"
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    prizePool: {
      type: DataTypes.STRING(50), // "500 000 Ar"
      defaultValue: "0",
    },
    slots: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    registered: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.ENUM(
        "Inscriptions ouvertes",
        "Complet",
        "Dernières places",
        "Billets disponibles",
        "Places disponibles",
      ),
      defaultValue: "Inscriptions ouvertes",
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "events",
    timestamps: true,
  },
);

module.exports = Event;
