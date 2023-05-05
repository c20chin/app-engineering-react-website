
module.exports = (sequelize, DataTypes, Sequelize) => {
    const Projects = sequelize.define("project", {
        title: {
            type: DataTypes.STRING
        },
        media: {
            type: DataTypes.STRING
        },
        year: {
            type: DataTypes.STRING
        },
        views: {
            type: DataTypes.STRING
        },
        link: {
            type: DataTypes.STRING
        },
        partner: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        publish: {
            type: DataTypes.STRING
        },
        partnerType: {
            type: DataTypes.STRING
        },
        category: {
            type: DataTypes.STRING
        },
        feature: {
            type: DataTypes.STRING
        }


    })

    return Projects
}