/**
* @swagger
* tags:
*   name: Donations
*   description: Donations received save in data base
*
* components:
*   schemas :
*     Donations:
*       type: object
*       properties:
*          userId: 
*              type: integer
*              description: id user donator
*          userName:
*              type: string
*              description : the donation name
*          userLastName:
*              type: string
*              description : the donation name
*          userEmail:
*              type: string
*              description : the donation email
*          userPhone:
*              type: string
*              description : the donation phone
*          amount:
*              type: integer
*              description : the donation amount
*          payForm:
*              type: string
*              description: the donation pay form
*          message:
*              type: string
*              description : the donation message
*          updatedAt: 
*              type: date
*              description: the donation updated date
*          createdAt: 
*              type: date
*              description: the donation created date
*       required:
*          - userId
*          - userName
*          - userLastName
*          - useEmail
*          - userPhone
*          - amount
*          - payForm
*          - message
*       example:
*          userId: 3
*          userName: User
*          userLastName: Regular
*          userEmail: regular@gmail.com
*          userPhone: 256346
*          amount: 10
*          payForm: stripe U$S
*          message: donacion con Stripe             
*/

/**
 * @swagger
 * /api/donations:
 *   get:
 *     security:
 *        - bearerAuth: []
 *     summary: List all donations with pagination
 *     tags: [Donations]
 *     parameters:
 *        - in: query
 *          name: page
 *          schema:
 *              type: integer
 *          required: false
 *          description: Page for pagination
 *     responses:
 *       200:
 *         description: return all donations
 *       500:
 *         description: server error
 */

/**
 * @swagger
 * /api/donations/{id} :
 *   get:
 *     security:
 *        - bearerAuth: []
 *     summary: List one donation by id
 *     tags: [Donations]
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *          description: id of the donation you want to see 
 *     responses:
 *       200:
 *         description: return donation
 *       404:
 *         description: the donation does not exists
 *       500:
 *         description: server error
 */

/**
 * @swagger
 * /api/donations/byEmail/{userEmail} :
 *   get:
 *     security:
 *        - bearerAuth: []
 *     summary: List one donation by email
 *     tags: [Donations]
 *     parameters:
 *        - in: path
 *          name: userEmail
 *          schema:
 *              type: string
 *              example: 'regular@gmail.com'
 *          required: true
 *          description: email of the donation you want to see 
 *     responses:
 *       200:
 *         description: return donation
 *       404:
 *         description: the donation does not exists
 *       500:
 *         description: server error
 */

/**
 * @swagger
 * /api/donations/byDate/{createdAt} :
 *   get:
 *     security:
 *        - bearerAuth: []
 *     summary: List one donation by created date-time
 *     tags: [Donations]
 *     parameters:
 *        - in: path
 *          name: createdAt
 *          schema:
 *              type: string
 *              format: date-time
 *              example: '2022-10-31T17:32:28Z'
 *          required: true
 *          description: created date-time at of the donation you want to see 
 *     responses:
 *       200:
 *         description: return donation
 *       404:
 *         description: the donation does not exists
 *       500:
 *         description: server error
 */

/**
 * @swagger
 * /api/donations/byPayForm/{payForm} :
 *   get:
 *     security:
 *        - bearerAuth: []
 *     summary: List one donation by pay form
 *     tags: [Donations]
 *     parameters:
 *        - in: path
 *          name: payForm
 *          schema:
 *              type: string
 *          required: true
 *          description: pay form of the donation you want to see 
 *     responses:
 *       200:
 *         description: return donation
 *       404:
 *         description: the donation does not exists
 *       500:
 *         description: server error
 */

/**
 * @swagger
 * /api/donations/byStatusPay/{statusPay} :
 *   get:
 *     security:
 *        - bearerAuth: []
 *     summary: List one donation by status pay
 *     tags: [Donations]
 *     parameters:
 *        - in: path
 *          name: statusPay
 *          schema:
 *              type: string
 *          required: true
 *          description: status pay of the donation you want to see 
 *     responses:
 *       200:
 *         description: return donation
 *       404:
 *         description: the donation/status pay does not exists
 *       500:
 *         description: server error
 */

/**
 * @swagger
 * /api/donations/{id} :
 *   put:
 *     security:
 *        - bearerAuth: []
 *     summary: Update donation by id
 *     tags: [Donations]
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: object
 *          description: id of the donation to be updated
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Donations'
 *            
 *     responses:
 *       200:
 *         description: return updated donation
 *         content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Donations'
 *       404:
 *         description: the donation does not exists
 *       500:
 *         description: server error
 */

/**
 * @swagger
 * /api/donations/{id} :
 *   delete:
 *     security:
 *        - bearerAuth: []
 *     summary: Delete one donation by id
 *     tags: [Donations]
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *              required: true
 *              description: id of the donation to be removed
 *     responses:
 *       200:
 *         description: donation id deleted
 *       403:
 *         description: the donation has news associated, can't delete it !
 *       404:
 *         description: the donation does not exists
 *       500:
 *         description: server error
 */

/**
 * @swagger
 * /api/donations/createDonation :
 *   post:
 *     security:
 *        - bearerAuth: []
 *     summary: Create a new donation
 *     tags: [Donations]
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Donations'
 *                  
 *     responses:
 *       201:
 *         description: return donation
 *         content:
 *             application/json:
 *                 schema:
 *                   $ref: '#/components/schemas/Donations'
 *       500:
 *         descripcion: server error
 */