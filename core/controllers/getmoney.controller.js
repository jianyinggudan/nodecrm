var logger = require('../../lib/logger.lib');
var moneyServer = require('../services/money.service');

/**
 * 获取列表
 */
exports.list =  function(req, res){
    moneyServer.all(function(err, roles){
        if(err){
            logger[err.type]().error(err);
            return res.status(500).end();
        }
        res.status(200).json(roles);
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
         res.status(200).json(role);
     })
 }
