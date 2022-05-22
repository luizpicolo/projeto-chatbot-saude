'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('esfs', [
      {
        nome: 'Esf - Morada do Sol',
        email: 'admin@admin.com.br',
        cnpj: '12345678'
      },
      {
        nome: 'Esf - Centro Educacional',
        email: 'admin@admin.com.br',
        cnpj: '12345678'
      },
      {
        nome: 'Esf - Vila Operária',
        email: 'admin@admin.com.br',
        cnpj: '12345678'
      }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('esfs', null, {});
  }
};
