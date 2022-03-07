const express = require('express');
const router = express.Router();
const paymentController = require('../controller/payment.controllers');


/**
 * Get All Orders
 */
 router.get('/payment', paymentController.getPayment);


 /**
  * Place New Order
  */
 router.post('/payment', paymentController.placeNewPayment);
 
 
 /**
  * Get a Order
  */
  router.get('/payment/:id', paymentController.getSinglePayment);
 
 
 /**
  * Update a Order
  */
 router.put('/payment/:id', paymentController.updateSingleOPayment);

 
 module.exports = router;