const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const MoneyXferSchema = new Schema({
  senderName: {
    type: String,
    required: true
  },
  senderAddress: {
    type: String,
    required: true
  },
  senderPhone: {
    type: String,
    required: true
  },
  receiverName: {
    type: String,
    required: true
  },
  receiverAddress: {
    type: String,
    required: true
  },
  receiverPhone: {
    type: String,
    required: true
  },
  amountSent: {
    type: String,
    required: true
  },
  memberCode: {
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
  receivedDate: {
    type: Date,
    default: undefined
  },
  userId: {
      type: String,
      required: true
  }
});

module.exports = MoneyXfer = mongoose.model("moneyxfer", MoneyXferSchema);
