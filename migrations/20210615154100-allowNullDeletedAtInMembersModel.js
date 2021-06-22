'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('Members', 'deletedAt', {
            allowNull: true,
            type: Sequelize.DATE,
        });
        await queryInterface.changeColumn('Members', 'image', {
            allowNull: true,
            type: Sequelize.STRING,
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('Members', 'deletedAt', {
            type: Sequelize.DATE,
        });
        await queryInterface.changeColumn('Members', 'image', {
            type: Sequelize.STRING,
        });
    },
};
