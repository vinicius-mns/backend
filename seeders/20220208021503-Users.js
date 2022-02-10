'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        name: "vinicius",
        email: "vinicius_@hotmail.com",
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        name: "vinicius_silva",
        email: "vinicius_silva@hotmail.com",
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkeDelete("Users", null, {})
  }
};
