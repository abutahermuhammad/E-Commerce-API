const express = require('express');
const productController = require('../controller/product.controllers');
const router = express.Router();


/**
 * Get All Products
 */
router.get('/product', productController.getProducts);


/**
 * Add New Product
 */
router.post('/product', productController.addNewProduct);


/**
 * Get a Product
 */
 router.get('/product/:id', productController.getSingleProduct);


/**
 * Update a Product
 */
router.put('/product/:id', productController.updateProduct);
 

/**
 * Delete a Product
 */
router.delete('/product/:id', productController.deleteProduct);


module.exports = router;