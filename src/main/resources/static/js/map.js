var map, layer_cloud, layer_markers, layer_measureMarkers, vectorLayer, toolbar, mapObj, layer_vector;
var measureLine;
var measureControls;
var measurePoint;
var dragFeature;
var control;
var address_marker = '';
var drawingManager;

var Draw_Maker;


function mapInit(mapUrl) {

    //输入框失去焦点事件
    $("#keyword").blur(function () {
        document.getElementById("m_list").style.display = 'none';
    });

    $("#keyword").focus();
    $("#iCenter").css("width", $('body').width());
    $("#iCenter").css("height", $('body').height() - 102);
    $("#result1").css("height", $('body').height() - 102);
    $("#zankai").css("height", $('body').height() - 102);
    if (locationMapType == "gaode") {
        layer_cloud = new SuperMap.Layer.CloudLayer();
        //离线地图访问地址
        layer_cloud.url = mapUrl;
        vectorLayer = new SuperMap.Layer.Vector("dragVector");

        drawPoint = new SuperMap.Control.DrawFeature(vectorLayer, SuperMap.Handler.Point, {multi: true});
        drawPoint.events.on({"featureadded": drawCompleted});

        map = new SuperMap.Map("iCenter", {
            controls: [new SuperMap.Control.PanZoomBar({
                showSlider: true
            }),
                new SuperMap.Control.OverviewMap(),
                new SuperMap.Control.Navigation({
                    dragPanOptions: {
                        enableKinetic: true
                    }
                }), drawPoint]
        });

        map.addLayer(layer_cloud);
        map.addLayer(vectorLayer);
        layer_vector = new SuperMap.Layer.Vector("layer_vector");
        map.addLayer(layer_vector);
        layer_measureMarkers = new SuperMap.Layer.Markers("layer_measureMarkers");
        map.addLayer(layer_measureMarkers);
        layer_markers = new SuperMap.Layer.Markers("markers");
        map.addLayer(layer_markers);


        layer_Draw_Maker = new SuperMap.Layer.Markers("layer_Draw_Maker");
        map.addLayer(layer_Draw_Maker);

        measureControls = new SuperMap.Control.Measure(
            SuperMap.Handler.Path, {persist: true, immediate: true}
        );
        measureControls.events.on({
            "measure": handleMeasure
        });
        measureControls.style = {fillColor: "#CC3333", strokeColor: "#CC3333", pointRadius: 6};
        //添加控件到 map 上
        map.addControl(measureControls);
        map.setCenter(new SuperMap.LonLat(12957140.380859, 4854144.165039), 11);
        map.render("iCenter");
        dragFeature = new SuperMap.Control.DragFeature(vectorLayer);
        dragFeature.geometryTypes = ['SuperMap.Geometry.Point'];
        map.addControl(dragFeature);
    }
    else {
        map = new BMap.Map("iCenter");

        myDis = new BMapLib.DistanceTool(map);
        var centPoint;
        centPoint = meterXY2GeoLoc(12957140.380859, 4854144.165039, 7);
        var poi = new BMap.Point(centPoint.lngX, centPoint.latY);
        map.centerAndZoom(poi, 16);
        map.enableScrollWheelZoom();

        var bottom_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT});// 左上角，添加比例尺
        var top_left_navigation = new BMap.NavigationControl();  //左上角，添加默认缩放平移控件
        var overView = new BMap.OverviewMapControl();//缩略图
        var overViewOpen = new BMap.OverviewMapControl({isOpen: true, anchor: BMAP_ANCHOR_BOTTOM_RIGHT});//缩略图开关

        map.addControl(bottom_left_control);
        map.addControl(top_left_navigation);
        map.addControl(overView);
        map.addControl(overViewOpen);
        map.addControl();

        var styleOptions = {
            strokeColor: "#000088",    //边线颜色。
            fillColor: "#CCCCCC",      //填充颜色。当参数为空时，圆形将没有填充效果。
            strokeWeight: 3,       //边线的宽度，以像素为单位。
            strokeOpacity: 0.5,	   //边线透明度，取值范围0 - 1。
            fillOpacity: 0.5,      //填充的透明度，取值范围0 - 1。
            strokeStyle: 'solid' //边线的样式，solid或dashed。
        }

        drawingManager = new BMapLib.DrawingManager(map, {
            isOpen: false, //是否开启绘制模式
            enableDrawingTool: false, //是否显示工具栏
            drawingToolOptions: {
                anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
                offset: new BMap.Size(5, 5), //偏离值
            },
            circleOptions: styleOptions, //圆的样式
            polylineOptions: styleOptions, //线的样式
            polygonOptions: styleOptions, //多边形的样式
            rectangleOptions: styleOptions //矩形的样式
        });
        drawingManager.addEventListener('overlaycomplete', overlaycomplete);
    }

    $("#divSMapSel").html("");
    initSMapSelWidget();

    //var opt = {
    //level:12,//初始地图视野级别
    //center:new MMap.LngLat(116.47536212,39.90741526),//设置地图中心点
    //doubleClickZoom:true,//双击放大地图
    //scrollwheel:true//鼠标滚轮缩放地图
    //};

    //mapObj = new MMap.Map("iCenter1",opt);
    TypeAheadPlugin.init('keyword', 'list', $('#cityname').val());
    TypeAheadPlugin.setPositionOrStyle(function () {
        var list = document.getElementById('list');
        var input = document.getElementById('keyword');
        list.style.width = input.clientWidth;
        list.style.marginLeft = '0px';
        list.style.zIndex = '10000';
        list.style.border = '1px solid gray';
    });
    document.getElementById('cityname').onchange = function () {
        if (this.value.length > 3) {
            TypeAheadPlugin.setCity(this.value);
        }
    };
    TypeAheadPlugin.isShowCity(true);
    //MMap.Conf._client='';
    //MMap.Conf.mapUrl='';
}

//-1 表示左侧收起状态 1 左侧展开
var zk = 0;
function keywordSearch() {
    $("#result1").html("");
    document.getElementById("m_list").style.display = 'none';

    document.getElementById("list").style.display = 'none';


    var keywords = document.getElementById("keyword").value;
    var city = document.getElementById("cityname").value;
    if (keywords != '') {
        $("#result1").show();
    }

    if (!isAddress(keywords)) {

        zk = -1;
        zankai();
        return;
    }

    var cityName = geyCityName(keywords);
    if (cityName != "") {
        city = cityName;
        $("#cityname").val(city);
        $("#cityID").html(city + " ▼");
    }


    zk = 1;  //左侧展开
    $("#imgzk").attr("src", "images/sqan.png");
    tishihide();
    city = city == '全国' ? '全国' : city;


    $("#cityID").html(city + ' ▼');
    if (city == '全国') {
        city = "";
    }

    if (locationMapType == "gaode") {
        var PoiSearchOption = {
            srctype: "POI",//数据来源
            type: "",//数据类别
            number: 7,//每页数量,默认7
            batch: 1 //,//请求页数，默认1
            //range:5000, //查询范围，默认5000米
            //ext:""//扩展字段
        };
        var MSearch = new MMap.PoiSearch(PoiSearchOption);
        city = city.replace("﻿", "");
        MSearch.byKeywords(keywords, city, searchPoilist_CallBack);
    }
    else {
        var local = new BMap.LocalSearch(map, {
            renderOptions: {map: map, panel: "result1"}
        });
        local.search(keywords);
    }
}


/*
 获取省市地址
 */

function isAddress(value) {
    // provinces省
    //citys 市
    var is = false;
    var province;
    for (var i = 0; i < provinces.length; i++) {
        province = provinces[i];
        var Name = province[0];
        var Icaiu = Name.indexOf(value);
        if (Icaiu > -1) {
            var x = province[3];
            var y = province[4];
            /*	 map.setCenter(new SuperMap.LonLat(x,y),6);
             $("#cityID").html(Name+'     ▼');*/
            //initSMapSelWidget(province)


            SMapSel_setMapCenter({
                value: province[1],
                text: province[0],
                x: province[3],
                y: province[4],
                level: province[5],
                name: province[6]
            });
            $("#cityID").html(Name + '     ▼');
            $("#cityname").val(Name);
            return false;
        }
    }

    for (var i = 0; i < citys.length; i++) {
        province = citys[i];
        var Name = province[0];
        var Icaiu = Name.indexOf(value);
        if (Icaiu > -1) {
            var x = province[3];
            var y = province[4];
            SMapSel_setMapCenter({
                value: province[1],
                text: province[0],
                x: province[3],
                y: province[4],
                level: province[5],
                name: province[6]
            });
            /* map.setCenter(new SuperMap.LonLat(x,y),10);
             $("#cityID").html(Name+'     ▼');*/
            $("#cityID").html(Name + '     ▼');
            $("#cityname").val(Name);
            return false;
        }
    }

    for (var i = 0; i < chinaTown.length; i++) {
        province = chinaTown[i];
        var Name = province[0];
        var Icaiu = Name.indexOf(value);
        if (Icaiu > -1) {
            var x = province[1];
            var y = province[2];
            var data = {text: province[0], x: province[1], y: province[2]};
            map.setCenter(new SuperMap.LonLat(data.x, data.y), 11);

            //	 map.setCenter(new SuperMap.LonLat(x,y),15);
//		  $("#cityID").html(Name+'     ▼');
            return false;
        }
    }


    return true;

}


function searchPoilist_CallBack(data) {
    layer_markers.clearMarkers();
    layer_Draw_Maker.clearMarkers();
    clearMapPopups();
    $("#result1").html("");
    var markers = [];
    var flag = 0;
    if (data.status == 'E0') {
        if (data.bounds) {
            var a = data.bounds.split(';');
            if (a.length == 2) {
                var b = a[0].split(','), c = a[1].split(',');
                var lngLat = geoLoc2MeterXY(data.list[0].x, data.list[0].y, 7);
                map.setCenter(new SuperMap.LonLat(lngLat.lngX, lngLat.latY), 11);
            } else {//只返回一条数据时
                var d = a[0].split(',');
                var lngLat = geoLoc2MeterXY(d[0], d[1], 7);
                map.setCenter(new SuperMap.LonLat(lngLat.lngX, lngLat.latY), 11);
            }
        }
        var list = '<span id="tip" style="display:none;margin-left:40px;"><b>复制成功</b></span><br>'
            + '<ul id="poisearchUl">';
        var address_sub;
        for (var i = 0, l = data.list.length; i < l; i++) {
            flag++;
            var item = data.list[i];
            address_sub = item.name;
            var suName = item.address
            if (address_sub.length > 10) {
                address_sub1 = address_sub.substring(0, 10) + '...';
            } else {
                address_sub1 = address_sub;
            }
            /*list+='<li id="li'+i+'" style="width: 315px;height: 72px;margin-bottom:5px;" class="result">'
             +'<div id="div'+i+'" onmouseover="over('+i+')" onmouseout="out('+i+')" style="width: 315px;height: 72px; background-color:white">'
             +'<div style="width:35px;height: 72px;float:left" ><img id="img'+i+'" src="images/s1.png" width="19" height="29" border="0" alt="" style="margin-left:8px;margin-top:15px;"></div>'
             +'<div style="width:250px;height: 57px; float:left;padding:5px 0;" >'
             +'<div style="color:#000000;font-size: 12px;margin-top:5px;width:250px;" title="'+item.name+'">地址:	'+address_sub1
             +'</div><div style="color:#000000;font-size: 12px;margin-top:5px;width:250px;">'
             +'<a href="#" onclick="copyToClipBoard(\''+item.name+'\',\'\')">'
             +'<img src="images/s3.png" width="12" height="12" border="0" alt="">复制地址</a>'
             +'</div></div></div></li>'; */

            var lnglat = item.x + ',' + item.y;

            list += '<li id=\"li' + i + '\" style="width: 315px;height: 72px;margin-bottom:5px;">'
                + '<div id="div' + i + '"  style="width: 315px;height: 72px; ">'
                + '<div style="width:35px;height: 72px;float:left"  class="result"><div class="defalut"><div class="img" id="no' + (i + 1) + '"></div></div></div>'
                + '<div style="width:250px;height: 57px; float:left;padding:5px 0;" >'
                + '<div style="color:#000000;font-size: 12px;margin-top:5px;width:250px;" title="' + item.name + '">名称:	' + address_sub1 + '</div>'
                + '<div style="color:#000000;font-size: 12px;margin-top:5px;width:250px;" title="' + item.name + '">地址:	' + suName + '</div>'
                + '<div style="color:#000000;font-size: 12px;margin-top:5px;width:250px;">'
                + '<a href="#" onclick="copyToClipBoard(\'' + item.name + "[" + lnglat + "]" + '\',\'\')">'
                + '<img src="images/s3.png" width="12" height="12" border="0" alt="">复制名称</a>'
                + '&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" onclick="copyToClipXY(\'' + lnglat + '\',\'c\')">'
                + '<img src="images/s3.png" width="12" height="12" border="0" alt="">复制坐标</a>'
                + '</div></div></div></li>';


            var position = latLonToMeters(new SuperMap.LonLat(item.x, item.y));


            var defalutImg = mapConfig.makerImg.defalutimg;
            var w = defalutImg.w;
            var h = defalutImg.h;
            var url = defalutImg.imgUrl[i]
            var size = new SuperMap.Size(w, h);
            var offset = new SuperMap.Pixel(-(size.w / 2), -size.h);


            var icon = new SuperMap.Icon(url, size, offset);
            var marker = new SuperMap.Marker(position, icon);
            marker.id = "marker_" + i;
            marker.attributes = item;
            marker.events.on({
                "click": openMarkerPopup,
                "mousemove": MarkerMover,
                "mouseout": MarkerOut,
                "scope": marker
            });
            markers.push(marker);
            layer_markers.addMarker(marker);
        }
        list += '</ul>';
    } else if (data.status == "E1") {
        list = "未查找到任何结果!<br />建议：<br />1.请确保所有字词拼写正确。<br />2.尝试不同的关键字。<br />3.尝试更宽泛的关键字。";
    } else {
        //list= "错误信息："+data.status+"请对照API Server v2.0.0 简明提示码对照表查找错误类型";
        list = '';
    }

    //如果查找到POI就用地址解析
    if (flag == 0) {
        addressSearch();
        return;
    }

    $('#result1').html(list);
    //动态绑定事件
    dom_li_event();
    return;


}

/*
 添加列表li对象事件

 */
function dom_li_event() {
    var markers = layer_markers.markers;
    getsssssssssssssss();
    var liObj = document.getElementsByTagName('li');
    for (i = liObj.length - 1; i >= 0; i--) {
        liObj[i].onmouseover = function () {
            var num = this.id.substring(2);
            /*			// 切换样式class
             var defalutdom=$(this).find(".defalut");
             defalutdom.addClass("focus-over");
             defalutdom.removeClass("defalut");
             //li 背景颜色
             this.style.background='#f0f0f0';*/
            changObjliStyle(this, null, getselectLiStyle());

            //	getAddress(markers[num].attributes.name);
            //修改选中mker样式
            /*var defalutImg=mapConfig.makerImg.selectImg;
             var url=defalutImg.imgUrl[num]
             var styele={url:url};*/
            var styele = GetMakerImg(num, 1);
            changMarkerSystle(markers[num], styele);
            //弹出Popup
            //取消该功能，百度时点击后弹出Popu
            //openMarkerPopup(markers[num]);
        };
        liObj[i].onmouseout = function () {
            //if(isPopups()){ }


            var num = this.id.substring(2);
            //判断当时列表选择信息是否与popup信息一直
            var isPop = false;
            var popInfolonlat = Getpopuplonlat()
            if (popInfolonlat != null) {
                var markerlonlat = markers[num].lonlat;

                if (markerlonlat.lat == popInfolonlat.lat && markerlonlat.lon == popInfolonlat.lon) {
                    isPop = true
                }
            }
            if (!isPop) {
                //修改选中mker样式
                /*	this.style.background='';
                 var defalutdom=$(this).find(".focus-over");
                 defalutdom.addClass("defalut");
                 defalutdom.removeClass("focus-over");*/


                changObjliStyle(this, null, getdefalutListyle());


                /*var defalutImg=mapConfig.makerImg.defalutimg;
                 var url=defalutImg.imgUrl[num]
                 var styele={url:url};*/
                var styele = GetMakerImg(num, 0);
                changMarkerSystle(markers[num], styele);
            }

        };
        liObj[i].onclick = function () {

            var popInfolonlat = Getpopuplonlat();
            if (popInfolonlat != null) {
                var Makerindex = GetMarkerIndex(popInfolonlat.lon, popInfolonlat.lat)

                if (Makerindex > -1) {
                    //修改选中mker样式
                    //var objLi=document.getElementById('li'+Makerindex);
                    //objLi.style.background='#DDDDDD';
                    /*	var defalutdom=$(objLi).find(".focus-over");
                     defalutdom.addClass("defalut");
                     defalutdom.removeClass("focus-over");*/

                    changObjliStyle(null, Makerindex, getdefalutListyle());
                    var styele = GetMakerImg(Makerindex, 0);
                    changMarkerSystle(markers[Makerindex], styele);
                }
            }


            //弹出Popup
            var num = this.id.substring(2);
            openMarkerPopup(markers[num]);

        };

    }


}


/*
 popups坐标信息

 */
function Getpopuplonlat() {
    var popInfo = null;
    var PopLength = map.popups.length;
    if (PopLength > 0) {
        popInfo = map.popups[0];
    }
    if (popInfo != null) {
        var popInfolonlat = popInfo.lonlat;

        return popInfolonlat;
    }


    return null;

}

/*
 鼠标移动Marker上改变样式

 */
function MarkerMover() {
    var lonlat = this.lonlat;
    var Makerindex = GetMarkerIndex(lonlat.lon, lonlat.lat);
    changObjliStyle(null, Makerindex, getselectLiStyle());
    var styele = GetMakerImg(Makerindex, 1);
    changMarkerSystle(this, styele);

}
/*
 鼠标离开Marker改变样式

 */
function MarkerOut() {
    var popInfolonlat = Getpopuplonlat()
    var lonlat = this.lonlat;

    var nbool = true;

    if (popInfolonlat != null) {
        if (lonlat.lon == popInfolonlat.lon && lonlat.lat == popInfolonlat.lat) {
            nbool = false;
        }
    }
    if (nbool) {
        var Makerindex = GetMarkerIndex(lonlat.lon, lonlat.lat);
        changObjliStyle(null, Makerindex, getdefalutListyle());
        var styele = GetMakerImg(Makerindex, 0);
        changMarkerSystle(this, styele);
    }
}


//列表样式
/*
 *objli 列表对象
 *style
 {
 background:"",
 findclass:".focus-over",
 setClassName:"defalut",
 removeClassName:"focus-over"

 }
 */
function setLiStyle(objLi, style) {
    if (objLi != null || typeof(objLi) != "undefined") {
        objLi.style.background = style.background;
        var defalutdom = $(objLi).find(style.findclass);
        defalutdom.addClass(style.setClassName);
        defalutdom.removeClass(style.removeClassName);
    }
    /*	var objLi=document.getElementById('li'+Makerindex);
     objLi.style.background='#DDDDDD';
     var defalutdom=$(objLi).find(".focus-over");
     defalutdom.addClass("defalut");
     defalutdom.removeClass("focus-over");		*/
}
/*
 选中li样式
 */
function getselectLiStyle() {


    return {
        background: "#f0f0f0",
        findclass: ".defalut",
        setClassName: "focus-over",
        removeClassName: "defalut"

    }


}
/*
 取消选中li样式
 */
function getdefalutListyle() {
    var style = {
        background: "",
        findclass: ".focus-over",
        setClassName: "defalut",
        removeClassName: "focus-over"

    }
    return style;
}

/*
 * 修改列表对象objli,如objli为null值，也可以通过liindx查询到该objli对象。
 *style
 {
 background:"",
 findclass:"",
 setClassName:"",
 removeClassName:""

 }
 */
function changObjliStyle(objli, liIndex, style) {
    if (objli == null || typeof(objli) == "undefined") {
        if (liIndex == null || typeof(liIndex) == "undefined" || liIndex < 0) {

        } else {
            objli = document.getElementById('li' + liIndex);
            setLiStyle(objli, style);
        }
    } else {
        setLiStyle(objli, style);
    }
}

//maker图片样式
//type 0为defalutimg
function GetMakerImg(Makerindex, type) {
    var defalutImg;
    if (type == 0) {
        defalutImg = mapConfig.makerImg.defalutimg;
    } else {
        defalutImg = mapConfig.makerImg.selectImg;
    }

    var url = defalutImg.imgUrl[Makerindex]
    var styele = {url: url};
    return styele;
}


/*
 * 修改列表对象objli,如objli为null值，也可以通过liindx查询到该objli对象。
 Makersytle=
 {
 url:"";
 w:11,
 h:11,

 }
 */
function changMakerStyle(MakerObj, MakerIndex, style) {
    if (MakerObj == null || typeof(MakerObj) == "undefined") {
        if (MakerIndex == null || typeof(MakerIndex) == "undefined" || MakerIndex < 0) {

        } else {
            var markers = layer.markers;
            MakerObj = markers[MakerIndex];
            changMarkerSystle(MakerObj, style);
        }
    } else {
        changMarkerSystle(MakerObj, style);
    }
}


/**
 * 修改maker样式
 Makersytle=
 {
	url:"";
	w:11,
	h:11,
	 
 }
 */
function changMarkerSystle(MarkerObejct, Makersytle) {
    if (typeof(MarkerObejct) != "undefined" || MarkerObejct != null) {

        var icon = MarkerObejct.icon;
        var imgDiv = icon.imageDiv;
        var imgObject = $(imgDiv).find("IMG");


        $(imgObject).attr({src: Makersytle.url});
    }

}


//图层layer_markers，通过经纬度找到对应的merkar信息
function GetMarkerIndex(lon, lat) {

    var markers = layer_markers.markers
    for (var i = 0; i < markers.length; i++) {
        var markerlonlat = markers[i].lonlat;
        if (markerlonlat.lat == lat && markerlonlat.lon == lon) {
            //修改选中mker样式
            return i;

        }
    }
    return -1;
}


//获取地址
function getAddress(address) {
    var ct = $("#cityID").html();
    var st = ct.substring(0, ct.indexOf(" ▼"));
    if (address.indexOf("市") > -1) {
        var c = address.substring(address.indexOf("市") - 2, address.indexOf("市"));
        if (getCity(c) == st) {
            $("#keyword").val(address);
        } else {
            $("#keyword").val(st + address);
        }
    } else {
        $("#keyword").val(st + address);
    }
}
//地理编码 
function addressSearch() {
    var addressName = document.getElementById('keyword').value;
    if (addressName != '') {
        $("#result1").show();
    }
    if (addressName == "") {
        return;
    } else {
        var geo = new MMap.Geocoder();
        selectCityName(addressName);
        geo.geocode(addressName, addressToGeoSearch_CallBack);
    }
}
//地理编码的回调函数 
function addressToGeoSearch_CallBack(data) {
    layer_markers.clearMarkers();
    clearMapPopups();
    $("#result1").html("");
    var markers = [];
    var list = "";

    if (data.status == "E0") {
        list = '<span id="tip" style="display:none;margin-left:20px;"><b>复制成功</b></span><br><ul id="poisearchUl">';
        var address_sub;
        for (var i = 0, l = data.list.length; i < l; i++) {
            var item = data.list[i];
            address_sub = item.name;

            if (address_sub.length > 12) {
                address_sub1 = address_sub.substring(0, 12) + '...';
            } else {
                address_sub1 = address_sub;
            }

            if (l >= 1) {
                var ct = $("#cityID").html();
                var st = ct.substring(0, ct.indexOf(" ▼"));

                if (address_sub.indexOf("市") > -1) {

                    /*list+='<li id=\"li'+i+'\" style="width: 315px;height: 72px;margin-bottom:5px;">'
                     +'<div id="div'+i+'"  style="width: 315px;height: 72px; ">'
                     +'<div style="width:35px;height: 72px;float:left"  class="result"><div class="defalut"><div class="img" id="no'+(i+1)+'"></div></div></div>'
                     +'<div style="width:250px;height: 57px; float:left;padding:5px 0;" >'
                     +'<div style="color:#000000;font-size: 12px;margin-top:5px;width:250px;" title="'+item.name+'">名称:	'+address_sub1+'</div>'
                     +'<div style="color:#000000;font-size: 12px;margin-top:5px;width:250px;" title="'+item.name+'">地址:	'+suName+'</div>'
                     +'<div style="color:#000000;font-size: 12px;margin-top:5px;width:250px;">'
                     +'<a href="#" onclick="copyToClipBoard(\''+item.name+'\',\'\')">'
                     +'<img src="images/s3.png" width="12" height="12" border="0" alt="">复制名称</a>'
                     +'</div></div></div></li>'; */
                    var c = address_sub.substring(address_sub.indexOf("市") - 2, address_sub.indexOf("市"));
                    if (getCity(c) == st) {
                        list += '<li id=\"li' + i + '\" style="width: 315px;height: 72px;margin-bottom:5px;">'
                            + '<div id="div' + i + '"  style="width: 315px;height: 72px; ">'
                            + '<div style="width:35px;height: 72px;float:left"  class="result"><div class="defalut"><div class="img" id="no' + (i + 1) + '"></div></div></div>'
                            + '<div style="width:250px;height: 57px; float:left;padding:5px 0;" >'
                            + '<div style="color:#000000;font-size: 12px;margin-top:5px;width:250px;" title="' + item.name + '">名称:	' + address_sub1 + '</div>'
                            + '<div style="color:#000000;font-size: 12px;margin-top:5px;width:250px;" title="' + item.name + '">地址:	' + item.address + '</div>'
                            + '<div style="color:#000000;font-size: 12px;margin-top:5px;width:250px;">'
                            + '<a href="#" onclick="copyToClipBoard(\'' + item.name + '\',\'\')">'
                            + '<img src="images/s3.png" width="12" height="12" border="0" alt="">复制名称</a>'
                            + '</div></div></div></li>';


                        /*list+='<li id="li'+i+'" style="width: 315px;height: 72px;margin-bottom:5px;">'
                         +'<div id="div'+i+'"  style="width: 315px;height: 72px;" >'
                         +'<div style="width:35px;height: 72px;float:left" class="result" ><div class="img" id="no'+(i+1)+'"></div></div>'
                         +'<div style="width:250px;height: 57px; float:left;padding:5px 0;" >'
                         +'<div style="color:#000000;font-size: 12px;margin-top:5px;width:250px;" title="'+item.name+'">地址:	'+address_sub1
                         +'</div><div style="color:#000000;font-size: 12px;margin-top:5px;width:250px;">'
                         +'<a href="#" onclick="copyToClipBoard(\''+item.name+'\',\'cd\',)">'
                         +'<img src="images/s3.png" width="12" height="12" border="0" alt="">复制地址</a>'
                         +'</div></div></div></li>'; */
                        var position = latLonToMeters(new SuperMap.LonLat(item.x, item.y));

                        var lngLat = geoLoc2MeterXY(item.x, item.y, 7);
                        map.setCenter(new SuperMap.LonLat(lngLat.lngX, lngLat.latY), 11);


                        var defalutImg = mapConfig.makerImg.defalutimg;
                        var w = defalutImg.w;
                        var h = defalutImg.h;
                        var url = defalutImg.imgUrl[i]
                        var size = new SuperMap.Size(w, h);
                        var offset = new SuperMap.Pixel(-(size.w / 2), -size.h);


                        var icon = new SuperMap.Icon(url, size, offset);
                        var marker = new SuperMap.Marker(position, icon);
                        marker.id = "marker_" + i;
                        marker.attributes = item;
                        marker.events.on({
                            "click": openMarkerPopup,

                            "scope": marker
                        });
                        markers.push(marker);
                        layer_markers.addMarker(marker);
                    } else {
                        break;
                    }
                }
            }
        }
        list += '</ul>';
    } else if (data.status == "E1") {
        list = "未查找到任何结果!<br />建议：<br />1.请确保所有字词拼写正确。<br />2.尝试不同的关键字。<br />3.尝试更宽泛的关键字。";
    } else {
        var s = data.status || data.error.description;
        list = "错误信息：" + s;
    }

    $('#result1').html(list);
    dom_li_event()
    return;
    //var liObj = document.getElementsByTagName('li');


    /*	for (i = liObj.length - 1; i >= 0; i--) {
     liObj[i].onmouseover=function(){
     var num=this.id.substring(2);


     changObjliStyle(this,null,getselectLiStyle());


     var styele= GetMakerImg(num,1);
     changMarkerSystle(markers[num],styele);

     };
     liObj[i].onmouseout=function(){
     //if(isPopups()){ }


     var num=this.id.substring(2);
     //判断当时列表选择信息是否与popup信息一直
     var isPop=false;
     var popInfolonlat=Getpopuplonlat()
     if(popInfolonlat!=null)
     {
     var markerlonlat=markers[num].lonlat;

     if(markerlonlat.lat==popInfolonlat.lat&&markerlonlat.lon==popInfolonlat.lon){
     isPop=true
     }
     }
     if(!isPop){

     changObjliStyle(this,null,getdefalutListyle());


     var styele= GetMakerImg(num,0);
     changMarkerSystle(markers[num],styele);
     }

     } ;
     liObj[i].onclick=function(){

     var popInfolonlat=Getpopuplonlat();
     if(popInfolonlat!=null)
     {
     var Makerindex=GetMarkerIndex(popInfolonlat.lon,popInfolonlat.lat)

     if(Makerindex>-1){


     changObjliStyle(null,Makerindex,getdefalutListyle());
     var styele= GetMakerImg(Makerindex,0);
     changMarkerSystle(markers[Makerindex],styele);
     }
     }


     //弹出Popup
     var num=this.id.substring(2);
     openMarkerPopup(markers[num]);

     };

     }
     */

    /*
     for (i = liObj.length - 1; i >= 0; i--) {
     liObj[i].onmouseover=function(){
     var num=this.id.substring(2);
     this.style.background='#FFFFFF';
     getAddress(markers[num].attributes.name);
     openMarkerPopup(markers[num]);
     };
     liObj[i].onmouseout=function(){this.style.background='#DDDDDD';};
     } */
}

/**
 * 打开订单的信息窗
 */
function openMarkerPopup(me, imgObejct) {


    var marker = this;


    if (me.CLASS_NAME != "SuperMap.Marker") {


        var markers = layer_markers.markers
        var PopLength = map.popups.length;
        var popInfo = null;
        if (PopLength > 0) {
            popInfo = map.popups[0];
        }
        if (popInfo != null) {
            //判断当时列表选择信息是否与popup信息一直
            var isPop = false;
            var nindex = -1;
            if (popInfo != null) {


                var popInfolonlat = popInfo.lonlat;
                nindex = GetMarkerIndex(popInfolonlat.lon, popInfolonlat.lat);
                if (nindex > -1) {
                    isPop = true
                }
            }
            if (isPop) {

                changObjliStyle(null, nindex, getdefalutListyle());

                var styele = GetMakerImg(nindex, 0);
                changMarkerSystle(markers[nindex], styele);
            }
        }
        var lonlat = marker.lonlat;
        var Makerindex = GetMarkerIndex(lonlat.lon, lonlat.lat);
        changObjliStyle(null, Makerindex, getselectLiStyle());
        var markers = layer_markers.markers
        var styele = GetMakerImg(Makerindex, 1);
        changMarkerSystle(markers[Makerindex], styele);

    }

    clearMapPopups();
    if (typeof(marker) == "undefined" || typeof(marker.lonlat) == "undefined") {
        marker = me;
    }
    var addr = marker.attributes.address;
    var lonlat = marker.lonlat;
    var lnglat = meterXY2GeoLoc(lonlat.lon, lonlat.lat, 7);
    lnglat = lnglat.lngX + ',' + lnglat.latY;
    var closeHtml = '<div class="smPopupCloseBox" style="z-index: 1; position: absolute; width: 17px; height: 17px; top: 7px; right: 5px;" onclick="closeEventPopop()"></div>'

    var html = '<div style="width:250px;height:110px;">';
    html += closeHtml;
    html += '<div class="infowindowTitle">';
    html += '<span class="infowindowTitleTxt">' + marker.attributes.name + '</span>';
    html += '</div>';
    html += '<div class="infowindowContent">';
    html += '<table class="infowindowContentTable">';
    html += ' <tr><td><strong>地址：</strong>' + addr + '</td></tr>';
    html += ' <tr><td><a href="#" onclick="copyToClipBoard(\'' + marker.attributes.name + "[" + lnglat + "]" + '\',\'c\')">'
        + '<img src="images/s3.png" width="12" height="12" border="0" alt="">复制名称</a>&nbsp;&nbsp;&nbsp;&nbsp;'
        + '<a href="#" onclick="copyToClipXY(\'' + lnglat + '\',\'c\')">'
        + '<img src="images/s3.png" width="12" height="12" border="0" alt="">复制坐标</a>'


        + '<span id="showTip" style="display:none;margin-left:20px;"><b>复制成功</b></span></td></tr>';
    html += '</table>';
    html += '</div>';

    /*    var popup = new SuperMap.Popup.FramedCloud("popwin",new SuperMap.LonLat(lonlat.lon,lonlat.lat),null,html,null,true,function(){


     var lonlat = this.lonlat;
     var Makerindex=GetMarkerIndex(lonlat.lon,lonlat.lat);				                                                                                                                     changObjliStyle(null,Makerindex,getdefalutListyle());

     var markers=layer_markers.markers
     var styele= GetMakerImg(Makerindex,0);
     changMarkerSystle(markers[Makerindex],styele);


     <!--GetMarkerIndex()-->
     this.destroy();
     });*/

    var popup = new SuperMap.Popup.FramedCloud("popwin", new SuperMap.LonLat(lonlat.lon, lonlat.lat), null, html, null, false, null);
    //修改Popup样式
    //  popup.fixedRelativePosition = true;
    // popup.relativePosition = "tr";
    //popup.anchor.offset = new SuperMap.Pixel(0, -12);
    //"Z-INDEX: 1; POSITION: absolute; WIDTH: 17px; HEIGHT: 17px; TOP: 0px; RIGHT: 0px"


    //popup.closeDiv.style.cssText="Z-INDEX: 1; POSITION: absolute; WIDTH: 17px; HEIGHT: 17px; TOP: 40px; RIGHT: 0px";
    map.addPopup(popup);
    //气泡在地图中心点
    map.setCenter(new SuperMap.LonLat(lonlat.lon, lonlat.lat));

//	修改popup样式


    /*	var groupDiv_id=popup.groupDiv.id;
     var groupDivObj=$("#"+groupDiv_id);
     var groupDiv_width=$(groupDivObj).css("width");
     var popwin_contentDivObj=$(groupDivObj).find("#popwin_contentDiv");
     var ssss=$(popwin_contentDivObj).css("width");
     $(popwin_contentDivObj).css("width",groupDiv_width)*/
    //$(popwin_contentDivObj).css("width",(ssss+30));

}
function closeEventPopop() {

    var popups = map.popups;
    var length = popups.length;
    if (length == 0) {
        return;
    }
    var popup;
    for (var i = 0; i < length; i++) {
        popup = popups[i];

    }

    var lonlat = popup.lonlat;
    var Makerindex = GetMarkerIndex(lonlat.lon, lonlat.lat);
    changObjliStyle(null, Makerindex, getdefalutListyle());
    var markers = layer_markers.markers
    var styele = GetMakerImg(Makerindex, 0);
    changMarkerSystle(markers[Makerindex], styele);


    popup.destroy();


}


/**
 * 图层中查找marker
 */
function getMarkerById(id, layer) {
    var markers = layer.markers;
    var length = markers.length;
    if (length == 0) {
        return null;
    }
    for (var i = 0; i < length; i++) {
        var marker = markers[i];
        if (marker.id == id) {
            return marker;
        }
    }
    return null;
}

//标记定位
function geocodeSearch(xy) {
    if (xy != '') {
        $("#result1").show();
    }
    if (xy == "") {
        return;
    } else {
        var coor = xy.split(",");
        var lnglatXY = new MMap.LngLat(coor[0], coor[1]);
        var GeocoderOption = {
            range: 500,//范围
            crossnum: 1,//道路交叉口数
            roadnum: 4,//路线记录数
            poinum: 5//POI点数
        };
        var geo = new MMap.Geocoder(GeocoderOption);
        geo.regeocode(lnglatXY, poiToAddressSearch_CallBack);
    }
}

function poiToAddressSearch_CallBack(data) {
    layer_markers.clearMarkers();
    clearMapPopups();
    $("#result1").html();
    var poiList = data.list[0].poilist;
    if (poiList.length == 0 || poiList == "") {
        poiList = data.list[0].roadlist;
    }
    if (data.status == 'E0' && poiList != "") {
        //mapObj.setCenter(new MMap.LngLat(poiList[0].x,poiList[0].y));
        var list = '<span id="tip" style="display:none;margin-left:40px;"><b>复制成功</b></span><br><ul id="poisearchUl">';
        markers = [];
        infos = [];
        var address_sub;
        for (var i = 0, l = poiList.length; i < l; i++) {
            //address_sub=poiList[i].address;
            address_sub = poiList[i].name;
            if (address_sub != "" && address_sub.length > 10) {
                address_sub1 = address_sub.substring(0, 10) + '...';
            } else {
                address_sub1 = address_sub;
            }

            /*list+='<li id=\"li'+i+'\" style="width: 315px;height: 72px;margin-bottom:5px;">'
             +'<div id="div'+i+'"  style="width: 315px;height: 72px; ">'
             +'<div style="width:35px;height: 72px;float:left"  class="result"><div class="defalut"><div class="img" id="no'+(i+1)+'"></div></div></div>'
             +'<div style="width:250px;height: 57px; float:left;padding:5px 0;" >'
             +'<div style="color:#000000;font-size: 12px;margin-top:5px;width:250px;" title="'+item.name+'">名称:	'+address_sub1
             +'</div><div style="color:#000000;font-size: 12px;margin-top:5px;width:250px;">'
             +'<a href="#" onclick="copyToClipBoard(\''+item.name+'\',\'\')">'
             +'<img src="images/s3.png" width="12" height="12" border="0" alt="">复制地址</a>'
             +'</div></div></div></li>'; */


            list += '<li id="li' + i + '" style="width: 315px;height: 72px;margin-bottom:5px;"><div id="div' + i
                + '"  style="width: 315px;height: 72px; '
                + '"><div style="width:35px;height: 72px;float:left"  class="result"><div class="defalut"><div class="img" id="no' + (i + 1) + '"></div></div>'
                + '</div><div style="width:250px;height: 57px; float:left;padding:5px 0;" >'
                + ' <div style="color:#000000;font-size: 12px;margin-top:5px;width:250px;" title="' + poiList[i].name + '">名称:	' + address_sub1 + '</div>'
                + ' <div style="color:#000000;font-size: 12px;margin-top:5px;width:250px;" title="' + poiList[i].address + '">地址:	' + poiList[i].address + '</div>'
                + '<div style="color:#000000;font-size: 12px;margin-top:5px;width:250px;">'
                + '<a href="#" onclick="copyToClipBoard(\'' + poiList[i].name + '\',\'cl\')">'
                + '<img src="images/s3.png" width="12" height="12" border="0" alt="">复制地址</a>'
                + '</div></div></div></li>';
            if (address_sub1.length > 0) {
                address_marker = address_sub1;
            } else {
                address_marker = poiList[i].name;
            }
            var item = poiList[i];


            var position = latLonToMeters(new SuperMap.LonLat(item.x, item.y));


            var defalutImg = mapConfig.makerImg.defalutimg;
            var w = defalutImg.w;
            var h = defalutImg.h;
            var url = defalutImg.imgUrl[i]
            var size = new SuperMap.Size(w, h);
            var offset = new SuperMap.Pixel(-(size.w / 2), -size.h);


            var icon = new SuperMap.Icon(url, size, offset);
            var marker = new SuperMap.Marker(position, icon);
            marker.id = "marker_" + i;
            marker.attributes = item;
            marker.events.on({
                "click": openMarkerPopup,
                "mousemove": MarkerMover,
                "mouseout": MarkerOut,
                "scope": marker
            });
            marker.events.element.title = item.name;
            markers.push(marker);
            layer_markers.addMarker(marker);
        }
        list += '</ul>';
    } else if (data.status == "E1") {
        list = "未查找到任何结果!<br />建议：<br />1.请确保所有字词拼写正确。<br />2.尝试不同的关键字。<br />3.尝试更宽泛的关键字。";
    } else {
        list = '';
    }
    $("#result1").html(list);


    //动态绑定事件
    dom_li_event();
    return;


}
//获取popups信息
function getPopup() {
    if (map) {
        if (map.popups.length > 0) {
            return map.popups[0];
        } else {
            return null;
        }
    } else {
        return null;
    }
}


/**
 * 清除地图上的信息窗
 */
function clearMapPopups() {
    var popups = map.popups;
    var length = popups.length;
    if (length == 0) {
        return;
    }
    for (var i = 0; i < length; i++) {
        var popup = popups[i];
        map.removePopup(popup);
    }
}

//周边查询
function circleSearch(center) {
    var lonlat = metersToLatLon(center);
    var point = new MMap.LngLat(lonlat.lon, lonlat.lat);

    var PoiSearchOption = {
        srctype: "POI",//数据来源
        type: "",//数据类别
        number: 10,//每页数量,默认10
        batch: 1,//请求页数，默认1
        range: 500, //查询范围，默认500米
        ext: ""//扩展字段
    };
    var MSearch = new MMap.PoiSearch(PoiSearchOption);
    MSearch.byCenPoi(point, "", circleSearch_callback);
}
function circleSearch_callback(data) {
    $("#result1").show();
    layer_markers.clearMarkers();
    clearMapPopups();
    $("#result1").html("");
    var markers = [];
    if (data.status == 'E0') {
        if (data.bounds) {
            var a = data.bounds.split(';');
            if (a.length == 2) {
                var b = a[0].split(','), c = a[1].split(',');
                //mapObj.setBounds(new MMap.Bounds(new MMap.LngLat(b[0],b[1]),new MMap.LngLat(c[0],c[1])));
                //map.setCenter(new SuperMap.LonLat(b[0],b[1]),11);
            } else {//只返回一条数据时
                var d = a[0].split(',');
                // mapObj.setCenter(new MMap.LngLat(d[0],d[1]))
                //map.setCenter(new SuperMap.LonLat(data.list[0].x,data.list[0].y),11);
            }
        }

        var list = '<ul id="poisearchUl">';
        markers = [];
        infos = [];
        var address_sub;
        for (var i = 0, l = data.list.length; i < l; i++) {
            var item = data.list[i];
            var position = latLonToMeters(new SuperMap.LonLat(item.x, item.y));
            var size = new SuperMap.Size(19, 29);
            var offset = new SuperMap.Pixel(-(size.w / 2), -size.h);
            var icon = new SuperMap.Icon("images/s1.png", size, offset);
            var marker = new SuperMap.Marker(position, icon);
            marker.id = "marker_" + i;
            marker.attributes = item;
            marker.events.on({
                "click": openMarkerPopup,
                "scope": marker
            });
            marker.events.element.title = item.name;
            markers.push(marker);
            layer_markers.addMarker(marker);

            //显示在左侧
            //address_sub=data.list[i].address;
            address_sub = data.list[i].name;
            if (address_sub.length > 10) {
                address_sub1 = address_sub.substring(0, 10) + '...';
            } else {
                address_sub1 = address_sub;
            }
            list += '<li id="li' + i + '" style="width: 315px;height: 72px;margin-bottom:5px;"><div id="div' + i
                + '" onmouseover="over(' + i + ');" onmouseout="out(' + i + ')" style="width: 315px;height: 72px;'
                + ' background-color:white"><div style="width:35px;height: 72px;float:left" ><img id="img' + i
                + '" src="images/s1.png" width="19" height="29" border="0" alt="" style="margin-left:8px;margin-top:15px;">'
                + '</div><div style="width:250px;height: 57px; float:left;padding:5px 0;" ><div style="color:#0000CC;font-size: 12px;width:250px;">'
                + data.list[i].name + '">地址:	' + address_sub1 + '</div><div style="color:#000000;font-size: 12px;margin-top:5px;width:250px;">'
                + '<a href="#" onclick="copyToClipBoard(\'' + data.list[i].name + '\',\'mk\')">'
                + '<img src="images/s3.png" width="12" height="12" border="0" alt="">复制地址</a>'
                + '<span id="marktip" style="display:none;margin-left:20px;"><b>复制成功</b></span>'
                + '</div></div></div></li>';
        }

        list += '</ul>';
        $("#result1").html(list);
        var liObj = document.getElementsByTagName('li');
        for (i = liObj.length - 1; i >= 0; i--) {
            liObj[i].onmouseover = function () {
                var num = this.id.substring(2);
                this.style.background = '#FFFFFF';
                openMarkerPopup(markers[num]);
            };
            liObj[i].onmouseout = function () {
                this.style.background = '#DDDDDD';
            };
        }
    }
}


var poiIDs = 0;
var clientX = 0;
var clientY = 0;
function markPOI() {
    clearMap();
    map.events.on({"click": addPOIHandler});
}
function addPOIHandler(arg, geometry) {
    clientX = arg.clientX;
    clientY = arg.clientY;
    //获取浏览器页面的宽度和高度
    var clientWidth = document.body.clientWidth;
    var clientHeight = document.body.clientHeight;
    //获取地图的高度和宽度
    var mapWidth = map.size.w;
    var mapHeight = map.size.h;
    //当前point的经纬度坐标=传入坐标-(当前页面高度-地图的高度)
    var px = new SuperMap.Pixel(clientX - (clientWidth - mapWidth), clientY - (clientHeight - mapHeight));
    var point = map.getLonLatFromPixel(px);
    map.events.unregister("click", map, addPOIHandler);
    addPOI(point);
}

var poiHashMap = null;
var poiMarkerHashMap = null;
var markerWindowHashMap = null;
var featureHashMap = null;
function addPOI(point2D, name, address) {
    var title = "";
    if (point2D.lon != null || point2D.x != null) {
        if (poiIDs == 0) {
            title = "添加标记";
        } else {
            title = "添加标记" + poiIDs;
        }
        var point;
        if (point2D.lon != null) {
            point = new SuperMap.Geometry.Point(point2D.lon, point2D.lat);
        } else {
            point = new SuperMap.Geometry.Point(point2D.x, point2D.y);
        }
        point.id = "poiMarker" + poiIDs;
        var poi = new SuperMap.Feature.Vector(point);
        poi.style = {externalGraphic: "images/s1.png", graphicWidth: 14, graphicHeight: 16, graphicTitle: title};
        vectorLayer.addFeatures(poi);

        var zoom = map.getZoom() > 15 ? map.getZoom() : 15;
        map.setCenter(new SuperMap.LonLat(point.x, point.y), zoom);

        jQuery("#poiMarker" + poiIDs).css("cursor", "pointer");
        circleSearch(new SuperMap.LonLat(point.x, point.y));
    }
}

//根据中心点及半径计算圆
function markRoundGeometry(center, radius) {
    var d360 = Math.PI * 2;
    var sidePoints = [];
    var n = 36;
    var d = d360 / n;
    for (var i = 1; i <= n; i++) {
        var rd = d * i;
        var x = center.lon + radius * Math.cos(rd);
        var y = center.lat + radius * Math.sin(rd);
        var sidePoint = new SuperMap.Geometry.Point(x, y);
        sidePoints.push(sidePoint);
    }
    var line = new SuperMap.Geometry.LinearRing(sidePoints);
    var roundRegion = new SuperMap.Geometry.Polygon(line);

    return roundRegion;
}


//点击获取经纬度
function mapclick() {
    document.getElementById("m_list").style.display = 'none';
    if (locationMapType == "gaode") {
        clearMap();
        drawPoint.activate();
    }
    else {
        map.clearOverlays();
        drawingManager.setDrawingMode(BMAP_DRAWING_MARKER);
        drawingManager.open();
    }

    $("#m_list").blur();
}

var overlaycomplete = function (e) {
    var poimaker = e.overlay;
    var centerPoint = poimaker.getPosition();
    drawingManager.close();
    $("#result1").show();
    var local = new BMap.LocalSearch(map, {renderOptions: {map: map, autoViewport: false, panel: "result1"}});
    var poiArray = new Array('大厦', '酒店', '学校');
    local.searchNearby(poiArray, centerPoint, 500);
};


/*
 获取marker范围
 */
function getsssssssssssssss() {
    var markers = layer_markers.markers;
    if (markers != null && markers.length > 0) {
        var points = [];
        for (var i = 0; i < markers.length; i++) {
            var latlon = markers[i].lonlat;
            var point = new SuperMap.Geometry.Point(latlon.lon, latlon.lat);
            points.push(point);
        }
        var linearRings = new SuperMap.Geometry.LinearRing(points);
        var region = new SuperMap.Geometry.Polygon([linearRings]);
        var Bounds = region.getBounds();
        map.zoomToExtent(Bounds);
        //var nScale=map.getScale();
        map.zoomOut();
    }


}


//绘画点marker
function drawCompleted(drawGeometryArgs) {
    drawPoint.deactivate();
    vectorLayer.removeAllFeatures();
    var feature = drawGeometryArgs.feature;

    var lt = feature.geometry.getBounds().getCenterLonLat();

    var w = 19;
    var h = 29;
    var url = "images/s2.png";
    var size = new SuperMap.Size(w, h);
    var offset = new SuperMap.Pixel(-(size.w / 2), -size.h);


    var icon = new SuperMap.Icon(url, size, offset);
    var marker = new SuperMap.Marker(lt, icon);

    //marker.attributes = item;
    marker.events.on({
        "click": drawMarkerPopup,


        "scope": marker
    });


    layer_Draw_Maker.addMarker(marker);


    var lnglat = meterXY2GeoLoc(lt.lon, lt.lat, 7);
    geocodeSearch(lnglat.lngX + ',' + lnglat.latY);
    //openWindow(feature);
}
function openWindow(feature) {
    var name = "标注点<hr style='width=100%;'><br>地址：" + address_marker;
    var popup = new SuperMap.Popup.FramedCloud("chicken",
        feature.geometry.getBounds().getCenterLonLat(),
        null, name, null, true);
    map.addPopup(popup);
}
function deleteFeature() {
    vectorLayer.removeAllFeatures();
}

function drawMarkerPopup() {
    closeEventPopop()

    var marker = this;

    var lonlat = marker.lonlat;
    var lnglat = meterXY2GeoLoc(lonlat.lon, lonlat.lat, 7);
    lnglat = lnglat.lngX + ',' + lnglat.latY;


    var html = '<div style="width:250px;height:110px;">';
    var closeHtml = '<div class="smPopupCloseBox" style="z-index: 1; position: absolute; width: 17px; height: 17px; top: 7px; right: 5px;" onclick="closeEventPopop_1()"></div>';
    html += closeHtml;

    html += '<div class="infowindowTitle">';
    html += '<span class="infowindowTitleTxt">标记POI</span>';
    html += '</div>';
    html += '<div class="infowindowContent">';
    html += '<table class="infowindowContentTable">';

    html += ' <tr><td>'
        + '<a href="#" onclick="copyToClipXY(\'' + lnglat + '\',\'c\')">'
        + '<img src="images/s3.png" width="12" height="12" border="0" alt="">复制坐标</a>'


        + '<span id="showTip" style="display:none;margin-left:20px;"><b>复制成功</b></span></td></tr>';
    html += '</table>';
    html += '</div>';
    var popup = new SuperMap.Popup.FramedCloud("popwin", new SuperMap.LonLat(lonlat.lon, lonlat.lat), null, html, null, false, null);
    //修改Popup样式
    //  popup.fixedRelativePosition = true;
    // popup.relativePosition = "tr";
    //popup.anchor.offset = new SuperMap.Pixel(0, -12);
    map.addPopup(popup);
}
function closeEventPopop_1() {

    closeEventPopop();


}