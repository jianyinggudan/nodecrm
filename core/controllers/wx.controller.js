var os = require('os');
var async = require('async');
var _ = require('lodash');
var sha1 = require('sha1');
// var packageInfo = require('../../package.json');
// var listsService = require('../services/lists.service');
// var contentsService = require('../services/contents.service');
// var mediaService = require('../services/media.service');
// var usersService = require('../services/users.service');


module.exports = function (req, res, next) {
    var q = req.query;
    console.log(req.method)
    var token = "jianyinggudan",
    timestamp = q.timestamp,
    nonce = q.nonce,
    echostr = q.echostr,
    signature = q.signature;
    echostr = '5926610512705867247'
    timestamp = '1540179365'
    nonce = '646708963'
    // var data = {
    //     token:"aaaa",
    //     "timestamp":new Date().getTime(),
    //     "nonce":Math.random().toString(36).substr(2)
    // }
    var str = [token, timestamp, nonce].sort().join('');
    var sha = sha1(str);
    console.log(sha)
    if (req.method == 'GET') {
 
        if (sha == signature) {
            res.send(echostr+'')
        }else{
            res.send('err');
        }
    }
    else if(req.method == 'POST'){
        if (sha != signature) {
            return;
        }
        next();
    }

    // res.status(200).json(data);
}