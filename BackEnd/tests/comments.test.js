const { request, expect } = require("./config");
const ModelComments= require("../models").Comment;


let adminToken, regularToken = null;
let idNotFound=0;
let commentId="";
const baseRequest = {"user_id":5, "body": "Comment 20 characters", "news_id":1 }

describe("ROUTE /api/comments", function () {
  this.timeout(30000)
  before( async () =>{
  
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
    const respComments=await ModelComments.destroy({where:{id:commentId},force:true})
    console.log('AfterRespComments',respComments)
  });

  //POST
  describe("POST /api/comments", function () { 
    it('return insert a Comment should fail without credentials', async function () {
      const response = await request
      .post('/api/comments')    
      .send(baseRequest) 
      expect(response.status).to.eql(400);
    });

    it('return insert a Comment should fail with regular credentials', async function () {
      const response = await request
      .post('/api/comments')
      .set("Authorization", `Bearer ${regularToken}`)
      .send(baseRequest)  
      expect(response.status).to.eql(401);
    });

    it('return insert a Comment should fail with admin credentials and the field user_id must be a number', async function () {
      const response = await request    
      .post('/api/comments')
      .set("Authorization", `Bearer ${adminToken}`)
      .send({user_id: "a", body: "comment 20 characters", news_id: 1})        
      expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('must be a number');
    });

    it('return insert a Comment should fail with admin credentials and the field news_id must be a number', async function () {
      const response = await request    
      .post('/api/comments')
      .set("Authorization", `Bearer ${adminToken}`)
      .send({user_id: 1, body: "Comment 20 characters" , news_id: "a"})
      expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('must be a number');
    });

    it('return insert a Comment should fail with admin credentials and the field user_id does not exist', async function () {
      const response = await request    
      .post('/api/comments')
      .set("Authorization", `Bearer ${adminToken}`)
      .send({user_id: 0, body: "Comment 20 characters" , news_id: 1})
      expect(response.body.error);
    });

    it('return insert a Comment should fail with admin credentials and the field news_id does not exist', async function () {
      const response = await request    
      .post('/api/comments')
      .set("Authorization", `Bearer ${adminToken}`)
      .send({user_id:1, body: "Comment 20 characters" , news_id: 0})        
      expect(response.body.error);
    });

    it('return insert a Comment should fail with admin credentials and the field user_id does not exist', async function () {
      const response = await request    
      .post('/api/comments')
      .set("Authorization", `Bearer ${adminToken}`)
      .send({user_id:0, body: "Comment 20 characters" , news_id: 1})
      expect(response.body.error);
    });

    it('return insert a Comment should fail with admin credentials and the field news_id cannot be empty', async function () {
      const response = await request    
      .post('/api/comments')
      .set("Authorization", `Bearer ${adminToken}`)
      .send({user_id: 1, body: "Comment 20 characters" , news_id: ""})        
      expect(response.body.error);
    });

    it('return insert a Comment should fail with admin credentials and the field user_id cannot be empty', async function () {
      const response = await request    
      .post('/api/comments')
      .set("Authorization", `Bearer ${adminToken}`)
      .send({user_id: "", body: "Comment 20 characters" , news_id: 1})        
      expect(response.body.error);
    });

    it('return insert a Comment should fail with admin credentials and the field body cannot be empty', async function () {
      const response = await request    
      .post('/api/comments')
      .set("Authorization", `Bearer ${adminToken}`)
      .send({user_id: 2, body: "" , news_id: 1})        
      expect(response.body.error);
    });

    it('return insert a Comment should succeed with admin credentials', async function () {
      const response = await request
      .post('/api/comments')
      .set("Authorization", `Bearer ${adminToken}`)
      .send(baseRequest)
      expect(response.status).to.eql(201);
      commentId= response.body.id
    });
  });

  //GET
  describe("GET /api/comments", function () {  
    it("returns all Comment should succeed with regular credentials", async function () {
      const response = await request
      .get(`/api/comments`)
      .set("Authorization", `Bearer ${regularToken}`);
      expect(response.status).to.eql(200);
    });

    it("returns all Comment should succeed with admin credentials", async function () {
      const response = await request
      .get(`/api/comments`)
      .set("Authorization", `Bearer ${adminToken}`);
      expect(response.status).to.eql(200);
    });
  });

  //GET BY ID
  describe("GET /api/comments/:id", function () {

    it('return get a Comment should fail with admin credentials and id not found', async function () {
      const response = await request
      .get(`/api/comments/${idNotFound}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send(baseRequest);        
      expect(response.status).to.eql(404);
    });

    it('returns all Comment should succeed with regular credentials', async function () {
      const response = await request
      .get(`/api/comments/${commentId}`)
      .set("Authorization", `Bearer ${regularToken}`)
      expect(response.status).to.eql(200);
    });

    it("returns all Comment should succeed with admin credentials", async function () {
      const response = await request
      .get(`/api/comments/${commentId}`)
      .set("Authorization", `Bearer ${adminToken}`);
      expect(response.status).to.eql(200);
    });
  });

  //UPDATE
  describe("UPDATE /api/comments/:id", function () {
    
    it('return update a Comment should succeed with admin credentials', async function () {
      const response = await request
      .put(`/api/comments/${commentId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({user_id: 5, body: "comment 20 characters" , news_id: 1})  
      expect(response.status).to.eql(201);
    });  

    it('return update a Comment should fail without credentials', async function () {
      const response = await request
      .put(`/api/comments/${commentId}`)    
      .send({ body: "comment 200 characters"});    
      expect(response.status).to.eql(400);
    });

    it('return update a Comment should fail with admin credentials and id not found', async function () {
      const response = await request
      .put(`/api/comments/${idNotFound}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send(baseRequest);        
      expect(response.status).to.eql(404);
    });
    
    it('return update a Comment should fail with admin credentials and the field user_id is empty', async function () {
      const response = await request    
      .put(`/api/comments/${commentId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({user_id: "", body: "comment 20 characters", news_id: 1})         
      expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('The field cannot be empty');
    });

    it('return update a Comment should fail with admin credentials and the field body has less than 20 characters', async function () {  
      const response = await request    
      .put(`/api/comments/${commentId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({user_id: 2, body: "comment", news_id: 1})
      expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('The minimum length must be 20 characters');
    });

    it('return update a comments should fail with admin credentials and the field body is empty', async function () {
      const response = await request    
      .put(`/api/comments/${commentId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({user_id: 2, body: "", news_id: 1})
      expect(response.body.error).to.be.an('array');
    });

    it('return update a Comment should fail with admin credentials and the field user_id is empty', async function () {
      const response = await request    
      .put(`/api/comments/${commentId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({user_id: "", body: "comment" , news_id: 1})         
      expect(response.body.error).to.be.an('array');
    });
  });

  //DELETE
  describe("DELETE /api/comments/:id", function () {
    
    it('return delete a Comment should fail without credentials', async function () {
      const response = await request
      .del(`/api/comments/${commentId}`)     
      expect(response.status).to.eql(400);
    });

    it('return delete a Comment should fail with admin credentials and id not found', async function () {
      const response = await request
      .del(`/api/comments/${idNotFound}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send(baseRequest);        
      expect(response.status).to.eql(404);
    });

    it('return delete a Comment should succeed with admin credentials', async function () {
      const response = await request
      .del(`/api/comments/${commentId}`)
      .set("Authorization", `Bearer ${adminToken}`)  
      expect(response.status).to.eql(200);
    });

    it('return delete a Comment should fail with admin credentials and id not found', async function () {
      const response = await request
      .del(`/api/comments/${idNotFound}`)
      .set("Authorization", `Bearer ${adminToken}`)  
      expect(response.status).to.eql(404);
    });
  });
});