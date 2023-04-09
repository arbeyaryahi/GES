
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      matricule: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false
      },
      nom: {
          type: Sequelize.STRING
      },
      prenom: {
          type: Sequelize.STRING
      },
      email: {
          type: Sequelize.STRING
      },
      roleId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'roles',
            key: 'id'
          }
        }
        
    });
    return User;
  };
  