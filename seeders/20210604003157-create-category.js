'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories', [{
      name: 'Catetegory_1',
      description: 'This is an example description of category_1',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      name: 'Catetegory_2',
      description: 'This is an example description of category_2',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      name: 'Catetegory_3',
      description: 'This is an example description of category_3',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      name: 'Catetegory_4',
      description: 'This is an example description of category_4',
      createdAt: new Date,
      updatedAt: new Date
    },
  ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
