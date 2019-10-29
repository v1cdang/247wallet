const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const users = require("./routes/api/users");
const transactions = require("./routes/api/transactions");


const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/transactions", transactions);
/*
app.post('/cashin', function(req, res){
  let date = new Date();
  let creationDate = date.getMonth() + '/' + date.getDate() +'/'+ date.getFullYear();
  const newCashin = new cashin({
    cashInAmount: req.body.cashInAmount,
    cashInChannel: req.body.cashInChannel,
    verificationDetails: {},
    creationDate: creationDate,
    userId: req.body.userId
  });
  newCashin
    .save()
    .then(cashin => res.json(cashin))
    .catch(err => console.log(err));
});

app.post('/withdrawal', function(req, res){
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
*/
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
