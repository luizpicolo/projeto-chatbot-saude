'use strict';

module.exports = {
  up: async  (queryInterface, DataTypes) => {
    await queryInterface.createTable('agendamentoConsultas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      data_agendamento: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      pacientes_id:{
        type: DataTypes.INTEGER,
        references: {         
          //model: 'pacientes',
          key: 'id'
        }
      },
      esfs_id:{
        type: DataTypes.INTEGER,
        references: {         
          //model: 'esfs',
          key: 'id'
        }
      }
    })
  },

  down: async (queryInterface)=>{
    return queryInterface.dropTable('agendamentoConsultas');
  }
};
