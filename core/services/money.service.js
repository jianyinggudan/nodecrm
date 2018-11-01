var _ = require('lodash');
var async = require('async');
var moneyModel = require('../models/money.model');
var adviceModel = require('../models/advice.model');
/**
 * 所有数据列表
 */
 exports.all = function(callback){
     moneyModel.find({})
     .sort({date:1})
     .lean()
     .exec(function(err, moneys){
         if(err){
             err.type = 'database';
             return callback(err)
         }
         callback(null, moneys)
     });
 }

/**
 * 单个数据
 */
 exports.one = function(options, callback){
     if(!options._id){
         var err = {
             type: 'system',
             error: '没有传入_id'
         }
         return callback(err);
     }
     var _id = options._id;
     moneyModel.findById(_id)
     .lean()
     .exec(function(err, money){
         if(err){
             err.type = 'database';
             return callback(err);
         }
         callback(null,money)
     })
 }
 /**
  * 创建数据
  */
  exports.save = function(options, callback){
      if(!options.data){
          var err = {
              type: 'system',
              error: '没有传入钱数'
          }
          return callback(err);
      }
      console.log('=======',options)
      var _id = options._id;
      var data = options.data;
      if(_id){
          moneyModel.update({ _id: _id}, data, { runValidators: true}, function(err){
              if(err){
                  err.type = 'database';
                  return callback(err)
              }
              callback();
          })
      }else{
          new moneyModel(data).save(function(err, role){
              if(err){
                  err.type = 'database';
                  return callback(err)
              }
              callback(null, role)
          })
      }
  }
