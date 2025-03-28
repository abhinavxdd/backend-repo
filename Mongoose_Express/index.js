const express = require('express');
const app = express();
const path = require('path');

const mongoose = require('mongoose');
const Product = require('./models/product');

mongoose.connect('mongodb://127.0.0.1:27017/farmStand')
    .then(() => {
        console.log("Mongo Connection Open")
    })
    .catch((e) => {
        console.log("Mongo Connection Error")
        console.log(e)
    })

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/products', async (req, res) => {
    const products = await Product.find({})
    // console.log(products)
    res.render('products/index', { products })
})

app.listen(3000, () => {
    console.log("Listening on Port 3000!")
})