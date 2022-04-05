'use strict';

module.exports = {
  up: async  (queryInterface, DataTypes) => {
    await queryInterface.createTable('agendamento_consultas', {
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
      paciente_id:{
        type: DataTypes.INTEGER,
        references: {         
          model: 'pacientes',
          key: 'id'
        }
      },
      esf_id:{
        type: DataTypes.INTEGER,
        references: {         
          model: 'esfs',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    })
  },
  down: async (queryInterface)=>{
    return queryInterface.dropTable('agendamento_consultas');
  }
};
