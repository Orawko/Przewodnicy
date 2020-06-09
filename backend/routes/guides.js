const express = require("express");
const router = express.Router();
const {sequelize} = require("../helpers/config");
const {Guides} = require(".././sequelize");

router.get("/", function (req, res, next) {
    Guides.findAll().then(guides => res.json(guides));
});

router.get("/:IDGuide", function (req, res, next) {
    Guides.findAll({
        where: {IDGuide: req.params.IDGuide}
    }).then(guides => res.json(guides));
});

router.get("/email/:Email", function (req, res, next) {
    Guides.findAll({
        where: {Email: req.params.Email}
    }).then(guides => res.json(guides));
});

router.get("/opinions/:IDGuide", function (req, res, next) {
    sequelize
        .query(
            `SELECT IDUser, Contents, Date, Name, Surname FROM Opinions natural join Users where IDGuide=${
                req.params.IDGuide
            };`,
            {type: sequelize.QueryTypes.SELECT}
        )
        .then(opinions => res.json(opinions));
});

router.get("/reservations/:IDGuide", function (req, res, next) {
    sequelize
        .query(
            `SELECT * FROM Reservations natural join Dates where IDGuide="${
                req.params.IDGuide
            }";`,
            {type: sequelize.QueryTypes.SELECT}
        )
        .then(reservations => res.json(reservations));
});

router.get("/dates/:IDGuide", function (req, res, next) {
    sequelize
        .query(
            `SELECT * FROM Dates where IDGuide="${
                req.params.IDGuide
            }" order by Date;`,
            {type: sequelize.QueryTypes.SELECT}
        )
        .then(opinions => res.json(opinions));
});

router.delete("/dates/:IDGuide/:date/", function (req, res, next) {
    sequelize
        .query(
            `DELETE FROM Dates where IDGuide="${req.params.IDGuide}" and Date="${
                req.params.date
            }" LIMIT 1;`,
            {
                type: sequelize.QueryTypes.DELETE
            }
        )
        .then(dates => res.json(dates));
});

router.post("/dates/:IDGuide/:date/:timeLengthInMin", function (req, res, next) {
    let iDGuide = req.params.IDGuide;
    let date = req.params.date;
    let timeLengthInMin = req.params.timeLengthInMin;
    sequelize
        .query(
            `INSERT INTO Dates VALUES (NULL, '${iDGuide}', '${date}', '${timeLengthInMin}');`,
            {type: sequelize.QueryTypes.INSERT}
        )
        .then(dates => res.json(dates));
});

router.post("/guidesInCity/:id/:cityName", function (req, res, next) {
    let cityName = req.params.cityName;
    let iDGuide = req.params.id;
    sequelize
        .query(
            `SELECT * FROM GuideInCity where IDGuide='${iDGuide}' and IDCity=(select IDCity from Cities where Name='${cityName}')`,
            {type: sequelize.QueryTypes.SELECT}
        )
        .then(pairs => {
            if (pairs.length > 0) {
                console.log("error");
            } else {
                sequelize
                    .query(
                        `INSERT INTO GuideInCity VALUES (NULL, '${iDGuide}', (select IDCity from Cities where Name='${cityName}'));`,
                        {type: sequelize.QueryTypes.INSERT}
                    )
                    .then(cities => res.json(cities));
            }
        });
});

router.delete("/guidesInCity/:id/:cityName", function (req, res, next) {
    let cityName = req.params.cityName;
    let iDGuide = req.params.id;

    sequelize
        .query(
            `SELECT * FROM GuideInCity where IDGuide='${iDGuide}' and IDCity=(select IDCity from Cities where Name='${cityName}')`,
            {type: sequelize.QueryTypes.SELECT}
        )
        .then(pairs => {
            if (pairs.length == 0) {
                console.log("error");
            } else {
                sequelize
                    .query(
                        `DELETE FROM GuideInCity where IDCity=(select IDCity from Cities where Name="${cityName}" ) and IDGuide="${iDGuide}" LIMIT 1;`,
                        {type: sequelize.QueryTypes.DELETE}
                    )
                    .then(cities => res.json(cities));
            }
        })
});

router.post("/updatePassword/:id/:newPassword", function (req, res, next) {
    sequelize
        .query(
            `UPDATE Guides SET Password='${req.params.newPassword}' where IDGuide='${
                req.params.id
            }' LIMIT 1;`,
            {type: sequelize.QueryTypes.UPDATE}
        )
        .then(guide => res.json(guide));
});

router.post("/updateImage/:id/:idImage", function (req, res, next) {
    sequelize
        .query(
            `UPDATE Guides SET IDImage='${req.params.idImage}' where IDGuide='${
                req.params.id
            }' LIMIT 1;`,
            {type: sequelize.QueryTypes.UPDATE}
        )
        .then(guide => res.json(guide));
});

router.post("/updateDescription/:id/:newDescription", function (req, res, next) {
    sequelize
        .query(
            `UPDATE Guides SET Description='${
                req.params.newDescription
            }' where IDGuide='${req.params.id}' LIMIT 1;`,
            {type: sequelize.QueryTypes.UPDATE}
        )
        .then(guide => res.json(guide));
});

router.post("/updatePhone/:id/:newNumber", function (req, res, next) {
    sequelize
        .query(
            `UPDATE Guides SET PhoneNumber=${req.params.newNumber} where IDGuide='${
                req.params.id
            }' LIMIT 1;`,
            {type: sequelize.QueryTypes.UPDATE}
        )
        .then(guide => res.json(guide));
});

module.exports = router;
