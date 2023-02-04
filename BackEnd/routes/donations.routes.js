var express = require('express');
var router = express.Router();

const {getAllDonations, createDonation, getDonationId, getAllDonationsByPayForm,
      getAllDonationsByEmail,getAllDonationsByCreate, getAllDonationsByStatusPay, deleteDonation, paymentsStripe, 
      payWithTicketMercadoPago,payWithTotalMercadoPago,listPaymentMethodsMercadoPago}= require('../controllers/donations.controllers');

const { authenticatedUser, verifyIsAdmin, idExists} = require('../middlewares');


router.get('/',verifyIsAdmin, authenticatedUser, getAllDonations)

router.get('/:id',idExists,verifyIsAdmin, authenticatedUser, getDonationId)

router.get('/byPayForm/:payForm',verifyIsAdmin, authenticatedUser, getAllDonationsByPayForm)
router.get('/byEmail/:userEmail',verifyIsAdmin, authenticatedUser, getAllDonationsByEmail)
router.get('/byDate/:create',verifyIsAdmin, authenticatedUser, getAllDonationsByCreate)
router.get('/byStatusPay/:statusPay',verifyIsAdmin, authenticatedUser, getAllDonationsByStatusPay)

router.post('/createDonation',authenticatedUser,createDonation)

router.post('/paymentsStripe', authenticatedUser,paymentsStripe)
router.post('/payWithTicketMercadoPago', authenticatedUser,payWithTicketMercadoPago)
router.post('/payWithTotalMercadoPago', payWithTotalMercadoPago)
router.post('/listPaymentMethodsMercadoPago',listPaymentMethodsMercadoPago)

router.delete('/:id', verifyIsAdmin,authenticatedUser, deleteDonation)

module.exports = router;