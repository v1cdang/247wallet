const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const WithdrawalSchema = new Schema({
  withdrawalAmount: {
    type: String,
    required: true
  },
  withdrawFrom: {
    type: String,
    required: true
  },
  verificationDetails: {
    verificationID: {type: String, default: ""},
    verificationDate: {type: Date}
  },
  creationDate: {
    type: Date,
    default: Date.now
  },
  referenceNum: {
    type: String,
    required: true
  },
  userId: {
      type: String,
      required: true
  },
  fullName: {
      type: String,
      required: false
  }
});

module.exports = Withdrawal = mongoose.model("withdrawal", WithdrawalSchema);
