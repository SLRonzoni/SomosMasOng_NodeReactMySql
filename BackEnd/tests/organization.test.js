const { set } = require("../routes/news.routes");
const { request, expect } = require("./config");
const ModelOrganiz= require('../models').Organization;

    let adminToken = '';
    let regularToken = '';
    let invalidToken="ejkkjkjasda";
    let orgId="";
    let idNotFound=0;

    before(async function () {
        this.timeout(30000)
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
        const respOrganiz=await ModelOrganiz.destroy({where:{id:orgId},force:true})
        console.log('AfterRespOrganiz',respOrganiz)
    });

    //POST
    describe('POST /api/organization', function () {
        it('should respond with status 403 if name field is less than 6 chars long', async function () {
            const response = await request
            .post('/api/organization')
            .set("Authorization", `Bearer ${adminToken}`)
            .send({
                'name':'abc',
                'image':'some random url',
                'address':'fake address 123',
                'phone':'1234556789',
                'email':'fakeemail@mail.com',
                'welcomeText':'Lorem ipsum dolor sit amet consectetur, adipiscing elit scelerisque facilisis convallis, mattis risus euismod potenti.',
                'aboutUsText':'Lorem ipsum dolor sit amet consectetur, adipiscing elit scelerisque facilisis convallis, mattis risus euismod potenti.'
            })
            expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('Invalid value')
            expect(response.status).to.eql(403)
        });

        it('should respond with status 403 if address field is empty', async function () {
            const response = await request
            .post('/api/organization')
            .set("Authorization", `Bearer ${adminToken}`)
            .send({
                'name':'Fundacion Hermanos de Deus',
                'image':'some random url ',
                'phone':'1234556789',
                'email':'fakeemail@mail.com',
                'welcomeText':'Lorem ipsum dolor sit amet consectetur, adipiscing elit scelerisque facilisis convallis, mattis risus euismod potenti.',
                'aboutUsText':'Lorem ipsum dolor sit amet consectetur, adipiscing elit scelerisque facilisis convallis, mattis risus euismod potenti.'
            })
            expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('Invalid value')
            expect(response.status).to.eql(403)
        });

        it('should respond with status 403 if phone field is empty', async function () {
            const response = await request
            .post('/api/organization')
            .set("Authorization", `Bearer ${adminToken}`)
            .send({
                'name':'Fundacion Hermanos de Deus',
                'image':'some random url ',
                'address':'fake address 123',
                'email':'fakeemail@mail.com',
                'welcomeText':'Lorem ipsum dolor sit amet consectetur, adipiscing elit scelerisque facilisis convallis, mattis risus euismod potenti.',
                'aboutUsText':'Lorem ipsum dolor sit amet consectetur, adipiscing elit scelerisque facilisis convallis, mattis risus euismod potenti.'
            })
            expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('Invalid value')
            expect(response.status).to.eql(403)
        });

        it('should respond with status 403 if phone field contains letters', async function () {
            const response = await request
            .post('/api/organization')
            .set("Authorization", `Bearer ${adminToken}`)
            .send({
                'name':'Fundacion Hermanos de Deus',
                'image':'some random url ',
                'address':'fake address 123',
                'phone':'abcdes',
                'email':'fakeemail@mail.com',
                'welcomeText':'Lorem ipsum dolor sit amet consectetur, adipiscing elit scelerisque facilisis convallis, mattis risus euismod potenti.',
                'aboutUsText':'Lorem ipsum dolor sit amet consectetur, adipiscing elit scelerisque facilisis convallis, mattis risus euismod potenti.'
            })
            expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('Invalid value')
            expect(response.status).to.eql(403)
        });

        it('should respond with status 403 if email field is empty', async function () {
            const response = await request
            .post('/api/organization')
            .set("Authorization", `Bearer ${adminToken}`)
            .send({
                'name':'Fundacion Hermanos de Deus',
                'image':'some random url ',
                'address':'fake address 123',
                'phone':'abcdes',
                'welcomeText':'Lorem ipsum dolor sit amet consectetur, adipiscing elit scelerisque facilisis convallis, mattis risus euismod potenti.',
                'aboutUsText':'Lorem ipsum dolor sit amet consectetur, adipiscing elit scelerisque facilisis convallis, mattis risus euismod potenti.'
            })
            expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('Invalid value')
            expect(response.status).to.eql(403)
        });

        it('should respond with status 403 if email field is not an email', async function () {
            const response = await request
            .post('/api/organization')
            .set("Authorization", `Bearer ${adminToken}`)
            .send({
                'name':'Fundacion Hermanos de Deus',
                'image':'some random url ',
                'address':'fake address 123',
                'phone':'abcdes',
                'email':'this is not an email',
                'welcomeText':'Lorem ipsum dolor sit amet consectetur, adipiscing elit scelerisque facilisis convallis, mattis risus euismod potenti.',
                'aboutUsText':'Lorem ipsum dolor sit amet consectetur, adipiscing elit scelerisque facilisis convallis, mattis risus euismod potenti.'
            })
            expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('Invalid value')
            expect(response.status).to.eql(403)
        });

        it('should respond with status 403 if welcomeText field is empty', async function () {
            const response = await request
            .post('/api/organization')
            .set("Authorization", `Bearer ${adminToken}`)
            .send({
                'name':'Fundacion Hermanos de Deus',
                'image':'some random url ',
                'address':'fake address 123',
                'phone':'abcdes',
                'email':'this is not an email',
                'aboutUsText':'Lorem ipsum dolor sit amet consectetur, adipiscing elit scelerisque facilisis convallis, mattis risus euismod potenti.'
            })
            expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('Invalid value')
            expect(response.status).to.eql(403)
        });

        it('should respond with status 403 if welcomeText field is less than 30 chars', async function () {
            const response = await request
            .post('/api/organization')
            .set("Authorization", `Bearer ${adminToken}`)
            .send({
                'name':'Fundacion Hermanos de Deus',
                'image':'some random url ',
                'address':'fake address 123',
                'phone':'abcdes',
                'email':'this is not an email',
                'welcomeText':'Lorem ipsum dolor sit amet consectetur',
                'aboutUsText':'Lorem ipsum dolor sit amet consectetur, adipiscing elit scelerisque facilisis convallis, mattis risus euismod potenti.'
            })   
            expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('Invalid value')
            expect(response.status).to.eql(403)
        });

        it('should respond with status 403 if aboutUsText field is empty', async function () {
            const response = await request
            .post('/api/organization')
            .set("Authorization", `Bearer ${adminToken}`)
            .send({
                'name':'Fundacion Hermanos de Deus',
                'image':'some random url ',
                'address':'fake address 123',
                'phone':'abcdes',
                'email':'this is not an email',
                'welcomeText':'Lorem ipsum dolor sit amet consectetur, adipiscing elit scelerisque facilisis convallis, mattis risus euismod potenti.',            
            }) 
            expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('Invalid value')
            expect(response.status).to.eql(403)
        });

        it('should respond with status 403 if aboutUsText field is less than 30 chars long', async function () {
            const response = await request
            .post('/api/organization')
            .set("Authorization", `Bearer ${adminToken}`)
            .send({
                'name':'Fundacion Hermanos de Deus',
                'image':'some random url ',
                'address':'fake address 123',
                'phone':'abcdes',
                'email':'this is not an email',
                'welcomeText':'Lorem ipsum dolor sit amet consectetur, adipiscing elit scelerisque facilisis convallis, mattis risus euismod potenti.',
                'aboutUsText':'Lorem ipsum dolor sit amet consectetur'
            })  
            expect(response.body.error).to.have.nested.property('[0].msg').to.be.equal('Invalid value')
            expect(response.status).to.eql(403)
        });

        it('should respond with status 201 if the organization was created succesfully', async function () {
            const response = await request
            .post('/api/organization')
            .set("Authorization", `Bearer ${adminToken}`)
            .send({
                'name':'TestOrganization',
                'image':'some random url ',
                'address':'fake address 123',
                'phone':'123456878',
                'email':'fakeemail@email.com',
                'welcomeText':'Lorem ipsum dolor sit amet consectetur, , mattis risus euismod potenti.',
                'aboutUsText':'Lorem ipsum dolor sit amet consectetur, s, mattis risus euismod potenti.'
            })
            expect(response.body).to.be.an('object')
            expect(response.status).to.eql(201)
            orgId = response.body.id
        });
    })

    //GET
    describe('GET /api/organization/public/:id', function () {

        it('should respond with status code 404 if there is no organization with the id sent', async function () {
            const response = await request
            .get(`/api/organization/public/${idNotFound}`)
            expect(response.status).to.eql(404)
        });

        it('should respond with status code 200 & return an object with the organization ', async function () {
            const response = await request
            .get(`/api/organization/public/${orgId}`) 
            expect( response.body ).to.be.an('object')
            expect(response.status).to.eql(200);
        });
    })

    describe('GET /api/organizations/public', function () {

        it('when not token', async function () {
            const response = await request
            .get('/api/organization/public')
            expect( response.body ).to.be.an('object')
            expect(response.status).to.eql(200)
        });

        it('when autoriz is regular and status code 200 & return an array with all the existing organizations', async function () {
            const response = await request
            .get('/api/organization/public')
            .set("Authorization", `Bearer ${regularToken}`)
            expect(response.status).to.eql(200)
        });

        it('when autoriz is admin  status code 200 & return an array with all the existing organizations', async function () {
            const response = await request
            .get('/api/organization/public')
            .set("Authorization", `Bearer ${adminToken}`)
            expect(response.status).to.eql(200)
        });
    })

    //PUT
    describe('PUT /api/organization/:id', function () {

        it('should respond with status code 400 if there is no token in the request', async function () {
            const response = await request
            .put(`/api/organization/${orgId}`)
            expect( response.status ).to.be.eql(400)
        });

        it('should respond with status code 200 if the token belongs to invalid user', async function () {
            const response = await request
            .put(`/api/organization/${orgId}`)
            .set("Authorization", `Bearer ${invalidToken}`)
            expect(response.body).to.have.nested.property("name").to.be.equal("JsonWebTokenError")
            expect(response.status ).to.be.eql(200)
        });

        it('should respond with status code 401 if the user is not admin', async function () {
            const response = await request
            .put(`/api/organization/${orgId}`)
            .set("Authorization", `Bearer ${regularToken}`)
            expect( response.status ).to.be.eql(401)
        });

        it('should respond with status code 404 if there is no organization with the id sent', async function () {
            const response = await request
            .put(`/api/organization/${idNotFound}`)
            .set("Authorization", `Bearer ${adminToken}`)
            expect( response.status ).to.be.eql(404)
        });

        it('should respond with status code 201 if the organization has been updated', async function () {
            const response = await request
            .put(`/api/organization/${orgId}`)
            .set("Authorization", `Bearer ${adminToken}`)
            .send({
                'name':'Fundacion hermanos de Dios',
                'address':'Updated address 123',
                "image": "https://via.placeholder.com/600/51aa97",
                "phone": 123456878,
                "facebookUrl":"",
                "instagramUrl":"",
                "linkedinUrl":"",
                "email": "fakeemail@email.com",
                "welcomeText": "Lorem ipsum dolor sit amet consectetur,uismod potenti.",
                "aboutUsText": "Lorem ipsum dolor sit amet consectetur,s euismod potenti."
            })
            expect( response.status ).to.be.eql(201)
        });
    })

    //DELETE
    describe('DELETE /api/organization/:id', function () {

        it('should respond with status code 400 if no token is sent' , async function () {
            const response = await request
            .delete(`/api/organization/${orgId}`)
            expect( response.status ).to.be.eql(400)
        });

        it('should respond with status code 401 if user is not admin' , async function () {
            const response = await request
            .delete(`/api/organization/${orgId}`)
            .set("Authorization", `Bearer ${regularToken}`)
            expect( response.status ).to.be.eql(401)
        });

        it('should respond with status code 404 if the id sent does not match any existing organization ' , async function () {
            const response = await request
            .delete(`/api/organization/${idNotFound}`)
            .set("Authorization", `Bearer ${adminToken}`)
            expect( response.status ).to.be.eql(404)
        });

        it('should respond with status code 200 if the organization has been removed' , async function () {
            const response = await request
            .delete(`/api/organization/${orgId}`)
            .set("Authorization", `Bearer ${adminToken}`)
            expect( response.body ).to.be.an('object').to.have.property('message').to.eql(`id ${orgId} deleted !`)
            expect( response.status ).to.be.eql(200)
        });
    })


