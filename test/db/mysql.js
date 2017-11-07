var mysql = require("mysql");
var config = require("./config");
var tools = require("../utils/tools");
var instance;

function initQpool(){
	if (!instance) {
		instance = mysql.createPool({
			'host':config.host,
			'port':config.port,
			'user':config.user,
			'password':config.password,
			'database':config.database,
			'connectionLimit':config.connectionLimit
		});
	} 
	return instance;
}

var queryOrm = {
	pool:initQpool(),
	alias:[],
	sql:""
}

queryOrm.isString = function(ob) {
	return tools.isType("String")(ob);
}

queryOrm.isObject = function(ob) {
	return tools.isType("Object")(ob);
}

queryOrm.isNumber = function(ob) {
	return tools.isType("Number")(ob);
}

queryOrm.escape = function(str) {
	return this.pool.escape(str);
}

queryOrm.field = function(field) {
	if (!this.isString(field)) {
		throw "field语句的参数必须是字符串";
	}
	this.alias['field'] = field;
	return this;
}

queryOrm.table = function(table) {
	if (!this.isString(table)) {
		throw "field语句的参数必须是字符串";
	}
	this.alias['table'] = table;
	return this;
}

queryOrm.where = function(where) {
	this.alias['where'] = '';
	if (this.isObject(where)) {
		for (var key in where) {
			const vo = where[key];
            this.alias['where'] += "and `{0}`={1}".format(key, this.escape(vo));
		}
	}
	if (!tools.isEmpty(this.alias['where'])) {
		this.alias['where'] = this.alias['where'].slice(3);
	}
	return this;
}
queryOrm.limit = function(limit) {
    this.alias['limit'] = '';
    if( this.isNumber( $limit ) ){
       this.alias['limit'] = '0,{0}'.format(limit);
    }else if( this.isString( limit ) ){
        this.alias['limit'] = limit;
    }else{
    	throw "order语句的参数必须为字符串";
    }
    return this;
}

queryOrm.order = function(order){
	if(!isString(order)){
    	throw "order语句的参数必须为字符串";
	}
	this.alias['order'] = order;
	return this;
}

queryOrm.group = function(group){
	if(!isString(group)){
    	throw "group语句的参数必须为字符串";
	}
	this.alias['group'] = group;
	return this;
}
queryOrm.ParseSelectSql = function()
{
        this.sql = 'select * ';
        if( !tools.isEmpty( this.alias['field'] ) ){
            this.sql = this.sql.replace(/(\*)/, this.alias['field']);
        }
        if( tools.isEmpty(this.alias['table'] ) ){
    		throw "请用table子句设置查询表";
        }else{
            this.sql += " from {0}".format(this.alias['table']);
        }
        if( !tools.isEmpty( this.alias['where'] ) ){
            this.sql +=  " where {0}".format(this.alias['where']);
        }
        if( !tools.isEmpty( this.alias['group'] ) ){
            this.sql +=  " group by {0}".format(this.alias['group']);
        }
        if( !tools.isEmpty( this.alias['order'] ) ){
            this.sql +=  " order by {0}".format(this.alias['order']);
        }
        if( !tools.isEmpty( this.alias['limit'] ) ){
            this.sql +=  " limit {0}".format(this.alias['limit']);
        }
}
queryOrm.ParseAddSql = function() {
        this.sql = 'insert into ';
        if( tools.isEmpty( this.alias['table'] ) ){
    		throw "请用table子句设置添加表";
        }else{
            this.sql += "{0} set".format(this.alias['table'])
        }
        return this.sql;
}
queryOrm.ParseUpdateSql = function() {
        this.sql = 'update ';
        if( tools.isEmpty( this.alias['table'] ) ){
    		throw "请用table子句设置修改表";
        }else{
            this.sql += "{0} set".format(this.alias['table'])
        }
        if( tools.isEmpty( this.alias['where'] ) ){
    		throw "更新语句必须有where子句指定条件";
        }
        return this.sql;
}
queryOrm.ParseDeleteSql = function() {
        this.sql = 'delete from ';
        if( tools.isEmpty( this.alias['table'] ) ){
    		throw "请用table子句设置删除表";
        }else{
            this.sql += this.alias['table'];
        }
        if( tools.isEmpty( this.alias['where'] ) ){
    		throw "删除语句必须有where子句指定条件";
        }
        this.sql += " where {0}".format(this.alias['where']);
        return this.sql;
}

queryOrm._poolQuery = function(sql, cb) {
	this.pool.getConnection(function(err, connection){
		connection.query(sql, function(error, results, fields){
    		cb(results);
    		if (error) console.error(error.sqlMessage,":", error.sql);
    		connection.release();
    	});	
	});
}

queryOrm.poolQuery = function(sql, cb) {
	var row;
    if (cb) {
    	row = new Promise((resolve, reject) => {
    		this._poolQuery(sql, cb);
    		resolve(null);
    	});
    }  else {
    	row = new Promise((resolve, reject) => {
        	this._poolQuery(sql, resolve);
    	});
    }
    return row;
}

queryOrm._poolQueryOne = function(sql, cb) {
	this.pool.getConnection(function(err, connection){
		connection.query(sql, function(error, results, fields){
    		if (results) cb(results[0]); else cb([]);
    		if (error) console.error(error.sqlMessage,":", error.sql);
    		connection.release();
    	});	
	});
}

queryOrm.poolQueryOne = function(sql, cb) {
 	var row;
    if (cb) {
    	row = new Promise((resolve, reject) => {
    		this._poolQueryOne(sql, cb);
    		resolve(null);
    	});
    }  else {
    	row = new Promise((resolve, reject) => {
        	this._poolQueryOne(sql, resolve);
    	});
    }
    return row;
}

queryOrm.select = function(cb) {
        this.ParseSelectSql();
        var sql = this.sql;
        var row = this.poolQuery(sql, cb);
        return row;
        
}
queryOrm.find = function(cb) {
     	this.ParseSelectSql();
        var sql = this.sql;
        var row = this.poolQueryOne(sql, cb);
        return row;
}
queryOrm.add = function(data, cb)
{
    if(!this.isObject(data)){
        throw "添加数据add方法参数必须为object";
    }
    this.ParseAddSql();
    var sql = "";
    for (var key in data) {
    	const vo = data[key];
    	sql += ", `{0}` = {1}".format(key, this.escape(vo));
    }
    sql = sql.substring(1);
    this.sql += sql;
    return this.poolQuery(this.sql, cb);
}
queryOrm.update  = function(data, cb)
{
    if( !this.isObject(data)){
        throw "更新数据update方法参数必须为object";
    }
    this.ParseUpdateSql();
    var sql = "";
    for (var key in data) {
    	const vo = data[key];
    	sql += ", `{0}` = {1}".format(key, this.escape(vo));
    }
    sql = sql.substring(1);
    this.sql += (sql + " where {0}".format(this.alias['where']));
    return this.poolQuery(this.sql, cb);
}
queryOrm.delete = function(cb)
{
    this.ParseDeleteSql();
    return this.poolQuery(this.sql, cb);
}
queryOrm.getLastSql = function()
{
    return this.sql;
}

module.exports =  queryOrm;

