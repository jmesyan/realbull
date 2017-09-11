require('babel-register')
var http = require('http')
var test = require('tape')
var hostname = "shmj.local.com"
var token = "ghSgB0V6AyJSG8j8nOq4BKp2qHo6b0fPxrLU1R9yend73Ibv2vyOl75HjB0DJe4dUlEsTWBqPhV4Ga5MJUYZ-S5Bi.6EhRq0oQJ7eDQuboCtb2J0VzmD3A!!"
function getApiData(url, params, cb) {
    var options = {
        hostname: hostname,
        port: 80,
        method: 'GET'
    };
    var path = url+"?token="+token
    for (var i in params) {
        path += ("&"+params[i].key+"="+params[i].val)
    }
    options.path = path;
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

test("newerlevelup test", t =>{
   
    getApiData("/mobile/newerLevelUp", [], function(res){
        data = res.data
        t.equal(res.ret, 0)
        t.equal(data.userLevel, 20)
        t.end()
    })
    
    getApiData("/mobile/newerLevelUpAwardGet", [{key:"level", val:21}], function(res){
        t.equal(res.ret, 1)
        t.equal(res.msg, "该等级奖励不存在")
    })
});