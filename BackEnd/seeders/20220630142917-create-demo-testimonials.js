'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Testimonials', [
        {
        name:"Testimonial demo UNO",
        content: "demo accusamus beatae ad facilis cum similique qui sunt",
        image: "https://via.placeholder.com/600/92c952",
        userId: 6,
        createdAt: new Date,
        updatedAt: new Date
        },
        {
        name:"Testimonial demo DOS",
        content: "demo reprehenderit est deserunt velit ipsam",
        image: "https://via.placeholder.com/600/771796",
        userId: 16,
        createdAt: new Date,
        updatedAt: new Date
        },
        {
        name:"Testimonial demo TRES",
        content: "demo officia por iure quia iusto qui ipsa ut modi",
        image: "https://via.placeholder.com/600/24f355",
        userId: 8,
        createdAt: new Date,
        updatedAt: new Date
        },
        {
        name:"Testimonial demo CUATRO",
        content: "demo culpa odio esse rerum omnis laboriosam voluptate repudiandae",
        image: "https://via.placeholder.com/600/d32776",
        userId: 4,
        createdAt: new Date,
        updatedAt: new Date
        },
        {
        name:"Testimonial demo CINCO",
        content: "demo natus nisi omnis corporis facere molestiae rerum in",
        image: "https://via.placeholder.com/600/f66b97",
        userId: 7,
        createdAt: new Date,
        updatedAt: new Date
        },
        {
        name:"Testimonial demo SEIS",
        content: "demo accusamus ea aliquid et amet sequi nemo",
        image: "https://via.placeholder.com/600/56a8c2",
        userId: 9,
        createdAt: new Date,
        updatedAt: new Date
        },
        {
        name:"Testimonial demo SIETE",
        content: "demo officia delectus consequatur vero aut veniam explicabo molestias",
        image: "https://via.placeholder.com/600/b0f7cc",
        userId: 11,
        createdAt: new Date,
        updatedAt: new Date
        },
        {
        name:"Testimonial demo OCHO",
        content: "demo aut por officiis laborum odit ea laudantium corporis",
        image: "https://via.placeholder.com/600/54176f",
        userId: 13,
        createdAt: new Date,
        updatedAt: new Date
        },
        {
        name:"Testimonial demo NUEVE",
        content: "demo qui eius qui autem sed",
        image: "https://via.placeholder.com/600/51aa97",
        userId: 12,
        createdAt: new Date,
        updatedAt: new Date
        },
        {
        name:"Testimonial demo DIEZ",
        content: "demo beatae et provident et ut vel",
        image: "https://via.placeholder.com/600/810b14",
        userId: 14,
        createdAt: new Date,
        updatedAt: new Date
        },
        {
        name:"Testimonial demo ONCE",
        content: "demo nihil at amet non hic quia qui",
        image: "https://via.placeholder.com/600/1ee8a4",
        userId: 6,
        createdAt: new Date,
        updatedAt: new Date
        },
        {
        name:"Testimonial demo DOCE",
        content: "demo mollitia soluta ut rerum eos aliquam consequatur perspiciatis maiores",
        image: "https://via.placeholder.com/600/66b7d2",
        userId: 10,
        createdAt: new Date,
        updatedAt: new Date
        },
        {
        name:"Testimonial demo TRECE",
        content: "demo repudiandae iusto deleniti rerum",
        image: "https://via.placeholder.com/600/197d29",
        userId: 5,
        createdAt: new Date,
        updatedAt: new Date
        },
        {
        name:"Testimonial demo CATORCE",
        content: "demo est necessitatibus architecto ut laborum",
        image: "https://via.placeholder.com/600/61a65",
        userId: 15,
        createdAt: new Date,
        updatedAt: new Date        },
        {
        name:"Testimonial demo QUINCE",
        content: "demo harum dicta similique quis dolore earum ex qui",
        image: "https://via.placeholder.com/600/f9cee5",
        userId: 13,
        createdAt: new Date,
        updatedAt: new Date
        }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Testimonials', null, {});
  }
};
