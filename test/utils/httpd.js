var http = require('http');
var querystring = require("querystring");
var tools = require("./tools");

function httpd(host, port, uid){
	this.host = host;
	this.port = port;
	this.uid = this.default = uid;
}

var proto = httpd.prototype;


proto.serizeParams = function(params) {
	if (! tools.isObject(params)) {
		console.error("the params is not a object");
	}
	var path ="";
 	for (var key in params) {
        path += ("&"+key+"="+params[key])
    }  
    return path;
}

proto.setUid = function(uid) {
	this.uid = uid;
}

proto.resetUid = function() {
	this.uid = this.default;
}

proto.getToken = function() {
	var uid = this.uid || this.default || 0;
	var token = tools.makePkey(uid, tools.time(), "zh_CN");
	return token;
}

proto.get = function(url, params){
    var options = {
        hostname: this.host,
        port: this.port,
        method: 'GET'
    };

    var path = encodeURI(url+"?token="+this.getToken()+this.serizeParams(params));
    options.path = path;

    var promise = new Promise((resolve, reject) => {
		 //发送请求
	    var req = http.request(options,function(response){
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
		        try {
		        	res = JSON.parse(res);
		        	resolve(res);
		        }catch(e){
		        	reject(res);
		        }
	        }); 
	    });

	    //如果有错误会输出错误
	    req.on('error', function(e){
	         reject(e.message);
	    });
	    req.end(); 
    });

    return promise;
}


proto.post = function(url, params, pdata, headers){
    var post_data = querystring.stringify(pdata);
    var path = encodeURI(url+"?token="+this.getToken()+this.serizeParams(params));
    if (headers && headers instanceof Object) {
    	headers["Content-Length"] = Buffer.byteLength(post_data);
    } else {
    	headers = {
    		"Content-Type": "application/x-www-form-urlencoded",  
            "Content-Length": Buffer.byteLength(post_data) 
    	};
    }
  	var options = {
        hostname: this.host,
        port: this.port,
        method: 'POST',
        path:path,
        headers: headers
    };

    var promise = new Promise((resolve, reject) => {
		 //发送请求
	    var req = http.request(options,function(response){
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
		        try {
		        	res = JSON.parse(res);
		        	resolve(res);
		        }catch(e){
		        	reject(res);
		        }
	        }); 
	    });
	    req.write(post_data);
	    //如果有错误会输出错误
	    req.on('error', function(e){
	         reject(e.message);
	    });
	    req.end(); 
    });

    return promise;


}


module.exports = httpd;