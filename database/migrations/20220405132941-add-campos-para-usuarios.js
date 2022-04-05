'use strict';

module.exports = {
  async up (queryInterface, DataTypes) {
    await queryInterface.addColumn('usuarios', 'email', {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    });
    await queryInterface.addColumn('usuarios', 'password', {
      allowNull: false,
      type: DataTypes.STRING,
    });
    await queryInterface.addColumn('usuarios', 'createdAt', {
      allowNull: false,
      type: DataTypes.DATE,
    });
    await queryInterface.addColumn('usuarios', 'updatedAt', {
      allowNull: false,
      type: DataTypes.DATE,
    });
  },

  async down (queryInterface) {
    await queryInterface.removeColumn('usuarios', 'email');
    await queryInterface.removeColumn('usuarios', 'password');
    await queryInterface.removeColumn('usuarios', 'createdAt');
    await queryInterface.removeColumn('usuarios', 'updatedAt');
  }
};
