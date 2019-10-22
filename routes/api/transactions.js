const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");


// Load User model
const cashin = require("../../models/CashinTransactions");
const withdrawal = require("../../models/WithdrawalTransactions")


// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/cashin", (req, res) => {
  // Form validation

  const newCashin = new cashin({
    withdrawalAmount: req.body.withdrawalAmount,
    withdrawalForm: req.body.withdrawalForm,
    verificationDetails: {},
    withdrawalDate: req.body.withdrawalDate,
    userId: req.body.userId
  });
  newCashin
    .save()
    .then(cashin => res.json(cashin))
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
