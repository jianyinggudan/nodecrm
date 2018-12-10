var logger = require('../../lib/logger.lib');
var candidateServer = require('../services/candidate.service');

/**
 * 获取列表
 */
exports.list =  function(req, res){
    var cookieList = getCookie(req);
    codeId = ""
    if(cookieList.codeId){
        codeId = cookieList.codeId;
    }


    candidateServer.all({"type":req.query.type},function(err, roles){
        
        if(err){
            logger[err.type]().error(err);
            return res.status(500).end();
        }
        // time = roles[roles.length - 1].date.split('-');
        // if(new Date().getTime() == new Date().setFullYear(time[0],Number(time[1]) - 1,time[2])){
        //     today = true;
        // }
        // for(var i = 0; i < roles.length; i ++){
        //     allCount += (roles[i].money - 0)
        // }
        var endData = {
            "err":"0",
            "data":roles,
            "codeId":codeId
        }
        res.status(200).json(endData);
    })
}
/**
 * 创建
 */
 exports.create = function(req, res){
    var nowtime = new Date().getTime();
    nowtime += parseInt(Math.random()*100000);
    var _ip = getClientIP(req);
   //   req.checkBody({
   //       'date':{
 		// 	notEmpty: {
 		// 		options: [true],
 		// 		errorMessage: 'data 不能为空'
 		// 	}
 		// },
   //       'money':{
   //           notEmpty: {
  	// 			options: [true],
  	// 			errorMessage: 'money 不能为空'
  	// 		}
   //       }
   //   });
     var data = {
         nickname: req.body.nickname,
         qq: req.body.qq||"",
         wechat: req.body.wechat||"",
         introduct: req.body.introduct||"",
         count: req.body.count||0
     }
     // console.log(data)
     candidateServer.save({data: data },function(err, role){
         if(err){
             logger[err.type]().error(__filename, err);
             return res.status(500).end();
         }
         var data = {
             'err':0,
             'data':role
         }
         // res.cookie('codeId', nowtime);
         // res.cookie('myIp',_ip);
         res.status(200).json(data);
        // res.writeHead(200, {
        //     'Set-Cookie': 'codeId='+nowtime,
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