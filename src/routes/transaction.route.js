const transactionController = require("../controllers/transaction.controller");
const express = require('express');
const router = express.Router();


router.get('/balance', transactionController.balance)
router.post('/topup', transactionController.topup)
router.post('/transaction', transactionController.transaction)
router.get('/transaction/history', transactionController.history)

module.exports = router;