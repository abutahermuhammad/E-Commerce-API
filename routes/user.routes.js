const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");

/**
 * Get All User
 */
router.route("/").get(userController.getUsers).post(userController.createUser);

router.route("/:id").get(userController.getSingleUser);

module.exports = router;
