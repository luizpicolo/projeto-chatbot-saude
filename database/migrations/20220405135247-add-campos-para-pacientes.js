'use strict';

module.exports = {
  async up (queryInterface, DataTypes) {
    await queryInterface.addColumn('pacientes', 'createdAt', {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.fn('NOW')
    });
    await queryInterface.addColumn('pacientes', 'updatedAt', {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.fn('NOW')
    });
  },

  async down (queryInterface) {
    await queryInterface.removeColumn('pacientes', 'createdAt');
    await queryInterface.removeColumn('pacientes', 'updatedAt');
  }
};
