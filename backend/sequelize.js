const Sequelize = require("sequelize");
const UsersModel = require("./models/users");
const GuidesModel = require("./models/guides");
const OpinionsModel = require("./models/opinions");
const DatesModel = require("./models/dates");
const CitiesModel = require("./models/cities");
const GuideInCityModel = require("./models/guideInCity");

const sequelize = new Sequelize("mydb", "root", "admin", {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
  define: {
    timestamps: false
  }
});

const Users = UsersModel(sequelize, Sequelize);
const Guides = GuidesModel(sequelize, Sequelize);
const Dates = DatesModel(sequelize, Sequelize);
const Cities = CitiesModel(sequelize, Sequelize);
const GuideInCity = GuideInCityModel(sequelize, Sequelize);
const Opinions = OpinionsModel(sequelize, Sequelize);

module.exports = {
  Users,
  Guides,
  Opinions,
  Cities,
  GuideInCity,
  Dates
};
