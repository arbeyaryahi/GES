
const moment = require('moment');
 //produit.model.js
 module.exports = (sequelize, Sequelize) => {
    const Produit = sequelize.define("produit", {
      num_serie: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
      },
      description_produit: {
        type: Sequelize.STRING
      },
     
      date_de_creation: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        get() {
          return moment(this.getDataValue('date_de_creation')).local().format('YYYY-MM-DD HH:mm:ss');
        }
      },
      date_mise_a_jour: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        get() {
          return moment(this.getDataValue('date_mise_a_jour')).local().format('YYYY-MM-DD HH:mm:ss');
        }
      }
    }, {
      freezeTableName: true,
      timestamps: true
    });
  
   
  
    return Produit;
  };


 




