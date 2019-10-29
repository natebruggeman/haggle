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
router.post('/login', async (req, res, next) => {
  try {
      const foundUser = await User.findOne({username: req.body.username});
      // if User.findOne returns null/ or undefined it won't throw an error
      if(foundUser){

          // comparee thier passwords
          if(bcrypt.compareSync(req.body.password, foundUser.password)){
            // if true lets log them in
            // start our session
            req.session.message = '';
            // if there failed attempts get rid of the message
            // from the session
            req.session.username = foundUser.username;
            req.session.logged   = true;

            res.redirect('/authors')


          } else {
              // if the passwords don't match
             req.session.message = 'Username or password is incorrect';
             res.redirect('/');
          }

    } else {

      req.session.message = 'Username or password is incorrect';
      res.redirect('/');
      // / is where teh form is


    }
    } catch(err){
  res.send(err);
  }


 })

 router.get('/logout', (req, res) => {

  // creates a brand new cookie, without any of our properties
  // that we previously added to it
  req.session.destroy((err) => {
    if(err){
      res.send(err);
    } else {
      res.redirect('/');
    }
  })

})


module.exports = router;
