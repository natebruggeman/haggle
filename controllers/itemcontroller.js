const express = require('express');
const router = express.Router();
const Item = require('../models/itemsmodel.js')
const User = require('../models/users.js')





// router.get('/sell', (req, res) => {
// 	console.log('hitting this route 1');
// 	res.render('/items/sell.ejs')
// })


// router.post('/sell', (req, res) => {
// 	console.log('hitting this route');
// })


router.get('/sell', (req, res) => {
	User.find({}, (err, foundUsers) => {
		if (err){
			res.send(err)
		} else {
			res.send(foundUsers)
			console.log(foundUsers);
		}
 	})
})


module.exports = router;

