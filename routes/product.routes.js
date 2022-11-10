const express = require("express");
const productController = require("../controller/product.controllers");
const router = express.Router();

/**
 * Get All Products
 */
router
  .route("/")
  .get(productController.getProducts)
  .post(productController.addNewProduct);

/**
 * Get a Product
 */
router
  .route("/:id")
  .get(productController.getSingleProduct)
  .put(productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = router;
