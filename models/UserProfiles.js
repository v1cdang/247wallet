const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const user_profiles = new Schema({
    user_id: {
        type: String,
        required: true
    },
    first_name: {
        type: String
    },
    last_name: {
    type: String
    },
    home_phone: {
        type: String
    },
    mobile_phone: {
    type: String
    },
    home_address1: {
        type: String
    },
    home_address2: {
    type: String
    },
    home_city: {
        type: String
    },
    home_state: {
        type: String
    },
    home_zip: {
    type: String
    },
    home_country: {
        type: String
    },
    billing_address1: {
    type: String
    },
    billing_address2: {
        type: String
    },
    billing_city: {
    type: String
    },
    billing_state: {
        type: String
    },
    billing_zip: {
        type: String
    },
    billing_country: {
        type: String
    },
    email_address: {
    type: String
    },
});

module.exports = userProfiles = mongoose.model("user_profiles", user_profiles);
