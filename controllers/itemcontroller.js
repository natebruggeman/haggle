const express = require('express');
const router  = express.Router();
const Item  = require('../models/itemsmodel.js');
const User = require('../models/users.js')


router.get('/', async (req, res) => {
  console.log(req.session);
  try {
    const foundItems = await Item.find({});
    res.render('items/featureditems.ejs', {
      items: foundItems,
      userId: req.session.userId,
      username: req.session.username
    })
  } catch(err) {
    res.send(err);
  }
});


router.get('/new', async (req, res) => {
  try{

  res.render('items/sell.ejs',{
    userId: req.session.userId,
    username: req.session.username
  });
  } catch(err) {
    next(err)
  }
});

router.get('/:id/buy', async (req, res) => {
  try{
    const foundItem = await Item.findById(req.params.id)

    res.render('items/purchase.ejs', {
      item: foundItem,
      userId: req.session.userId,
      username: req.session.username
    })
  } catch(err) {
      next(err)
    }
});

router.get('/:id/confirmation', async (req, res) => {
  try{
    const foundItem = await Item.findById(req.params.id)

  res.render('items/confirmation.ejs', {
      item: foundItem,
      userId: req.session.userId,
      username: req.session.username
    })
  } catch(err) {
      next(err)
    }
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
      userId: req.session.userId,
      username: req.session.username
    });
  } catch(err) {
    next(err)
  }
});

router.get('/:id/edit', async (req, res) => {
  try{
    const foundItem = await Item.findById(req.params.id)

    res.render('items/edit.ejs', {
      item: foundItem,
      userId: req.session.userId,
      username: req.session.username
    })
  } catch(err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try{
    const updateItem = await Item.findByIdAndUpdate(req.params.id, req.body, {new: true})
    console.log(updateItem);

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
