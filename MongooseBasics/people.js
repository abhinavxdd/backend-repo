const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/productApp')
    .then(() => {
        console.log("Connection open!")
    })
    .catch((e) => {
        console.log("Error!")
        console.log(e)
    })

const personSchema = new mongoose.Schema({
    first: String,
    last: String
})

personSchema.virtual('fullName').get(function () {
    return `${this.first} ${this.last}`
})

personSchema.pre('save', async function () {
    this.first = 'Joe';
    this.last = 'Mama';
    console.log("About to save!")
})

personSchema.post('save', async function () {
    console.log("Just saved!")
})

const Person = mongoose.model('Person', personSchema);