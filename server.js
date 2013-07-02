var express = require("express");
var app = express();

//app.enable("jsonp callback");

app.use(function (err, req, res, next) {
    console.error(err.stack);
    next(err);
});

app.use(function (err, req, res, next) {
    if (req.xhr) {
        res.send(500, { error: "Something blew up!" });
    } else {
        next(err);
    }
});

app.use(function (err, req, res, next) {
    res.status(500);
    res.render("error", { error: err });
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
    res.jsonp({ "analysis": "恒生指數收跌 0.1% 至 19,788 點。，在計及銀河娛樂 (27) 的 58 億元股份配售後，市場成交金額增至 436 億元水平。<br />恒生指数收跌 0.1% 至 19,788 点。，在计及银河娱乐 (27) 的 58 亿元股份配售後，市场成交金额增至 436 亿元水平。", "errCode": "0", "errMsg": "Market Outlook information retrieval success.", "status": "true", "timeDate": "20130628" });
});

app.get("/test04", function (req, res) {
    res.jsonp({
        "status": "true",
        "errCode": "0",
        "errMsg": "Press Release information retrieval succeeded.",
        "content": {
            "data": [
                { "id": 1, "headline": "HKD rises; spot USD T/T rate at 7.7564", "date": "20130702141619" },
                { "id": 2, "headline": "MTR CORPORATION (00066.HK) target cut to $32 by GS", "date": "20130702141619" }
            ]
        }
    })
});

app.listen(process.env.PORT || 3000);
console.log("Express server listening on port %d in %s mode", process.env.PORT || 3000, app.settings.env);