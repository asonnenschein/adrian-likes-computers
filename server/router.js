function route (handle, pathname, response) {
  var mimeType = {
  	".html": "text/html",
  	".css": "text/css",
  	".js": "text/javascript"
  };

  if (typeof handle[pathname] === "function") {
  	handle[pathname](response);
  	response.writeHead(200, )
  } else {
  	response.writeHead(404, {"Content-Type": "text/plain"});
  	response.write("404 Not found");
  	response.end();
  }
}

exports.route = route;