//初级运动封装函数
function getStyle(obj,name){
	if(obj.currentStyle){
		return obj.currentStyle[name];
	}else{
		return getComputedStyle(obj,false)[name];
	}
}
//不需要定义了
//var timer=null
//function move(obj,name,iTaget,duration,complete)
//用json传参
//function move(obj,json,duration,complete){
function move(obj,json,options){
	options=options||{};
	options.duration=options.duration||1000;
	options.type=options.type||'easy-out';
	//默认值在函数封装中非常重要
/*
//type是运动方式的命名
options={
		'duration':'运动总时间',
		'type':'linear：匀速运动、'easy-in:加速运动'、'easy-out:减速运动'',
		'complete'：回调函数function(){}
}
*/
//complete是回调函数
//定义起始点
//var start=oDiv.offsetLeft;
//offsetLeft存在问题，所以用getStyle来定义起始点
//parseInt(getStyle(obj,name))因为获得的是字符串含px；
//var start=parseInt(getStyle(obj,name));
//改成parseFloat是为了透明层，有小数
/*
{
	'width':300,
	'height':300,
	'left':300,
	'top':500,
	'opacity':0.5
}
*/
//起点strat  总距离
//定义两个空json用于存放数据（？）
	var start={};
	var dis={};
//循环传参的json,循环的目的是给json数据start和dis添加内容（？）
	for(var name in json){
		start[name]=parseFloat(getStyle(obj,name));
		dis[name]=json[name]-start[name];
		//console.log(dis);
	}
//var start=parseFloat(getStyle(obj,name));
//总距离
//var dis=500;
//var dis=500-start;
//总距离不固定，所以传参
//var dis=iTaget-start;
//总次数(一共跑了多少次)
//总时间不固定，所以次数也不固定，用传参duration
	var count=Math.floor(options.duration/30);
//每次跑多远
//var step=dis/count;
//节省一个变量step，放在定时器里面。定义为cur
//定义一个默认值为0次；
	var n=0;
//clearInterval(timer);
	clearInterval(obj.timer);
//timer=setInterval(function(){
	obj.timer=setInterval(function(){
		n++;
	//定义一个变量
	//var cur=start+n*step
	//var cur=start+n*dis/count;
	//判断透明层的
	//循环json
		for(var name in json){
			switch(options.type){
				//匀速运动linear
				case 'linear':
					var a=n/count;
					var cur=a;
					break;
				//加速运动
				case 'ease-in':
					var a=n/count;
					var cur=a*a*a;
					break;
				//减速运动
				case 'ease-out':
					var a=1-n/count;
					var cur=1-a*a*a;
					break;
			}
			var cur=start[name]+n*dis[name]/count;
			if(name=='opacity'){
				obj.style[name]=cur;
				//兼容ie
				obj.style.filter='alpha(opacity='+cur*100+')';
			}else{
				obj.style[name]=cur+'px';
			}
		}
	/*if(name=='opacity'){
		obj.stlye[name]=cur;
		//兼容ie
		obj.style.filter='alpha(opacity='+cur*100+')';
	}else{
		obj.style[name]=cur+'px';
	}*/				
	//判断什么时候跑完
		if(n==count){
			//clearInterval(timer);
			clearInterval(obj.timer);
			//回调函数判断
			options.complete && options.complete();
		}
	},30)
}
