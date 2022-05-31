'use strict';

module.exports = {
  up: async  (queryInterface, DataTypes) => {
    await queryInterface.createTable('esfs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      nome: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
      },
      email: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
      },
      cnpj: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
      }
    })
  },
  down: async (queryInterface)=>{
    return queryInterface.dropTable('esfs');
  }
};
