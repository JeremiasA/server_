'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {

        await queryInterface.changeColumn('Activities', 'image', {
            allowNull: true,
            type: Sequelize.STRING,
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('Activities', 'image', {
            allowNull: false,
            type: Sequelize.STRING,
        });

    },
};
