'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.changeColumn('Entries', 'categoryId', {
      type: Sequelize.INTEGER,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      references: {
        model: 'Categories', 
        key: 'id'
      } 
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Entries', 'categoryId',{
      type: Sequelize.INTEGER,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    })
  }
};
