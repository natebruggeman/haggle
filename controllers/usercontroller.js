const express = require('express');
const router = express.Router();
const Item = require('../models/itemsmodel.js');
const User = require('../models/users.js')

// router.get("/", (req, res, next) => {
//   User.findById(req.params.id, (err, foundUser) => {
//     console.log(foundUser);
//     console.log('this is foundUser');
//     if (err) {
//       next(err);
//     } else {
//       res.render('users/profile.ejs', {
//         user: foundUser
//       })
//     }
//   })
//  });

// show profile route
router.get("/:id", (req, res, next) => {

  User.findById(req.params.id, (err, foundUser) => {
    if (err) {
      next(err);
    } else {
      res.render('users/profile.ejs', {
        user: foundUser
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
        user: foundUser
      })
    }
  })
})

router.put('/:id', (req, res) => {
  console.log("this is req.session.userId")
  console.log(req.session.userId)
  console.log("this is req.params.id")
  console.log(req.params.id)
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
router.delete('/:id/edit', async (req, res, next) => {

  try {
    const deletedUser = await User.findByIdAndRemove(req.params.id)
    console.log(deletedUser);
    res.redirect('login.ejs');

  } catch (err) {
      next(err)
    }
});


module.exports = router;
