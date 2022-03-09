const express = require('express');
const router = express.Router();
const orderController = require('../controller/order.controllers');


/**
 * Get All Orders
 */
router.get('/order', orderController.getOrders);


 /**
  * Place New Order
  */
router.post('/order', orderController.placeNewOrder);
 
 
 /**
  * Get a Order
  */
router.get('/order/:id', orderController.getSingleOrder); 
 
 
 /**
  * Update a Order
  */
router.put('/order/:id', orderController.updateSingleOrder);

/**
 * Track order
 */
// router.get('/track/:id/:email', orderController.trackOrder);
router.get('/track/:id/:email', orderController.trackOrder);

 
module.exports = router;