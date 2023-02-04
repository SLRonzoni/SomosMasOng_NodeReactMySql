const { response } = require("../routes/auth.routes");
const { request, expect } = require("./config");
const ModelUser= require('../models').User;

let registerId="";

after(async function () {
  const respUsers=await ModelUser.destroy({where:{id:registerId},force:true})
  console.log('AfterRespRegister',respUsers)
});

//LOGIN
describe("POST api/auth/login", function () {
  it("successful login", async function () {
    const response = await request.post("/api/auth/login")
    .send({
      email: "admin@gmail.com",
      password: "1234test"
    });
    expect(response.status).to.equal(200);
  });

  it("User does not exist", async function () {
    const response = await request.post("/api/auth/login")
    .send({
      email: "notExist@test.com",
      password: "1234test"
    });
    expect(response.body)
      .to.have.nested.property("msg")
      .to.be.equal("No autorizado");
    expect(response.status).to.eql(401);
  });

  it("Incorrect password", async function () {
    const response = await request.post("/api/auth/login")
    .send({
      email: "admin@gmail.com",
      password: "1234",
    });
    expect(response.status).to.equal(401);
    expect(response.body)
      .to.have.nested.property("msg")
      .to.be.equal("No autorizado");
  });
});

//REGISTER
describe("POST api/auth/register", function () {
 it("successful register", async function () {
    const response = await request.post("/api/auth/register")
    .send({
      firstName: "TestRegister",
      lastName: "TestAuth",
      email: "TestRegister@test.com",
      password: "1234test",
      roleId: 1,
      photo: "photoTestRegister.jpg",
    });
    expect(response.status).to.eql(200);
    registerId=response.body.newUser.id
  });

  it("the user is already registered", async function () {
    const response = await request.post("/api/auth/register")
    .send({
      firstName: "nameTests",
      lastName: "lastNameTest",
       email: "TestRegister@test.com",
      password: "1234test",
      roleId: 1,
      photo: "photoTests.jpg",
    });
    expect(response.body.errors[0].msg).to.be.eq('Email already registered')
    expect(response.status).to.eql(422)
  });

  it("Invalid email", async function () {
    const response = await request.post("/api/auth/register")
    .send({
      firstName: "nameTests",
      lastName: "lastNameTest",
      email: "emailTests",
      password: "1234test",
      roleId: 1,
      photo: "photoTests.jpg",
    });
    expect(response.status).to.eq(422)
  });
});

//USER ID
describe('GET api/auth/me', function(){
  let userToken;
  let invalidToken= 'asfasfasfasfdfdfaF'
  
  beforeEach(async function(){
   const response = await request
    .post("/api/auth/login")
    .send({
      'email': 'regular@gmail.com',
      'password': '1234test',
    });
    userToken= response.body.token;
  });

  it('Returns the user id correctly', async function(){
    const rta =  await request
    .get('/api/auth/me')
    .set("Authorization", `Bearer ${userToken}`);
    expect(rta.status).to.eql(200)
  });

  it('does not return a user when the token is invalid', async function(){
    const rta =  await request
    .get('/api/auth/me')
    .set("Authorization", `Bearer ${invalidToken}`);
    expect(rta.status).to.eql(500)
    expect(rta.body.msg).to.eq('Something went wrong call the admin')
  });
})