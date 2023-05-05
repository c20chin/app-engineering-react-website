
module.exports = (sequelize, DataTypes, Sequelize) => {
    const Events = sequelize.define("event", {
        title: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        media: {
            type: DataTypes.STRING
        },
        category: {
            type: DataTypes.STRING
        },
        datetime: {
            type: DataTypes.STRING
        }

    })

    return Events
}