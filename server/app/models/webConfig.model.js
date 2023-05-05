
module.exports = (sequelize ,DataTypes, Sequelize) => {
    const WebConfig = sequelize.define("webConfig", {
        title: {
            type: DataTypes.STRING
          },
        description: {
            type: DataTypes.STRING
            },
            
    });

    return WebConfig;
};