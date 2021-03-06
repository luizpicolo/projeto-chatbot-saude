'use strict';

module.exports = {
  up: async  (queryInterface, DataTypes) => {
    await queryInterface.createTable('avaliacoes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      nota: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      pacienteId:{
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {         
          model: 'pacientes',
          key: 'id'
        }}
    })
  },
  down: async (queryInterface)=>{
    return queryInterface.dropTable('avaliacoes');
  }
};
