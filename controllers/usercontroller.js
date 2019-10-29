const express = require('express');
const router  = express.Router();
const Item  = require('../models/itemsmodel.js');
const User = require('../models/users.js')

router.get("/", (req, res, next) => {
  User.findById(req.params.id, (err, foundUser) => {
    console.log(foundUser);
    console.log('this is foundUser');
    if (err) {
      next(err);
    } else {
      res.render('users/profile.ejs', {
        user: foundUser
      })
    }
  })
 });

router.get('/:id/edit', (req, res, next) => {
    User.findById(req.params.id, (err, foundUser) => {
      console.log(foundUser);
      console.log('this is foundUser');
      if (err) {
        next(err);
      } else {
        res.render('users/editprofile.ejs', {
          user: foundUser
        })
      }
    })
 })
 
 router.put('/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, {new: true},(err, updatedUser) => {
    if(err){
      res.send(err);
    } else{
      res.redirect('/users');
    }
  });
});

module.exports = router;
