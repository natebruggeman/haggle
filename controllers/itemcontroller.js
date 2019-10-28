
const express = require('express');
const router  = express.Router();
const Item  = require('../models/itemsmodel.js');
const User = require('../models/users.js')


router.get('/', async (req, res) => {
  try {
    const foundItems = await Item.find({});
    console.log(foundItems);
    res.render('items/featureditems.ejs', {
      items: foundItems
    })
  } catch(err) {
    res.send(err);
  }
});



router.get('/new', (req, res) => {
  res.render('items/sell.ejs');
});


router.post('/', async (req, res) => {
	try{
		const createdItem = await Item.create(req.body)
		res.redirect('/featureditems')
	} catch(err) {
		next(err)
	}
})


module.exports = router;
