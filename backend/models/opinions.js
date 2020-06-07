module.exports = (sequelize, type) => {
  return sequelize.define("opinions", {
    IDOpinion: {
      type: type.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    IDGuide: { type: type.BIGINT, primaryKey: true, allowNull: false },
    IDUser: { type: type.BIGINT, primaryKey: true, allowNull: false },
    Date: { type: type.DATE, primaryKey: true, allowNull: false },
    Contents: { type: type.TEXT, primaryKey: true, allowNull: false }
  });
};
