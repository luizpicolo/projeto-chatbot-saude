'use strict';

module.exports = {
  async up (queryInterface, DataTypes) {
    await queryInterface.addColumn('pacientes', 'telegran_id', {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    }),
    await queryInterface.addColumn('pacientes', 'whatsapp_id', {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    })
  },

  async down (queryInterface) {
    await queryInterface.removeColumn('pacientes', 'telegran_id');
    await queryInterface.removeColumn('pacientes', 'whatsapp_id');
  }
};
