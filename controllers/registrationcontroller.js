const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcryptjs');

 // create new account route
router.post('/registration', async (req, res, next) => {
    try {
      //hashing user password
      const password = req.body.password;
      const hashedPassword= bcrypt.hashSync(password, bcrypt.genSaltSync(10));

      // db object creation for user
      const accountDbEntry = {};
      accountDbEntry.name = req.body.name;
      accountDbEntry.username = req.body.username;
      accountDbEntry.email    = req.body.email;
      accountDbEntry.password = hashedPassword;

      // adding the user to the db
      const createdAccount = await User.create(accountDbEntry)
      console.log(createdAccount)
      console.log('is this hitting?');
      req.session.anyProperty = 'any name';
      req.session.isLogged = true;
      res.redirect('/featureditems');
      console.log(req.session);

    } catch (err) {
        next(err);
    }
    res.redirect('/featureditems')

})


module.exports = router;
