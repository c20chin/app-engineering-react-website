
module.exports = (sequelize, DataTypes, Sequelize) => {
    const News = sequelize.define("new", {
        title: {
            type: DataTypes.STRING
        },
        media: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        category: {
            type: DataTypes.STRING
        },
        datetime: {
            type: DataTypes.STRING
        }

    })

    return News
}