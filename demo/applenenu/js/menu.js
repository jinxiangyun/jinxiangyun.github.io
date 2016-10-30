function addEvent(obj,sEv,fn){
			if(obj.addEventListener){
				obj.addEventListener(sEv,fn,false);
			}else{
				obj.attachEvent('on'+sEv,fn);
			}
		}
		function domyReady(fn){
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
		function getPos(obj){
			var left=0;
			var top=0;
			while(obj){
				left+=obj.offsetLeft;
				top+=obj.offsetTop;
				obj=obj.offsetParent;
			}
			return {'left':left,'top':top};
		}
		domyReady(function(){
			var oMenu=document.getElementById('menu');
			var aImg=oMenu.children;
			addEvent(document,'mouseover',function(ev){
				var oEvent=ev||event;
				for(var i=0; i<aImg.length; i++){
					var a=aImg[i].offsetLeft+aImg[i].offsetWidth/2-oEvent.clientX;
					var b=getPos(aImg[i]).top+aImg[i].offsetHeight/2-oEvent.clientY;
					var c=Math.sqrt(a*a+b*b);
					var scale=(1-c/500).toFixed(2);
					if(scale<=0.5){
						scale=0.5;
					}
					aImg[i].style.width=128*scale+'px';
				}
			})
		})