'use strict';

module.exports = {
  async up (queryInterface, DataTypes) {
    await queryInterface.addColumn('agendamento_consultas', 'createdAt', {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.fn('NOW')
    });
    await queryInterface.addColumn('agendamento_consultas', 'updatedAt', {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.fn('NOW')
    });
  },

  async down (queryInterface) {
    await queryInterface.removeColumn('agendamento_consultas', 'createdAt');
    await queryInterface.removeColumn('agendamento_consultas', 'updatedAt');
  }
};
