'use strict';

module.exports = {
  async up (queryInterface, DataTypes) {
    await queryInterface.addColumn('informacoes', 'createdAt', {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.fn('NOW')
    });
    await queryInterface.addColumn('informacoes', 'updatedAt', {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.fn('NOW')
    });
  },

  async down (queryInterface) {
    await queryInterface.removeColumn('informacoes', 'createdAt');
    await queryInterface.removeColumn('informacoes', 'updatedAt');
  }
};
