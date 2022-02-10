'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Employees', [
      {
        first_name: 'Vinicius',
        Last_name: 'Silva',
        age: 23
      },
      {
        first_name: 'Mariana',
        Last_name: 'Ferreira',
        age: 19
      }
    ], {})
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Employees', null, {});
  }
};
