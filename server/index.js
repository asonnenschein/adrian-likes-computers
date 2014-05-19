var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle["/"] = requestHandlers.home;
handle["/home"] = requestHandlers.home;
handle["style"] = requestHandlers.style;
handle["logic"] = requestHandlers.logic;

server.start(router.route, handle);