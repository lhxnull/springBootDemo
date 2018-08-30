//获取城市名称
function geyCityName(addr){
	var citystr = "";
	if(addr.indexOf("省") > -1 && addr.indexOf("市") > -1){
		citystr = addr.substring(addr.indexOf("省")+1,addr.indexOf("市"));
	}else if(addr.indexOf("省") == -1 && addr.indexOf("市") > -1){
		citystr = addr.substring(addr.indexOf("市")-2,addr.indexOf("市"));
	}else if(addr.indexOf("省") > -1 && addr.indexOf("市") == -1 && addr.length >5){
		//citystr = addr.substring(addr.indexOf("省")+1,addr.indexOf("省")+3);
		var SName= addr.substring(0,addr.indexOf("省"));
		for(var i=0;i<shenghuichengshi.length;i++){
			if(shenghuichengshi[i][0].indexOf(SName) > -1){
				citystr = shenghuichengshi[i][1];
				break;
			}
		}
	}else {
		citystr = "";
	}
	return getCity(citystr);
}
//从输入keyword中获取城市
function selectCityName(addr){
	var city = geyCityName(addr);
	if(city != ""){
		$("#cityname").val(city);
		$("#cityID").html(city+" ▼");
		setCityCenter(city);
	}
}

//从自动提示poi列表中选择城市
function selectListCity(addr){
	var key = $("#keyword").val();
	var city = geyCityName(addr);
	if(city != "" && key.length>5){
		$("#cityname").val(city);
		$("#cityID").html(city+" ▼");
		setCityCenter(city);
	}
}
//匹配城市
function getCity(c){
	var city = "";
	if(c == "") return city;
	for(var i=0;i<citydata.length;i++){
		if(citydata[i].indexOf(c) > -1){
			city = citydata[i];
			break;
		}
	}
	return city;
}
function over(i){
	 $("#div"+i).css('background-color','#ededed');
	 $("#img"+i).attr('src','images/s2.png');
}
function out(i){
	$("#div"+i).css('background-color','white');
	$("#img"+i).attr('src','images/s1.png');
}

/**
 * 墨卡托投影坐标转换为经纬度坐标
 */
function meterXY2GeoLoc(x, y, precision){
	var earthCircumferenceInMeters = new Number(40075016.685578488);
	var halfEarthCircumferenceInMeters = earthCircumferenceInMeters / 2;
	
	var geoX = x/halfEarthCircumferenceInMeters*180;
	var geoY = y/halfEarthCircumferenceInMeters*180;
	geoY = Math.atan(Math.exp(geoY * (Math.PI / 180.0)))*360.0/Math.PI - 90;
	
	geoX = setPrecision(geoX, precision);
	geoY = setPrecision(geoY, precision);
	
	var obj = new Object();
	obj.lngX = geoX;
	obj.latY = geoY;
	return obj;
}
//按输入精度保留经纬度
function setPrecision(num, precision){
	var temp = new String(num);
	
	var pos = temp.indexOf(".");
	if (temp.length > (pos + precision)){
		var num = Number(temp).toFixed(precision);
		return num;
	}
	
	return temp;
}

/**
 * 经纬度坐标转墨卡托投影坐标
 */
function geoLoc2MeterXY(x, y){
	var earthCircumferenceInMeters = new Number(40075016.685578488);
	var halfEarthCircumferenceInMeters = earthCircumferenceInMeters / 2;
	
	var geoX = new Number(x);
	var geoY = new Number(y);
	
	var mx = geoX / 180.0 * halfEarthCircumferenceInMeters;
	var my = Math.log(Math.tan((90 + geoY) * Math.PI / 360.0)) / (Math.PI / 180.0);
	my = my / 180.0 * halfEarthCircumferenceInMeters;
	
	var obj = new Object();
	obj.lngX = mx;
	obj.latY = my;
	return obj;
}


/**
* 经纬度转米坐标
*/
var earthCircumferenceInMeters = 40075016.685578488;
var halfEarthCircumferenceInMeters = earthCircumferenceInMeters / 2;
function latLonToMeters(point){
	//如果用户传入的是SuperMap.Geometry.Point类型的对象就执行if语句，否则就执行else语句
	if(point.CLASS_NAME == "SuperMap.Geometry.Point" || point.CLASS_NAME == "SuperMap.OSP.Core.Point2D" || point.x != null){
		var mx = point.x / 180.0 * halfEarthCircumferenceInMeters;
		var my = Math.log(Math.tan((90 + point.y) * Math.PI / 360.0)) / (Math.PI / 180.0);
		my = my / 180.0 * halfEarthCircumferenceInMeters;
		return new SuperMap.Geometry.Point(mx, my);
	}else{
		var mx = point.lon / 180.0 * halfEarthCircumferenceInMeters;
		var my = Math.log(Math.tan((90 + point.lat) * Math.PI / 360.0)) / (Math.PI / 180.0);
		my = my / 180.0 * halfEarthCircumferenceInMeters;
		return new SuperMap.LonLat(mx, my);
	}
};

/**
* 米坐标转经纬度
*/
function metersToLatLon(point) {
	if(point.CLASS_NAME == "SuperMap.Geometry.Point" || point.CLASS_NAME == "SuperMap.OSP.Core.Point2D" || point.x != null){
		var lon = point.x / halfEarthCircumferenceInMeters * 180.0;
		var lat = point.y / halfEarthCircumferenceInMeters * 180.0;
		lat = 180 / Math.PI * (2 * Math.atan(Math.exp(lat * Math.PI / 180.0)) - Math.PI / 2);
		return new SuperMap.Geometry.Point(lon, lat);
	}else{
		var lon = point.lon / halfEarthCircumferenceInMeters * 180.0;
		var lat = point.lat / halfEarthCircumferenceInMeters * 180.0;
		lat = 180 / Math.PI * (2 * Math.atan(Math.exp(lat * Math.PI / 180.0)) - Math.PI / 2);
		return new SuperMap.LonLat(lon, lat);
	}
};

//复制地址
function copyToClipBoard(t,ic) {
		var s = t;
		var city = "";
		var ct = $("#cityID").html();
		var st = ct.substring(0,ct.indexOf(" ▼"));
		if(s.indexOf("市") > -1){
			var ct = s.substring(s.indexOf("市")-2,s.indexOf("市"));
			if(getCity(ct) == st){
				city = s;
			}else{
				city = st+s;
			}
		}else {
			city = st+s;
		}
		s = city;
		//提示信息
		showTips(ic);
		if (window.clipboardData) {
			window.clipboardData.setData("Text", s);
		} else if (navigator.userAgent.indexOf("Opera") != -1) {
			window.location = s;
		} else if (window.netscape) {
			try {
				netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
			} catch (e) {
				alert("被浏览器拒绝！\n请在浏览器地址栏输入'about:config'并回车\n然后将'signed.applets.codebase_principal_support'设置为'true'");
			}
			var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
			if (!clip)
				return;
			var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
			if (!trans)
				return;
			trans.addDataFlavor('text/unicode');
			var str = new Object();
			var len = new Object();
			var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
			var copytext = s;
			str.data = copytext;
			trans.setTransferData("text/unicode", str, copytext.length * 2);
			var clipid = Components.interfaces.nsIClipboard;
			if (!clip)
				return false;
			clip.setData(trans, null, clipid.kGlobalClipboard);
			alert("已经复制到剪切板！" + "\n" + s)
		}
}
//复制成功提示
function showTips(type){
	if(type == "c"){
		$("#showTip").fadeIn("slow").fadeIn(4000).fadeOut(2000).css("color","grey");
	}else if(type == "mk"){
		$("#marktip").fadeIn("slow").fadeIn(4000).fadeOut(2000).css("color","grey");
	}else{
		$("#tip").fadeIn("slow").fadeIn(4000).fadeOut(2000).css("color","grey");
	}
}

//缩放到当城市
function setCityCenter(city){
	for(var i=0;i<citys.length;i++){
		if(citys[i][0] == city){
			map.setCenter(new SuperMap.LonLat(citys[i][3],citys[i][4]), 11);
			map.render("iCenter");
	     }
	}
}

//测距
function setMeasure(){
	if(locationMapType == "gaode")
	{
		measureControls.activate();
	}
	else
	{
		myDis.open();
	}

}
//量算线段
function measureLineSegment(e) {
	if(segmentMarker != null) {
		var marker = segmentMarker;		
		layer_measureMarkers.addMarker(marker);
	}
}
var segmentMarker = null;
function handleMeasurements(e) {
	if(segmentMarker != null) {
		layer_measureMarkers.removeMarker(segmentMarker);
	}
	var length = e.geometry.components.length - 1;
	var item = e.geometry.components[length];
	var end = new SuperMap.LonLat(item.x, item.y);
	var units = e.units;
	var distanceinfo = "<font color=red>" + (e.measure*0.00001).toFixed(3) + "</font>" + units;
	var icon_measure = new SuperMap.Icon("", new SuperMap.Size(96, 20), new SuperMap.Pixel(15, -15) );
    segmentMarker = new SuperMap.Marker(end, icon_measure);
    var content = '<div class="measureResult">' + distanceinfo + '</div>';
    segmentMarker.events.element.innerHTML = content;
    layer_measureMarkers.addMarker(segmentMarker);
}
  
var iClientMeter = 0;
//绘制长度
var measureIndex = 0;
var measureHashMap = null;
function handleMeasure(e){
	var featureIds = [];
	measureControls.deactivate();
	
	if(segmentMarker != null) {
		layer_measureMarkers.removeMarker(segmentMarker);
	}
	if(measureHashMap == null) {
		measureHashMap = new SuperMap.OSP.Core.HashMap();
	}
	
	var index = ++measureIndex;
	var geometry = e.geometry;
	
	var style = {
		strokeColor:"#CC3333",
		strokeOpacity:1,
		strokeWidth:3,
		pointRadius:6
	}
	var f = new SuperMap.Feature.Vector(geometry, null, style);	
	f.id = "measureLine-" + index;
	layer_vector.addFeatures(f);
	featureIds.push(f.id);
	
	var start,end;
	var pois = new Array();
	var length_componets = geometry.components.length;
	var distance1 = 0;
	for(var k = 0; k < length_componets; k++){
		var point = new SuperMap.Geometry.Point(geometry.components[k].x, geometry.components[k].y);
		
		var pointFeature = new SuperMap.Feature.Vector(point);
		featureIds.push(pointFeature.id);
		pointFeature.style  = {fillColor: "#fffff",strokeColor: "#FF0000",pointRadius:5,strokeOpacity:0.5,fillOpacity:0.5};
		layer_vector.addFeatures(pointFeature);
		pois.push(point);
		
		if(k == 0){
			start = point;
		}
		else if(k == ( length_componets -1)){
			end = point;
			var last_point = new SuperMap.Geometry.Point(geometry.components[k-1].x, geometry.components[k-1].y);
			distance1 = distance1 + Math.sqrt( Math.pow((last_point.x - point.x), 2) + Math.pow((last_point.y - point.y), 2));
		}
		else {
			var last_point = new SuperMap.Geometry.Point(geometry.components[k-1].x, geometry.components[k-1].y);
			
			distance1 = distance1 + Math.sqrt( Math.pow((last_point.x - point.x), 2) + Math.pow((last_point.y - point.y), 2));			
			var distanceinfo1;
			distanceinfo1 = "" + (distance1*0.001).toFixed(3) + "km";
			var icon_measure1 = new SuperMap.Icon("", new SuperMap.Size(76, 20), new SuperMap.Pixel(15, -15) );
			var segmentMarker1 = new SuperMap.Marker(new SuperMap.LonLat(point.x, point.y), icon_measure1);
			var content1 = '<div class="measureResult">' + distanceinfo1 + '</div>';
			segmentMarker1.events.element.innerHTML = content1;
			layer_measureMarkers.addMarker(segmentMarker1); 
		}
	}
	
	measureHashMap.put(index,featureIds);
	var units = e.units;
    var distance = (distance1*0.001).toFixed(3) ;
	var distanceinfo = "<font color=red>" + distance + "</font>"+units;

    var icon_start = new SuperMap.Icon('images/begin.gif', new SuperMap.Size(34, 19), new SuperMap.Pixel(0, 0) );
    var marker_start = new SuperMap.Marker(new SuperMap.LonLat(start.x,start.y), icon_start);    
    layer_measureMarkers.addMarker(marker_start);

    var icon_close = new SuperMap.Icon('images/close1.gif', new SuperMap.Size(12, 12), new SuperMap.Pixel(-20, -5) );
    var marker_close = new SuperMap.Marker(new SuperMap.LonLat(end.x, end.y), icon_close);
    marker_close.id = "" + index;
    marker_close.events.element.title = "clear";
    marker_close.events.on({
	   "click":clearMeasure
	});
    layer_measureMarkers.addMarker(marker_close);

    var icon_measure = new SuperMap.Icon("", new SuperMap.Size(106, 20), new SuperMap.Pixel(15, -15) );
    var marker_measure = new SuperMap.Marker(new SuperMap.LonLat(end.x, end.y), icon_measure);
    var content = '<div class="measureResult">' + distanceinfo + '</div>';
    marker_measure.events.element.innerHTML = content;
    layer_measureMarkers.addMarker(marker_measure);
}

//清除量算结果
function clearMeasure(){
	var id = this.id;
	iClientMeter = 0;
	var array = measureHashMap.get(id);

	var featureArray = new Array();
	for(var i = 0; i < array.length; i++){
		var feature = layer_vector.getFeatureById(array[i]);
		featureArray.push(feature);
	}
	layer_vector.removeFeatures(featureArray);
	layer_measureMarkers.clearMarkers();
	measureHashMap.remove(id);
	measureIndex--;
}

//清空地图
function clearMap() {
	if (locationMapType == "gaode") {
		layer_vector.removeAllFeatures();
		vectorLayer.removeAllFeatures();
		layer_measureMarkers.clearMarkers();
		layer_Draw_Maker.clearMarkers();
		layer_markers.clearMarkers();
		clearMapPopups();
	}
	else
	{
		map.clearOverlays();
	}

}
function TipContents(type,address,tel){   
	if (type == "" || type == "undefined" || type == null || type == " undefined" || typeof type == "undefined") { 
		type = "暂无"; 
	} 
	if (address == "" || address == "undefined" || address == null || address == " undefined" || typeof address == "undefined") { 
		address = "暂无"; 
	} 
	if (tel == "" || tel == "undefined" || tel == null || tel == " undefined" || typeof address == "tel") { 
		tel = "暂无"; 
	} 
	var str ="地址：" + address + "<br/>电话：" + tel + " <br/>类型："+type; 
	return str; 
} 

var rightwidth=$('body').width()-$('#left').width();
function zankai(){
	 var zs = zk-1;
	 if($("#result1").css('display')=='none'){
		$("#result1").show();
	}else{
		$("#result1").hide();
	}
	  if(zs < 0){
		 $("#iCenter").css("width",$('body').width());
		 $("#imgzk").attr("src","images/zkan.png");
	 }
	 if(zs >= 0){
		 $("#iCenter").css("width",$('body').width());
		 $("#imgzk").attr("src","images/sqan.png");
	 }
}

function zankai_over(){
	 var zs = zk-1;
	 if(zs < 0){
		 $("#imgzk").attr("src","images/zkl.png");
	 }
	 if(zs >= 0){
		 $("#imgzk").attr("src","images/sql.png");
	 }
}
function zankai_out(){
	 var zs = zk+1;
	 if(zs < 0){
		 $("#imgzk").attr("src","images/zkan.png");
	 }
	 if(zs >= 0){
		 $("#imgzk").attr("src","images/sqan.png");
	 }
}
//复制坐标
function copyToClipXY(t,ic) {
		var s ="["+t+"]";
		
		//提示信息
		showTips(ic);
		if (window.clipboardData) {
			window.clipboardData.setData("Text", s);
		} else if (navigator.userAgent.indexOf("Opera") != -1) {
			window.location = s;
		} else if (window.netscape) {
			try {
				netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
			} catch (e) {
				alert("被浏览器拒绝！\n请在浏览器地址栏输入'about:config'并回车\n然后将'signed.applets.codebase_principal_support'设置为'true'");
			}
			var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
			if (!clip)
				return;
			var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
			if (!trans)
				return;
			trans.addDataFlavor('text/unicode');
			var str = new Object();
			var len = new Object();
			var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
			var copytext = s;
			str.data = copytext;
			trans.setTransferData("text/unicode", str, copytext.length * 2);
			var clipid = Components.interfaces.nsIClipboard;
			if (!clip)
				return false;
			clip.setData(trans, null, clipid.kGlobalClipboard);
			alert("已经复制到剪切板！" + "\n" + s)
		}
}


