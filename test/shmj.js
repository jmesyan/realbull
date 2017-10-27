const baselib = require('./base');
const constants = require('./constants');
const hostname = "shmj.local.com";
const port = 80;
const token = "ghSgB0V6AyJSG8j8nOq4BKp2qHo6b0fPxrLU1R9yend73Ibv2vyOl75HjB0DJe4dUlEsTWBqPhV4Ga5MJUYZ-S5Bi.6EhRq0oQJ7eDQuboCtb2J0VzmD3A!!";


var base = new baselib(hostname, port, token);

//新手升级测试
base.funytest(constants.TEST_OFF, "newerlevelup test", function(t){
   base.getApiData("/mobile/newerLevelUp", [], function(res){
        data = res.data
        t.equal(res.ret, 0)
        t.equal(data.userLevel, 20)
        t.end()
    })
    
    base.getApiData("/mobile/newerLevelUpAwardGet", {level:21}, function(res){
        t.equal(res.ret, 1)
        t.equal(res.msg, "该等级奖励不存在")
    })
});

//微信支付测试
base.funytest(constants.TEST_OFF, "weixinPay gift", function(t){
     var post_data = {
        return_code:"SUCCESS", 
        result_code:"SUCCESS", 
        transaction_id:"123", 
        out_trade_no:"1"
    };
    base.postApiData("/mobile/weixinCallback/6/101", constants.EMPTY_PARAMS, post_data, function(res){
        t.pass("the result is callback:");
        console.log(res);
        t.end();
    })
});

//苹果支付测试
base.funytest(constants.TEST_OFF, "applePay gift", function(t){
    base.postApiData("/mobile/appstoreCallback",constants.EMPTY_PARAMS, constants.EMPTY_PARAMS, function(res){
      t.pass("the result is callback:");
        console.log(res);
        t.end();  
    });
});


//礼物兑换
base.funytest(constants.TEST_OFF, "exchange gift", function(t){
    var data = {gift_id:150, 'name':'小燕', 'tel':'18516536416', 'address':'上海市浦东新区123号'};
   base.getApiData("/mobile/ticketOrder", data, function(res){
        t.pass("the result is callback");
        console.log(res);
        t.end();
    });
});

//修改用户表情
base.funytest(constants.TEST_ON, "change user emojis:", function(t){
    var eids = [1, 2, 3, 12];
    var params = {type:1, eids:eids};
    base.getApiData("/mobile/changeUserEmojis", params, function(res){
        // var res = JSON.parse(res);
        var a = {}.toString.call(res);
        console.log(a);
        t.end();
    })
});