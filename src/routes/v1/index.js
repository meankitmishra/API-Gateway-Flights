const express = require("express");
const UserRouter = require("./user-rouetes");
const { InfoController } = require("../../controllers");
const { UserMiddleware } = require("../../middlewares");
const router = express.Router();

router.get("/info", UserMiddleware.checkAuth, InfoController.info);
router.use("/user", UserRouter);
module.exports = router;
