const express = require("express");
const router = express.Router();
const Sequelize = require("sequelize");
const { Cities } = require(".././sequelize");

const sequelize = new Sequelize("mydb", "root", "qwerty123", {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
  define: {
    timestamps: false
  }
});

router.get("/", function(req, res, next) {
  Cities.findAll().then(cities => res.json(cities));
});

router.get("/:IDCity", function(req, res, next) {
  Cities.findAll({
    where: { IDCity: req.params.IDCity }
  }).then(cities => res.json(cities));
});

router.get("/image/:IDCity", function(req, res, next) {
  res.sendFile(req.params.IDCity, { root: "../backend/sources/cityImages/" });
});

router.get("/guides/:IDCity", function(req, res, next) {
  sequelize
    .query(
      `SELECT * FROM Guides natural join GuideInCity where IDCity="${
        req.params.IDCity
      }";`,
      { type: sequelize.QueryTypes.SELECT }
    )
    .then(reservations => res.json(reservations));
});

module.exports = router;
