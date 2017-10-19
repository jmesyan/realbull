require('babel-register');
var http = require('http');
var querystring = require("querystring");
var test = require('tape');
var constants = require('./constants');


function BaseTest(hostname, port, token){
    this.hostname = hostname;
    this.port = port;
    this.token = token;
}

BaseTest.prototype.funytest = function(iswitch, name, cb){
     if (constants.TEST_ON == iswitch) {
        test(name, t=>{
            cb(t)
        });
    } 
};

BaseTest.prototype.getApiData = function(url, params, cb) {
    var options = {
        hostname: this.hostname,
        port: this.port,
        method: 'GET'
    };
    var path = url+"?token="+this.token
    if (params instanceof Object){
        for (var i in params) {
            path += ("&"+i+"="+params[i])
        }    
    }
    
    options.path = encodeURI(path);
    //发送请求
    var req = http.request(options,function(res){
        res.setEncoding('utf8');
        res.on('data',function(chunk){
            returnData = JSON.parse(chunk);//如果服务器传来的是json字符串，可以将字符串转换成json
            cb(returnData)
        });
    });
    //如果有错误会输出错误
    req.on('error', function(e){
         console.log('错误：' + e.message);
    });
    req.end();
}

BaseTest.prototype.postApiData = function(url, params, pdata, cb) {
    var pdata = querystring.stringify(pdata);
    var path = url+"?token="+this.token
     if (params instanceof Object){
        for (var i in params) {
            path += ("&"+i+"="+params[i])
        }    
    }
    path =  encodeURI(path);
    var options = {
        hostname: this.hostname,
        port: this.port,
        method: 'POST',
        path:path,
        headers: {  
            "Content-Type": "application/x-www-form-urlencoded",  
            // "Content-Type": "application/json",  
            "Content-Length": Buffer.byteLength(pdata)  
        }
    };

    var post_req = http.request(options, function(response){
        var responseText=[];
        var size = 0;
        response.on('data', function (data) {
              responseText.push(data);
              size+=data.length;
          });
        response.on('end', function () {
          // Buffer 是node.js 自带的库，直接使用
          responseText = Buffer.concat(responseText,size);
          var res = responseText.toString();
          cb(res);
      }); 
    })
    post_req.write(pdata);
    post_req.end();
}

module.exports = BaseTest;