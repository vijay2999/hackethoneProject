const express = require('express');
const route = require('./Routes/route');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

mongoose.connect("mongodb+srv://vijay45:qIgUqUh4uRW6nRIY@vijay45.vnrkkph.mongodb.net/")
  .then(() => console.log("MongoDb is connected"))
  .catch(err => console.log(err));

app.use('/', route);

app.listen(3000, function () {
  console.log('Express app running on port ' + 3000);
});
