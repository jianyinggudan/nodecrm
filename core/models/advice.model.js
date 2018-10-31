var mongoose = require('mongoose');
/**
 * 公共内容
 */

 var adviceSchema = new mongoose.Schema({
     wqtxt:{
         type: String
     },
     othertxt:{
         type: String
     }
 },{
     collection: "advices",
     id: false
 })
/**
 * 发布为模型
 */
 module.exports = mongoose.model('Advices',adviceSchema)
