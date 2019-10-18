const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const users = require("./routes/api/users");

const cashin = require("./models/CashinTransactions");

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
app.post('/cashin', function(req, res){
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

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
