'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      firstName: 'Desiree',
      lastName: 'Prado',
      email: 'desiree@test.com',
      password: '$2b$10$hZfXOrpmiUXT83n1JO/5l.kKRs74wfnB36.Dorpa03qtJbrbQcmge', // real: 123456
      roleId: 1,
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      firstName: 'Adam',
      lastName: 'Herrero',
      email: 'adam@test.com',
      password: '$2b$10$0pi11e81CjPn9NhRdDfqceS2KiLabbllOeywlLbRN8iizqFtibUwG', // real: 5678
      roleId: 1,
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      firstName: 'Ivet',
      lastName: 'Moran',
      email: 'ivet@test.com',
      password: '$2b$10$mQPlBK1psIe9AYF/8pgdfODXdCpXE2ZPxWeuIY1gf4l5Y0lIbiy3y', // real: as4567
      roleId: 1,
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      firstName: 'Antonio',
      lastName: 'Sarmiento',
      email: 'antonio@test.com',
      password: '$2b$10$aiVPEw/eEpiwLWI1YzTxKuiWvzSpLKWhelbkGdpZ.S0BuywGhzh3y', // real: wer564
      roleId: 1,
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      firstName: 'Remedios',
      lastName: 'Gonzales',
      email: 'remedios@test.com',
      password: '$2b$10$Ov76HK9o/34.KYaLt2dDd.lfBTJ5xlIKJYrWePzOFNa0dMLPQHb1a', // real: 97534
      roleId: 1,
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      firstName: 'Lucas',
      lastName: 'Vila',
      email: 'vilalucas@test.com',
      password: '$2b$10$.ZNWiVEP7c3Ud7jsp.T7Oe1F3Tfd541NU.A.GwlOlIWYLWaz9bWvW', // real: w4d5f4 
      roleId: 1,
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      firstName: 'Braulio',
      lastName: 'Cabeza',
      email: 'braulio@test.com',
      password: '$2b$10$PKQXbsq71fX8jNmw6Gbu9usv39MklSb3GdFD34AvqQiYIIwWBnk7S', // real: 68866as
      roleId: 1,
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      firstName: 'Eric',
      lastName: 'Cantona',
      email: 'ericcantona@test.com',
      password: '$2b$10$BzhoExUeGTESUTpduWWrvurJ80hmRLoxS6aywRcefVhuEkQYlb0hy', // real: rtytry7897
      roleId: 1,
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      firstName: 'Juliana',
      lastName: 'Chavez',
      email: 'juliana@test.com',
      password: '$2b$10$VAw/kC4qK6fVqxofZXwGUOTbeiiGjju..q4Nuc7CWElA4GuYHR0Oa', // real: 234fsdf
      roleId: 1,
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      firstName: 'Ramona',
      lastName: 'Barrios',
      email: 'ramona@test.com',
      password: '$2b$10$lZqLLnv7EO34O2nMjxs1Q.EDtgY0vcTRSWFFxWoXELs2crdihSAhu', // real: 234fd
      roleId: 1,
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      firstName: 'Maria',
      lastName: 'Gonzalo',
      email: 'mariag@test.com',
      password: '$2b$10$o0CGX85nuY15LzxTDO3vBuQrm5y9nKjddcJQq/5gZzQ/leoY8JF3C', // real: 5fdf8
      roleId: 2,
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      firstName: 'Olga',
      lastName: 'Escribano',
      email: 'olga@test.com',
      password: '$2b$10$PDvQwTrRsh6gjbVl4/UxPerJEaR/OyIkHksn7U2Aev93ysWPLEIBG', // real: 567wfsd8
      roleId: 2,
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      firstName: 'Isidro',
      lastName: 'Torrejon',
      email: 'isidro@test.com',
      password: '$2b$10$8PNABJJC8DrD2rCFWLJnGupUOhQZhAgjOKPQ8ttY2.e1KcLM0d/VC', // real: fds56f45sd4f
      roleId: 2,
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      firstName: 'Victor',
      lastName: 'Naranjo',
      email: 'victornaranjo@test.com',
      password: '$2b$10$vwjzYME0y81V6GmOiTQ4UO7.F9s4RBODCiRnnkUN9hS4CDnBqaHB2', // real: 567123548
      roleId: 2,
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      firstName: 'Claudia',
      lastName: 'Morgan',
      email: 'claudiamorgan@test.com',
      password: '$2b$10$2fzYzD9up/s0JkaEZLx7zeIt.w.w5b3oQvuF8juOmAHCOjyfP2b0C', // real: utiy475
      roleId: 2,
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      firstName: 'Marcos',
      lastName: 'Ruiz',
      email: 'marcosruiz@test.com',
      password: '$2b$10$uXB2vdMRqFNaH7gIxzoz7OtKroX8dJnHj8Ng.kwUhhNmiZ8Btbare', // real: pj9324m0m
      roleId: 2,
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    },{
      firstName: 'Adela',
      lastName: 'Quesada',
      email: 'adelaquesada@test.com',
      password: '$2b$10$3ra6lI9f/yvK2u09xHVphOXS1wZWVeZhX3xPHRghRAwLc4QzcYtDi', // real: lh234oin
      roleId: 2,
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      firstName: 'Juan',
      lastName: 'Tomas',
      email: 'freebus@test.com',
      password: '$2b$10$wQZCVqmPcLDoxDjPUVYLUerhRZJcEuE63P9XzhpFYAfk4ih9VdyRq', // real: 3n48345v
      roleId: 2,
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      firstName: 'David',
      lastName: 'Monge',
      email: 'davidmonge@test.com',
      password: '$2b$10$Xeuh3UdnPFDtBF6T7eRNKuhb0EI0BYd0SgOddAIW8GeJBLXP/GRWq', // real: 5678
      roleId: 2,
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      firstName: 'Fernanda',
      lastName: 'Bellido',
      email: 'fernanda@test.com',
      password: '$2b$10$b9zQZ8D040NUB3FWJrrqPu8mwSz.mlhZsJH9V5b89YS9qeZS8hmNu', // real: er43e3
      roleId: 2,
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
