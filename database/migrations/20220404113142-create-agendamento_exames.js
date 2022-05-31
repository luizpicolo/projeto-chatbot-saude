'use strict';

module.exports = {
  up: async  (queryInterface, DataTypes) => {
    await queryInterface.createTable('agendamento_exames', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      data_agendamento: {
        unique: true,
        type: DataTypes.DATE,
      },
      paciente_id:{
        unique: true,
        type: DataTypes.INTEGER,
        references: {         
          model: 'pacientes',
          key: 'id'
        }
      }
    })
  },
  down: async (queryInterface)=>{
    return queryInterface.dropTable('agendamento_exames');
  }
};
