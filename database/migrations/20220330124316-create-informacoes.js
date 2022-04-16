'use strict';

module.exports = {
  up: async  (queryInterface, DataTypes) => {
    await queryInterface.createTable('informacoes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      conteudo: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      fonte: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      tipo: {
        allowNull: false,
        type: DataTypes.STRING,
      }
    })
  },
  down: async (queryInterface)=>{
    return queryInterface.dropTable('informacoes');
  }
};
