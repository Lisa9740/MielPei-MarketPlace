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
    const bcrypt = require('bcryptjs');
    const Users = []

      Users.push({
          firstName : "Admin",
          lastName : "Admin",
          email : "admin@gmail.com",
          password : await bcrypt.hash('test', 12),
          roleId : 1,
          createdAt : new Date(),
          updatedAt : new Date()
      },{
        firstName : "John",
        lastName : "Doe",
        email : "jd@gmail.com",
        password : await bcrypt.hash('test', 12),
        roleId : 2,
        createdAt : new Date(),
        updatedAt : new Date()
      },{
      firstName : "Daniel ",
          lastName : "Hoarau",
          email : "producteurd@gmail.com",
          password : await bcrypt.hash('test', 12),
          roleId : 3,
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
