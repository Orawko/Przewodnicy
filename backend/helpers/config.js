const Sequelize = require("sequelize");

const config = {
    database: "mydb",
    user: "root",
    password: "admin",
    config: {
        host: "localhost",
        dialect: "mysql",
        port: 3306,
        define: {
            timestamps: false
        }
    }
};

const sequelize = new Sequelize("mydb", "root", "admin", {
    host: "localhost",
    dialect: "mysql",
    port: 3306,
    define: {
        timestamps: false
    }
});

module.exports = {config, sequelize};