const express = require("express");
const router = express.Router();
const request = require("request");
const util = require("util");
const requestPromise = util.promisify(request);
var crypto = require("crypto");
const mongoose = require("mongoose");
var sdk = require("paymaya-node-sdk");
const axios = require("axios");
var PayMayaSDK = sdk.PaymayaSDK;
var Checkout = sdk.Checkout;
var Contact = sdk.Contact;
var Address = sdk.Address;
var Buyer = sdk.Buyer;
var ItemAmountDetails = sdk.ItemAmountDetails;
var ItemAmount = sdk.ItemAmount;
var Item = sdk.Item;
var checkout = new Checkout();

// DB Config
const db = require("../../config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));


PayMayaSDK.initCheckout(
  'pk_test_BcyJQeS41nputz7cA3Hh6D3j',
  'sk-sk_test_7ESwkXHQiyjaFSuEWi7gEYZ9',
  PayMayaSDK.ENVIRONMENT.SANDBOX
);

var callback = function(err, response) {
  if(err) {
     console.log(err);
     return;
  }
  console.log(JSON.stringify(response));
}



/*

*/



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

async function getToken(userId) {
  try {
    var user = await findUser(userId);
    var result = await findProfileandGetToken(user);
    console.log('RESULT IS : ' + result)
  } catch (e) {
    console.log(e)
  }
  
}

function setToken(t) {
  console.log('Setting token to: ' + JSON.stringify(t));
  token = t;
  return token;
}

async function findProfileandGetToken(user) {
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
  }, (error, res, body) => {
    //console.log(res);
    setToken(res.body.data.id);
  });
}



// @route POST api/users/cashin
// @desc Register user
// @access Public
router.post("/cashin", (req, resp) => {
  // Form validation
  let date = new Date();
  let month = ("0" + (date.getMonth() + 1)).slice(-2);
  let creationDate =  month + '/' + date.getDate() +'/'+ date.getFullYear();
  let referenceNum = crypto.randomBytes(20).toString('hex');
  var addressOptions = {};
  var contactOptions = {};
  var buyerOptions = {};
  var contact = new Contact();
  var address = new Address();
  var buyer = new Buyer();
  var cashInAmount = req.body.cashInAmount


  
  
  getToken(req.body.userId)
  .then(() => {
    console.log('TOKEN IS: ' + token)
    if (!typeof token ==='undefined') {
      const newCashin = new cashin({
        cashInAmount: cashInAmount,
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
  })
  .catch();
  


  
  
});

// @route POST api/users/moneyxfer
// @desc Register user
// @access Public
router.post("/moneytransfer", (req, res) => {
  // Form validation
  let date = new Date();
  let creationDate = date.getMonth() + '/' + date.getDate() +'/'+ date.getFullYear();
  let referenceNum = crypto.randomBytes(20).toString('hex');
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
    creationDate: creationDate,
    referenceNum: referenceNum,
    receivedDate: '',
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
  let referenceNum = crypto.randomBytes(20).toString('hex');
  const newWithdrawal = new withdrawal({
    withdrawalAmount: req.body.withdrawalAmount,
    withdrawFrom: req.body.withdrawFrom,
    verificationDetails: {},
    creationDate: creationDate,
    referenceNum: referenceNum,
    userId: req.body.userId
  });
  newWithdrawal
    .save()
    .then(withdrawal => res.json(withdrawal))
    .catch(err => console.log(err));
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