$(function(){
	//找到class=pic的对象
	//原理：当前点击的图片的top、left、z-index和最上面图片的top、left、z-index进行交换
	$('.pic').click(function(){
		//点击的快会出问题
		//重点理解此处，查阅帮助文档
		//解决方式
		$('.pic[title]').stop(true,true);
		$(this).stop(true,true);
		//获取当前点击图片的left值
		var left1=$(this).offset().left;
		//获取当前点击图片的top值
		var top1=$(this).offset().top;
		//获取当前点击图片的z-index值
		var zindex1=$(this).css('z-index');
		//获取最上面图片的信息
		//重点获取元素$('.pic[title]')，重点理解一下
		var left2=$('.pic[title]').offset().left;
		var top2=$('.pic[title]').offset().top;
		var zindex2=$('.pic[title]').css('z-index');
		//动画
		$('.pic[title]').animate({'left':left1,'top':top1},1000).css('z-index',zindex1).removeAttr('title');
		$(this).stop().animate({'left':left2,'top':top2},1000).css('z-index',zindex2).attr('title','')
	});
});