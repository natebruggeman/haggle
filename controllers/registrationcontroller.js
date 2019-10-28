const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcryptjs');

// create new account route
router.post('/registration', async (req, res) => {

  const password = req.body.password;
  const hashedPassword= bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  const accountDbEntry = {};
  accountDbEntry.name = req.body.name;
  accountDbEntry.username = req.body.username;
  accountDbEntry.email    = req.body.email;
  accountDbEntry.password = hashedPassword;

  // added the user to the db
  const createdAccount = await User.create(accountDbEntry);
  console.log(createdAccount)
  req.session.username = createdAccount.username;
  req.session.logged = true;

  res.redirect('/sell')


})

module.exports = router;
