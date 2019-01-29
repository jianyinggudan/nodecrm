var logger = require('../../lib/logger.lib');
var moneyServer = require('../services/money.service');

/**
 * 获取列表
 */
exports.list =  function(req, res){
    var cookieList = getCookie(req);
    myCookie = ""
    if(cookieList.myCookie){
        myCookie = cookieList.myCookie;
    }
    console.log('ip是',getClientIP(req))
    console.log('cookie',(new Date()).getTime(),getCookie(req))
    moneyServer.all({"type":req.query.type},function(err, roles){
        var allCount = 0;
        var today = false;
        if(err){
            logger[err.type]().error(err);
            return res.status(500).end();
        }
        time = roles[roles.length - 1].date.split('-');
        if(new Date().getTime() == new Date().setFullYear(time[0],Number(time[1]) - 1,time[2])){
            today = true;
        }
        for(var i = 0; i < roles.length; i ++){
            allCount += (roles[i].money - 0)
        }
        var endData = {
            "err":"0",
            "roles":roles,
            "allCount":allCount,
            "today":today,
            "time":formatDateTime(new Date().getTime()),
            "myCookie":myCookie
        }
        res.status(200).json(endData);
    })
}
/**
 * 创建
 */
 exports.create = function(req, res){
    var nowtime = new Date().getTime();

     req.checkBody({
         'date':{
 			notEmpty: {
 				options: [true],
 				errorMessage: 'data 不能为空'
 			}
 		},
         'money':{
             notEmpty: {
  				options: [true],
  				errorMessage: 'money 不能为空'
  			}
         }
     });
     var data = {
         date: req.body.date,
         money: req.body.money || 0
     }
     var _id = req.body._id || "";
     // console.log(data)
     moneyServer.save({data: data,_id:_id },function(err, role){
         if(err){
             logger[err.type]().error(__filename, err);
             return res.status(500).end();
         }
         var data = {
             'err':0,
             'data':role
         }
         res.cookie('myCookie', nowtime);
         res.status(200).json(data);
        // res.writeHead(200, {
        //     'Set-Cookie': 'myCookie='+nowtime,
        //     'Content-Type': 'text/plain'
        // });
     })
 }
function formatDateTime(inputTime) {
    var date = new Date(inputTime);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    // var h = date.getHours();
    // h = h < 10 ? ('0' + h) : h;
    // var minute = date.getMinutes();
    // var second = date.getSeconds();
    // minute = minute < 10 ? ('0' + minute) : minute;
    // second = second < 10 ? ('0' + second) : second;
    // return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
    return y + '-' + m + '-' + d;
}
function getClientIP(req) {
    let api = req.connection.remoteAddress || req.socket.remoteAddress || (req.connection.socket ? req.connection.socket.remoteAddress : null) || req.headers['x-forwarded-for']; // x-forwarded-for容易被伪造
    if (api.indexOf('::ffff:') !== -1) {
        api = api.substring(7);
    }
    return api;
};
function getCookie(req){

    var Cookies = {};
    req.headers.cookie && req.headers.cookie.split(';').forEach(function( Cookie ) {
        var parts = Cookie.split('=');
        Cookies[ parts[ 0 ].trim() ] = ( parts[ 1 ] || '' ).trim();
    });
    return Cookies;
}
