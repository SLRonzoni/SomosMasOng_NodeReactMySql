const { request, expect } = require("./config");
const ModelContact= require('../models').Contacts;

let adminToken = '';
let regularToken = '';
let idTest='';
let newContact={ name: "TestContact", 
                 phone: "1125343222", 
                 email: "TestContact@mail.com.ar", 
                 message: "New message from Diego Molinas" }

describe("ROUTE /api/contacts", function () {
    this.timeout(10000)

    before(async function () {
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
        const respContact=await ModelContact.destroy({where:{id:idTest},force:true})
        console.log('AfterRespContact',respContact)
    });

    //POST
    it('return insert a contact should succeed', async function () {
        const response = await request
            .post('/api/contacts')
            .send(newContact)
        expect(response.status).to.eql(201);
        idTest = response.body.contact.id
    });

    it('return insert a contact should fail and the field name is empty', async function () {
        const response = await request
            .post('/api/contacts')
            .send({ name: "", phone: "1125343209", email: "TestContact@mail.com.ar", message: "message from Diego Molinas" })
        expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('Please enter your name!');
    });

    it('return insert a contact should fail and the field email is empty', async function () {
        const response = await request
            .post('/api/contacts')
            .send({ name: "TestContact", phone: "1125343209", email: "", message: "message from Diego Molinas" })
        expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('Please enter your email');
    });

    it('return insert a contact should fail and the field email is unique', async function () {
        const response = await request
            .post('/api/contacts')
            .send({ name: "TestContact", phone: "1125343209", email: "TestContact@mail.com.ar", message: "message from Diego Molinas" })
        expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('Email already registered');
    });

    //GET
    it('return get all contacts should fail without credentials', async function () {
        const response = await request
            .get('/api/contacts')
        expect(response.status).to.eql(400);
    });

    it('return get all contacts should fail with regular credentials', async function () {
        const response = await request
            .get('/api/contacts')
            .set("Authorization", `Bearer ${regularToken}`)
        expect(response.status).to.eql(401);
    });

    it('return get all contacts should should succeed with admin credentials', async function () {
        const response = await request
            .get('/api/contacts')
            .set("Authorization", `Bearer ${adminToken}`)
        expect(response.status).to.eql(200);
    });

    it('return get contact by id should fail without credentials', async function () {
        const response = await request
            .get(`/api/contacts/${idTest}`)
        expect(response.status).to.eql(400);
    });

    it('return get contact by id should fail with regular credentials', async function () {
        const response = await request
            .get(`/api/contacts/${idTest}`)
            .set("Authorization", `Bearer ${regularToken}`)
        expect(response.status).to.eql(401);
    });

    it('return get contact by id should fail with admin credentials and id not found', async function () {
        const response = await request
            .get('/api/contacts/a')
            .set("Authorization", `Bearer ${adminToken}`)
        expect(response.status).to.eql(404);
    });

    it('return get contact by id should succeed with admin credentials', async function () {
        const response = await request
            .get(`/api/contacts/${idTest}`)
            .set("Authorization", `Bearer ${adminToken}`)
        expect(response.status).to.eql(200);
    });

    //PUT
    it('return update contact by id should fail without credentials', async function () {
        const response = await request
            .put(`/api/contacts/${idTest}`)
            .send({ name: "Diego Molinas", phone: "1125343222", email: "TestContact@mail.com.ar", message: "New message from Diego Molinas" });
        expect(response.status).to.eql(400);
    });

    it('return update contact by id should fail with regular credentials', async function () {
        const response = await request
            .put(`/api/contacts/${idTest}`)
            .set("Authorization", `Bearer ${regularToken}`)
            .send({ name: "Diego Molinas", phone: "1125343222", email: "TestContact@mail.com.ar", message: "New message from Diego Molinas" });
        expect(response.status).to.eql(401);
    });

    it('return update contact by id should fail with admin credentials and id not found', async function () {
        const response = await request
            .put('/api/contacts/a')
            .set("Authorization", `Bearer ${adminToken}`)
            .send({ name: "Diego Molinas", phone: "1125343222", email: "TestContact@mail.com.ar", message: "New message from Diego Molinas" });
        expect(response.status).to.eql(404);
    });

    it('return update contact by id should succeed with admin credentials', async function () {
        const response = await request
            .put(`/api/contacts/${idTest}`)
            .set("Authorization", `Bearer ${adminToken}`)
            .send({ name: "Diego Molinas", phone: "1125343221", email: "TestContact@mail.com.ar", message: "New message from Diego Molinas" });
        expect(response.status).to.eql(201);
    });

    //DELETE
    it('return delete contact by id should fail without credentials', async function () {
        const response = await request
            .del(`/api/contacts/${idTest}`)

        expect(response.status).to.eql(400);
    });

    it('return delete contact by id should fail with regular credentials', async function () {
        const response = await request
            .del(`/api/contacts/${idTest}`)
            .set("Authorization", `Bearer ${regularToken}`)

        expect(response.status).to.eql(401);
    });

    it('return delete contact by id should fail with admin credentials and id not found', async function () {
        const response = await request
            .del('/api/contacts/a')
            .set("Authorization", `Bearer ${adminToken}`)

        expect(response.status).to.eql(404);
    });

    it('return delete contact by id should succeed with admin credentials', async function () {
        const response = await request
            .del(`/api/contacts/${idTest}`)
            .set("Authorization", `Bearer ${adminToken}`)

        expect(response.status).to.eql(200);
    });
});


