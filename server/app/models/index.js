const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.proposals = require("../models/proposal.model.js")(sequelize, Sequelize);
db.events = require("./events.model")(sequelize, Sequelize);
db.news = require("../models/news.model")(sequelize, Sequelize);
db.orgInfo = require("../models/orgInfo.model")(sequelize, Sequelize);
db.project = require("../models/project.model")(sequelize, Sequelize);
db.webConfig = require("../models/webConfig.model")(sequelize, Sequelize);
db.refreshToken = require("../models/refreshToken.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.refreshToken.belongsTo(db.user, {
  foreignKey: "userId",
  targetKey: "id",
});
db.user.hasOne(db.refreshToken, {
  foreignKey: "userId",
  targetKey: "id",
});

/* 
db.proposal.belongsTo(db.user, {
  foreignKey: "userId",
  as: 'users'
});
db.user.hasMany(db.proposal, {
  as: "proposal"
}); */

db.ROLES = ["user", "admin"];

module.exports = db;
