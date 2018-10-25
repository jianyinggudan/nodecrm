var fs = require('fs');
var _ = require('lodash');
var async = require('async');
var path = require('path');
// var logger = require('../../lib/logger.lib');
// var siteInfoService = require('../services/site-info.service');
var _path = path.resolve(__dirname,'../../public/');
// var _json = fs.readFileSync(_path + '/data.json')


// var result=JSON.parse(fs.readFileSync(_path + '/data.json'));
// console.log(_json)
/**
 * 读取所有模板
 * @param {Object} req
 * @param {Object} res
 */
function formatDateTime(inputTime) {  
    var date = new Date(inputTime);
    var y = date.getFullYear();  
    var m = date.getMonth() + 1;  
    m = m < 10 ? ('0' + m) : m;  
    var d = date.getDate();  
    d = d < 10 ? ('0' + d) : d;  

    return y + '-' + m + '-' + d;  
};
module.exports = function (req, res) {
    var dateList = []
    
    var startTime = (new Date()).setFullYear('2018','6','12');
    var nowTime = (new Date()).getTime();
    for(var i = startTime ;i <= nowTime;i += 1000*60*60*24){
        dateList.push(formatDateTime(i));
    }

    // console.log(data)
    
    
    fs.readFile(_path + '/data.json', 'utf-8', function(err, data) {
        if (err) {
            res.status(200).json({"err":"1","msg":"数据错误"});
        } else {
            var dataJson = JSON.parse(data)
            var moneyArr = dataJson.data;
            var wqtxt = dataJson.wqtxt;
            var qttxt = dataJson.qttxt;
            var allCount = 0;
            for(var i = 0; i < moneyArr.length; i ++){
                allCount += (moneyArr[i] - 0)
            }
            var endData = {
                "err":"0",
                "dataList":dateList,
                "moneyArr":moneyArr,
                "allCount":allCount,
                "wqtxt":wqtxt,
                "qttxt":qttxt
            }
            res.send(endData);
            // res.status(200).json(JSON.parse(data));
        }
    });
};