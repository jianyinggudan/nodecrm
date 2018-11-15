var _ = require('lodash');
var async = require('async');
var personModel = require('../models/person.model');

/**
 * 所有数据列表
 */
 exports.all = function(options,callback){
    console.log('options',options)
    var type = 1;
    if(options.type){
      type = options.type;
    }
     personModel.find({})
     .sort({date:type})
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
     personModel.findById(_id)
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
  * 手机号重复
  */
 exports.findPhone = function(options, callback){
    var phone = options.phone;

    personModel.findOne({'phone':phone},function(err, doc){

        if(doc){
            callback(true,doc)
        }else{
            callback(false)
        }
    })
 }
 /**
  * 创建数据
  */
  exports.save = function(options, callback){
    // console.log('aaa',options)
      if(!options.data){
          var err = {
              type: 'system',
              error: '没有传入钱数'
          }
          return callback(err);
      }
      // console.log('=======',options)
      var _id = options._id;
      var data = options.data;

      if(_id){
          personModel.update({ _id: _id}, data, { runValidators: true}, function(err){
              if(err){
                  err.type = 'database';
                  return callback(err)
              }
              callback();
          })
      }else{
          new personModel(data).save(function(err, role){
              if(err){
                  err.type = 'database';
                  return callback(err)
              }
              callback(null, role)
          })
      }
  }
