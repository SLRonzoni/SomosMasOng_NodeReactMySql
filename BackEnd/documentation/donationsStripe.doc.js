/**
* @swagger
* tags:
*   name: DonationsStripe
*   description: Donations received with Stripe, before Create Payment Method
* components:
*   schemas :
*     DonationsStripe:
*       type: object
*       properties:
*           id: 
*              type: string
*              description: id obtained in CREATE PAYMENT METHOD
*           stripe[amount]:
*              type: integer
*              description : donation amount, must include cents. Example= 1 would be 1*100=100
*       required:
*          - id
*          - amount
*       example:
*          id: put obtained id in CREAYE PAYMENT METHOD
*          stripe:
*             amount: 100              
*/

/**
 * @swagger
 * /api/donations/paymentsStripe:
 *   post:
 *     security:
 *        - bearerAuth: []
 *        - secret_key
 *        - public_key
 *     tags: [DonationsStripe]
 *     requestBody:
 *          required: true
 *          content:
 *            application/json:
 *               schema:
 *                 type: object
 *                 $ref: '#/components/schemas/DonationsStripe'
 *     responses:
 *       201:
 *         description: return payment
 *       500:
 *         descripcion: server error
 */