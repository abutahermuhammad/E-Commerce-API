const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');


/**
 * Get All User
 */
router.get('/user', userController.getUsers);

/**
 * Add New User
 */
router.post('/user', userController.createUser);


/**
 * Get Single User
 */
 router.get('/user/:id', userController.getSingleUser);

module.exports = router;