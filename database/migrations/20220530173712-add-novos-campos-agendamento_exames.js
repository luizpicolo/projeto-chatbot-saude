'use strict';

module.exports = {
  async up (queryInterface, DataTypes) {
    await queryInterface.addColumn('agendamento_exames', 'horario_previsto', {
      allowNull: false,
      type: DataTypes.STRING
    });
    await queryInterface.addColumn('agendamento_exames', 'dia_previsto', {
      allowNull: false,
      type: DataTypes.STRING
    });
    await queryInterface.addColumn('agendamento_exames', 'status', {
      allowNull: false,
      type: DataTypes.STRING
    });

  },

  async down (queryInterface) {
    await queryInterface.removeColumn('agendamento_exames', 'horario_previsto');
    await queryInterface.removeColumn('agendamento_exames', 'dia_previsto');
    await queryInterface.removeColumn('agendamento_exames', 'status');
  }
};
