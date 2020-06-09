const express = require("express");
const router = express.Router();
const moment = require("moment");
const {sequelize} = require("../helpers/config");
const {Users} = require(".././sequelize");
const jwt = require("jsonwebtoken");

router.get("/", function (req, res, next) {
    Users.findAll().then(users => res.json(users));
});

router.get("/:IDUser", function (req, res, next) {
    Users.findAll({
        where: {IDUser: req.params.IDUser}
    }).then(users => res.json(users));
});

router.get("/user/:token", function (req, res, next) {
    const data = jwt.verify(req.params.token);
    Users.findAll({
        where: {IDUser: data.IDUser}
    }).then(users => res.json(users));
});

router.get("/email/:Email", function (req, res, next) {
    Users.findAll({
        where: {Email: req.params.Email}
    }).then(users => res.json(users));
});

router.post("/opinions/:idGuide/:contents/:idUser", function (req, res, next) {
    let idGuide = req.params.idGuide;
    let idUser = req.params.idUser;
    let date = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    let contents = req.params.contents;

    sequelize
        .query(
            `INSERT INTO Opinions VALUES (NULL, '${idGuide}', '${idUser}', '${date}', '${contents}');`,
            {type: sequelize.QueryTypes.INSERT}
        )
        .then(opinions => res.json(opinions));
});

router.get("/images/:imageName/:date", function (req, res, next) {
    console.log('wysyłam:' + req.params.imageName);
    res.sendFile(req.params.imageName, {
        root: "../backend/sources/userImages/"
    });
});

router.post("/updatePassword/:id/:newPassword", function (req, res, next) {
    sequelize
        .query(
            `UPDATE Users SET Password='${
                req.params.newPassword
            }' where IDUser='${
                req.params.id
            }' LIMIT 1;`,
            {type: sequelize.QueryTypes.UPDATE}
        )
        .then(user => res.json(user));
});

router.post("/updatePassword/:id/:newPassword", function (req, res, next) {
    sequelize
        .query(
            `UPDATE Users SET Password='${
                req.params.newPassword
            }' where IDUser='${
                req.params.id
            }' LIMIT 1;`,
            {type: sequelize.QueryTypes.UPDATE}
        )
        .then(user => res.json(user));
});

router.post("/updateImage/:id/:idImage", function (req, res, next) {
    sequelize
        .query(
            `UPDATE Users SET IDImage='${
                req.params.idImage
            }' where IDUser='${
                req.params.id
            }' LIMIT 1;`,
            {type: sequelize.QueryTypes.UPDATE}
        )
        .then(user => res.json(user));
});

router.post("/updatePhone/:id/:newNumber", function (req, res, next) {
    sequelize
        .query(
            `UPDATE Users SET PhoneNumber=${
                req.params.newNumber
            } where IDUser='${
                req.params.id
            }' LIMIT 1;`,
            {type: sequelize.QueryTypes.UPDATE}
        )
        .then(user => res.json(user));
});
module.exports = router;
