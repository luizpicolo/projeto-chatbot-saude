'use strict';

module.exports = {
  async up (queryInterface, DataTypes) {
    await queryInterface.addColumn('avaliacoes', 'createdAt', {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.fn('NOW')
    });
    await queryInterface.addColumn('avaliacoes', 'updatedAt', {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.fn('NOW')
    });
  },

  async down (queryInterface) {
    await queryInterface.removeColumn('avaliacoes', 'createdAt');
    await queryInterface.removeColumn('avaliacoes', 'updatedAt');
  }
};
