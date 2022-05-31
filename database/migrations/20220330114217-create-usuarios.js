'use strict';

module.exports = {
  up: async  (queryInterface, DataTypes) => {
    await queryInterface.createTable('usuarios', {
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
      admin: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
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
    return queryInterface.dropTable('usuarios');
  }
};
