const express = require('express');
const app = express();
const morgan = require('morgan');
// app.use(morgan('dev'));

app.use((req, res, next) => {
    req.requestTime = Date.now();
    // console.log(req.method, req.path);
    next();
})

const verifyPassword = (req, res, next) => {
    const { password } = req.query;
    if (password === '123456789') {
        next();
    } else {
        res.send("Incorrect Password!")
    }
}

app.get('/', (req, res) => {
    console.log(req.requestTime);
    res.send("HomePage");
})

app.get('/dogs', (req, res) => {
    console.log(req.requestTime);
    res.send("I once waved back at someone who wasn’t waving at me—so I pretended to swat a fly to save myself.");
})

app.get('/secret', verifyPassword, (req, res) => {
    res.send('I said “you too” to a waiter after they told me to enjoy my meal.');
})

app.use((req, res) => {
    res.status(404).send("Oh! Not Found")
})

app.listen(3000, () => {
    console.log("Listening on Port 3000");
})