const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/movieApp')
    .then(() => {
        console.log("Connection open!")
    })
    .catch((e) => {
        console.log("Error!")
        console.log(e)
    })

const movieSchema = new mongoose.Schema({ //Blueprint
    title: { type: String, unique: true },
    year: Number,
    score: Number,
    rating: String
});

const Movie = mongoose.model('Movie', movieSchema); //creating model based on the model
// const amadeus = new Movie({ title: 'Amadeus', year: 1986, score: 9.2, rating: 'R' }) //creating a new movie object

Movie.insertMany([
    { title: 'Amelie', year: 2001, score: 8.3, rating: 'R' },
    { title: 'Alien', year: 1979, score: 8.1, rating: 'R' },
    { title: 'The Iron Giant', year: 1999, score: 7.5, rating: 'PG' },
    { title: 'Stand By Me', year: 1986, score: 8.6, rating: 'R' },
    { title: 'Moonrise Kingdom', year: 2012, score: 7.3, rating: 'PG-13' }
]) //no need to save() now
.then((data)=>{
    console.log("It worked!");
    console.log(data);
})
