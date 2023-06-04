const express = require('express');
const router = express.Router();
const reviewController = require('../controller/review.controllers');

/**
 * Get All Review
 */
router.route('/').get(reviewController.getReviews).post(reviewController.addNewReview);

/**
 * Get a Review
 */
router
  .route('/:id')
  .get(reviewController.getSingleReview)
  .put(reviewController.updateReview)
  .delete(reviewController.deleteReview);

module.exports = router;
