const express = require("express");
const router = express.Router();
const request = require("request");
const util = require("util");
const requestPromise = util.promisify(request);
var crypto = require("crypto");
const mongoose = require("mongoose");
var sdk = require("paymaya-node-sdk");
const axios = require("axios");

// DB Config
const db = require("../../config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then()
  .catch(err => console.log(err));


// Load User model
const cashin = require("../../models/CashinTransactions");
const withdrawal = require("../../models/WithdrawalTransactions");
const moneyxfer = require("../../models/MoneyTransferTransactions");
const user_profiles = require("../../models/UserProfiles");

const getTokenUrl = 'https://api.paymongo.com/v1/tokens';

var token;

async function findUser(userId) {
  return user_profiles.findOne({ user_id: userId}, function(err, profile){
    return profile;
  });
}

function getUserToken(user, callback) {
  request.post(getTokenUrl, {
    headers: {
      "Authorization": "Basic " + new Buffer('sk_test_7ESwkXHQiyjaFSuEWi7gEYZ9').toString("base64")
    },
    json: {
      "data": {
        "attributes": {
          "number": "4242424242424242",
          "exp_month": 1,
          "exp_year": 22,
          "cvc": "201",
          "billing": {
            "address": {
              "line1": user.billing_address1,
              "line2": user.billing_address2,
              "city": user.billing_city,
              "state": user.billing_state,
              "postal_code": user.billing_zip,
              "country": 'PH'
            },
            "name": user.first_name + ' ' + user.last_name,
            "email": user.email_address,
            "phone": user.mobile_phone
          }
        }
      }
    }
  }, function (error, response, body) {
    if (error) {
      return callback(error || {statusCode: response.statusCode});
    }
    return callback(null, body.data.id)
  });
}


function setToken(t) {
  token = t;
  return 1;
}

async function getToken(userId, callback) {
  var user = await findUser(userId);
  getUserToken(user, function(err, body) {
    if (err) {
      return callback(err, null);
    } else {
      return callback(null, body);
    }
  })
}


router.post("/cashin", (req, resp) => {
  // Form validation
  let date = new Date();
  let month = ("0" + (date.getMonth() + 1)).slice(-2);
  let creationDate =  month + '/' + date.getDate() +'/'+ date.getFullYear();
  let referenceNum = crypto.randomBytes(20).toString('hex');
  var cashInAmount = req.body.cashInAmount
  getToken(req.body.userId, function(err, body) {
    if (err) {
      console.log(err)
    } else {
      token = body;
      const newCashin = new cashin({
        cashInAmount: req.body.cashInAmount,
        cashInChannel: req.body.cashInChannel,
        memberCode: req.body.memberCode,
        verificationID: token,
        creationDate: creationDate,
        referenceNum: referenceNum,
        userId: req.body.userId
      });
      newCashin
        .save()
        .then(cashin => resp.json(cashin))
        .catch(err => console.log(err));
    }
  });
  console.log('TOK CASHIN:'+token)
});
module.exports = router;

/** PAYMAYA CODE
 * contact.phone = contactOptions.phone;
      contact.email = contactOptions.email;
      buyerOptions.contact = contact;

      address.line1 = addressOptions.line1;
      address.line2 = addressOptions.line2;
      address.city = addressOptions.city;
      address.state = addressOptions.state;
      address.zipCode = addressOptions.zipCode;
      address.countryCode = addressOptions.countryCode;
      buyerOptions.shippingAddress = address;
      buyerOptions.billingAddress = address;

      buyer.firstName = buyerOptions.firstName;
      buyer.middleName = buyerOptions.middleName;
      buyer.lastName = buyerOptions.lastName;
      buyer.contact = buyerOptions.contact;
      buyer.shippingAddress = buyerOptions.shippingAddress;
      buyer.billingAddress = buyerOptions.billingAddress;

      var itemAmountDetailsOptions = {
        shippingFee: "0",
        tax: "0",
        subTotal: "0" 
      };
      
      var itemAmountOptions = {
        currency: "PHP",
        value: req.body.cashInAmount
      };
      
      var itemOptions = {
        name: "Cash In",
        code: "247w-cashin",
        description: "Cash In"
      };
      
      var itemAmountDetails = new ItemAmountDetails();
      itemAmountDetails.shippingFee = itemAmountDetailsOptions.shippingFee;
      itemAmountDetails.tax = itemAmountDetailsOptions.tax;
      itemAmountDetails.subTotal = itemAmountDetailsOptions.subTotal;
      itemAmountOptions.details = itemAmountDetails;
      
      var itemAmount = new ItemAmount();
      itemAmount.currency = itemAmountOptions.currency;
      itemAmount.value = itemAmountOptions.value;
      itemAmount.details = itemAmountOptions.details;
      itemOptions.amount = itemAmount;
      itemOptions.totalAmount = itemAmount;
*/
      /**
      * Contruct item here
      */
     /*
      var item = new Item();
      item.name = itemOptions.name;
      item.code = itemOptions.code;
      item.description = itemOptions.description;
      item.amount = itemOptions.amount;
      item.totalAmount = itemOptions.totalAmount;

      // Add all items here
      var items = [];
      items.push(item);

      checkout.buyer = buyer;
      checkout.totalAmount = itemOptions.totalAmount;
      checkout.requestReferenceNumber = referenceNum;
      checkout.items = items;

      checkout.execute(function (error, response) {
        if (error) {
            console.log(error)
        } else {
            // track response.checkoutId
            // redirect to response.redirectUrl
            const newCashin = new cashin({
              cashInAmount: req.body.cashInAmount,
              cashInChannel: req.body.cashInChannel,
              memberCode: req.body.memberCode,
              verificationDetails: {
                checkoutId: response.checkoutId
              },
              creationDate: creationDate,
              referenceNum: referenceNum,
              userId: req.body.userId
            });
            newCashin
              .save()
              .then(cashin => res.json(cashin))
              .catch(err => console.log(err));
        }
    });
 */