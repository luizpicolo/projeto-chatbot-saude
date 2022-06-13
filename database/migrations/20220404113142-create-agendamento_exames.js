'use strict';

module.exports = {
  up: async  (queryInterface, DataTypes) => {
    await queryInterface.createTable('agendamentos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      data_agendamento: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      pacienteId:{
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {         
          model: 'pacientes',
          key: 'id'
        }
      }
    })
  },
  down: async (queryInterface)=>{
    return queryInterface.dropTable('agendamentos');
  }
};
