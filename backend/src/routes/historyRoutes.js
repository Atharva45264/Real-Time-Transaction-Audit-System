const express = require("express");
const router = express.Router();
const historyController = require("../controllers/historyController");

router.get("/transactions/:userId", historyController.getUserTransactions);

module.exports = router;
