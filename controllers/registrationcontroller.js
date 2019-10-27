const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcryptjs');

// create new account route
router.post('/registration', async (req, res) => {

  const password = req.body.password;
  const hashedPassword= bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  const accountDbEntry = {};
  accountDbEntry.username = req.body.username;
  accountDbEntry.password = hashedPassword;
  accountDbEntry.email    = req.body.email;

  // added the user to the db
  const createdAccount = await User.create(accountDbEntry);
  console.log(createdAccount)
  req.session.username = createdAccount.username;
  req.session.logged = true;

  res.redirect('/index.ejs')


})

module.exports = router;
