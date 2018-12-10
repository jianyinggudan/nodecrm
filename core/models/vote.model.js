var mongoose = require('mongoose');

/**
 * 回款模型
 */

 var moneySchema = new mongoose.Schema({
     // 日期
     codeId: {
       type: String,
       required: true
     },
     // 钱数
     ipAdress:{
         type: String,
         required: true
     }
 },{
     collection: 'moneys',
     id: false
 });

 /**
  * 发布为模型
  */
module.exports = mongoose.model('Votes',moneySchema)
