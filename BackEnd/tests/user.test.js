const { request, expect } = require("./config");
const ModelUser= require('../models').User;

let adminToken="";
let regularToken="";
let userIdRegular="";
let userIdAdmin="";
let idNotFound='0';

describe('TEST USERS', function(){ 
    before(async function () {
      const responseAdmin = await request
        .post("/api/auth/login")
        .send({
          email: "TestUserAdmin@test.com",
          password: "1234test"
        });
      adminToken = responseAdmin.body.token;
  
      const responseRegular = await request
        .post("/api/auth/login")
        .send({
          email: "TestsUserRegular@test.com",
          password: "1234test"
        });
      regularToken = responseRegular.body.token;
    });
    
    after(async function () {
      const respUsers=await ModelUser.destroy({where:{id:userIdRegular},force:true})
      const respU=await ModelUser.destroy({where:{id:userIdAdmin},force:true})
      console.log('AfterRespUser',respUsers, respU)
    });

    //POST
    // CREATE USER REGULAR 
    it('create a user, sucessful', async function () {
      const responseNewUser = await request
      .post("/api/auth/register")
      .send({
        firstName: "regularUserTests",
        lastName: "regulatUserTest",
        email: "TestsUserRegular@test.com",
        password: "1234test",
        roleId: 2,
        photo: "photoUserTests.jpg"
        });
      expect(responseNewUser.status).to.eql(200)
      expect(responseNewUser.body).to.be.an('object')
      userIdRegular= responseNewUser.body.newUser.id;
    });

    // CREATE USER ADMIN 
    it('create a user, sucessful', async function () {
      const responseNew = await request
      .post("/api/auth/register")
      .send({
        firstName: "adminUserTests",
        lastName: "adminUserTest",
        email: "TestsUserAdmin@test.com",
        password: "1234test",
        roleId: 1,
        photo: "photoUserTests.jpg"
        });
      expect(responseNew.status).to.eql(200)
      expect(responseNew.body).to.be.an('object')
      userIdAdmin= responseNew.body.newUser.id;
    });
  

  //GET
  describe("GET/api/users", function () {
    it("returns all user should fail without credentials", async function () {
      const response = await request
      .get("/api/users")
      expect(response.status).to.eql(400)
      expect(response.body.error);
    });

    it("returns all user should succeed with admin credentials and return users", async function () {
      const response = await request
      .get("/api/users")
      .set("Authorization", `Bearer ${adminToken}`)
      expect(response.status).to.eql(200)
    });
  });

  //GET BY ID
  describe("GET /api/users/:id", function () {
 
    it("returns user id should successed regular credentials", async function () {
      const response = await request
        .get(`/api/users/${userIdRegular}`)
        .set("Authorization", `Bearer ${regularToken}`);
      expect(response).to.be.an('object')
      expect(response.status).to.eql(200);
    });
  }); 

  //PUT
  describe("PUT /api/users/:id", function () {
  
    it("update a user with diferent id", async function () {
      const response = await request
        .put(`/api/users/${idNotFound}`)
        .send({
        firstName: "anda",
        lastName: "anda",
        })
        .set("Authorization", `Bearer ${regularToken}`)
        expect(response.status).to.eql(404)
    });
    
    it('fails if no token exists', async function(){
        const response= await request
        .put(`/api/users/${userIdRegular}`)
        .send({
        firstName: "anda",
        lastName: "anda",
        })
        expect(response.status).to.eql(400)
    })
  });

  //DELETE
  describe("DELETE /api/user/:id", function () {
    
    it("with not credentials you can't delete a user", async function () {
      const response = await request
        .delete(`/api/users/${userIdRegular}`)
      expect(response.status).to.eql(400)
      expect(response.body).to.have.nested.property('msg').to.be.equal("The request does not have a token");
    });
      
    it("fails if the one making the request is not an administrator", async function () {
      const response = await request
        .delete(`/api/users/${userIdRegular}`)
        .set("Authorization", `Bearer ${regularToken}`);
      expect(response.status).to.eql(200)
      expect(response.body).to.have.nested.property('name').to.be.equal("JsonWebTokenError");
    });  

    it("fails if no token exists", async function () {
      const response = await request
        .delete(`/api/users/${userIdRegular}`)
      expect(response.status).to.eql(400)
      expect(response.text).to.eql('{"msg":"The request does not have a token"}');
    });

    it("Successfully delete a user if the requester is an admin", async function () {
      const response = await request
        .delete(`/api/users/${userIdRegular}`)
        .set("Authorization", `Bearer ${adminToken}`);
      expect(response.status).to.eql(200);
    });
  });
});