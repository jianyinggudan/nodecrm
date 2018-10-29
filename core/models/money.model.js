var mongoose = require('mongoose');

/**
 * 回款模型
 */
 var moneySchema = new mogoose.Schema({
     // 日期
     date: {
       type: Date,
       default: Date.now
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
model.exports = mongoose.model('Moneys',moneySchema)
