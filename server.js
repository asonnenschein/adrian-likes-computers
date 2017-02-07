'use strict';


var express = require('express');
var server = express();
var nunjucks = require('nunjucks');
var path = require('path');


nunjucks.configure(
    ['views', 'views/thoughts'], {
    autoescape: true,
    express: server,
    watch: true
});

server.use('/static', express.static(path.join(__dirname, '/static')));

server.get('/thoughts',
    function (req, res, next) {
        res.render('thoughts.html');
    });

server.get('/thoughts/:thought',
    function (req, res, next) {
        var thought = path.format({root: 'thoughts/', name: req.params.thought, ext: '.html'});
        res.render(thought);
    });

server.get('/work',
    function (req, res) {
        res.render('work.html');
    });

server.get('/about',
    function (req, res) {
        res.render('about.html');
    });

server.listen(3000, function () {
    console.log('Listening on port %d', this.address().port);
});