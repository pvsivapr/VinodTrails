var mysql = require('mysql');
//var db = mysql('localhost/phpmyadmin/allgives',['cities']);
//var Curl = require('node-libcurl/lib/Curl');
//var encodeUrl = require('encodeurl');

function getMaxOfArray(numArray) {
	  return Math.max.apply(null, numArray);
}

// Auto Increment
module.exports.auto_inc = function(collection, field, callback){
  var ids = [];
  db[collection].find(function(err,docs){
    for(i = 0;i<docs.length;i++){
      ids[i] = docs[i][field];
    }
    var inc_id = getMaxOfArray(ids)+1;
	callback(inc_id);
  });
}

// Get Date & Time
module.exports.getDateTime = function(){
	function pad(n){return n<10 ? '0'+n : n}
	var date = new Date();
	var Y = date.getFullYear();
	var m = pad(date.getMonth()+1);
	var d = pad(date.getDate());
	var H = pad(date.getHours());
	var M = pad(date.getMinutes());
	var s = pad(date.getSeconds());
	return Y+'-'+m+'-'+d+' '+H+':'+M+':'+s;
}

// Get Date Only
module.exports.getDateOnly = getDateOnly();

function getDateOnly(){
	function pad(n){return n<10 ? '0'+n : n}
	var date = new Date();
	var Y = date.getFullYear();
	var m = pad(date.getMonth()+1);
	var d = pad(date.getDate());
	return Y+'-'+m+'-'+d;
}

// Order Number
module.exports.getOrderNumber = function(callback){
	db.orders.find().limit(1).sort({order_id:-1},function(err, docs){
			latest_date = docs[0].ordered_on.split(' ');
			if(getDateOnly()==latest_date[0]){
				latest_no = docs[0].order_no.split(' ');
				no = parseInt(latest_no[1])+1;
				order_no = 'A '+no;
			}else{
				order_no = 'A 1';	
			}
			callback(order_no);
	});
}

// send message
module.exports.sendMessage = function(phone,message){
	var mobile = encodeUrl(phone);
	var msg = encodeUrl(message);
	var url = "http://websms.one97.net/sendsms/push_sms_new.php?user=demog&pwd=pathstreet&from=TownyG&to="+mobile+"&msg="+msg;
	var curl = new Curl();
	curl.setOpt('URL', url);
	curl.setOpt('CONNECTTIMEOUT', 10);
	curl.perform();
}



module.exports.Base = "localhost/phpmyadmin/allgives";
