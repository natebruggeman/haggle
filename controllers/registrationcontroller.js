const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcryptjs');

router.get('/', (req, res) => {
    console.log('is this hitting?');
    req.session.anyProperty = 'any name';
    req.session.isLogged = true;
    res.redirect('/featureditems');
    console.log(req.session);

 })


module.exports = router;
