'use strict';

module.exports = {
  async up (queryInterface, DataTypes) {
    await queryInterface.changeColumn('informacoes', 'conteudo',{
        type: DataTypes.TEXT,
      }
    );
  },

  async down (queryInterface, DataTypes) {
    await queryInterface.changeColumn('informacoes', 'conteudo',{
      type: DataTypes.STRING,
    }
  );
  }
};
