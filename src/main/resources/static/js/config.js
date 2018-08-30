//系统配置文件
var mapConfig = {
	  //超图（地图）和高德（api）外网地址，如果获取地址为空时可调用
	  supermap:"http://t0.supermapcloud.com/FileService/image?",
	  gaodemap:"http://app.mapabc.com/apis?t=javascriptmap&v=3.1.1&key=b0a7db0b3a30f944a21c3682064dc70ef5b738b062f6479a5eca39725798b1ee300bd8d5de3a4ae3",
	  //用户验证和获取地图相关地址请求的URl
	 // reqUrl:"http://10.133.210.11:7003/intsch/pages/demo/getConfig.jsp?userCallCode=",
	 //测试
	   reqUrl:"/intsch/pages/demo/getConfig.jsp?userCallCode=",
	  //用户切换href
	  userHref:"../map/mapapp.html",
	  //mker样式
	  makerImg:{
		  defalutimg:{
			  	w:21,
				h:32,
			  	imgUrl:["images/1.png","images/2.png","images/3.png","images/4.png","images/5.png","images/6.png","images/7.png","images/8.png","images/9.png","images/10.png"]
			  },
		   selectImg:{
			   	w:24,
				h:37,
			  	imgUrl:["images/1_s.png","images/2_s.png","images/3_s.png","images/4_s.png","images/5_s.png","images/6_s.png","images/7_s.png","images/8_s.png","images/9_s.png","images/10_s.png"]
			  }

		  
		  }
};