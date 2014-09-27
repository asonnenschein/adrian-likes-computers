var express = require('express')
  , fs = require('fs')
  , path = require('path');

var server = express();

var style = path.join(__dirname, 'client', 'style')
  , script = path.join(__dirname, 'client', 'script')
  , vendor = path.join(__dirname, 'client', 'vendor')
  , http = path.join(__dirname, 'client', 'serverhowto.html')
  , home = path.join(__dirname, 'client', 'index.html');

server.use('/style', express.static(style));
server.use('/scripts', express.static(script));
server.use('/vendor', express.static(vendor));

server.get('/', function (req, res) {
  fs.readFile(home, 'utf8', function (err, text) {
  	res.send(text);
  })
});

server.get('/node-js-core-http-server', function (req, res) {
  fs.readFile(http, 'utf8', function (err, text) {
  	res.send(text);
  })
});

server.listen(3000, function () {
  console.log('Listening on port %d', this.address().port);
});