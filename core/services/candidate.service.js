var _ = require('lodash');
var async = require('async');
var candidateModel = require('../models/candidate.model');
var voteModel = require('../models/vote.model');
/**
 * 所有数据列表
 */
 exports.all = function(options,callback){

    var type = 1;
    if(options.type){
      type = options.type;
    }
     candidateModel.find({})
     .sort({count:type})
     .lean()
     .exec(function(err, candidates){
         if(err){
             err.type = 'database';
             return callback(err)
         }
         callback(null, candidates)
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
     candidateModel.findById(_id)
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
 exports.findVote = function(options, callback){
    var ipAdress = options.ipAdress;

    voteModel.findOne({'ipAdress':ipAdress},function(err, doc){

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
      var data1 = {},data2 = {};
      for(var i in data){
        if(i == 'ipAdress' || i == "codeId"){
            data2[i] = data[i]
        }else{
            data1[i] = data[i];
        }
      }
      if(_id){
          candidateModel.update({ _id: _id}, data, { runValidators: true}, function(err){
              if(err){
                  err.type = 'database';
                  return callback(err)
              }
              callback();
          })
      }else{
          new candidateModel(data1).save(function(err, role){
              if(err){
                  err.type = 'database';
                  return callback(err)
              }
              callback(null, role)
          })
      }
  }
