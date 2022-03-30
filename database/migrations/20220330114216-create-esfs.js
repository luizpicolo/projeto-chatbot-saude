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
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      cnpj: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      usuarios_id:{
        type: DataTypes.INTEGER,
        references: {         // relação de 1:N com a tabela "Usuário"
          //model: '',
          key: 'id'
        }
      }


    })
  },

  down: async (queryInterface)=>{
    return queryInterface.dropTable('esfs');
  }
};
