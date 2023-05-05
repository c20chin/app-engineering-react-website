

module.exports = (sequelize ,DataTypes, Sequelize) => {
    const Proposal = sequelize.define("proposal", {
        title: {
            type: DataTypes.STRING
          },
        description: {
            type: DataTypes.STRING
            },
        status:{
            type: DataTypes.STRING
        },
        usersType: {
            type: DataTypes.STRING
            },
        projectType: {
            type: DataTypes.STRING
            },
        targetDevice: {
            type: DataTypes.STRING
            },
        webServer: {
            type: DataTypes.STRING
            },
        reference: {
            type: DataTypes.STRING
        },
        userId: {
            type: DataTypes.STRING
        }
        
            
    });

    return Proposal;
};