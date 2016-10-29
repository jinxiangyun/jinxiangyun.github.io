// JavaScript Document
window.onload=function(){
		function toBig(id){
			var oPro=document.getElementById(id);
			var oBox=oPro.children[0];
			var oSmall=oBox.children[0];
			var oBig=oPro.children[1].children[0];
			var oImg=oBig.children[0];
			var oPrX=oPro.offsetLeft;
			var oPrY=oPro.offsetTop;
			oBox.onmouseenter=function(){
				oSmall.style.display='block';
				oBig.style.display='block';
			}
			oBox.onmouseleave=function(){
				oSmall.style.display='none';
				oBig.style.display='none';
			}
			oBox.onmousemove=function(ev){
				var oEvent=ev||event;
				var l=oEvent.clientX-oSmall.offsetWidth/2-oPrX;
				var t=oEvent.clientY-oSmall.offsetHeight/2-oPrY;
				if(l<=0){
					l=0;
				}
				if(t<=0){
					t=0;
				}
				if(l>=oBox.offsetWidth-oSmall.offsetWidth){
					l=oBox.offsetWidth-oSmall.offsetWidth
				}
				if(t>=oBox.offsetHeight-oSmall.offsetHeight){
					t=oBox.offsetHeight-oSmall.offsetHeight;
				}
				oSmall.style.left=l+'px';
				oSmall.style.top=t+'px';
				oImg.style.left=-(oImg.offsetWidth-oBig.offsetWidth)*oSmall.offsetLeft/(oBox.offsetWidth-oSmall.offsetWidth)+'px';
				oImg.style.top=-(oImg.offsetHeight-oBig.offsetHeight)*oSmall.offsetTop/(oBox.offsetHeight-oSmall.offsetHeight)+'px';
			}
		}
		toBig('pro');
}