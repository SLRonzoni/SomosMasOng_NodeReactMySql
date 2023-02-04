'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Activities', [{
      name: 'Apoyo escolar para el nivel primario',
      content: 'El espacio de apoyo es el corazón del área educativa.',
      image: 'https://st4.depositphotos.com/12982378/22753/i/600/depositphotos_227539730-free-stock-photo-classmates-writing-notebooks-smiling-camera.jpg',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      name: 'Apoyo Escolar Nivel Secundario',
      content: 'Del mismo modo que en primaria, este taller es el corazón del área secundaria.',
      image: 'https://st4.depositphotos.com/5392356/30213/i/600/depositphotos_302130402-stock-photo-group-happy-young-people-studying.jpg',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      name: 'Tutorías',
      content: 'Es un programa destinado a jóvenes a partir del tercer año de secundaria, cuyo objetivo es garantizar su permanencia en la escuela y construir un proyecto de vida que da sentido al colegio.',
      image: 'https://static9.depositphotos.com/1037987/1188/i/600/depositphotos_11880360-stock-photo-teenage-student-in-classroom-with.jpg',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      name: 'Jardinería',
      content: 'Conocer la tierra y sus frutos. ',
      image: 'https://st3.depositphotos.com/12039320/15279/i/600/depositphotos_152795212-stock-photo-cropped-view-of-woman-transplanting.jpg',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      name: 'Deportes',
      content: 'Proyecto para fomentar el trabajo en equipo y la educación física. Football, Volley y Basquet entre otras',
      image: 'https://st3.depositphotos.com/3591429/18305/i/600/depositphotos_183057156-stock-photo-sports-tools-green-grass-concept.jpg',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      name: 'Música, dibujo, pintura y escultura',
      content: 'Aprender diversas actividades artísticas, que liberen la creatividad',
      image: 'https://st3.depositphotos.com/12985848/19440/i/600/depositphotos_194407026-stock-photo-cute-little-boy-holding-acoustic.jpg',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      name: 'Huerta y nutrición',
      content: 'Mejorar la calidad de la alimentacion aprendiendo a cultivar nuestros propios alimentos',
      image: 'https://st2.depositphotos.com/1194063/5332/i/600/depositphotos_53326813-stock-photo-farmer-planting-young-seedlings.jpg',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      name: 'Trabajo Social',
      content: 'Destinado a las familias y la resolución de conflictos',
      image: 'https://st4.depositphotos.com/10614052/29461/i/600/depositphotos_294613782-stock-photo-group-of-volunteers-putting-hands.jpg',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      name: 'Salud',
      content: 'Salita de primeros auxilios y consultorios externos para el barrio',
      image: 'https://st.depositphotos.com/2309453/4248/i/600/depositphotos_42486589-stock-photo-family-gp-consulting-with-a.jpg',
      createdAt: new Date,
      updatedAt: new Date
    }

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
