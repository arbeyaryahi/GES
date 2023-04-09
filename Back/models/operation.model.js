/*const moment = require('moment-timezone');
const timeZone = 'Africa/Tunis'; // Définissez le fuseau horaire souhaité

// produit.model.js
module.exports = (sequelize, Sequelize) => {
  const Operation = sequelize.define(
    'operation',
    {
      description_operation: {
        type: Sequelize.STRING,
      },

      date_de_creation: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        get() {
          return moment(this.getDataValue('date_de_creation'))
            .tz(timeZone)
            .format('YYYY-MM-DD HH:mm:ss');
        },
      },
      date_mise_a_jour: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        get() {
          return moment(this.getDataValue('date_mise_a_jour'))
            .tz(timeZone)
            .format('YYYY-MM-DD HH:mm:ss');
        },
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
      hooks: {
        beforeUpdate: (operation, options) => {
          operation.date_mise_a_jour = sequelize.literal('CURRENT_TIMESTAMP');
        },
      },
    },
  );

  return Operation;
};*/

const moment = require('moment');
 //Operation 
 module.exports = (sequelize, Sequelize) => {
    const Operation = sequelize.define("operation", {
      description_operation: {
        type: Sequelize.STRING,
        
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
  
   
  
    return Operation;
  };


 




