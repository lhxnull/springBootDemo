var locationMapurl;
//用户验证
//用户登录
function showWindow(info) {
//    $("#userDiv").html("");
//    var loginHtml = "<div style='index-z:1999;margin-top:16px;' id='userDiv'>您的账号：<input id='userCode' type='text' "
//        + "style='width:150px;border:1px solid grey;height:23px;' value=''/>";
//    if (info == "error") {
//        loginHtml = loginHtml + "<span style='color:red;display:block;margin-left:60px;' id='errorInfo'>输入账号有误</span>";
//    }
//    if (info == "blank") {
//        loginHtml = loginHtml + "<span style='color:red;display:block;margin-left:60px;' id='errorInfo'>账号不能为空</span>";
//    }
//    loginHtml = loginHtml + "<div>";
//    Boxy.alert(loginHtml, function () {
//        var userCode = $("#userCode").val();
//        getConfig(userCode);
//    }, {title: "用户登录"});
//    return false;
	return true;
}
//切换用户
function changeUser(aid) {
    $("#" + aid).attr("href", mapConfig.userHref);
}
//回调函数
function callback(data) {

}
//跨域请求获取地图配置信息
function getConfig(userCode) {
    //userCode = 'A320000181';

    //scriptLoader(mapConfig.gaodemap,"gaodeId",dealInitMap,mapConfig.supermap);
    //return false;

    if (userCode == "") {
        showWindow("blank");
        return;
    }
    var reqUrl = mapConfig.reqUrl + userCode;


    $.ajax({
        type: "get",
        url: reqUrl,
        dataType: "jsonp",
        timeout: 5000,//（毫秒）
        jsonp: "callback",
        jsonpCallback: "callback",
        success: function (data) {
            if (data == "" || typeof(data.gaodeUrl) == "undefined" || typeof(data.mapUrl) == "undefined") {
                showWindow("error");
            } else {

                //data.gaodeUrl="http://app.mapabc.com/apis?t=javascriptmap&v=3.1.1&key=b0a7db0b3a30f944a21c3682064dc70ef5b738b062f6479a5eca39725798b1ee300bd8d5de3a4ae3";
                scriptLoader(data.gaodeUrl, "gaodeId", dealInitMap, data.mapUrl);
                //$("#dangqianyonghu").html("当前用户："+userCode);
                //登陆者名称
                $("#dangqianyonghu").html("当前用户：" + data.name);
            }
        },
        error: function () {
            showWindow("error");
        }
    });
    return false;
}
//初始化地图回调函数
function dealInitMap(url) {
    if (url == "") {
        url = mapConfig.supermap;
    }
    var mapUrl = url + "map=${mapName}&type=${type}&x=${x}&y=${y}&z=${z}";
    locationMapurl = mapUrl;
    mapInit(mapUrl);
    tishihide();
}
//引入高德地图API
function scriptLoader(url, id, callback, param) {
    if (url == "") {
        url = mapConfig.gaodemap;
    }
    var scriptId = document.getElementById(id);
    if (scriptId) {
        if (callback) callback(param);
    } else {
        var script = document.createElement("script");
        script.id = id;
        script.type = "text/javascript";
        script.src = url;
        var head = document.getElementsByTagName('head').item(0);
        head.appendChild(script);
        script.onload = script.onreadystatechange = function () {
            if ((this.readyState && this.readyState == 'complete' && this.readyState == 'loaded')
                || !0) {
                if (callback) callback(param);
            }
            script.onload = script.onreadystatechange = null;
        };
    }
};

function mapTypeSwitch() {
    document.getElementById('iCenter').innerHTML = "";
    document.getElementById('result1').innerHTML = "";
    if (locationMapType == "gaode") {
        locationMapType = "baidu";
    }
    else {
        locationMapType = "gaode";
    }
    mapInit(locationMapurl);
}

//js动态注入方法（暂时没有用）
function inputScript(url) {
    var isWinRT = (typeof Windows === "undefined") ? false : true;
    if (!isWinRT) {
        var script = '<' + 'script type="text/javascript" src="' + url + '"' + '><' + '/script>';
        document.writeln(script);
    } else {
        var script = document.createElement("script");
        script.src = url;
        document.getElementsByTagName("HEAD")[0].appendChild(script);
    }
}