function findInArr(n,arr){
		for(var i=0; i<arr.length; i++){
			if(arr[i]==n){
				return true;
			}
		}
		return false;
	}
	function getByClass(oParent,sClass){
		if(oParent.getElementsByClassName){
			return oParent.getElementsByClassName(sClass);
		}else{
			var aEle=oParent.getElementsByTagName('*');
			var arr2=[];
			for(var i=0; i<aEle.length; i++){
				var tmp=aEle[i].className;
				var arr=tmp.split(' ');
				if(findInArr(sClass,arr)){
					arr2.push(aEle[i]);
				}
			}
			return arr2;
		}
	}