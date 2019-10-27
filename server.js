const express = require('express');
const app = express();
const PORT = 3000;

require('./db/db.js');




app.listen(PORT, () => {
console.log(`Listening on ${PORT}`);
})
