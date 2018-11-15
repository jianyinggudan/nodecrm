var logger = require('../../lib/logger.lib');
var personServer = require('../services/person.service');

/**
 * 获取列表
 */
exports.list =  function(req, res){

    personServer.all({"type":req.query.type},function(err, roles){
        var temp = [];
        var data = {};
        if(err){
            logger[err.type]().error(err);
            return res.status(500).end();
        }

        for(var i = 0 ; i < roles.length; i++){
            data = {};
            for(var j in roles[i]){

                if(j != "phone"){
                    data[j] = roles[i][j];
                }
            }
            temp.push(data);
        }
        var endData = {
            "err":"0",
            "data":temp
        }
        res.status(200).json(endData);
    })
}
/**
 * 创建
 */
 exports.create = function(req, res){

     req.checkBody({
        'nickname':{
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
         },
         'phone':{
             notEmpty: {
                options: [true],
                errorMessage: 'phone 不能为空'
            }
         },
         'province':{
             notEmpty: {
                options: [true],
                errorMessage: 'province 不能为空'
            }
         },
         'city':{
             notEmpty: {
                options: [true],
                errorMessage: 'city 不能为空'
            }
         },
         'scene':{
             notEmpty: {
                options: [true],
                errorMessage: 'scene 不能为空'
            }
         }
     });
     var data = {
         nickname: req.body.nickname,
         money: req.body.money || 0,
         phone: req.body.phone,
         province: req.body.province,
         city: req.body.city,
         scene: req.body.scene
     }
     personServer.findPhone(data,function(Betrue){
        if(Betrue){
            var endData = {
                 'err':1,
                 'msg':'手机号重复'
             }
             res.status(200).json(endData);
        }else{
            personServer.save({data: data },function(err, role){
                 if(err){
                     logger[err.type]().error(__filename, err);
                     return res.status(500).end();
                 }
                 var endData = {
                     'err':0,
                     'data':role
                 }
                 res.status(200).json(endData);
            })
        }
     });

     // console.log(data)
     
 }
