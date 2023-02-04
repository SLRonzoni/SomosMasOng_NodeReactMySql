const swaggerJSDoc = require('swagger-jsdoc');
require('dotenv').config()

const swaggerDefinition = {
    
        openapi: '3.0.2',
        info: {
            title: 'Somos Más  ong API',
            description: 'API Documentation for use',
            version: '1.0.0',
        },
        servers: [
            {url: `http://localhost:${process.env.PORT}`} ,
            {url:'https://api.stripe.com'},
            {url:'https://sdk.mercadopago.com/js/v2'}
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                },
                public_key:process.env.REACT_PUBLIC_KEY,
                secret_key:process.env.REACT_SECRET_KEY
            },     	
        },
      
};

const swaggerOptions = {
	swaggerDefinition,
	apis: ['./documentation/*.js'],
}; 

//const swagger = swaggerJSDoc(swaggerOptions);

//module.exports = {swagger};
module.exports = swaggerJSDoc(swaggerOptions);
