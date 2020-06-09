module.exports = (sequelize, type) => {
    return sequelize.define('users', {
        IDUser: {type: type.BIGINT, primaryKey: true, unique: true, allowNull: false, autoIncrement: true},
        IDImage: {type: type.INTEGER},
        Name: {type: type.STRING, allowNull: false},
        Surname: {type: type.STRING, allowNull: false},
        Age: {type: type.INTEGER},
        Email: {type: type.STRING, allowNull: false, unique: true},
        PhoneNumber: {type: type.INTEGER, unique: true},
        Password: {type: type.STRING, allowNull: false}
    })
}
