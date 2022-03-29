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
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      admin: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },

    })
    
  },

  down: async (queryInterface)=>{
    return queryInterface.dropTable('usuarios');
  }
};
