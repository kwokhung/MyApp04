var express = require("express");
var app = express();

//app.enable("jsonp callback");

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.send(500, "Something broke!");
});

app.get("/test01", function (req, res) {
    var body = "Hello World";
    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Content-Length", body.length);
    res.end(body);
});

app.get("/test02", function (req, res) {
    res.send("Hello there");
});

app.get("/test03", function (req, res) {
    res.jsonp({ hello: "everybody" });
});

app.listen(process.env.PORT || 3000);
console.log("Express server listening on port %d in %s mode", process.env.PORT || 3000, app.settings.env);