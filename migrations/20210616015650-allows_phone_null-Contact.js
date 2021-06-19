'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {

        await queryInterface.changeColumn('Contacts', 'phone', {
            allowNull: true,
            type: Sequelize.STRING,
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('Contacts', 'phone', {
            allowNull: false,
            type: Sequelize.STRING,
        });

    },
};
