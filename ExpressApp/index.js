const express = require('express');
const app = express();

app.listen(3000, () => {
    console.log('Listening on Port 3000')
});

app.get('/r/:subreddit/:postnum', (req, res) => {
    const { subreddit, postnum } = req.params;
    res.send(`You are viewing Postnumber ${postnum} of ${subreddit} subreddit`)
})

app.get('/search', (req, res) => {
    const { q } = req.query;
    if (!q) {
        res.send('Nothing found if nothing searched')
    }
    res.send(`Showing search results for ${q}`)
})

app.get('/cats', (req, res) => {
    res.send('Meow');
})

app.get('/dogs', (req, res) => {
    res.send('Woof');
})

app.get('/', (req, res) => {
    res.send('This is the homepage');
})

app.get('*', (req, res) => {
    res.send('Invalid Path');
})