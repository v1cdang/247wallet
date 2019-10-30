const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CashinSchema = new Schema({
  cashInAmount: {
    type: String,
    required: true
  },
  cashInChannel: {
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
  referenceNum: {
    type: String,
    required: true
  },
  userId: {
      type: String,
      required: true
  }
});

module.exports = Cashin = mongoose.model("cashin", CashinSchema);
