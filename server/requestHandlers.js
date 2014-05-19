var fs = require("fs");
var path = require("path");

function home (static, response) {
  var filePath = path.join(static, "index.html");
  var status = fs.stat(filePath, function (error) {
  	if (error) {
  	  response.writeHead(404, {"Content-Type": "text/plain"});
  	  response.write("404 Not found");
  	  response.end();
  	}

    response.writeHead(200, {"Content-Type": "text/html"});
    var file = fs.createReadStream(filePath);
    file.pipe(response);
  });
}

function style (file, response) {
  var status = fs.stat(file, function (error) {
  	if (error) {
  	  response.writeHead(404, {"Content-Type": "text/plain"});
  	  response.write("404 Not found");
  	  response.end();
  	}

    response.writeHead(200, {"Content-Type": "text/css"});
    fs.createReadStream(file).pipe(response);
  });
}

function logic (file, response) {
  var status = fs.stat(file, function (error) {
  	if (error) {
  	  response.writeHead(404, {"Content-Type": "text/plain"});
  	  response.write("404 Not found");
  	  response.end();
  	}

    response.writeHead(200, {"Content-Type": "text/javascript"});
    fs.createReadStream(file).pipe(response);
  });
}

exports.home = home;
exports.style = style;
exports.logic = logic;