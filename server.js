const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');

const PORT = 3000;

require('./db/db');

app.use(session({
  secret: "ejs is for the birds",
  resave: false,
  saveUninitialized: false
}));

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: false}));

const registrationController = require('./controllers/registrationcontroller.js');
app.use('/auth', registrationController);

const itemController = require('./controllers/itemcontroller.js');
app.use('/featureditems', itemController);


app.get('/', (req, res) => {
  res.render('registration.ejs');
 })



app.listen(PORT, () => {
console.log(`Listening on ${PORT}`);
})
