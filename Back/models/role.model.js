
module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("roles", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: false // Désactiver l'auto-incrémentation
      },
      nom: {
        type: Sequelize.STRING,
        allowNull: false
      }
    }, {
      freezeTableName: true // Empêcher la modification du nom de la table
    });
  
    return Role;
  };
  