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
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      telefone: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      cpf: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      sexo: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
      },

      esfs_id:{
        type: DataTypes.INTEGER,
        references: {         // relação de 1:N com a tabela "ESFS"
          //model: 'esfs',
          key: 'id'
        }
      }


    })
  },

  down: async (queryInterface)=>{
    return queryInterface.dropTable('pacientes');
  }
};
