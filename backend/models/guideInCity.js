module.exports = (sequelize, type) => {
    return sequelize.define('guideincity',
        {
            IDGuideInCity: {
                type: type.INTEGER,
                primaryKey: true,
                unique: true,
                allowNull: false,
                autoIncrement: true
            },
            IDGuide: {
                type: type.BIGINT,
                references: {
                    model: 'Guides',
                    key: 'IDGuide'
                },
                //primaryKey: true,
                allowNull: false
            },
            IDCity: {
                type: type.INTEGER,
                references: {
                    model: 'Cities',
                    key: 'IDCity'
                },
                //primaryKey: true,
                allowNull: false
            }
        })
}