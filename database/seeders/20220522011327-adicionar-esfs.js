'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('esfs', [
      {
        name: 'Esf - Morada do Sol',
        email: 'admin1@admin.com.br',
        cnpj: '12345678'
      },
      {
        name: 'Esf - Centro Educacional',
        email: 'admin2@admin.com.br',
        cnpj: '123456789'
      },
      {
        name: 'Esf - Vila Operária',
        email: 'admin3@admin.com.br',
        cnpj: '1234567810'
      }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('esfs', null, {});
  }
};
