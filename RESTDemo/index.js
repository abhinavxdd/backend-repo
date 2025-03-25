const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const { v4: uuid } = require('uuid');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let comments = [
    {
        id: uuid(),
        username: 'Todd',
        comment: 'Lol'
    },
    {
        id: uuid(),
        username: 'Skylar',
        comment: 'Haha, crazy one'
    },
    {
        id: uuid(),
        username: 'Walt',
        comment: 'OMG, so cute'
    }
]

app.get('/comments', (req, res) => {
    res.render('comments/index', { comments });
})

app.get('/comments/new', (req, res) => {
    res.render('comments/new');
})
// We are rendering new.ejs template using get request

app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment, id: uuid() });
    res.redirect('/comments');
})

app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id.trim() === id.trim())
    console.log(comment);
    res.render('comments/show', { comment })
})

app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments');
})

app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id)
    res.render('comments/edit', { comment })
})

app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const newComment = req.body.comment;
    const foundComment = comments.find(c => c.id === id);
    foundComment.comment = newComment;
    res.redirect('/comments')
})

app.post('/tacos', (req, res) => {
    const { meat, qty } = req.body;
    res.send(`Your order of ${qty} ${meat} tacos is successful!!`)
})

app.get('/tacos', (req, res) => {
    res.send('/tacos GET request')
})

app.listen(3000, () => {
    console.log("Listening on Port 3000")
})