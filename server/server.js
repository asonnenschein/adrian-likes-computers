var http = require("http");
var url = require("url");
var path = require("path");

function start (route, handle) {
  function onRequest (request, response) {
  	var pathname = url.parse(request.url).pathname;
  	var root = path.dirname(require.main.filename);
  	var static = path.join(root, "../client");

    route(handle, static, pathname, response);
  };

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;