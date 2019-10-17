const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const cashinModel = require("../../models/CashinTransaction");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/cashin", (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }


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


module.exports = router;
