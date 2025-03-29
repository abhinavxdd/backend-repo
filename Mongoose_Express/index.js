const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

const mongoose = require('mongoose');
const Product = require('./models/product');
const { resolveSoa } = require('dns');

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
app.use(express.urlencoded({ extended: true })); //to use req.body()

const categories = ['fruit', 'vegetable', 'dairy'];

app.get('/products', async (req, res) => {
    const { category } = req.query;
    if (category) {
        const products = await Product.find({ category })
        res.render('products/index', { products, category })
    } else {
        const products = await Product.find({})
        res.render('products/index', { products, category:'ALL' })
    }
    // console.log(products)

})

app.get('/products/new', async (req, res) => {
    const product = await Product.find({})
    res.render('products/new', { product, categories })
})

app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`)
})

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/show', { product });
})

app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', { product, categories });
})

app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/products/${product._id}`)
})

app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products');
})

app.listen(3000, () => {
    console.log("Listening on Port 3000!")
})