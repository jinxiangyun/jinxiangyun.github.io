// JavaScript Document
function addEvent(obj,sEv,fn){
	if(obj.addEventListener){
		obj.addEventListener(sEv,fn,false);
	}else{
		obj.attachEvent('on'+sEv,fn);
	}
}
function domReady(fn){
	if(document.addEventListener){
		addEvent(document,'DOMContentLoaded',function(){
			fn && fn();
		});
	}else{
		addEvent(document,'readystatechange',function(){
			if(document.readyState == 'complete'){
				fn && fn();
			}
		});
	}
}
domReady(function(){
	//选项卡js效果
	(function(){
		var oTab=document.getElementById('tab');
		var oUl=oTab.children[0];
		var aBtn=oUl.children;
		var aDiv=oTab.getElementsByTagName('div');
		for(var i=0; i<aBtn.length; i++){
			aBtn[i].index=i;
			aBtn[i].onclick=function(){
				for(var j=0; j<aBtn.length; j++){
					aBtn[j].className='none';
					aDiv[j].style.display='none';
				}
				this.className='active';
				aDiv[this.index].style.display='block';
			}
		}
	})();
//导航条的弹性特效
	function movenav(obj,iTarget){
		var l=obj.offsetLeft;
		var speedX=0;
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			speedX+=(iTarget-obj.offsetLeft)/6;
			speedX*=0.7;
			l+=speedX;
			obj.style.left=parseInt(l)+'px';
			if(Math.abs(speedX)<1){speedX=0};
			if(iTarget==parseInt(l)&& speedX==0){
				clearInterval(obj.timer);
			}
		},30)
	}
//导航条的滚动特效
	(function(){
		var oNav=document.getElementById('headnav');
		var oUl=oNav.children[1];
		var aLi=oUl.children;
		var oLast=aLi[aLi.length-1];
		var disArr=[657,1213,2422]
		for(var i=0; i<aLi.length-1; i++){
			aLi[i].index=i;
			addEvent(aLi[i],'mouseover',function(){
				movenav(oLast,this.offsetLeft);
				document.documentElement.scrollTop=document.body.scrollTop=disArr[this.index];
			})			
		}
		for(var i=1; i<aLi.length-1; i++){
			
			aLi[i].onclick=function(){
			}
		}
	})()
 //吸顶条效果（导航部分）+延迟加载
 //获取绝对距离
	 function getPos(obj){
        var l=0; 
        var t=0; 
        while(obj){
            l+=obj.offsetLeft;
            t+=obj.offsetTop;
            obj=obj.offsetParent;
        }
        return {'l':l,'t':t};
    }
	var oHeader=document.getElementById('headnavwrap');
	var oDisShow=document.getElementById('disshow');
	var oHeaderH=oHeader.offsetTop;
	//获取图片延迟加载的节点
	var oTab=document.getElementById('tab');
    var aImg=oTab.getElementsByTagName('img');
    var winH=document.documentElement.clientHeight;
		addEvent(document,'scroll',function(){
			var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
			//吸顶条		
			    if(scrollTop>=oHeaderH){
			        oHeader.style.position='fixed';
			        oHeader.style.top=0;
			        oHeader.style.left=0;
			    }else{
			         oHeader.style.position='';
			    }
			//图片延迟加载
			var scrollBottom=winH+scrollTop;
	        for(var i=0; i<aImg.length; i++){
				var imgT=getPos(aImg[i]).t;
                if(scrollBottom>=imgT){
                	 aImg[i].src=aImg[i].getAttribute('_src');
	            }
	        }
		})
	//返回顶部的效果
	var oBack=document.getElementById('back');
	var timer=null;
	addEvent(oBack,'click',function(){
		var start=document.documentElement.scrollTop=document.body.scrollTop;
		var dis = 0- start;
		var count=Math.floor(1000/30);
		var n=0;
		clearInterval(timer);
		timer=setInterval(function(){
			n++;
			var a=1-n/count;
			document.documentElement.scrollTop = document.body.scrollTop = start+dis*(1-a);
			if(n==count){
				clearInterval(timer);
			}
		},30)
	})
});



