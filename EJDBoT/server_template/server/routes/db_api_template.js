const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Replace below with whatever model.js file you're using to define the Schema, as well as its path
const mymodel = require('../models/mymodel');

// Replace with database path
const db = "mongodb://db-location";

// Avoiding a deprecation warning about mongoose's default promise library
mongoose.Promise = global.Promise;

mongoose.connect(db, function(err) {
    if(err) {
        console.log("Database connection error, ARGH!");
    }
});

// Replace with relevant router pathing
router.get('/path', function(req, res) {

    console.log("Requesting posts...");

    mymodel.find({})
        .exec(function(err, posts) {
            if (err) {
                console.log("Error getting the posts! :-/");
            } else {
                // The function in exec returns POSTS above, if err isn't a thing, and we attach the posts as a JSON to the response and also console.log them
                res.json(posts);
            }
        });
});

module.exports = router;