const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/productApp')
    .then(() => {
        console.log("Connection open!")
    })
    .catch((e) => {
        console.log("Error!")
        console.log(e)
    })

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        min: [0, 'Price cannot be negative']
    },
    onSale: {
        type: Boolean,
        default: false
    },
    categories: {
        type: [String]
    },
    qty: {
        online: {
            type: Number,
            default: 0
        },
        inStore: {
            type: Number,
            default: 0
        }
    },
    engine: {
        type: String,
        enum: ['350cc', '500cc']
    }
});
productSchema.methods.toggleOnSale = function () {
    this.onSale = !this.onSale;
    return this.save();
}

productSchema.methods.addCategory = function (newCat) {
    this.categories.push(newCat);
    return this.save();
}

productSchema.statics.fireSale = function () {
    return this.updateMany({}, { onSale: true, price: 0 })
}

const Product = mongoose.model('Product', productSchema);


const findProduct = async () => {
    const foundProduct = await Product.findOne({ name: 'Mountain Bike' });
    console.log(foundProduct);
    await foundProduct.toggleOnSale();
    console.log(foundProduct);
    await foundProduct.addCategory('Outdoors');
    console.log(foundProduct);
}

// findProduct();
Product.fireSale().then(res => console.log(res));

// const bike = new Product({ name: 'Mountain Bike', price: 999, onSale: true, categories: ['Cycling', 'Bikes'], engine: '350cc' })
// bike.save()
//     .then((data) => {
//         console.log("It worked!")
//         console.log(data);
//     })
//     .catch((e) => {
//         console.log(e);
//     })

// Product.findOneAndUpdate({ name: 'Mountain Bike' }, { price: 899 }, { new: true, runValidators: true })
//     .then((data) => {
//         console.log("It worked!")
//         console.log(data);
//     })
//     .catch((e) => {
//         console.log(e);
//     })