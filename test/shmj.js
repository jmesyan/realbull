const baselib = require('./base');
const constants = require('./constants');
const hostname = "shmj.local.com";
const port = 80;
const token = "ghSgB0V6AyJSG8j8nOq4BKp2qHo6b0fPxrLU1R9yend73Ibv2vyOl75HjB0DJe4dUlEsTWBqPhV4Ga5MJUYZ-S5Bi.6EhRq0oQJ7eDQuboCtb2J0VzmD3A!!";


var base = new baselib(hostname, port, token);

base.funytest(constants.TEST_OFF, "newerlevelup test", function(t){
   base.getApiData("/mobile/newerLevelUp", [], function(res){
        data = res.data
        t.equal(res.ret, 0)
        t.equal(data.userLevel, 20)
        t.end()
    })
    
    base.getApiData("/mobile/newerLevelUpAwardGet", [{key:"level", val:21}], function(res){
        t.equal(res.ret, 1)
        t.equal(res.msg, "该等级奖励不存在")
    })
});


base.funytest(constants.TEST_ON, "weixinPay gift", function(t){
     var post_data = {
        return_code:"SUCCESS", 
        result_code:"SUCCESS", 
        transaction_id:"123", 
        out_trade_no:"1"
    };
    base.postApiData("/mobile/weixinCallback/6/101", [], post_data, function(res){
        t.pass("the result is callback:");
        console.log(res);
        t.end();
    })
});


base.funytest(constants.TEST_OFF, "applePay gift", function(t){
    var post_data = {

    }
    base.postApiData("/mobile/appstoreCallback",[], post_data, function(res){
      t.pass("the result is callback:");
        console.log(res);
        t.end();  
    });
});


base.funytest(constants.TEST_OFF, "exchange gift", function(t){
    var data = [{key:"gift_id", val:"150"}, {key:"name", val:"小燕"}, {key:"tel", val:"18516536416"}, {key:"address", val:"上海市浦东新区123号"} ];
   base.getApiData("/mobile/ticketOrder", data, function(res){
        t.pass("the result is callback");
        console.log(res);
        t.end();
    });
});