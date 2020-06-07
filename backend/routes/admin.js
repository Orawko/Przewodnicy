const express = require("express");
const router = express.Router();
const Sequelize = require("sequelize");

const sequelize = new Sequelize("mydb", "root", "admin", {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
  define: {
    timestamps: false
  }
});

router.delete("/images/:idImage", function(req, res, next) {
  sequelize
    .query(
      `DELETE FROM Guides where IDImage="${req.params.idImage}") LIMIT 1;`,
      { type: sequelize.QueryTypes.DELETE }
    )
    .then(images => res.json(images));
});

router.delete("/guides/:idGuide", function(req, res, next) {
  sequelize
    .query(
      `DELETE FROM Guides where IDGuide="${req.params.idGuide}") LIMIT 1;`,
      { type: sequelize.QueryTypes.DELETE }
    )
    .then(guides => res.json(guides));
});

router.delete("/users/:idUser", function(req, res, next) {
  sequelize
    .query(`DELETE FROM Users where IDUser="${req.params.idUser}") LIMIT 1;`, {
      type: sequelize.QueryTypes.DELETE
    })
    .then(users => res.json(users));
});

router.delete("/cities/:name", function(req, res, next) {
  sequelize
    .query(`DELETE FROM Cities where Name="${req.params.name}") LIMIT 1;`, {
      type: sequelize.QueryTypes.DELETE
    })
    .then(cities => res.json(cities));
});

router.delete("/opinions/:idOpinion", function(req, res, next) {
  sequelize
    .query(
      `DELETE FROM Opinions where IDOpinion="${
        req.params.idOpinion
      }") LIMIT 1;`,
      { type: sequelize.QueryTypes.DELETE }
    )
    .then(opinions => res.json(opinions));
});

router.post("/cities/:name/:description/:idImage/:numberOfGuides", function(
  req,
  res,
  next
) {
  let name = req.params.name;
  let description = req.params.description;
  let idImage = req.params.idImage;
  let numberOfGuides = req.params.numberOfGuides;

  sequelize
    .query(
      `INSERT INTO Cities VALUES (NULL, '${idImage}', '${numberOfGuides}', '${name}', '${description}');`,
      { type: sequelize.QueryTypes.INSERT }
    )
    .then(cities => res.json(cities));
});

router.post("/images/:path", function(req, res, next) {
  let path = req.params.path;

  sequelize
    .query(`INSERT INTO Images VALUES (NULL, '${path}');`, {
      type: sequelize.QueryTypes.INSERT
    })
    .then(images => res.json(images));
});

module.exports = router;
