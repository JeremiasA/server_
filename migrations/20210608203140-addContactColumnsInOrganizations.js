'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.addColumn('Organizations','facebookUrl',{
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null
    });
    await queryInterface.addColumn('Organizations','linkedinUrl',{
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null
    });
    await queryInterface.addColumn('Organizations','instagramUrl',{
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Organizations', 'facebookUrl');
    await queryInterface.removeColumn('Organizations', 'linkedinUrl');
    await queryInterface.removeColumn('Organizations', 'instagramUrl');

  }
};
