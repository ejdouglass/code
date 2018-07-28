const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const post = require('../models/post');

// Time to connect to our MongoDB! With mongoose! Obviously make sure you've installed mongoose!
// Just gotta point this bad boy to wherever your live, functioning DB happens to be living.
const db = "mongodb://ejd:codepostpw@ds235860.mlab.com:35860/codepostmdb";

// Avoiding a deprecation warning about mongoose's default promise library?
mongoose.Promise = global.Promise;

mongoose.connect(db, function(err) {
    if(err) {
        console.log("Database connection error, ARGH!");
    }
});

router.get('/posts', function(req, res) {
    // The console logging here is NOT going to the browser console, it's going to the command line!
    // Interesting... hm. Hmmmm. Okay, well, dig around with that later, I suppose...
    // ... I guess it's because this JS file isn't being read by a browser, but by NODE and other JS files.
    console.log("Requesting posts...");
    // The blank bracket means that the post.find will find ALL THE THINGS
    // The POST right down here is imported and defined from the corresponding Schema-based model at the top of the file
    post.find({})
        .exec(function(err, posts) {
            if (err) {
                console.log("Error getting the posts! :-/");
            } else {
                // The function in exec returns POSTS above, if err isn't a thing, and we attach the posts as a JSON to the response and also console.log them
                res.json(posts);
            }
        });
});

router.get('/details/:id', function(req, res) {
    console.log("Requesting a particular post...");
    post.findById(req.params.id)
        .exec(function(err, post) {
            if (err) {
                console.log("Error getting the post! :-/");
            } else {
                res.json(post);
            }
        });
});

router.post('/posts', function(req, res) {
    console.log("Posting a post, post-haste!");
    var newPost = new post();
    newPost.title = req.body.title;
    newPost.url = req.body.url;
    newPost.description = req.body.description;
    newPost.save(function(err, addedPost) {
        if (err) {
            console.log("Error inserting the post...");
        } else {
            res.json(addedPost);
        }
    });
});

// In order for our server.js file to access this api, we export the router.
module.exports = router;