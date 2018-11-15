var mongoose = require('mongoose');

/**
 * 用户模型
 */
var personSchema = new mongoose.Schema({
  // 姓名
  nickname: {
    type: String,
    trim: true,
    required: true
  },
  //金额
  money: {
    type: Number,
    trim: true
  },
  // 电话
  phone: {
    type: String,
    unique: true,
    trim: true,
    match: /^1\d{10}$/,
    required: true
  },
  mphone:{
    type: String
  },
  // 省
  province: {
    type: String,
    trim: true,
    required: true
  },
  // 市
  city: {
    type: String,
    trim: true,
    required: true
  },
  // 去现场
  scene: {
    type: String,
    required: true
  }
}, {
  collection: 'persons',
  id: false
});
personSchema.pre('save',function(next){
  if(this.phone){
    this.mphone = this.phone.replace(/^(\d{3})\d{5}(\d+)/,"$1****$2")
  }
  if(this.money){
    this.money = parseFloat((this.money - 0).toFixed(2))
  }
  next();
})

/**
 * 发布为模型
 */
module.exports = mongoose.model('Person', personSchema);