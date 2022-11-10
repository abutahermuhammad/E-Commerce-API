const express = require("express");
const router = express.Router();
const paymentController = require("../controller/payment.controllers");

/**
 * Get All Orders
 */
router
  .route("/")
  .get(paymentController.getPayment)
  .post(paymentController.placeNewPayment);

/**
 * Get a Order
 */
router
  .route("/:id")
  .get(paymentController.getSinglePayment)
  .put(paymentController.updateSingleOPayment);

module.exports = router;
