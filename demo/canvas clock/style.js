function addEvent(obj,sEv,fn){
	if(obj.addEventListener){
		obj.addEventListener(sEv,fn,false);
	}else{
		obj.attachEvent('on'+sEV,fn);
	}
}
function domReady(fn){
	if(document.addEventListener){
		addEvent(document,'DOMContentLoaded',function(){
			fn && fn();
		})
	}else{
		addEvent(document,'readystatechange',function(){
			if(document.readyState=='complete'){
				fn && fn();
			}
		})
	}
}
function a2d(m){
	return m*Math.PI/180;
}
domReady(function(){
	var oC=document.querySelector('canvas');
	var gd=oC.getContext('2d');
	var oW=oC.offsetWidth;
	var oH=oC.offsetHeight;
	var r=oW/2;
	//时钟的外缘
	function drawBackGround(){
		gd.save();
		gd.translate(r,r);
		gd.lineWidth=6;
		gd.beginPath();
		gd.arc(0,0,r-12,0,2*Math.PI,false);
		gd.stroke();
		//定义小时数
		var hArr=[3,4,5,6,7,8,9,10,11,12,1,2];
		gd.font='16px 宋体';
		gd.textAlign='center';
		gd.textBaseline='middle';
		//每小时转30度
		var a=30;
		for(var i=0; i<hArr.length; i++){
			//计算每个小时的旋转角度
			var rad=a2d(a)*i;
			//计算每个小时数对应的x、y值坐标
			var x=Math.cos(rad)*(r-35);
			var y=Math.sin(rad)*(r-35);
			//在对应的小时数上填写对应的数字
			gd.fillText(hArr[i],x,y);
		}
		//绘制分的刻度数
		var b=6;
		for(var i=0; i<60; i++){
			var rad=a2d(b)*i;
			var x=Math.cos(rad)*(r-20);
			var y=Math.sin(rad)*(r-20);
			gd.beginPath();
			if(i%5==0){
				gd.arc(x,y,3,0,2*Math.PI,false);
				gd.fillStyle='red';
			}else{
				gd.fillStyle='#000';
				gd.arc(x,y,3,0,2*Math.PI,false);
			}
			gd.fill();		
		}
	}
	function drawHour(hour,minutes){
		//保存画小时之前的状态
		gd.save();
		gd.beginPath();
		var hrad=a2d(30)*hour;
		var mrad=a2d(30)*minutes/60;
		gd.rotate(hrad+mrad);
		gd.lineWidth=6;
		gd.lineCap='round';
		gd.moveTo(0,10);
		gd.lineTo(0,-r/2);
		gd.stroke();
		gd.restore();
	}
	function drawMinutes(minutes,seconds){
		gd.save();
		gd.beginPath();
		var mrad=a2d(6)*minutes;
		var srad=a2d(6)*seconds/60;
		gd.rotate(mrad+srad);
		gd.lineWidth=3;
		gd.lineCap='round';
		gd.moveTo(0,10);
		gd.lineTo(0,-r+60);
		gd.stroke();
		gd.restore();
	}
	function drawSecond(seconds){
		gd.save();
		gd.beginPath();
		gd.fillStyle='red';
		var srad=a2d(6)*seconds;
		gd.rotate(srad);
		gd.moveTo(-2,20);
		gd.lineTo(2,20);
		gd.lineTo(1,-r+35);
		gd.lineTo(-1,-r+35);
		gd.fill();

		gd.restore();
	}
	function drawDot(){
		gd.beginPath();
		gd.fillStyle='white';
		gd.arc(0,0,5,0,Math.PI*2,false);
		gd.fill();
	}	
	function draw(){
		gd.clearRect(0,0,oW,oW);
		var oDate=new Date();
		var H=oDate.getHours();
		var M=oDate.getMinutes();
		var S=oDate.getSeconds();
		drawBackGround();
		drawHour(H,M);	
		drawMinutes(M,S);
		drawSecond(S);			
		drawDot();
		gd.restore();
	}
	draw();
	setInterval(draw,1000);
	
})