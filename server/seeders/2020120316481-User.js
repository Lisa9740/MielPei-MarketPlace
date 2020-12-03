'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    const Users = []

      Users.push({
        firstName : "John",
        lastName : "Doe",
        email : "jd@gmail.com",
        password : "test",
        roleId : 2,
        createdAt : new Date(),
        updatedAt : new Date()
      },{
      firstName : "Joe ",
          lastName : "Producteur",
          email : "producteurd@gmail.com",
          password : "test",
          roleId : 3,
          createdAt : new Date(),
          updatedAt : new Date()
    },{
      firstName : "Joe ",
          lastName : "Producteur",
          email : "admin@gmail.com",
          password : "test",
          roleId : 1,
          createdAt : new Date(),
          updatedAt : new Date()
    })

    await queryInterface.bulkInsert('Users', Users, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
