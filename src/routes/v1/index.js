const express = require("express");
const UserRouter = require("./user-rouetes");
const { InfoController } = require("../../controllers");

const router = express.Router();

router.get("/info", InfoController.info);
router.use("/user", UserRouter);
module.exports = router;
