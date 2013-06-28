var express = require('express');
var app = express();

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.send(500, 'Something broke!');
});

app.get('/hello.txt', function (req, res) {
    var body = 'Hello World';
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Length', body.length);
    res.end(body);
});

app.get('/hello', function (req, res) {
    res.send('Hello there');
});

app.listen(process.env.PORT || 3000);
console.log('Listening on port ' + (process.env.PORT || 3000));