/**
 * @swagger
 * tags:
 *   name: News
 *   description: News about the ong
 * 
 * components:
 *  schemas:
 *      News:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  description: the news name
 *              image: 
 *                  type: string
 *                  description: the news image
 *              content:
 *                  type: text
 *                  description: the news content
 *              categoryId:
 *                  type: integer
 *                  description: the category id
 *              type:
 *                  type: string
 *                  description: the news type
 *          required:
 *              - name
 *              - image
 *              - content
 *          example:
 *              name: Where can I get some?
 *              image: https://lh3.googleusercontent.com/u/0/d/18Jub8i5qQnjBpuR-EsVx9Xtc0tzS2dmx=w250-h238-p-k-nu-iv2
 *              content: There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour
 *              categoryId: 1
 *              type: Social
 * 
 *      Comments:
 *          type: object
 *          properties:
 *              user_id:
 *                  type: integer
 *                  description: the user id
 *              body: 
 *                  type: text
 *                  description: the comment body
 *              news_id:
 *                  type: integer
 *                  description: the news id
 *          required:
 *              - user_id
 *              - body
 *              - news_id
 *          example:
 *              user_id: 1
 *              body: It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using
 *              news_id: 1  
 *  responses: 
 *      CommentsNews:
 *          type: array
 *          items: 
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: the comment id
 *                  user_id:
 *                      type: integer
 *                      description: the user id
 *                  body:
 *                      type: text
 *                      description: the comment body
 *                  news_id: 
 *                      type: integer
 *                      description: the news id
 *                  updatedAt: 
 *                      type: date
 *                      description: the activity updated date
 *                  createdAt: 
 *                      type: date
 *                      description: the activity created date
 *                  deletedAt: 
 *                      type: date
 *                      description: the activity deleted date
 *          example:
 *            - id: 1
 *              user_id: 2
 *              body: Comentario acerca del dolar
 *              news_id: 1
 *              createdAt: 2022-07-07T20:55:30.000Z
 *              updatedAt: 2022-07-07T20:55:31.000Z
 *              deletedAt: null
 *            - id: 2
 *              user_id: 5
 *              body: Comentario acerca del dolar
 *              news_id: 3
 *              createdAt: 2022-07-07T20:55:30.000Z
 *              updatedAt: 2022-07-07T20:55:31.000Z
 *              deletedAt: null
 * 
 */

/**
 * 
 * @swagger
  * /api/news:
 *  get:
 *      security:
 *        - bearerAuth: []
 *      summary: List all news with pagination
 *      tags: [News]
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
 *                              $ref: '#/components/schemas/News'
 *          500:
 *              description: Server error
 *          400:
 *              description: Bad request error
 *      
 */

/**
 * 
 * @swagger
 * /api/news/{id}:
 *    get:
 *      security:
 *       - bearerAuth: []
 *      summary: "Display the specified News"
 *      tags: [News]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *          description: News id       
 *      description: This endpoint is for get a specific news 
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/News'
 *          500:
 *              description: Server error
 *          400:
 *              description: Bad request error
 *          404:
 *              description: Resource not found
 */

/**
 * 
 * @swagger
* /api/news:
 *  post:
 *      security:
 *        - bearerAuth: []
 *      summary: create a news
 *      tags: [News]
 *      requestBody: 
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/News'
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/News'
 *          500:
 *              description: Server error
 *          403:
 *              description: Required inputs error
 *          400:
 *              description: Bad request error
 * 
 */

/**
 * 
 * @swagger
 * /api/news/{id}:
 *  put:
 *      security:
 *        - bearerAuth: []
 *      summary: Update a news by id
 *      tags: [News]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *          description: News id
 *      requestBody: 
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/News'     
 *      responses:
 *          201:
 *              description: Successful response              
 *          500:
 *              description: Server error
 *          403:
 *              description: Required inputs error
 *          400:
 *              description: Bad request error
 *          404:
 *              description: Resource not found
 *      
 */

/**
 * 
 * @swagger
 * /api/news/{id}:
 *  delete:
 *      security:
 *        - bearerAuth: []
 *      summary: Delete a news by id
 *      tags: [News]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *          description: News id
 *      responses:
 *          200:
 *              description: News deleted
 *          500:
 *              description: Server error
 *          400:
 *              description: Bad request error
 *          404:
 *              description: Resource not found
 *      
 */

/**
 * 
 * @swagger
 * /api/news/{id}/comments:
 *  get:
 *      security:
 *        - bearerAuth: []
 *      summary: Get comments by new
 *      description: This endpoint is for get a comments by specific new
 *      tags: [News]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *          description: Comments by new
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/responses/CommentsNews'
 *          500:
 *              description: Server error
 *          400:
 *              description: Bad request error
 *          404:
 *              description: Resource not found
 * 
 */

/**
 * @swagger
 * /api/news/byName/{name} :
 *   get:
 *     summary: List one new by name with comments( public )
 *     tags: [News]
 *     parameters:
 *        - in: path
 *          name: name
 *          schema:
 *              type: string
 *          required: true
 *          description: name of the news you want to see 
 *     responses:
 *       200:
 *         description: return new
 *       404:
 *         description: the new does not exists
 *       500:
 *         description: server error
 */

/**
 * @swagger
 * /api/news/byDate/{updatedAt} :
 *   get:
 *     summary: List one new by updated date-time ( public )
 *     tags: [News]
 *     parameters:
 *        - in: path
 *          name: updatedAt
 *          schema:
 *              type: string
 *              format: date-time
 *              example: '2022-10-31T17:32:28Z'
 *          required: true
 *          description: updated date-time of the new you want to see 
 *     responses:
 *       200:
 *         description: return new
 *       404:
 *         description: the new does not exists
 *       500:
 *         description: server error
 */

/**
 * @swagger
 * /api/news/byCategory/{categoryId} :
 *   get:
 *     summary: List one new by category id ( public )
 *     tags: [News]
 *     parameters:
 *        - in: path
 *          name: categoryId
 *          schema:
 *              type: integer
 *          required: true
 *          description: news by category
 *     responses:
 *       200:
 *         description: return new
 *       404:
 *         description: the new does not exists
 *       500:
 *         description: server error
 */
