const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
	title: {type: String, required: true},
	cost: {type: Number, required: true},
	description: String,
});



const Item = mongoose.model('Item', itemSchema);

module.exports = Item;



