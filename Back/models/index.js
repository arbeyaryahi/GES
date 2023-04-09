const config = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD, {
    host: 'db',
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

db.user = require("./user.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);

db.Produit = require("./produit.model")(sequelize, Sequelize);
db.Operation = require("./operation.model")(sequelize, Sequelize);
db.TraceTests = require("./trace_tests.model")(sequelize, Sequelize);


db.Produit.belongsToMany(db.Operation, {
  through: 'produit_operation', // change to 'produit_operation'
  as: "operations",
  timestamps: true,
  foreignKey: 'num_serie'
});

db.Operation.belongsToMany(db.Produit, {
  through: 'produit_operation', // change to 'produit_operation'
  timestamps: true,
  as: "produits",
  foreignKey: 'id_operation'
});

  


db.user.belongsTo (db.role, { foreignKey: "roleId" });

db.role.hasMany(db.user, { as: "users", foreignKey: "roleId" });

//roles users 
db.ROLES = ["user", "admin", "moderator"];





module.exports = db;

