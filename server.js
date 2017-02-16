'use strict';


require('dotenv').config();

const express = require('express');
const server = express();
const jwt = require('jsonwebtoken');
const database = require('./database');
const middleware = require('./middleware')(database, jwt);
const views = require('./views')(database, jwt);

server.set('port', process.env.PORT);

// User Routes ================================================================
server.post('/register/',
    (req, res, next) => {
        return next();
    }, views.postRegister);

server.post('/login/',
    middleware.login,
    (req, res, next) => {

    });

server.get('/logout/',
    middleware.requireAuthorization,
    (req, res, next) => {

    });

server.get('/auth/',
    middleware.requireAuthorization,
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