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
				})
			}else{
				addEvent(document,'readystatechange',function(){
					if(document.readyState=='complete'){
						fn &&  fn();
					}
				})
			}
		}
		domReady(function(){
			var oT=document.getElementById('text');
			var oList=document.getElementById('list');
			var iNow=-1;
			var oldValue='';
			addEvent(oT,'keyup',function(ev){
				var oEvent=ev||event;
				if(oEvent.keyCode==40||oEvent.keyCode==38){
					return;
				}
				oldValue=oT.value;
				jsonp({
					url:'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su',
					data:{
						wd:oT.value
					},
					success:function(json){
						var arr=json.s;
						oList.style.display='block';
						oList.innerHTML='';
						for(var i=0; i<arr.length; i++){
							var oLi=document.createElement('li');
							oLi.innerHTML=arr[i];
							oList.appendChild(oLi);
						}
					}			
				});
			});
			
			//键盘控制上下
			addEvent(oT,'keydown',function(ev){
				var oEvent=ev||event;
				if(oEvent.keyCode==40){
					var aLi=oList.children;
					iNow++;
					for(var i=0; i<aLi.length; i++){
						aLi[i].className='';
					}
					if(iNow==10){
						oT.value=oldValue;
						iNow=-1;
					}else{
						oT.value=aLi[iNow].innerHTML;
						aLi[iNow].className='on';
					}
				}
				if(oEvent.keyCode==38){
					var aLi=oList.children;;
					iNow--;
					for(var i=0; i<aLi.length; i++){
						aLi[i].className='';
					}
					if(iNow==-1){
						oT.value=oldValue;
						iNow=aLi.length;
					}else{
						oT.value=aLi[iNow].innerHTML;
						aLi[iNow].className='on';
					}	
				}
				if(oEvent.keyCode==13){
						window.open('https://www.baidu.com/s?wd='+oT.value,'_blank');
				}
			});
		})