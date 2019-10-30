const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcryptjs');

// router.get('/registration', (req, res) => {
//   res.render('registration.ejs');
// });

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


      res.redirect('/featureditems');

    } catch (err) {
        next(err);
    }

});
router.post('/login', async (req, res, next) => {
  try {
    const foundUser = await User.findOne({
      username: req.body.username
    });

    if (foundUser) {


      if (bcrypt.compareSync(req.body.password, foundUser.password)) {

        req.session.message = '';

        req.session.username = foundUser.username;
        req.session.userId = foundUser.id;
        req.session.isLoggedIn = true;

        console.log(req.session);

        res.redirect('/featureditems')

      } else {
        req.session.message = 'Username or password is incorrect';
        res.redirect('/');
      }
    } else {

      req.session.message = 'Username or password is incorrect';
      res.redirect('/');

    }
  } catch (err) {
    res.send(err);
  }
})

router.get('/logout', (req, res) => {

  // creates a brand new cookie, without any of our properties
  // that we previously added to it
  req.session.destroy((err) => {
    if (err) {
      res.send(err);
    } else {
      console.log(req.session);
      console.log('this is current session');
      res.redirect('/');
    }
  })

})


module.exports = router;
