const express = require('express');
const router = express.Router();
const cartController = require('../controller/cart.controllers');


/**
 * Get Previous Cart
 */
router.get('/cart', cartController.getCart);


/**
 * Create Cart
 */
router.post('/cart', cartController.createCart);


/**
 * Delete Cart
 */
router.delete('/cart/:id', cartController.deleteCart);


module.exports = router;