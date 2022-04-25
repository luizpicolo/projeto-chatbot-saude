'use strict';

module.exports = {
  async up (queryInterface, DataTypes) {
    await queryInterface.addColumn('pacientes', 'identificador', {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    })
  },

  async down (queryInterface) {
    await queryInterface.removeColumn('pacientes', 'identificador');
  }
};
