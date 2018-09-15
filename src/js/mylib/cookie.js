

function getCookie(key) {
	var str = document.cookie;
	var list = str.split("; ");
	for(var i=0; i<list.length; i++) {
		var kvs = list[i].split("=");
		if(kvs[0] == key) {
			return kvs[1];
		}
	}
	return null;
}

function getCookie1(key){
	var str = document.cookie;
	var list = str.split("; ");
	for(var i in list){
		var kvs = list[i].split("=");
		if(kvs[0] == key){
			return kvs[1];
		}
	}
	return null;
}

function setCookie(key, value, expires, path) {
	expires = expires || 0 
	var d = null;
	if(expires) {
		d = new Date()
		d.setDate( d.getDate()+expires );
	}
	document.cookie = key+"="+value + (d?"; expires="+d:"") + (path?"; path="+path:"");
}

function setCookie1(key, value, expires, path){
	switch(arguments.length){
		case 0:
		case 1:return null;
		case 2:{
			document.cookie = key + "=" + value;
			break;
		}
		case 3:{
			var pram = arguments[2];
			if(typeof pram == "number"){
				var d = new Date();
				d.setDate(d.getDate()+pram);
				document.cookie = key + "=" + value + "; expires=" + d;
			}else if(typeof pram == "String"){
				document.cookie = key + "=" + value + "; path=" + pram;
				
			}
			break;
		}
		case 4:{
			var d = new Date();
			d.setDate(d.getDate()+expires);
			document.cookie = key + "=" + value +"; expires="+ d + "; path=" + path;
		}
	}
}