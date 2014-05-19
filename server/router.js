var path = require("path");

function route (handle, static, pathname, response) {
  if (typeof handle[pathname] === "function") {
  	handle[pathname](static, response);
  } else if (path.extname(pathname) === ".css") {
    var filePath = path.join(static, pathname);
    handle["style"](filePath, response);
  } else if (path.extname(pathname) === ".js") {
    var filePath = path.join(static, pathname);
    handle["logic"](filePath, response);
  } else {
  	response.writeHead(404, {"Content-Type": "text/plain"});
  	response.write("404 Not found");
  	response.end();
  }
}

exports.route = route;