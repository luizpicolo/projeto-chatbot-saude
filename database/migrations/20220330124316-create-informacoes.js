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
      },
      usuario_id:{
        type: DataTypes.INTEGER,
        references: {         
          model: 'usuarios',
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
    return queryInterface.dropTable('informacoes');
  }
};
