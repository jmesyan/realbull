var mysql = require("mysql");
var config = require("./config");
var tools = require("../utils/tools");
var instance;


function queryOrm() {
	this.conn =  mysql.createPool({
		'host':config.host,
		'port':config.port,
		'user':config.user,
		'password':config.password,
		'database':config.database,
		'connectionLimit':config.connectionLimit
	});
	this.alias = []; 
	this.sql = "";
}

var qproto = queryOrm.prototype;

qproto.isString = function() {
	return tools.isType("String");
}

qproto.isObject = function() {
	return tools.isType("Object");
}

qproto.isNumber = function() {
	return tools.isType("Number");
}

qproto.escape = function(str) {
	return this.conn.escape(str);
}

qproto.field = function(field) {
	if (!this.isString(field)) {
		console.error("field语句的参数必须是字符串");
		return;
	}
	this.alias['field'] = field;
	return this;
}

qproto.table = function(table) {
	if (!this.isString(table)) {
		console.error("field语句的参数必须是字符串");
		return;
	}
	this.alias['table'] = table;
	return this;
}

qproto.where = function(where) {
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
qproto.limit = function(limit) {
    this.alias['limit'] = '';
    if( this.isNumber( $limit ) ){
       this.alias['limit'] = '0,{0}'.format(limit);
    }else if( this.isString( limit ) ){
        this.alias['limit'] = limit;
    }else{
    	console.error("limit语句的参数必须为数字或字符串");
    	return;
    }
    return this;
}

qproto.order = function(order){
	if(!isString(order)){
    	console.error("order语句的参数必须为字符串");
    	return;
	}
	this.alias['order'] = order;
	return this;
}

qproto.group = function(group){
	if(!isString(group)){
    	console.error("group语句的参数必须为字符串");
    	return;
	}
	this.alias['group'] = group;
	return this;
}
qproto.ParseSelectSql = function()
{
        this.sql = 'select * ';
        if( !tools.isEmpty( this.alias['field'] ) ){
            this.sql = this.sql.replace(/(\*)/, this.alias['field']);
        }
        if( tools.isEmpty(this.alias['table'] ) ){
            console.error("请用table子句设置查询表");
    		return;
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
qproto.ParseAddSql = function() {
        this.sql = 'insert into ';
        if( tools.isEmpty( this.alias['table'] ) ){
            console.error("请用table子句设置添加表");
    		return;
        }else{
            this.sql += "{0} set".format(this.alias['table'])
        }
        return this.sql;
}
qproto.ParseUpdateSql = function() {
        this.sql = 'update ';
        if( tools.isEmpty( this.alias['table'] ) ){
            console.error("请用table子句设置修改表");
    		return;
        }else{
            this.sql += "{0} set".format(this.alias['table'])
        }
        if( tools.isEmpty( this.alias['where'] ) ){
            console.error("更新语句必须有where子句指定条件");
    		return;
        }
        return this.sql;
}
qproto.ParseDeleteSql = function() {
        this.sql = 'delete from ';
        if( tools.isEmpty( this.alias['table'] ) ){
            console.error("请用table子句设置删除表");
    		return;
        }else{
            this.sql += this.alias['table'];
        }
        if( tools.isEmpty( this.alias['where'] ) ){
            console.error("删除语句必须有where子句指定条件");
    		return;
        }
        this.sql += " where {0}".format(this.alias['where']);
        return this.sql;
}
qproto.select = function() {
        this.ParseSelectSql();
        var row = new Promise((resolve, reject) => {
        	this.conn.query(this.sql, function(error, results, fields){
        		resolve({error:error, results:results, fields:fields});
        	});
        });

        return row;
        // $row = this.conn->query( this.sql )->fetchAll( PDO::FETCH_ASSOC );
        // $result = [];
        // foreach( $row as $key=>$vo ){
        //     $arrObj = clone $this;  //clone当前对象防止对this对象造成污染
        //     $arrObj->data = $vo;
        //     $result[$key] = $arrObj;
        //     unset( $arrObj );
        // }
        // return $result;
}
    // //查询一条
    // public function find()
    // {
    //     this.ParseSelectSql();
    //     $row = this.conn->query( this.sql )->fetch( PDO::FETCH_ASSOC );
    //     $arrObj = clone $this;  //clone当前对象防止对this对象造成污染
    //     $arrObj->data = $row;
    //     $result = $arrObj;
    //     unset( $arrObj );
    //     return $result;
    // }
    // //添加数据
    // public function add( $data )
    // {
    //     if( !is_array( $data ) ){
    //         throw new exception("添加数据add方法参数必须为数组");
    //     }
    //     this.ParseAddSql();
    //     foreach( $data as $key=>$vo ){
    //         this.sql += " `{$key}` = '" . $vo . "',";
    //     }
    //     this.conn->exec( rtrim( this.sql, ',' ) );
    //     return this.conn->lastInsertId();
    // }
    // //更新语句
    // public function update( $data )
    // {
    //     if( !is_array( $data ) ){
    //         throw new exception("更新数据update方法参数必须为数组");
    //     }
    //     this.ParseUpdateSql();
    //     foreach( $data as $key=>$vo ){
    //         this.sql += " `{$key}` = '" . $vo . "',";
    //     }
    //     this.sql = rtrim( this.sql, ',' ) . ' where ' . this.alias['where'];
    //     return this.conn->exec( this.sql );
    // }
    // //删除语句
    // public function delete()
    // {
    //     this.ParseDeleteSql();
    //     return this.conn->exec( this.sql );
    // }
    // //获取查询数据
    // public function getData()
    // {
    //     return this.data;
    // }
    // //获取最后一次执行的sql语句
    // public function getLastSql()
    // {
    //     return this.sql;
    // }
    // public function __get($name)
    // {
    //     return this.getData()[$name];
    // }
    // public function offsetExists($offset)
    // {
    //     if( !isset( this.getData()[$offset] ) ){
    //         return NULL;
    //     }
    // }
    // public function offsetGet($offset)
    // {
    //     return this.getData()[$offset];
    // }
    // public function offsetSet($offset, $value)
    // {
    //     return this.data[$offset] = $value;
    // }
    // public function offsetUnset($offset)
    // {
    //     unset( this.data[$offset] );
    // }
 
//  var Client = {};

// Client.getInstance = function(){
// 	if (!instance) {
// 		instance = new ProxyClient();
// 	}
// 	return instance;
// }

// function ProxyClient() {
// 	this.client = mysql.createPool({
// 		'host':config.host,
// 		'port':config.port,
// 		'user':config.user,
// 		'password':config.password,
// 		'database':config.database,
// 		'connectionLimit':config.connectionLimit
// 	});
// 	this.quer = queryOrm(this.client);
// }

// var proto = ProxyClient.prototype;

// proto.select = function(sql, params, cb) {
	
// }

module.exports =  queryOrm;

