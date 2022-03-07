const express = require('express');
const router = express.Router();
const reviewController = require('../controller/review.controllers');


/**
 * Get All Review
 */
router.get('/review', reviewController.getReviews);


/**
 * Add New Review
 */
router.post('/review', reviewController.addNewReview);


/**
 * Get a Review
 */
 router.get('/review/:id', reviewController.getSingleReview);


/**
 * Update a Review
 */
router.put('/review/:id', reviewController.updateReview);
 

/**
 * Delete a Review
 */
router.delete('/product/:id', reviewController.deleteReview);


module.exports = router;