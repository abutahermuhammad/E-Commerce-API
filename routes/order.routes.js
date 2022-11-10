const express = require("express");
const router = express.Router();
const orderController = require("../controller/order.controllers");

/**
 * Get All Orders
 */
router
  .route("/")
  .get(orderController.getOrders)
  .post(orderController.placeNewOrder);

/**
 * Get a Order
 */
router
  .route("/:id")
  .get(orderController.getSingleOrder)
  .put(orderController.updateSingleOrder);

/**
 * Track order
 */
// router.get('/track/:id/:email', orderController.trackOrder);
router.get("/track/:id/:email", orderController.trackOrder);

module.exports = router;
