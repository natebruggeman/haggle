require('dotenv').config()
console.log(process.env);

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const PORT = 3000;

require('./db/db');

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'))



const registrationController = require('./controllers/registrationcontroller.js');
app.use('/auth', registrationController);

const itemController = require('./controllers/itemcontroller.js');
app.use('/featureditems', itemController);

const userController = require('./controllers/usercontroller.js');
app.use('/profile', userController);





app.get('/', (req, res) => {
  res.render('login.ejs');
});
app.get('/registration', (req, res) => {
  res.render('registration.ejs');
});


app.listen(PORT, () => {
console.log(`Listening on ${PORT}`);
})
