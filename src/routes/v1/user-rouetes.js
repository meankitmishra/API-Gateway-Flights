const express = require("express");
const { UserController } = require("../../controllers");
const { UserMiddleware } = require("../../middlewares");
const router = express.Router();

router.post("/signup", UserController.createUser);
router.post(
	"/signin",
	UserMiddleware.validateAuthRequest,
	UserController.signin
);

module.exports = router;
