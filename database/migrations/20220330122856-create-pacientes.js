'use strict';

module.exports = {
  up: async  (queryInterface, DataTypes) => {
    await queryInterface.createTable('pacientes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      nome: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      contato: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      cpf: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
      },
      esf_id:{
        type: DataTypes.INTEGER,
        references: {         
          model: 'esfs',
          key: 'id'
        }
      }
    })
  },
  down: async (queryInterface)=>{
    return queryInterface.dropTable('pacientes');
  }
};
