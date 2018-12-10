var mongoose = require('mongoose');

/**
 * 用户模型
 */
var candidateSchema = new mongoose.Schema({
  // 姓名
  nickname: {
    type: String,
    trim: true,
    required: true
  },
  //qq号
  qq: {
    type: Number,
    trim: true,
    unique: true
  },
  // 微信号
  wechat: {
    type: String,
    trim: true,
    unique: true
  },
  // 简介
  introduct: {
    type: String,
    trim: true,
    required: true
  },
  // 票数
  count: {
    type: Number,
    trim: true
  }
}, {
  collection: 'candidates',
  id: false
});
// candidateSchema.pre('save',function(next){
//   if(this.phone){
//     this.mphone = this.phone.replace(/^(\d{3})\d{5}(\d+)/,"$1****$2")
//   }
//   if(this.money){
//     this.money = parseFloat((this.money - 0).toFixed(2))
//   }
//   next();
// })

/**
 * 发布为模型
 */
module.exports = mongoose.model('Candidate', candidateSchema);