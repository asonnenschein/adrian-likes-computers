
var express = require('express')
  , nunjucks = require('nunjucks')
  , fs = require('fs')
  , path = require('path')
  ;

var server = express();

var images = path.join(__dirname, 'images')
  , style = path.join(__dirname, 'style')
  , script = path.join(__dirname, 'script')
  , vendor = path.join(__dirname, 'vendor')
  , fonts = path.join(__dirname, 'fonts')
  ;

nunjucks.configure('views', {
  autoescape: true,
  express: server
});

server.use('/style', express.static(style));
server.use('/scripts', express.static(script));
server.use('/images', express.static(images));
server.use('/vendor', express.static(vendor));
server.use('/fonts', express.static(fonts));

server.get('/thoughts', function (req, res) {
  res.render('thoughts.html');
});

server.get('/work', function (req, res) {
  res.render('work.html');
});

server.get('/play', function (req, res) {
  res.render('play.html');
});

server.get('/about', function (req, res) {
  res.render('about.html');
});

server.listen(3000, function () {
  console.log('Listening on port %d', this.address().port);
});