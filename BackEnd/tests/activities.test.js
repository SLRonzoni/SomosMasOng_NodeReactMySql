const { request, expect } = require("./config");
const ModelActivities= require('../models').Activity;

let adminToken, regularToken, name, date = null;
let activityId="";
let idNotFound=0;

const baseRequest = {name: "TestActivity", content: "activity content", image: "https://via.placeholder.com/600/92c952", date:'2023-01-26T21:08:24Z'}

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
  const respActivities=await ModelActivities.destroy({where:{id:activityId},force:true})
  console.log('AfterRespActivities',respActivities)
});

//POST
describe("POST /api/activities", function () {  

  it('return insert a activity should succeed with admin credentials', async function () {
    const response = await request
    .post('/api/activities')
    .set("Authorization", `Bearer ${adminToken}`)
    .send(baseRequest)   
    expect(response.status).to.eql(201);
    expect(response.body).to.have.property('name').to.be.equal("TestActivity");
    name=response.body.name
    date=response.body.updatedAt
    activityId = response.body.id
  });

  it('return insert a activity should fail without credentials', async function () {
    const response = await request
    .post('/api/activities')    
    .send(baseRequest)   
    expect(response.status).to.eql(400);
  });

  it('return insert a activity should fail with regular credentials', async function () {
    const response = await request
    .post('/api/activities')
    .set("Authorization", `Bearer ${regularToken}`)
    .send(baseRequest)   
    expect(response.status).to.eql(401);
  });

  it('return insert a activity should fail with admin credentials and the field name is empty', async function () {
    const response = await request    
    .post('/api/activities')
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name: "", content: "act content", image: "https://via.placeholder.com/600/92c952"})           
    expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('should not be empty');
  });

  it('return insert a activity should fail with admin credentials and the field name has less than 6 characters', async function () {    
    const response = await request    
    .post('/api/activities')
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name: "Act", content: "act content", image: "https://via.placeholder.com/600/92c952"})    
    expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('should has 6 characters');
  });

  // it('return insert a activity should fail with admin credentials and the field image is empty', async function () {    
  //   const response = await request    
  //   .post('/api/activities')
  //   .set("Authorization", `Bearer ${adminToken}`)
  //   .send({name: "TestActivity", content: "act content", image: ""})    
  //   expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('should not be empty');
  // });

  it('return insert a activity should fail with admin credentials and the field content is empty', async function () {    
    const response = await request    
    .post('/api/activities')
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name: "TestActivity", content: "", image: "https://via.placeholder.com/600/92c952"})           
    expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('should not be empty');
  });
});

//GET ALL
describe("GET /api/activities", function () {
  
  it("returns all activity should fail without credentials", async function () {
    const response = await request
    .get("/api/activities");
    expect(response.status).to.eql(400);
  });

  it("returns all activity should succeed with regular credentials", async function () {
    const response = await request
    .get("/api/activities/public")
    .set("Authorization", `Bearer ${regularToken}`);
    expect(response.status).to.eql(200);
  });

  it("returns all activity should succeed with admin credentials", async function () {
    const response = await request
    .get("/api/activities")
    .set("Authorization", `Bearer ${adminToken}`);
    expect(response.status).to.eql(200);
  });

  it("returns all activity should succeed with admin credentials and return activities", async function () {
    const response = await request
    .get("/api/activities")
    .set("Authorization", `Bearer ${adminToken}`);
    expect(response.body).to.have.nested.property('data').to.have.lengthOf.greaterThan(0);
  });
});

//GET BY ID
describe("GET /api/activities/:id", function () {

  it("returns all activity should fail without credentials", async function () {
    const response = await request
    .get("/api/activities");
    expect(response.status).to.eql(400);
  });

  it('returns all activity should succeed with regular credentials', async function () {
    const response = await request
    .get(`/api/activities/public/${activityId}`)
    .set("Authorization", `Bearer ${regularToken}`)
    expect(response.status).to.eql(200);
  });

  it("returns all activity should succeed with admin credentials", async function () {
    const response = await request
    .get("/api/activities")
    .set("Authorization", `Bearer ${adminToken}`);
    expect(response.status).to.eql(200);
  });
});

describe("GET /api/activities/:id", function () {

  it("returns all activity should fail without credentials", async function () {
    const response = await request
    .get(`/api/activities/${idNotFound}`)  
    expect(response.status).to.eql(400);
  });

  it('return get a activity should fail with admin credentials and id not found', async function () {
    const response = await request
    .get(`/api/activities/public/${idNotFound}`)  
    .set("Authorization", `Bearer ${regularToken}`)    
    expect(response.status).to.eql(404);
  });

  it('returns one activity should succeed with regular credentials', async function () {
    const response = await request
    .get(`/api/activities/public/${activityId}`)
    .set("Authorization", `Bearer ${regularToken}`)
    expect(response.status).to.eql(200);
  });

  it("returns one activity should succeed with admin credentials", async function () {
    const response = await request
    .get(`/api/activities/public/${activityId}`)
    .set("Authorization", `Bearer ${adminToken}`);
    expect(response.status).to.eql(200);
  });
});

//GET ALL
describe("GET /api/activities", function () {

  it("returns all activity should fail without credentials", async function () {
    const response = await request
    .get("/api/activities");
    expect(response.status).to.eql(400);
  });

  it('return all activities should succeed with admin credentials and id not found', async function () {
    const response = await request
    .get('/api/activities/public')
    .set("Authorization", `Bearer ${adminToken}`)        
    expect(response.status).to.eql(200);
  });

  it('returns all activities should succeed with regular credentials', async function () {
    const response = await request
    .get(`/api/activities/public`)
    .set("Authorization", `Bearer ${regularToken}`)
    expect(response.status).to.eql(200);
  });

  it("returns all activity should succeed with admin credentials", async function () {
    const response = await request
    .get("/api/activities/public")
    .set("Authorization", `Bearer ${adminToken}`);
    expect(response.status).to.eql(200);
  });
});

//GET BY NAME
describe("GET /api/activities/public/byName/:name", function () {

  it('return get a activity should succeed with admin credentials', async function () {
    const response = await request
    .get(`/api/activities/public/byName/${name}`)
    .set("Authorization", `Bearer ${adminToken}`)       
    expect(response.status).to.eql(200);
  });

  it('returns all activity should succeed with regular credentials', async function () {
    const response = await request
    .get(`/api/activities/public/byName/${name}`)
    .set("Authorization", `Bearer ${regularToken}`)
    expect(response.status).to.eql(200);
  });

  it("returns all activity should succeed with admin credentials", async function () {
    const response = await request
    .get(`/api/activities/public/byName/${name}`)
    .set("Authorization", `Bearer ${adminToken}`);
    expect(response.status).to.eql(200);
  });
});

//GET BY DATE
describe("GET /api/activities/public/byDate/:date", function () {

  it('return get a activity should fail with admin credentials and updatedAt not found', async function () {
    const response = await request
    .get(`/api/activities/public/byDate/${idNotFound}`)
    .set("Authorization", `Bearer ${adminToken}`)       
    expect(response.status).to.eql(200)
    expect(response.body).to.be.an('array');
  });

  it('returns all activity should succeed with regular credentials', async function () {
    const response = await request
    .get(`/api/activities/public/byDate/${date}`)
    .set("Authorization", `Bearer ${regularToken}`)
    expect(response.status).to.eql(200);
  });

  it("returns all activity should succeed with admin credentials", async function () {
    const response = await request
    .get(`/api/activities/public/byDate/${date}`)
    .set("Authorization", `Bearer ${adminToken}`);
    expect(response.status).to.eql(200);
  });
});

//PUT
describe("UPDATE /api/activities/:id", function () {
  
  it('return update a activity should fail without credentials', async function () {
    const response = await request
    .put(`/api/activities/${activityId}`)    
    .send({content: "content activity"});    
    expect(response.status).to.eql(400);
  });

  it('return update a activity should fail with admin credentials and id not found', async function () {
    const response = await request
    .put(`/api/activities/${idNotFound}`)  
    .set("Authorization", `Bearer ${adminToken}`)
    .send(baseRequest);        
    expect(response.status).to.eql(404);
  });
  
  it('return update a activity should fail with admin credentials and the field name has less than 6 characters', async function () {    
    const response = await request    
    .put(`/api/activities/${activityId}`)  
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name: "Act", image: "https://via.placeholder.com/600/92c952", content: "act content"})   
    expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('should has 6 characters');
  });

  // it('return update a activities should fail with admin credentials and the field image is empty', async function () {    
  //   const response = await request    
  //   .put(`/api/activities/${activityId}`)
  //   .set("Authorization", `Bearer ${adminToken}`)
  //   .send({name: "TestActivity", image: "", content: "act content"})   
  //   expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('should not be empty');
  // });

  it('return update a activity should fail with admin credentials and the field content is empty', async function () {    
    const response = await request    
    .put(`/api/activities/${activityId}`)
    .set("Authorization", `Bearer ${adminToken}`)
    .send({name: "TestActivity", image: "https://via.placeholder.com/600/92c952", content: ""})            
    expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('should not be empty');
  });
  
  it('return update a activity should succeed with admin credentials', async function () {
    const response = await request
    .put(`/api/activities/${activityId}`)
    .set("Authorization", `Bearer ${adminToken}`)
    .send(baseRequest);        
    expect(response.status).to.eql(201);
  });  
});

//DELETE
describe("DELETE /api/activities", function () {
  
  it('return delete a activity should fail without credentials', async function () {
    const response = await request
    .del(`/api/activities/${activityId}`)            
    expect(response.status).to.eql(400);
  });

  it('return delete a activity should fail with admin credentials and id not found', async function () {
    const response = await request
    .del(`/api/activities/${idNotFound}`)
    .set("Authorization", `Bearer ${adminToken}`)
    .send(baseRequest);        
    expect(response.status).to.eql(404);
  });

  it('return delete a activity should fail with admin credentials and id not found', async function () {
    const response = await request
    .del(`/api/activities/${idNotFound}`)
    .set("Authorization", `Bearer ${adminToken}`)        
    expect(response.status).to.eql(404);
  });

  it('return delete a activity should succeed with admin credentials', async function () {
    const response = await request
    .del(`/api/activities/${activityId}`)
    .set("Authorization", `Bearer ${adminToken}`)        
    expect(response.status).to.eql(200);
  });

});