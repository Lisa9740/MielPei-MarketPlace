'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Products = [];

    for (let i=0; i < 10; i++){
      Products.push({
        price: 80,
        quantity: 1000,
        description: "hjkhkjhkhkghk",
        exploitationId: 1,
        createdAt : new Date(),
        updatedAt : new Date()
      })
    }
    await queryInterface.bulkInsert('Products', Products, {});

  },

  down: async (queryInterface, Sequelize) => {

     await queryInterface.bulkDelete('Products', null, {});

  }
};