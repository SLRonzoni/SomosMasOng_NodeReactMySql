const { request, expect } = require("./config");
const Testimonial= require('../models').Testimonial;
const fs = require('fs');
const path = require('path');

let adminToken = '';
let regularToken = '';
let testimonialId="";
let idNotFound

describe("ROUTE /api/testimonials", function () {
  this.timeout(30000)

  before( async function () {
    const responseAdmin = await request
    .post("/api/auth/login")
    .send({
      'email': 'admin@gmail.com',
      'password': '1234test',
    });
    adminToken = responseAdmin.body.token;

    const responseRegular = await request
    .post("/api/auth/login")
    .send({
      'email': 'regular@gmail.com',
      'password': '1234test',
    });
    regularToken = responseRegular.body.token;
  });

  after(async function () {
    const result = await Testimonial.destroy({where:{id:testimonialId},force:true})
    console.log('AfterRespTestimonial',result)
  }); 

  //POST
  it('return insert a testimonial should succeed with regular credentials', async function () {
    const response = await request
      .post('/api/testimonials')
      .set("Authorization", `Bearer ${regularToken}`)
      .set('Content-Type', 'multipart/form-data')
      .field('name', 'TestTestimonial')
      .attach('image', fs.readFileSync(path.join(__dirname, './img/dmlsbGFmaW9yaXRv.png')), 'dmlsbGFmaW9yaXRv.png')
      .field('content', 'test content')
      .field('userId',5)
    expect(response.status).to.eql(201);
    testimonialId = response.body.id   
  });

  it('return insert a testimonial should fail without credentials', async function () {
    const response = await request
      .post('/api/testimonials')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .field('name', 'TestTestimonial UNO')
      .attach('image', fs.readFileSync(path.join(__dirname, './img/dmlsbGFmaW9yaXRv.png')), 'dmlsbGFmaW9yaXRv.png')
      .field('content', 'test content')
      .field('userId',5) 
    expect(response.status).to.eql(400);
  });

  it('return insert a testimonial should fail with regular credentials and the field image is empty', async function () {
    const response = await request
      .post('/api/testimonials')
      .set("Authorization", `Bearer ${regularToken}`)      
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .field('name', 'TestTestimonial UNO')      
      .field('content', 'test content')
      .field('userId',5) 
    expect(response.body.msg).to.equal('no files were uploaded')
    expect(response.status).to.eql(400);
  });

  
   /*GET /api/testimonials/:id */
   it('should get a testimonial by id fail with admin credentials if the id does not exist ', async function () {
    const response = await request
    .get(`/api/testimonials/${idNotFound}`)        
    .set("Authorization", `Bearer ${adminToken}`)
    expect(response.status).to.eql(404);
  });

  /* GET /api/testimonials */  
  it('should get all testimonials fail succeed regular credentials', async function () {
    const response = await request
    .get('/api/testimonials/public')
    .set("Authorization", `Bearer ${regularToken}`)
    expect(response.status).to.eql(200);
  });

  it('should get all testimonials succeed with admin credentials', async function () {
    const response = await request
    .get('/api/testimonials')
    .set("Authorization", `Bearer ${adminToken}`)
    expect(response.status).to.eql(200);
  });

  /* GET /api/testimonials/public/:id */
  it('should get a testimonial by id succeed with regular credentials', async function () {
    const response = await request
    .get(`/api/testimonials/public/${testimonialId}`)        
    .set("Authorization", `Bearer ${regularToken}`)
    expect(response.status).to.eql(200);
  });

  it('should get a testimonial by id succeed with admin credentials', async function () {
    const response = await request
    .get(`/api/testimonials/public/${testimonialId}`)        
    .set("Authorization", `Bearer ${adminToken}`)
    expect(response.status).to.eql(200);
  });

   /* UPDATE /api/testimonials/:id */ 
   it('return update a testimonial should fail with admin credentials and id not found', async function () { 
    const response = await request
      .put(`/api/testimonials/a`)        
      .set("Authorization", `Bearer ${adminToken}`)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .field('name', 'Testimonial 1')
      .attach('image', fs.readFileSync(path.join(__dirname, './img/dmlsbGFmaW9yaXRv.png')), 'dmlsbGFmaW9yaXRv.png')
      .field('content', 'test content')        
    expect(response.status).to.eql(404);
  }); 
  
  /* DELETE /api/testimonials/:id */
  it('return delete a testimonial should fail without credentials', async function () {
    const response = await request
    .del(`/api/testimonials/${testimonialId}`)        
    expect(response.status).to.eql(400);
  });

  it('return delete a testimonial should fail with admin credentials and id not found', async function () {
    const response = await request
    .del(`/api/testimonials/${idNotFound}`)   
    .set("Authorization", `Bearer ${adminToken}`)    
    expect(response.status).to.eql(404);
  });

  it('return delete a testimonial should succeed with admin credentials', async function () {
    const response = await request
    .del(`/api/testimonials/${testimonialId}`)   
    .set("Authorization", `Bearer ${adminToken}`)      
    expect(response.status).to.eql(200);
  });
});

