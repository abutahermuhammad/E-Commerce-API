const express = require("express");
const router = express.Router();
const cartController = require("../controller/cart.controllers");

/**
 * Get Previous Cart
 */
router.route("/").get(cartController.getCart).post(cartController.createCart);

/**
 * Delete Cart
 */
router.route("/:id").delete(cartController.deleteCart);

module.exports = router;
