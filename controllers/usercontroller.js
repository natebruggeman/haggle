const express = require('express');
const router = express.Router();
const Item = require('../models/itemsmodel.js');
const User = require('../models/users.js');

// show profile route
router.get("/:id", (req, res, next) => {

  User.findById(req.params.id, (err, foundUser) => {
    if (err) {
      next(err);
    } else {
      res.render('users/profile.ejs', {
          userId: req.session.userId,
          username: req.session.username,
          email: req.session.email
      });
    }
  })

});

// edit route
router.get('/:id/edit', (req, res, next) => {
  User.findById(req.params.id, (err, foundUser) => {
    console.log(foundUser);
    console.log('this is foundUser');
    if (err) {
      next(err);
    } else {
      res.render('users/editprofile.ejs', {
        userId: req.session.userId,
        username: req.session.username,
        email: req.session.email
      })
    }
  })
})

router.put('/:id', (req, res) => {

  User.findByIdAndUpdate(req.session.userId, req.body, {
    new: true
  }, (err, updatedUser) => {
    if (err) {
      res.send(err);
    } else {
      res.redirect(`/profile/${updatedUser.id}`);
    }
  });
});
router.delete('/:id', async (req, res, next) => {

  try {
    const deletedUser = await User.findByIdAndRemove(req.session.userId)
    console.log(deletedUser);
    console.log('this is the destroyed user');
    req.session.destroy((err, next) => {
      if (err) {
        next(err);
      } else {
        res.redirect('/');
      }
    })
  } catch (err) {
      next(err)
    }
});


module.exports = router;
