
  const moment = require('moment');
  
  module.exports = (sequelize, Sequelize) => {
    const TraceTests = sequelize.define("trace_tests", {
      id_trace: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      trace_test: {
        type: Sequelize.TEXT
      },
      num_serie: {
        type: Sequelize.STRING
      },
      description_operation: {
        type: Sequelize.STRING
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        get() {
          return moment(this.getDataValue('date_de_creation')).local().format('YYYY-MM-DD HH:mm:ss');
        }
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        get() {
          return moment(this.getDataValue('date_mise_a_jour')).local().format('YYYY-MM-DD HH:mm:ss');
        }
      }
    }, 
    {
      freezeTableName: true,
      timestamps: true
      
    });
  
   
  
  
    return TraceTests;
  };