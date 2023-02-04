'use strict';
const bcrypt = require("bcrypt");
const Op= require ('Sequelize');
const password = bcrypt.hashSync('1234test', parseInt(process.env.SALT));
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      firstName: 'User',
      lastName: 'Test',
      email: 'test@test.com',
      password,
      roleId: 1,
      photo: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      firstName: 'User',
      lastName: 'Admin',
      email: 'admin@gmail.com',
      password,
      roleId: 1,
      photo: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      firstName: 'User',
      lastName: 'Regular',
      email: 'regular@gmail.com',
      password,
      roleId: 2,
      photo: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      firstName: 'Test MercadoPago',
      lastName: 'nickName TEST_USER_1296093997',
      email: 'test_user_1296093997@testuser.com',
      password,
      roleId: 2,
      photo: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    },
  ], {});
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
