module.exports = (sequelize, type) => {
    return sequelize.define("cities", {
        IDCity: {
            type: type.INTEGER,
            primaryKey: true,
            unique: true,
            allowNull: false,
            autoIncrement: true
        },
        IDImage: {type: type.INTEGER, primaryKey: true, allowNull: false},
        Name: {type: type.STRING, allowNull: false},
        Description: {type: type.TEXT, allowNull: false}
    });
};