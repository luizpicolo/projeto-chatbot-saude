'use strict';

module.exports = {
  async up (queryInterface, DataTypes) {
    await queryInterface.addColumn('esfs', 'createdAt', {
      allowNull: false,
      type: DataTypes.DATE,
    });
    await queryInterface.addColumn('esfs', 'updatedAt', {
      allowNull: false,
      type: DataTypes.DATE,
    });
  },

  async down (queryInterface) {
    await queryInterface.removeColumn('esfs', 'createdAt');
    await queryInterface.removeColumn('esfs', 'updatedAt');
  }
};
