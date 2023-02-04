/**
* @swagger
* tags:
*   name: DonationsMercadoPago
*   description: Donations received with Mercado Pago procedure
* 
* components:
*   schemas :
*     DonationsMP:
*       type: object
*       properties:
*          payer:
*               type: object
*               properties:
*                  email:
*                     type: email
*                     description: user email
*          transaction_amount:
*              type: integer
*              description: donation amount
*          description:
*              type: string
*              description: donation description
*          payment_method_id:
*              type: string
*              description: payment type, rapipago or pagofacil
*          userId: 
*              type: integer
*              description: donator user id
*          userName:
*              type: string
*              description : donator user name
*          userLastName:
*              type: string
*              description : donator user lastname
*          userEmail:
*              type: string
*              description : donator user email
*          userPhone:
*              type: integer
*              description : donator user phone
*          amount:
*              type: integer
*              description : donation amount
*          payForm:
*              type: string
*              description:  donation pay form
*          statusPay:
*              type: string
*              description:  donation status
*          message:
*              type: string
*              description : donator message
*       required:
*          - email
*          - transaction_amount
*          - description
*          - payment_method_id
*          - userId
*          - userName
*          - userLastName
*          - useEmail
*          - userPhone
*          - amount
*          - payForm
*          - statusPay
*          - message
*       example:
*          payer:
*             email: test_user_1293350713@testuser.com
*          transaction_amount: 100
*          description: donacion con ticket rapipago o pagofacil de mercadopago
*          payment_method_id: rapipago
*          userId: 3
*          userName: Regular
*          userLastName: MercadoPago
*          userEmail: test_user_1293350713@testuser.com
*          userPhone: 256346
*          amount: 100
*          statusPay: Pend
*          payForm: merc_pag AR$ rapipago
*          message: donacion con MercadoPago             
*/

/**
 * @swagger
 * /api/donations/listPaymentMethodsMercadoPago :
 *   post:
 *     security:
 *        - bearerAuth: []
 *     tags: [DonationsMercadoPago]
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: return payments type list from Mercado Pago
 *       500:
 *         description: server error
 */

/**
 * @swagger
 * /api/donations/payWithTicketMercadoPago:
 *   post:
 *     security:
 *        - bearerAuth: []
 *        
 *     tags: [DonationsMercadoPago]
 *     requestBody:
 *          required: true
 *          content:
 *            application/json:
 *               schema:
 *                 type: object
 *                 $ref: '#/components/schemas/DonationsMP'
 *     responses:
 *       200:
 *         description: return ticket form to make the payment 
 *       500:
 *         description: server error
 */

/**
 * @swagger
 * /api/donations/payWithTotalMercadoPago:
 *   post:
 *     security:
 *        - bearerAuth: []
 *        
 *     tags: [DonationsMercadoPago]
 *     requestBody:
 *          required: true
 *          content:
 *            application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                    quantity:
 *                       type: integer
 *                       example: 1
 *                    amount: 
 *                       type: integer
 *                       example: 100
 *                    title:
 *                       type: string
 *                       example: donacion de test_user_1293350713@testuser.com
 *     responses:
 *       200:
 *         description: return url to redirect Mercadopago site 
 *       500:
 *         description: server error
 */



