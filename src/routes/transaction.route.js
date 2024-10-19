const transactionController = require("../controllers/transaction.controller");
const express = require('express');
const { topUpAmountRules, offsetAndLimitRules, serviceCodeRules } = require("../utils/validationRules/transaction.rules");
const router = express.Router();


router.get('/balance', transactionController.balance)
router.post('/topup', topUpAmountRules, transactionController.topup)
router.post('/transaction', serviceCodeRules, transactionController.transaction)
router.get('/transaction/history', offsetAndLimitRules, transactionController.history)

module.exports = router;