/**
 * @swagger
 * tags:
 *   name: Authorizations
 *   description: Api registration and login
 * 
 * components: 
 *  schemas: 
 *    LoginCredentials:
 *      type: object
 *      properties:
 *       email:
 *          type: string 
 *       password: 
 *          type: string
 *      required:
 *        - email
 *        - password
 *      example:
 *        email: admin@gmail.com
 *        password: '1234test'
 *    LoginGoogleCredentials:
 *      type: object
 *      properties:
 *       email:
 *          type: string 
 *       password: 
 *          type: string
 *      required:
 *        - email
 *        - password
 *      example:
 *        email: slronzoni@gmail.com
 *        password: 'Voy@estudiar'        
 */

/**
 * @swagger
 * components: 
 *  schemas:
 *    User:
 *      type: object
 *      properties: 
 *        firstName:
 *          type: string
 *          description: the user name
 *        lastName: 
 *          type: string
 *          description: the user lastName
 *        email:
 *          type: string
 *          description: the user email
 *        password:
 *          type: string
 *          description: the user password
 *        roleId:
 *          type: integer
 *          description: the user role
 *        photo:
 *          type: string
 *          description: the user photo
 *      required:
 *        - firstName               
 *        - lastName
 *        - email
 *        - password
 *        - roleId
 *      example:
 *        lastName: juan
 *        firstName: rios
 *        email: juanrios@gmail.com
 *        password: 123456789  
 *        roleId : 2   
 */ 

// Login user
/**
 * @swagger
 * /api/auth/login:
 *  post:
 *    summary: login user
 *    tags: [Authorizations]
 *    requestBody:
 *      required: true
 *      content: 
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/LoginCredentials'
 *    responses: 
 *      200: 
 *        description: Succesful response
 *      401:
 *        description: Unauthorized
 *      500: 
 *        description: Internal Server Error     
 */

//Register User
/**
 * @swagger
 * /api/auth/register:
 *  post:
 *    summary: create new user
 *    tags: [Authorizations]
 *    requestBody:
 *      required: true
 *      content: 
 *        application/json:
 *          schema:
 *            type: objet
 *            $ref: '#/components/schemas/User'
 *    responses: 
 *      200: 
 *        description: Succesful response
 *      500: 
 *        description: Internal Server Error     
 */

// Get auth user
/**
 * @swagger 
 * /api/auth/me:
 *  get: 
 *    security:
 *        - bearerAuth: []
 *    summary: Returns the user information
 *    description: This endpoint returns the user's information
 *    tags: [Authorizations]
 *    responses: 
 *      200: 
 *          description: Succesful response
 *      401:
 *          description: Unauthorized
 *      400:
 *          description: Bad request / request does not have a token
 *      500:
 *          description: Internal server error
 */