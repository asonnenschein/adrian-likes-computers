'use strict';


require('dotenv').config();

const express = require('express');
const bodyparser = require('body-parser');
const server = express();
const jwt = require('jsonwebtoken');
const database = require('./database');
const middleware = require('./middleware')(database, jwt);
const views = require('./views')(database, jwt);


server.set('port', process.env.PORT);
server.use(bodyparser.json({limit: '25mb'}));
server.use(bodyparser.urlencoded({extended: true}));


// Allow CORS =================================================================
server.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Expose-Headers", "Authorization");
    next();
});

// User Routes ================================================================
server.post('/register/',
    (req, res, next) => {
        return next();
    }, views.postRegister);

server.post('/login/',
    (req, res, next) => {
        return next();
    }, views.postLogin);

server.get('/logout/',
    middleware.requireAuthorization,
    (req, res, next) => {
        req.logout();
        res.status(200).end();
    });

server.get('/auth/',
    (req, res, next) => {
        return next();
    }, views.getAuth);

server.get('/user/:username/',
    middleware.requireAuthorization,
    (req, res, next) => {
        return next();
    }, views.getUser);


// Public Routes ==============================================================
server.get('/work/',
    (req, res, next) => {
        return next();
    }, views.getWork);

server.get('/about/',
    (req, res, next) => {
        return next();
    }, views.getAbout);

server.get('/thoughts/:thoughts_id?/',
    (req, res, next) => {
        return next();
    }, views.getThoughts);

server.post('/thoughts/:thoughts_id/',
    middleware.requireAuthorization,
    (req, res, next) => {
        return next();
    }, views.postThought);


module.exports = (callback) => {
    callback(server);
};