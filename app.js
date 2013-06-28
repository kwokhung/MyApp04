var http = require("http");
var port = process.env.PORT || 1337;

http.createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>My App 04 (v0.0.1)</h1><br />Node version: " + process.version + "<br />");
}).listen(port);