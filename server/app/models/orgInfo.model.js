
module.exports = (sequelize ,DataTypes, Sequelize) => {
    const OrgInfo = sequelize.define("orgInfo", {
        userID: {
            type: DataTypes.STRING
          },
        orgName: {
            type: DataTypes.STRING
            },
        intro: {
            type: DataTypes.STRING
            },
        address: {
            type: DataTypes.STRING
        },
        contactName: {
            type: DataTypes.STRING
        },
        jobTitle: {
            type: DataTypes.STRING
        },
        contactEmail: {
            type: DataTypes.STRING
        },
        contactPhone: {
            type: DataTypes.STRING
        }        
            
    });

    return OrgInfo;
};