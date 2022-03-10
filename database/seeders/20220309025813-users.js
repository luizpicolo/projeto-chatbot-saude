module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', 
    [
      {
        name: 'John Doe',
        email: 'test@medium.com',
        password: '9ff7b641722c30acdc058f2499d97dd8',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'John Travolta',
        email: 'test2@medium.com',
        password: '082b66a712e3efe31385f3158e057496',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};