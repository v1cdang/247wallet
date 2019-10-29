const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");


// Load User model
const cashin = require("../../models/CashinTransactions");
const withdrawal = require("../../models/WithdrawalTransactions")
const moneyxfer = require("../../models/MoneyTransferTransactions")


// @route POST api/users/cashin
// @desc Register user
// @access Public
router.post("/cashin", (req, res) => {
  // Form validation
  let date = new Date();
  let creationDate = date.getMonth() + '/' + date.getDate() +'/'+ date.getFullYear();
  const newCashin = new cashin({
    cashInAmount: req.body.cashInAmount,
    cashInChannel: req.body.cashInChannel,
    memberCode: req.body.memberCode,
    verificationDetails: {},
    cashInDate: creationDate,
    userId: req.body.userId
  });
  newCashin
    .save()
    .then(cashin => res.json(cashin))
    .catch(err => console.log(err));

});

// @route POST api/users/moneyxfer
// @desc Register user
// @access Public
router.post("/moneytransfer", (req, res) => {
  // Form validation
  let date = new Date();
  let creationDate = date.getMonth() + '/' + date.getDate() +'/'+ date.getFullYear();
  const newMoneyxfer = new moneyxfer({
    senderName: req.body.senderName,
    senderAddress: req.body.senderAddress,
    senderPhone: req.body.senderPhone,
    receiverName: req.body.receiverName,
    receiverAddress: req.body.receiverAddress,
    receiverPhone: req.body.receiverPhone,
    amountSent: req.body.amountSent,
    memberCode: req.body.memberCode,
    verificationDetails: {},
    cashInDate: creationDate,
    userId: req.body.userId
  });
  newMoneyxfer
    .save()
    .then(moneyxfer => res.json(moneyxfer))
    .catch(err => console.log(err));

});

router.post('/withdrawal', function(req, res){
  let date = new Date();
  let creationDate = date.getMonth() + '/' + date.getDate() +'/'+ date.getFullYear();
  const newWithdrawal = new withdrawal({
    withdrawalAmount: req.body.withdrawalAmount,
    withdrawFrom: req.body.withdrawFrom,
    verificationDetails: {},
    creationDate: creationDate,
    userId: req.body.userId
  });
  newWithdrawal
    .save()
    .then(withdrawal => res.json(withdrawal))
    .catch(err => console.log(err));
});


module.exports = router;
