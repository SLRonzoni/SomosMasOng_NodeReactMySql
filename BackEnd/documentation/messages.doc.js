/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: Messages received via email
 * 
 * components:
 *   schemas :
 *     Messages:
 *       type: object
 *       properties:
 *          name:
 *              type: string
 *              description : the message sender
 *          phone:
 *              type: string
 *              description : the sender phone
 *          email:
 *              type: string
 *              description : the sender email
 *          message:
 *              type: string
 *              description : the message 
 *          updatedAt: 
 *              type: date
 *              description: the message updated date
 *          createdAt: 
 *              type: date
 *              description: the message created date
 *       required:
 *          - name
 *          - email
 *          - message
 *       example:
 *          name: Marcelo Benitez
 *          phone: 11-1234-1234
 *          email: marcelobenitez@yahoo.com
 *          message: hola, quisiera info sobre la ong. Muchas gracias y saludos
 *          updatedAt: 2022-07-05T03:02:09.285Z
 *          createdAt: 2022-07-05T03:02:09.285Z
 */

/**
 * @swagger
 * /api/messages:
 *   get:
 *     security:
 *        - bearerAuth: []
 *     summary: List all messages with pagination
 *     tags: [Messages]
 *     parameters:
 *        - in: query
 *          name: page
 *          schema:
 *              type: integer
 *          required: false
 *          description: Page for pagination
 *     responses:
 *       200:
 *         description: return all messages
 *       500:
 *         description: server error
 */

/**
 * @swagger
 * /api/messages/{id} :
 *   get:
 *     security:
 *        - bearerAuth: []
 *     summary: List one message by id
 *     tags: [Messages]
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *          description: id of the message you want to see 
 *     responses:
 *       200:
 *         description: return message
 *       404:
 *         description: the message does not exists
 *       500:
 *         description: server error
 */

/**
 * @swagger
 * /api/messages/byEmail/{email} :
 *   get:
 *     security:
 *        - bearerAuth: []
 *     summary: List message by email
 *     tags: [Messages]
 *     parameters:
 *        - in: path
 *          name: email
 *          schema:
 *              type: string
 *          required: true
 *          description: email of the message you want to see 
 *     responses:
 *       200:
 *         description: return message
 *       404:
 *         description: the email does not exists
 *       500:
 *         description: server error
 */

/**
 * @swagger
 * /api/messages/byDate/{createdAt} :
 *   get:
 *     security:
 *        - bearerAuth: []
 *     summary: List message by created date-time
 *     tags: [Messages]
 *     parameters:
 *        - in: path
 *          name: createdAt
 *          schema:
 *              type: string
 *              format: date-time
 *              example: '2022-10-31T17:32:28Z'
 *          required: true
 *          description: created date-time of the message you want to see 
 *     responses:
 *       200:
 *         description: return message
 *       404:
 *         description: the date does not exists
 *       500:
 *         description: server error
 */

/**
 * @swagger
 * /api/messages/{id} :
 *   delete:
 *     security:
 *        - bearerAuth: []
 *     summary: Remove one message by id
 *     tags: [Messages]
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *          description: id of the message to be removed
 *     responses:
 *       200:
 *         description: message {id} deleted
 *       404:
 *         description: the message does not exists
 *       500:
 *         description: server error
 */

/**
 * @swagger
 * /api/messages :
 *   post:
 *     security:
 *        - bearerAuth: []
 *     summary: Create a new message
 *     tags: [Messages]
 *     requestBody: 
 *          required: true
 *          content:
 *            application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Messages'
 *     responses:
 *       201:
 *         description:  ha enviado un mensaje
 *       500:
 *         description: server error
 */