const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-Parser');
const multer = require('multer');
const path = require('path');
// const items = require('./routes/api/items');
const products = require('./routes/api/products');
const app = express();

//bodyParser middleware
app.use(bodyParser.json());

//DB config
const db = require('./config/keys').mongoURI;


// public folder
app.use(express.static('./public'))

//connect to mongodb
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('Mongodb connected...'))
    .catch(err => console.log(err));

// Use routes
// app.use('/api/items', items);
app.use('/api/products', products);
    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`Server started on port ${port}` ));
