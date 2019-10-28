
const express = require('express');
const router  = express.Router();
const Item  = require('../models/itemsmodel.js');
const User = require('../models/users.js')


router.get('/', async (req, res) => {
  try {
    // const foundItems = await Item.find({});
    res.render('items/sell.ejs', {
      // Items: foundItems
    })
  } catch(err) {
    res.send(err);
  }
});



router.get('/new', (req, res) => {
  res.render('users/index.ejs');
});



module.exports = router;

