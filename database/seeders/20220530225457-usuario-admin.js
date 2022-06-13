'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('usuarios', [{
      name: 'admin',
      email: 'admin123@admin.com.br',
      esfId: 1,
      password: await bcrypt.hash('12345678', bcrypt.genSaltSync(8)),
      admin: true
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('usuarios', null, {});
  }
};
