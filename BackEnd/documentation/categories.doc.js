/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: News categories
 * 
 * components:
 *   schemas :
 *     Categories:
 *       type: object
 *       properties:
 *          name:
 *              type: string
 *              description : the category name
 *          description:
 *              type: string
 *              description : the category description
 *          image:
 *              type: string
 *              format: binary
 *              description : the category image
 *          updatedAt: 
 *              type: date
 *              description: the category updated date
 *          createdAt: 
 *              type: date
 *              description: the category created date
 *       required:
 *          - name
 *          - image
 *          - description
 *       example:
 *          name: Category demo 5
 *          description: demo natus nisi omnis corporis facere molestiae rerum in
 *          image: https://via.placeholder.com/600/f66b97
 *          updatedAt: 2022-07-05T03:02:09.285Z
 *          createdAt: 2022-07-05T03:02:09.285Z
 */

/**
 * @swagger
 * /api/categories:
 *   get:
 *     security:
 *        - bearerAuth: []
 *     summary: List all categories with pagination
 *     tags: [Categories]
 *     parameters:
 *        - in: query
 *          name: page
 *          schema:
 *              type: integer
 *          required: false
 *          description: Page for pagination
 *     responses:
 *       200:
 *           description: return names the all categories
 *           content:
 *               application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                         $ref: '#/components/schemas/Categories'
 * 
 *       500:
 *           description: server error
 */

/**
 * @swagger
 * /api/categories/{id} :
 *   get:
 *     security:
 *        - bearerAuth: []
 *     summary: List one category by id
 *     tags: [Categories]
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *          description: id of the category you want to see 
 *     responses:
 *       200:
 *         description: return category
 *         content:
 *               application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                         $ref: '#/components/schemas/Categories'
 *       404:
 *         description: the category does not exists
 *       500:
 *         description: server error
 */

/**
 * @swagger
 * /api/categories/byName/{name} :
 *   get:
 *     security:
 *        - bearerAuth: []
 *     summary: List one category by name
 *     tags: [Categories]
 *     parameters:
 *        - in: path
 *          name: name
 *          schema:
 *              type: string
 *          required: true
 *          description: name of the category you want to see 
 *     responses:
 *       200:
 *         description: return category
 *         content:
 *               application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                         $ref: '#/components/schemas/Categories'
 *       404:
 *         description: the category does not exists
 *       500:
 *         description: server error
 */

/**
 * @swagger
 * /api/categories/public/{id} :
 *   get:
 *     summary: List one category by id (public version)
 *     tags: [Categories]
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *          description: id of the category you want to see (public version)
 *     responses:
 *       200:
 *         description: return category
 *         content:
 *               application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                         $ref: '#/components/schemas/Categories'
 *       404:
 *         description: the category does not exists
 *       500:
 *         description: server error
 */

/**
 * @swagger
 * /api/categories :
 *   post:
 *     security:
 *        - bearerAuth: []
 *     summary: Create a new category
 *     tags: [Categories]
 *     requestBody: 
 *          required: true
 *          content:
 *            multipart/form-data:
 *               schema:
 *                 type: object
 *                 properties:
 *                          name:
 *                              type: string  
 *                          image:
 *                              type: string
 *                              format: binary   
 *                          description:
 *                              type: string
 *     responses:
 *       201:
 *         description: return category
 *         content:
 *             application/json:
 *                 schema:
 *                  $ref: '#/components/schemas/Categories'
 *       500:
 *         description: server error
 */

/**
 * @swagger
 * /api/categories/{id} :
 *   put:
 *     security:
 *        - bearerAuth: []
 *     summary: Update category by id
 *     tags: [Categories]
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *          description: id of the category to be updated
 *     requestBody: 
 *          required: true
 *          content:
 *            multipart/form-data:
 *               schema:
 *                 type: object
 *                 properties:
 *                          name:
 *                              type: string  
 *                          image:
 *                              type: string
 *                              format: binary   
 *                          description:
 *                              type: string
 *     responses:
 *       200:
 *          description: return updated category
 *          content:
 *               application/json:
 *                   schema:
 *                      $ref: '#/components/schemas/Categories'
 *       404:
 *           description: the category does not exists
 *       500:
 *           description: server error
 */

/**
 * @swagger
 * /api/categories/{id} :
 *   delete:
 *     security:
 *        - bearerAuth: []
 *     summary: Delete one category by id
 *     tags: [Categories]
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *              required: true
 *              description: id of the category to be removed
 *     responses:
 *       200:
 *         description: category id deleted
 *       403:
 *         description: the category has news associated, can't delete it !
 *       404:
 *         description: the category does not exists
 *       500:
 *         description: server error
 */