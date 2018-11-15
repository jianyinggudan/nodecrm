var logger = require('../../lib/logger.lib');
var moneyServer = require('../services/money.service');

/**
 * 获取列表
 */
exports.list =  function(req, res){

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
            "time":formatDateTime(new Date().getTime())
        }
        res.status(200).json(endData);
    })
}
/**
 * 创建
 */
 exports.create = function(req, res){

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
     // console.log(data)
     moneyServer.save({data: data },function(err, role){
         if(err){
             logger[err.type]().error(__filename, err);
             return res.status(500).end();
         }
         var data = {
             'err':0,
             'data':role
         }
         res.status(200).json(data);
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
