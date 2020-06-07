module.exports = (sequelize, type) => {
  return sequelize.define("dates", {
    IDDate: {
      type: type.BIGINT,
      primaryKey: true,
      unique: true,
      allowNull: false,
      autoIncrement: true
    },
    IDGuide: { type: type.INTEGER, allowNull: false },
    Date: { type: type.DATE, allowNull: false },
    Duration: { type: type.INTEGER, allowNull: false }
  });
};
