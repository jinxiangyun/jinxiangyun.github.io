	function addEvent(obj,sEv,fn){
			if(obj.addEventListener){
				addEventListener(sEv,fn,false);
			}else{
				attachEvent('on'+sEv,fn);
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
		domReady(function(){
			var oUl=document.getElementById('box');
			var aLi=oUl.children;
			var res=35;
			for(var i=1; i<aLi.length; i++){
				aLi[i].style.left=oUl.offsetWidth-res*(aLi.length-i)+'px';
			}
			for(var i=0; i<aLi.length; i++){
				aLi[i].index=i;
				aLi[i].onmouseover=function(){	
					for(var j=0; j<aLi.length; j++){
						if(j<=this.index){
							move(aLi[j],{'left':res*j});
						}else{
							move(aLi[j],{'left':oUl.offsetWidth-res*(aLi.length-j)})
						}
					}
				}
			}			
		})