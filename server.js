'use strict';


require('dotenv').config();

const path = require('path');
const express = require('express');
const bodyparser = require('body-parser');
const server = express();
const jwt = require('jsonwebtoken');
const marked = require('marked');
const logger = require('morgan');
const database = require('./database');
const middleware = require('./middleware')(database, jwt);
const views = require('./views')(database, jwt, marked);

marked.setOptions({
    highlight: function(code) {
        return require('highlight.js').highlightAuto(code).value;
    }
});

if (process.env.NODE_ENV === "production") {
    server.use(logger('combined'));
}

server.set('port', process.env.PORT);
server.use(bodyparser.json({limit: '25mb'}));
server.use(bodyparser.urlencoded({extended: true}));


// Allow CORS =================================================================
server.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Expose-Headers", "Authorization");
    next();
});

// User Routes ================================================================
if (process.env.NODE_ENV === "development") {
    server.post('/api/register/',
        (req, res, next) => {
            return next();
        }, views.postRegister);

    server.post('/api/login/',
        (req, res, next) => {
            return next();
        }, views.postLogin);

    server.get('/api/logout/',
        middleware.requireAuthorization,
        (req, res, next) => {
            req.logout();
            res.status(200).end();
        });

    server.get('/api/auth/',
        (req, res, next) => {
            return next();
        }, views.getAuth);
}

// Public Routes ==============================================================
server.get('/api/about/',
    (req, res, next) => {
        return next();
    }, views.getAbout);

server.post('/api/about/',
    middleware.requireAuthorization,
    (req, res, next) => {
        return next();
    }, views.postAbout);

server.get('/api/thoughts/:thoughts_path?/',
    (req, res, next) => {
        return next();
    }, views.getThoughts);

server.post('/api/thoughts/:thoughts_path?/',
    middleware.requireAuthorization,
    (req, res, next) => {
        return next();
    }, views.postThought);

server.use(express.static(path.join(__dirname, 'build')));
server.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build/index.html'));
});


module.exports = (callback) => {
    callback(server);
};