const express = require('express');
const mongoose  = require('mongoose');
const path = require('path');
const userRoutes = require('./resources/user/user.routes');

require('dotenv').config({
  path: path.join(__dirname, "../.env")
});

const app = express();
app.use(express.json());

const port = process.env.PORT || 4000;

mongoose.connect('mongodb://localhost:27017/rbac')
  .then(() => {
    console.log('Connected to the DB successfully');
  });

app.use('/', userRoutes);

app.listen(port, () => {
  console.log(`Server is listening on Port: ${port}`)
});