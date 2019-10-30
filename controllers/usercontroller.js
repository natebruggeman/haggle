const express = require('express');
const router  = express.Router();
const Item  = require('../models/itemsmodel.js');
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
 router.get("/:id", (req, res, next) => {

   User.findById(req.params.id, (err, foundUser) => {
     if(err){
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
   User.findByIdAndUpdate(req.params.id, req.body, {new: true},(err, updatedUser) => {
    if(err){
      res.send(err);
    } else{
      res.redirect('/users/profile');
    }
  });
});
router.delete('/:id', (req, res) => {

  User.findByIdAndRemove(req.params.id, (err, deletedUser) => {
    const articleIds = [];
    // Collect all of the deletedUser's article's ID's
    for(let i = 0; i < deletedUser.user.length; i++){
      articleIds.push(deletedUser.user[i]._id);
    }

    // So now we want to remove all the user that were attached to the Users
    // document
    // from the Users collection
    User.deleteMany(
        {
          _id: {
            $in: userIds
          }
        },
        (err, data) => {
        res.redirect('/featureditems');
      }
    );
  });
});

module.exports = router;
