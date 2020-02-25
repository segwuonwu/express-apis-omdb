require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const axios = require('axios');
const app = express();

// Sets EJS as the view engine
app.set('view engine', 'ejs');
// Specifies the location of the static assets folder
app.use(express.static('static'));
// Sets up body-parser for parsing form data
app.use(express.urlencoded({ extended: false }));
// Enables EJS Layouts middleware
app.use(ejsLayouts);

// Adds some logging to each request
//app.use(require('morgan')('dev'));

// Routes
app.get('/', function(req, res) {
    res.render('index');
});

app.get('/results', function(req, res) {
    var qs = {
        params: {
            s: req.query.title,
            apikey: process.env.OMDB_API_KEY
        }
    };

    axios.get('https://www.omdbapi.com/', qs)
        .then(function(response) {
            var results = response.data.Search;
            console.log(results);
            res.render('results', { movies: results }); // movies is from the forEach loop in the result.ejs
        }).catch(err => {
            console.log(err);
        }).finally(function() {
            console.log("Made it to this function!");
        })
});


app.get('/movies/:movie_id', function(req, res) {
    res.send("Testing my GET /movies/:movie_id route")
})

// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;