var murmurs = require('./lib/murmurs');
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var config = require('./configure');
var settings = require('./settings');

var mm = new murmurs( settings );
var app = express();

app.use(cors({origin:config.siteurl}));
app.use(bodyParser.urlencoded({ extended: true }));

app.get(/^\/(\d+)$/, function (req,res) {
    res.json(mm.get(req.params[0]));
});

app.post('/private', function (req,res) {
    console.log(req.body);
    if( req.body.p !== config.passphrase )
    {
        console.log('Failed login attempt');
        res.json({m:'Access Denied.'});
    }
    else
    {
        console.log('action: ' + req.body.a);
        switch(req.body.a)
        {
        case 'p':
            mm.post(req.body.s, req.body.c);
            res.json({m:'maybe success.'});
            break;
        default:
            res.json({m:'nothing to do'});
            break;
        }
    }
});

app.use(function (req, res, next) {
    res.json(mm.get(16));   /** default */
});

app.listen(config.port, config.hostname, function () {
    console.log('murmurs API server listening on port '+config.port);
});
