'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Addresses', [
      {
        city: 'São joaquim da barra',
        street: 'rua São paulo',
        number: 2142,
        employee_id: 1,
      },
      {
        city: 'Curitiba',
        street: 'Nao lembro',
        number: 1342,
        employee_id: 2,
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Addresses', null, {});
  }
};
