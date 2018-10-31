var mongoose = require('mongoose');

/**
 * 回款模型
 */

 var moneySchema = new mongoose.Schema({
     // 日期
     date: {
       type: String,
       required: true
     },
     // 钱数
     money:{
         type: Number,
         required: true
     }
 },{
     collection: 'moneys',
     id: false
 });

 /**
  * 发布为模型
  */
module.exports = mongoose.model('Moneys',moneySchema)
