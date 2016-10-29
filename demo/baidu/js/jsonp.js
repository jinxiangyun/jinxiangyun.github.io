function json2Str(json){
	var arr = [];
	for(var name in json){
		arr.push(name+'='+json[name]);
	}
	var str = arr.join('&');
	return str;
}
function jsonp(json){
	var json = json || {};
	if(!json.url){
		alert('不符合规范，请书写url');
		return;
	}
	json.data = json.data || {};
	json.callback = json.callback || 'cb';

	var fnName = 'show'+Math.random();
	fnName = fnName.replace('.','');
	json.data[json.callback] = fnName;
	window[fnName] = function(json2){
		json.success && json.success(json2);
		oHead.removeChild(oS);
	}
	var oS = document.createElement('script');
	oS.src = json.url+'?'+json2Str(json.data);
	var oHead = document.getElementsByTagName('head')[0];
	oHead.appendChild(oS);
}