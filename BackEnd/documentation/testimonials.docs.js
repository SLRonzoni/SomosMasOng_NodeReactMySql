/**
 * @swagger 
 * tags:
 *   name: Testimonials
 *   description: Testimonials about the ong
 * 
 * components:
 *  schemas:
 *      Testimonials:
 *          type: object
 *          properties:
 *              userId:
 *                  type: integer
 *                  description: the user id who make the testimonial
 *              name:
 *                  type: string
 *                  description: the testimonial name
 *              image:
 *                  type: string
 *                  description: the testimonial image
 *              content:
 *                  type: string
 *                  description: the testimonial content
 *              createdAt:
 *                  type: Date
 *                  description: The creation date
 *              updatedAt:
 *                  type: Date
 *                  description: The updated date
 *              deletedAt:
 *                  type: Date
 *                  description: The deleted date
 *          required:
 *              - userId
 *              - name
 *              - image
 *              - content
 *          example:
 *              userId: 100
 *              name: Juan Perez
 *              image: https://lh3.googleusercontent.com/u/0/d/18Jub8i5qQnjBpuR-EsVx9Xtc0tzS2dmx=w250-h238-p-k-nu-iv2
 *              content: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
 *              createdAt: 2022-07-01T17:46:16.000Z,
 *              updatedAt: 2022-07-10T20:41:41.000Z,
 *              deletedAt: null
 */

/**
 * @swagger
 * /api/testimonials:
 *  get:
 *      security:
 *        - bearerAuth: []
 *      summary: List all testimonials
 *      tags: [Testimonials]
 *      parameters:
 *        - in: query
 *          name: page
 *          schema:
 *              type: integer
 *          required: false
 *          description: Page for pagination
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Testimonials'
 *          500:
 *              description: Server error
 *          400:
 *              description: Bad request error
 *          401:
 *              description: Unauthorized      
 */

/**
 * @swagger
 * /api/testimonials/public:
 *  get:
 *      summary: List all testimonials ( public )
 *      tags: [Testimonials]
 *      parameters:
 *        - in: query
 *          name: page
 *          schema:
 *              type: integer
 *          required: false
 *          description: Page for pagination
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Testimonials'
 *          500:
 *              description: Server error
 *          400:
 *              description: Bad request error
 *          401:
 *              description: Unauthorized      
 */

/**
  * @swagger
  * /api/testimonials/public/{id}:
  *  get:
  *      summary: Get testimonial by id ( public version )
  *      tags: [Testimonials]
  *      parameters:
  *        - in: path
  *          name: id
  *          schema:
  *              type: integer
  *          required: true
  *          description: Testimonials id
  *      responses:
  *          200:
  *              description: Get testimonial by id
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/Testimonials'
  *          500:
  *              description: Internal Server error
  *          400:
  *              description: Bad request error / token requested
  *          401:
  *              description: Unauthorized / admin privileges
  *          404:
  *              description: Not found / Invalid or nonexisting testimonial id
  *      
  */

/**
 * @swagger
 * /api/testimonials/public/byName/{name} :
 *   get:
 *     summary: List one testimonial by name ( public )
 *     tags: [Testimonials]
 *     parameters:
 *        - in: path
 *          name: name
 *          schema:
 *              type: string
 *          required: true
 *          description: name of the testimonial you want to see 
 *     responses:
 *       200:
 *         description: return testimonial
 *       404:
 *         description: the testimonial does not exists
 *       500:
 *         description: server error
 */

/**
 * @swagger
 * /api/testimonials/public/byDate/{createdAt} :
 *   get:
 *     summary: List one testimonial by created date-time ( public )
 *     tags: [Testimonials]
 *     parameters:
 *        - in: path
 *          name: createdAt
 *          schema:
 *              type: string
 *              format: date-time
 *              example: '2022-10-31T17:32:28Z'
 *          required: true
 *          description: created date-time of the testimonial you want to see 
 *     responses:
 *       200:
 *         description: return testimonial
 *       404:
 *         description: the testimonial does not exists
 *       500:
 *         description: server error
 */

/**
  * @swagger
  * /api/testimonials:
  *  post:
  *      security:
  *        - bearerAuth: []
  *      summary: create a new testimonial
  *      tags: [Testimonials]
  *      requestBody: 
  *          required: true
  *          content:
  *               multipart/form-data:
  *                  schema:
  *                      type: object
  *                      properties:
  *                          userId:
  *                              type: integer
  *                          name:
  *                              type: string
  *                          image:
  *                              type: string
  *                              format: binary
  *                          content:
  *                              type: string
  *      responses:
  *          201:
  *              description: Successful response
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/Testimonials'
  *          400:
  *              description: Bad request error
  *          401:
  *              description: Unauthorized / admin privileges  
  *          403:
  *              description: Required inputs error
  *          500:
  *              description: Server error
  */

/**
  * @swagger
  * /api/testimonials/{id}:
  *  put:
  *      security:
  *        - bearerAuth: []
  *      summary: Update testimonials by id
  *      tags: [Testimonials]
  *      parameters:
  *        - in: path
  *          name: id
  *          schema:
  *              type: integer
  *          required: true
  *          description: Testimonials id
  *      requestBody: 
  *          required: true
  *          content:
  *               multipart/form-data:
  *                  schema:
  *                      type: object
  *                      properties:
  *                          name:
  *                              type: String
  *                          image:
  *                              type: string
  *                              format: binary 
  *                          content:
  *                              type: string     
  *      responses:
  *          201:
  *              description: Successful response
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/Testimonials'
  *          400:
  *              description: Bad request error
  *          403:
  *              description: Required inputs error
  *          404:
  *              description: Resource not found
  *          500:
  *              description: Server error  
  */

 /**
  * @swagger
  * /api/testimonials/{id}:
  *  delete:
  *      security:
  *        - bearerAuth: []
  *      summary: Delete testimonials by id
  *      tags: [Testimonials]
  *      parameters:
  *        - in: path
  *          name: id
  *          schema:
  *              type: integer
  *          required: true
  *          description: Testimonials id
  *      responses:
  *          200:
  *              description: Successful response
  *          400: 
  *              description: Bad request 
  *          401:
  *              description: Unauthorized
  *          404:
  *              description: Resource not found
  *          500:
  *              description: Internal server error
  *      
  */