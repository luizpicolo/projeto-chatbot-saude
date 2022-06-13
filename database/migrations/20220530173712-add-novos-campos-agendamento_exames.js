'use strict';

module.exports = {
  async up (queryInterface, DataTypes) {
    await queryInterface.addColumn('agendamentos', 'horario_previsto', {
      allowNull: false,
      type: DataTypes.STRING
    });
    await queryInterface.addColumn('agendamentos', 'dia_previsto', {
      allowNull: false,
      type: DataTypes.STRING
    });
    await queryInterface.addColumn('agendamentos', 'status', {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    });

  },

  async down (queryInterface) {
    await queryInterface.removeColumn('agendamentos', 'horario_previsto');
    await queryInterface.removeColumn('agendamentos', 'dia_previsto');
    await queryInterface.removeColumn('agendamentos', 'status');
  }
};
