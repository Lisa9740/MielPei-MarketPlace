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
        const Roles = []
        Roles.push({
                id: 1,
                name: "Admin",
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                id: 2,
                name: "Client",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 3,
                name: "Producteurs",
                createdAt: new Date(),
                updatedAt: new Date()
            }
        )

        await queryInterface.bulkInsert('Roles', Roles, {});
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('Roles', null, {});

    }
};
