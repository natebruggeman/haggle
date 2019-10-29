
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



router.get('/:id', async (req, res) => {
  try {
    const foundItem = await Item.findById(req.params.id)

    res.render('items/show.ejs', {
      item: foundItem,
    });
  } catch(err) {
    next(err)
  }
});

router.get('/:id/edit', async (req, res) => {
  try{
    const foundItem = await Item.findById(req.params.id)

    res.render('items/edit.ejs', {
      item: foundItem
    })
  } catch(err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try{

    const updateItem = await Item.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.redirect('/featureditems')
  } catch(err) {
    next(err)
  }
})

router.delete('/:id', async (req, res) => {
  try{
    const deletedItem = await Item.findByIdAndRemove(req.params.id);
    res.redirect('/featureditems')
  } catch(err) {
    next(err)
  }
})




module.exports = router;
