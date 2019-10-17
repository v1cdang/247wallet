const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CashinSchema = new Schema({
  withdrawalAmount: {
    type: String,
    required: true
  },
  withdrawalForm: {
    type: String,
    required: true
  },
  verificationDetails: {
    verificationID: {type: String, default: ""},
    verificationDate: {type: Date}
  },
  withdrawalDate: {
    type: Date,
    default: Date.now
  },
  userId: {
      type: Number,
      required: true
  }
});

module.exports = Cashin = mongoose.model("cashin", CashinSchema);
