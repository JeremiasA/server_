'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {

        await queryInterface.changeColumn('Activities', 'content', {
            allowNull: true,
            type: Sequelize.TEXT,
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('Activities', 'content', {
            allowNull: false,
            type: Sequelize.STRING,
        });

    },
};
