var express = require("express");
var crypto = require("crypto");

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
    app.set("jsonp callback name", "jsonp");

    switch (req.query.service) {
        case "marketoutlook":
            res.jsonp({ "analysis": "Hang Seng Index closed down 0.3% at 21,901. Heavily weighted HSBC (5) declined 0.6%. Local banks and property companies showed mixed performance. New World Development (17) surged 2.3% whilst SHK Properties (16) shrank 1.2%. Lack of earnings surprise...", "errCode": "0", "errMsg": "Market Outlook information retrieval success.", "status": "true", "timeDate": "20130726" });
            break;
        case "hsiturnover":
            res.jsonp({ "errCode": "0", "errMsg": "HSI Turnover information retrieval success.", "status": "true", "turnover": "31.12" });
            break;
        case "hkindices":
            res.jsonp({ "errCode": "0", "errMsg": "HK Indices information retrival success.", "indIndicesArr": [{ "code": "HSI", "last": "21928.51", "netChange": "27.55", "netChangePercent": "0.13" }, { "code": "HSI-FIN", "last": "30855.68", "netChange": "-17.16", "netChangePercent": "-0.06" }, { "code": "HSI-PRO", "last": "29492.22", "netChange": "-25.50", "netChangePercent": "-0.09" }, { "code": "HSI-UTL", "last": "52611.49", "netChange": "182.27", "netChangePercent": "0.35" }, { "code": "HSI-C&I", "last": "12384.39", "netChange": "46.32", "netChangePercent": "0.38" }, { "code": "HSCCI", "last": "4135.24", "netChange": "-16.37", "netChangePercent": "-0.39" }, { "code": "HSCEI", "last": "9752.43", "netChange": "-0.17", "netChangePercent": "0.00" }], "status": "true", "timeStamp": "20130726141052" });
            break;
        case "worldindices":
            res.jsonp({ "errCode": "0", "errMsg": "World Indices information retrival success.", "indIndicesArr": [{ "code": "DJIA", "last": "15555.61", "netChange": "13.37", "netChangePercent": "0.09" }, { "code": "NASDAQ", "last": "3605.19", "netChange": "25.59", "netChangePercent": "0.71" }, { "code": "NIK225", "last": "14153.64", "netChange": "-409.29", "netChangePercent": "-2.81" }, { "code": "SP500", "last": "1690.25", "netChange": "4.31", "netChangePercent": "0.26" }, { "code": "STI", "last": "3242.69", "netChange": "7.01", "netChangePercent": "0.22" }, { "code": "TWI", "last": "8141.36", "netChange": "-22.22", "netChangePercent": "-0.27" }, { "code": "SZSA", "last": "998.47", "netChange": "-5.50", "netChangePercent": "-0.55" }, { "code": "SSEA", "last": "2105.88", "netChange": "-9.57", "netChangePercent": "-0.45" }], "status": "true", "timeStamp": "20130726070002" });
            break;
        default:
            res.jsonp({ "service": req.query.service, "analysis": "恒生指數收跌 0.1% 至 19,788 點。，在計及銀河娛樂 (27) 的 58 億元股份配售後，市場成交金額增至 436 億元水平。<br />恒生指数收跌 0.1% 至 19,788 点。，在计及银河娱乐 (27) 的 58 亿元股份配售後，市场成交金额增至 436 亿元水平。", "errCode": "0", "errMsg": "Market Outlook information retrieval success.", "status": "true", "timeDate": "20130628" });
            break;
    }
});

app.get("/test04", function (req, res) {
    app.set("jsonp callback name", "callback");

    res.jsonp({
        "status": "true",
        "errCode": "0",
        "errMsg": "Press Release information retrieval succeeded.",
        "content": {
            "data": [
                { "id": 1, "headline": "HKD rises; spot USD T/T rate at 7.7564", "date": "20130702141619" },
                { "id": 2, "headline": "MTR CORPORATION (00066.HK) target cut to $32 by GS", "date": "20130702141619" },
                { "id": 3, "headline": "新西蘭2月房價指數按月升7.6% 逼近紀錄高位", "date": "20130702170401" },
                { "id": 4, "headline": "港鐵(00066.HK)今年或受累物業利潤跌 目標價34元", "date": "20130702170401" },
                { "id": 5, "headline": "中国建筑 (3311) 估值接近合理水平，将评级下调至持有", "date": "20130702170454" },
                { "id": 6, "headline": "恒生指数昨整日徘徊在升与跌之间，并无明显方向", "date": "20130702170454" }
            ]
        }
    })
});

app.get("/test05", function (req, res) {
    app.set("jsonp callback name", "callback");

    switch (req.query.service) {
        case "marketoutlook":
            res.jsonp({ "analysis": "Hang Seng Index closed down 0.3% at 21,901. Heavily weighted HSBC (5) declined 0.6%. Local banks and property companies showed mixed performance. New World Development (17) surged 2.3% whilst SHK Properties (16) shrank 1.2%. Lack of earnings surprise...", "errCode": "0", "errMsg": "Market Outlook information retrieval success.", "status": "true", "timeDate": "20130726" });
            break;
        case "hsiturnover":
            res.jsonp({ "errCode": "0", "errMsg": "HSI Turnover information retrieval success.", "status": "true", "turnover": "31.12" });
            break;
        case "hkindices":
            res.jsonp({ "errCode": "0", "errMsg": "HK Indices information retrival success.", "indIndicesArr": [{ "code": "HSI", "last": "21928.51", "netChange": "27.55", "netChangePercent": "0.13" }, { "code": "HSI-FIN", "last": "30855.68", "netChange": "-17.16", "netChangePercent": "-0.06" }, { "code": "HSI-PRO", "last": "29492.22", "netChange": "-25.50", "netChangePercent": "-0.09" }, { "code": "HSI-UTL", "last": "52611.49", "netChange": "182.27", "netChangePercent": "0.35" }, { "code": "HSI-C&I", "last": "12384.39", "netChange": "46.32", "netChangePercent": "0.38" }, { "code": "HSCCI", "last": "4135.24", "netChange": "-16.37", "netChangePercent": "-0.39" }, { "code": "HSCEI", "last": "9752.43", "netChange": "-0.17", "netChangePercent": "0.00" }], "status": "true", "timeStamp": "20130726141052" });
            break;
        case "worldindices":
            res.jsonp({ "errCode": "0", "errMsg": "World Indices information retrival success.", "indIndicesArr": [{ "code": "DJIA", "last": "15555.61", "netChange": "13.37", "netChangePercent": "0.09" }, { "code": "NASDAQ", "last": "3605.19", "netChange": "25.59", "netChangePercent": "0.71" }, { "code": "NIK225", "last": "14153.64", "netChange": "-409.29", "netChangePercent": "-2.81" }, { "code": "SP500", "last": "1690.25", "netChange": "4.31", "netChangePercent": "0.26" }, { "code": "STI", "last": "3242.69", "netChange": "7.01", "netChangePercent": "0.22" }, { "code": "TWI", "last": "8141.36", "netChange": "-22.22", "netChangePercent": "-0.27" }, { "code": "SZSA", "last": "998.47", "netChange": "-5.50", "netChangePercent": "-0.55" }, { "code": "SSEA", "last": "2105.88", "netChange": "-9.57", "netChangePercent": "-0.45" }], "status": "true", "timeStamp": "20130726070002" });
            break;
        default:
            res.jsonp({ "service": req.query.service, "analysis": "恒生指數收跌 0.1% 至 19,788 點。，在計及銀河娛樂 (27) 的 58 億元股份配售後，市場成交金額增至 436 億元水平。<br />恒生指数收跌 0.1% 至 19,788 点。，在计及银河娱乐 (27) 的 58 亿元股份配售後，市场成交金额增至 436 亿元水平。", "errCode": "0", "errMsg": "Market Outlook information retrieval success.", "status": "true", "timeDate": "20130628" });
            break;
    }
});

app.get("/wechat", function (req, res) {
    if (crypto.createHash("sha1").update([
        "keyboardcat123",
        req.query.timestamp,
        req.query.nonce
    ].sort().join("")).digest("hex") == req.query.signature) {
        res.writeHead(200);
        res.end(req.query.echostr);
    }
    else {
        res.writeHead(401);
        res.end("Signature is invalid");
    };
});

app.post("/wechat", function (req, res) {
    if (crypto.createHash("sha1").update([
        "keyboardcat123",
        req.query.timestamp,
        req.query.nonce
    ].sort().join("")).digest("hex") == req.query.signature) {
        res.type("xml");
        res.send(
            "<xml>" +
                 "<ToUserName><![CDATA[" + "Brian" + "]]></ToUserName>" +
                 "<FromUserName><![CDATA[" + "webot" + "]]></FromUserName>" +
                 "<CreateTime>" + Math.round(new Date().getTime() / 1000) + "</CreateTime>" +
                 "<MsgType><![CDATA[" + "text" + "]]></MsgType>" +
                 "<Content><![CDATA[" + "echo: hello" + "]]></Content>" +
            "</xml>");
    }
    else {
        res.writeHead(401);
        res.end("Signature is invalid");
    };
});

app.listen(process.env.PORT || 3000);
console.log("Express server listening on port %d in %s mode", process.env.PORT || 3000, app.settings.env);