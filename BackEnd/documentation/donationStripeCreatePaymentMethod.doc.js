/**
* @swagger
* tags:
*   name: DonationsStripe_CreatePaymentMethodProcedure
*   description: Stripe procedure
* components:
*   schemas :
*     StripeCreatePaymentMethod:
*       type: object
*       properties:
*          type:
*              type: string
*              example: card
*              description: pay type
*          card:
*              type: object
*              properties:
*                number:
*                   type: integer
*                   example: 4242424242424242
*                   description: card number
*                exp_month:
*                   type: integer
*                   example: 05
*                   description: card expiration month
*                exp_year:
*                   type: integer
*                   example: 24
*                   description: card expiration year
*                cvc:
*                   type: integer
*                   example: 123
*                   description: card security code
*       required:
*          - type
*          - card        
*/

/**
* @swagger
* /v1/payment_methods:
*   post:
*     security:
*        - bearerAuth: []
*        - secret_key: []
*        - public_key: []
*     summary: get id to be able to make the payment
*     tags: [DonationsStripe_CreatePaymentMethodProcedure]
*     requestBody:
*          required: true
*          content:
*            application/x-www-form-urlencoded:
*               schema:
*                 type: object
*                 properties:
*                     type:
*                         type: string
*                         example: card
*                         description: pay type
*                     card[number]:
*                         type: string
*                         example: 4242424242424242
*                         description: card number
*                     card[exp_month]:
*                         type: integer
*                         example: 05
*                         description: card expiration month
*                     card[exp_year]:
*                         type: integer
*                         example: 24
*                         description: card expiration year
*                     card[cvc]:
*                         type: integer
*                         example: 123
*                         description: card security code
*     responses:
*       200:
*         description: return id for Confirm Pay
*       500:
*         description: server error
*/
