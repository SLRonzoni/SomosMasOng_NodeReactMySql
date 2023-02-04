/**
 * @swagger
 *  tags:
 *   name: Organization
 *   description: Companies or organizations that collaborate with the ong
 * 
 * components:
 *  schemas:
 *      Organization:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                      description: The organization's name
 *                  image:
 *                      type: string
 *                      description: The organization's image
 *                  address:
 *                      type: string
 *                      description: The organization's address
 *                  phone:
 *                      type: integer
 *                      description: The organization's phone number
 *                  email:
 *                      type: string
 *                      description: The organization's email
 *                  facebookUrl:
 *                      type: string
 *                      description: The organization's facebook
 *                  instagramUrl:
 *                      type: string
 *                      description: The organization's instagram
 *                  linkedinUrl:
 *                      type: string
 *                      description: The organization's linkedin
 *                  welcomeText: 
 *                      type: string
 *                      description: The organization's welcome text
 *                  aboutUsText:
 *                      type: string    
 *                      description: The organization's about text
 *              required:
 *                  - name
 *                  - image
 *                  - address
 *                  - phone
 *                  - email
 *                  - facebookUrl
 *                  - instagramUrl
 *                  - linkedinUrl
 *                  - welcomeText
 *                  - aboutUsText
 *              example:
 *                  name: Museo de Arte Moderno
 *                  image: http://someimage.com/fakeimage123
 *                  address: Callao 222
 *                  phone: 1111111111
 *                  email: arteModerno@correo.com
 *                  facebookUrl: facebook
 *                  instagramUrl: instagram
 *                  linkedinUrl: linkedin
 *                  welcomeText: utem ea exercitationem quam
 *                  aboutUsText: uaerat ipsa sit maiores autem ea exercitationem quam
 */

/**
 * @swagger
 * /api/organization/public:
 *  get:
 *      summary: Lists all existing organizations
 *      tags: [Organization]
 *      parameters:
 *      - in: path
 *        name: page
 *        schema:
 *             type: integer
 *             description: The page number
 *      responses:
 *          200:
 *             description: Succesful response
 *          400:
 *              description: Bad request
 *          401:
 *              description: Unauthorized
 *          500:
 *              description: Internal server error
 *          
 */

/**
 * @swagger
 * /api/organization/public/{id}:
 *  get:
 *      summary: Returns the organization that matches the id
 *      description: This endpoint is to get an specific organization's info
 *      tags: [Organization]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *          description: The organization's id
 *      responses:
 *          200:
 *              description: Succesful response
 *          404:
 *              description: Not found
 *          500:
 *              description: Internal server error
 *          
 */

/**
 * @swagger
 * /api/organization/{id}:
 *  delete:
 *      security:
 *          - bearerAuth: []
 *      summary: Delete organization by id
 *      description: This endpoint is for destroy an specific organization
 *      tags: [Organization]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *                  type: integer
 *            required: true
 *            description: The organization's id
 *      responses:
 *          200:
 *              description: id deleted
 *          401:
 *              description: Unauthorized
 *          404: 
 *              description: Not found
 *          400:
 *              description: Bad request
 *          500:
 *              description: Internal server error
 */

/**
 * @swagger
 * /api/organization:
 *  post:
 *      security:
 *          - bearerAuth: []
 *      summary: Create an organization
 *      tags: [Organization]
 *      description: This endpoint goal is to create an organization
 *      requestBody:
 *          required: true
 *          content:
 *               multipart/form-data:
 *                  schema:
 *                      type: object
 *                      properties:
 *                              name:
 *                                  type: string
 *                                  example : Museo de Arte Moderno
 *                              image: 
 *                                  type: string
 *                                  format: binary
 *                                  example: http://someimage.com/fakeimage123
 *                              address:
 *                                  type: string
 *                                  example: Callao 222 Caba
 *                              phone:
 *                                  type: string
 *                                  example: 12312312
 *                              email:
 *                                  type: string
 *                                  example: arteModerno@correo.com
 *                              facebookUrl:
 *                                  type: string
 *                                  example: facebook
 *                              instagramUrl:
 *                                  type: string
 *                                  example: instagram
 *                              linkedinUrl:
 *                                  type: string
 *                                  example: linkedin
 *                              welcomeText:
 *                                  type: string
 *                                  example: utem ea exercitationem quam
 *                              aboutUsText:
 *                                  type: string
 *                                  example: uaerat ipsa sit maiores autem ea exercitationem quam                      
 *      responses:
 *          201:
 *             description: return organization
 *             content:
 *             application/json:
 *                 schema:
 *                  $ref: '#/components/schemas/Organizations'
 *          403:
 *              description: Forbidden
 *          500:
 *              description: Internal server error                   
 */

/**
 * @swagger
 * /api/organization/{id}:
 *  put:
 *      security:
 *        - bearerAuth: []
 *      summary: Updates an organization by id
 *      description: This endpoint is to modify an existing organization
 *      tags: [Organization]
 *      requestBody:
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      type: object
 *                      properties:
 *                              name:
 *                                  type: string
 *                                  example : Museo de Arte Moderno
 *                              image: 
 *                                  type: string
 *                                  format: binary
 *                                  example: http://someimage.com/fakeimage123
 *                              address:
 *                                  type: string
 *                                  example: Callao 222 Caba
 *                              phone:
 *                                  type: string
 *                                  example: 12312312
 *                              email:
 *                                  type: string
 *                                  example: arteModerno@correo.com
 *                              facebookUrl:
 *                                  type: string
 *                                  example: facebook
 *                              instagramUrl:
 *                                  type: string
 *                                  example: instagram
 *                              linkedinUrl:
 *                                  type: string
 *                                  example: linkedin
 *                              welcomeText:
 *                                  type: string
 *                                  example: utem ea exercitationem quam
 *                              aboutUsText:
 *                                  type: string
 *                                  example: uaerat ipsa sit maiores autem ea exercitationem quam  
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *                 type: integer
 *            required: true
 *            description: The organization's id
 *      responses:
 *          201:
 *              description: return organization updated
 *          400:
 *              description: Bad request / missing token
 *          401:
 *              description: Unauthorized / permission denied
 *          404:
 *              description: Not found 
 *          500:
 *              description: Internal server error
 *                  
 */
