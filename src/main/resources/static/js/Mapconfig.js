/**
 * Created by foxh on 2015/8/25.
 * 百度地图API相关配置文件
 */

/**
* 动态添加js文件
* */
function AddJavascriptUrl(srcUrl)
{
    document.write('<script type="text/javascript" src="'+srcUrl+'" > </script>');
}
function AddScriptAfterDom(srcUrl){
	document.write('<script type="text/javascript" src="'+srcUrl+'"  defer="defer"> </script>');
}

/**
* 动态添加css文件
* */
function AddCssUrl(srcUrl)
{
    document.write('<link type="text/css" rel="stylesheet" href="'+srcUrl+'" >');
}

/*
* 人工调度获取百度相关js
* */
function GetBaiduMapJs_dispath(localpath)
{   
	
    AddCssUrl(localpath+"/style/baidu/base-new.css");
    AddJavascriptUrl("http://api.map.baidu.com/api?v=2.0&ak="+mapConfig.mapKey);
    
    AddScriptAfterDom(localpath+"/common/js/map/baidu/FeatureLayer.js");
    AddScriptAfterDom(localpath+"/common/js/map/SearchInfoWindow_min.js");
    AddScriptAfterDom(localpath+"/pages/dispatch/js_baidu/dispatch_second.js");
    AddScriptAfterDom(localpath+"/pages/dispatch/js_baidu/dispatch_second_claim.js" );
    AddScriptAfterDom(localpath+"/pages/dispatch/js_baidu/dispatch_second_areaperson.js");
    AddScriptAfterDom(localpath+"/pages/dispatch/js_baidu/dispatch_second_addresssearch.js" );
    AddScriptAfterDom(localpath+"/pages/dispatch/js_baidu/dispatch_second_maintainshop.js");
}

/*
 * 人工调度获取超图相关js
 * */
function GetSuperMapJs_dispath(localpath)
{
    AddCssUrl(localpath+"/style/base-new.css");
    AddJavascriptUrl(localpath+"/pages/dispatch/js/dispatch_second.js");
    AddJavascriptUrl(localpath+"/pages/dispatch/js/dispatch_second_claim.js" );
    AddJavascriptUrl(localpath+"/pages/dispatch/js/dispatch_second_areaperson.js");
    AddJavascriptUrl(localpath+"/pages/dispatch/js/dispatch_second_addresssearch.js" );
    AddJavascriptUrl(localpath+"/pages/dispatch/js/dispatch_second_maintainshop.js");
}

/*
* 案件分析获取百度相关js
* */
function GetBaiduMapJs_loganalyze(localpath)
{	 
	AddJavascriptUrl("http://api.map.baidu.com/api?v=2.0&ak="+mapConfig.mapKey);
	AddScriptAfterDom(localpath+"/common/js/map/SearchInfoWindow_min.js");
	AddScriptAfterDom(localpath+"/common/js/map/baidu/FeatureLayer.js");
	AddScriptAfterDom(localpath+"/pages/dispatch/js_baidu/dispatch_log_analyze.js");

}

/*
 * 案件分析获取超图相关js
 * */
function GetSuperMapJs_loganalyze(localpath)
{
    AddJavascriptUrl(localpath+"/common/js/map/init.js");
    AddJavascriptUrl(localpath+"/pages/dispatch/js/dispatch_log_analyze.js" );
}

/*
* 查勘区维护获取百度相关js
* */
function GetBaiduMapJs_surveryarea(localpath)
{   
	AddJavascriptUrl("http://api.map.baidu.com/api?v=2.0&ak="+mapConfig.mapKey);
	AddScriptAfterDom(localpath+"/common/js/map/baidu/FeatureLayer.js");
	AddScriptAfterDom(localpath+"/common/js/map/SearchInfoWindow_min.js");
    AddCssUrl(localpath+"/style/baidu/DrawingManager_min.css");
    AddScriptAfterDom(localpath+"/common/js/map/DrawingManager_min.js");
    AddScriptAfterDom(localpath+"/pages/dispatch/js_baidu/survey_area_draw.js");

}

/*
 * 查勘区维护获取超图相关js
 * */
function GetSuperMapJs_surveryarea(localpath)
{
    AddJavascriptUrl(localpath+"/common/js/map/init.js");
    AddJavascriptUrl(localpath+"/pages/dispatch/js/survey_area_draw.js" );
}

/*
* 首页定位系统获取百度相关js
* */
function GetBaiduMapJs_location()
{

}

/*
* 首页定位系统获取超图相关js
* */
function GetSuperMapJs_location()
{
    AddJavascriptUrl(localpath+"/common/js/map/init.js");
    AddJavascriptUrl(localpath+"/pages/dispatch/js/survey_area_draw.js" );
}
/**
 * 查勘员位置监控获取百度地图相关js
 * @param localpath
 */
function GetBaiduMapJs_surveyor_monitor(localpath){
	AddJavascriptUrl("http://api.map.baidu.com/api?v=2.0&ak="+mapConfig.mapKey);
	AddScriptAfterDom(localpath+"/common/js/map/SearchInfoWindow_min.js");
    AddCssUrl(localpath+"/style/baidu/map-window.css");
    AddScriptAfterDom(localpath+"/pages/monitor/js_baidu/surveyor_monitor.js");
    AddScriptAfterDom(localpath+"/pages/monitor/js_baidu/surveyor_monitor_tree.js");
    AddScriptAfterDom(localpath+"/pages/monitor/js_baidu/surveyor_monitor_person.js");
}

/**
 * 查勘员位置监控获取高德地图相关js
 * @param localpath
 */
function GetSuperMapJs_surveyor_monitor(localpath){
    AddCssUrl(localpath+"/style/map-window.css");
	AddJavascriptUrl(localpath+"/common/js/map/MapTypeInit.js" );
    AddJavascriptUrl(localpath+"/pages/monitor/js/surveyor_monitor.js" );
    AddJavascriptUrl(localpath+"/pages/monitor/js/surveyor_monitor_tree.js" );
    AddJavascriptUrl(localpath+"/pages/monitor/js/surveyor_monitor_person.js" );
}

/**
 * 查勘员监控-查勘员历史轨迹获取百度地图相关js
 * @param localpath
 */
function GetBaiduMapJs_surveyor_monitor_history(localpath){
	AddJavascriptUrl("http://api.map.baidu.com/api?v=2.0&ak="+mapConfig.mapKey);
	AddScriptAfterDom(localpath+"/common/js/map/SearchInfoWindow_min.js");
	AddScriptAfterDom(localpath+"/pages/monitor/js_baidu/surveyor_monitor_history.js" );
	AddScriptAfterDom(localpath+"/pages/monitor/js_baidu/surveyor_history.js" );
	AddScriptAfterDom(localpath+"/pages/monitor/js_baidu/surveyor_monitor_case.js" );
}

/**
 * 查勘员监控-查勘员历史轨迹获取高德地图相关js
 * @param localpath
 */
function GetSuperMapJs_surveyor_monitor_history(localpath){
	AddCssUrl(localpath+"/style/map-window.css");
	AddJavascriptUrl(localpath+"/common/js/map/MapTypeInit.js" );
	AddJavascriptUrl(localpath+"/pages/monitor/js/surveyor_monitor_history.js" );
	AddJavascriptUrl(localpath+"/pages/monitor/js/surveyor_history.js" );
	AddJavascriptUrl(localpath+"/pages/monitor/js/surveyor_monitor_case.js" );
}

/**
 * 查勘员历史轨迹获取百度地图相关js
 * @param localpath
 */
function GetBaiduMapJs_surveyor_history(localpath){
	//AddJavascriptUrl(localpath+"/common/js/map/MapTypeInit.js" );
	//AddJavascriptUrl(localpath+"/pages/monitor/js_baidu/surveyor_trajectory_window.js" );
	AddJavascriptUrl("http://api.map.baidu.com/api?v=2.0&ak="+mapConfig.mapKey);
	AddScriptAfterDom(localpath+"/pages/monitor/js_baidu/surveyor_history.js" );
	AddScriptAfterDom(localpath+"/pages/monitor/js_baidu/surveyor_monitor_case.js" );
	//AddJavascriptUrl(localpath+"/pages/monitor/js_baidu/surveyor_trajectory_tree.js" );
	
	
}

/**
 * 查勘员历史轨迹获取高德地图相关js
 * @param localpath
 */
function GetSuperMapJs_surveyor_history(localpath){
	//AddJavascriptUrl(localpath+"/common/js/map/MapTypeInit.js" );
	AddJavascriptUrl(localpath+"/pages/monitor/js/surveyor_history.js" );
	AddJavascriptUrl(localpath+"/pages/monitor/js/surveyor_monitor_case.js" );
	//AddJavascriptUrl(localpath+"/pages/monitor/js/surveyor_trajectory_tree.js" );
	//AddJavascriptUrl(localpath+"/pages/monitor/js/surveyor_trajectory_window.js" );
}

/**
 * 位置信息维护-4S店位置维护_获取百度地图相关js
 * @param localpath
 */
function GetBaiduMapJs_flowcontrol(localpath){
	AddJavascriptUrl("http://api.map.baidu.com/api?v=2.0&ak="+mapConfig.mapKey);
	AddScriptAfterDom(localpath+"/common/js/map/SearchInfoWindow_min.js");
	AddCssUrl(localpath+"/style/baidu/map-window.css");
	AddScriptAfterDom(localpath+"/pages/flowcontrol/js_baidu/maintain_shop.js" );
}

/**
 * 位置信息维护-4S店位置维护_获取高德地图相关js
 * @param localpath
 */
function GetSuperMapJs_flowcontrol(localpath){
	AddCssUrl(localpath+"/style/map-window.css");
	AddJavascriptUrl(localpath+"/common/js/map/MapTypeInit.js" );
	AddJavascriptUrl(localpath+"/pages/flowcontrol/js/maintain_shop.js" );
}


/**
 * 调度监控-案件分布_获取百度地图相关js
 * @param localpath
 */
function GetBaiduMapJs_statistic(localpath){
	AddJavascriptUrl("http://api.map.baidu.com/api?v=2.0&ak="+mapConfig.mapKey);
	AddScriptAfterDom(localpath+"/common/js/map/SearchInfoWindow_min.js");
	AddCssUrl(localpath+"/style/base-ajbd.css");
	AddScriptAfterDom(localpath+"/pages/statistic/js_baidu/claim_distributed.js" );
	AddScriptAfterDom(localpath+"/pages/statistic/js_baidu/claim_distributed_tree.js" );
}

/**
 * 调度监控-案件分布_获取高德地图相关js
 * @param localpath
 */
function GetSuperMapJs_statistic(localpath){
	AddCssUrl(localpath+"/style/base-aj.css");
	AddCssUrl(localpath+"/style/tree.css");
	AddJavascriptUrl(localpath+"/pages/statistic/js/claim_distributed.js" );
	AddJavascriptUrl(localpath+"/pages/statistic/js/claim_distributed_tree.js" );
}


/////////////////////////////////////////////
/**
 * 查勘员监控-查勘员历史轨迹获取高德地图相关js
 * @param localpath
 */
function GetSuperMapJs_surveyor_monitor_history_new(localpath){
	AddCssUrl(localpath+"/style/map-window.css");
	AddJavascriptUrl(localpath+"/common/js/map/MapTypeInit.js" );
	/*AddJavascriptUrl(localpath+"/pages/monitor/js/surveyor_monitor_history.js" );*/
	/*AddJavascriptUrl(localpath+"/pages/monitor/js/surveyor_history.js" );*/
	/*AddJavascriptUrl(localpath+"/pages/monitor/js/surveyor_monitor_case.js" );*/
	AddJavascriptUrl(localpath+"/pages/monitor/js/surveyor_history_gaode.js" );
}

/**
 * 查勘员监控-查勘员历史轨迹获取百度地图相关js
 * @param localpath
 */
function GetBaiduMapJs_surveyor_monitor_history_new(localpath){
	AddJavascriptUrl("http://api.map.baidu.com/api?v=2.0&ak="+mapConfig.mapKey);
	AddScriptAfterDom(localpath+"/common/js/map/SearchInfoWindow_min.js");
	/*AddScriptAfterDom(localpath+"/pages/monitor/js_baidu/surveyor_monitor_history.js" );*/
	/*AddScriptAfterDom(localpath+"/pages/monitor/js_baidu/surveyor_history.js" );
	AddScriptAfterDom(localpath+"/pages/monitor/js_baidu/surveyor_monitor_case.js" );*/
	AddScriptAfterDom(localpath+"/pages/monitor/js_baidu/surveyor_history_baidu.js" );

}



/*
* 案件分析获取百度相关js
* */
function GetBaiduMapJs_loganalyze_new(localpath)
{	 
	AddJavascriptUrl("http://api.map.baidu.com/api?v=2.0&ak="+mapConfig.mapKey);
	AddScriptAfterDom(localpath+"/common/js/map/SearchInfoWindow_min.js");
	/*AddScriptAfterDom(localpath+"/common/js/map/baidu/FeatureLayer.js");*/
	AddScriptAfterDom(localpath+"/pages/monitor/js_baidu/surveyor_analyse.js");

}

/*
 * 案件分析获取超图相关js
 * */
function GetSuperMapJs_loganalyze_new(localpath)
{
    AddJavascriptUrl(localpath+"/common/js/map/init.js");
    AddJavascriptUrl(localpath+"/pages/monitor/js/surveyor_analyse_gaode.js" );
}


/**
 * 地图监控高德js
 */
function GetSuperMapJs_monitor_map(localpath)
{   
	
	AddJavascriptUrl(localpath+"/common/js/map/gaoDe.js");
    AddJavascriptUrl(localpath+"/pages/dispatch/js/map_monitor_gaode.js");

}

/**
 * 地图监控百度js
 */
function GetBaiduMapJs_monitor_map(localpath)
{   
	AddJavascriptUrl("http://api.map.baidu.com/api?v=2.0&ak="+mapConfig.mapKey);
	AddScriptAfterDom(localpath+"/common/js/map/baidu/textIconOverlay_baidu.js");
	AddScriptAfterDom(localpath+"/common/js/map/baidu/markerClusterer_baidu.js");
	AddJavascriptUrl(localpath+"/pages/dispatch/js_baidu/map_monitor_baidu.js");
    AddScriptAfterDom(localpath+"/common/js/map/SearchInfoWindow_min.js");

}

function GetSuperMapJs_monitor_map_position(localpath){
	AddCssUrl(localpath+"/style/maptoolbar.css");
	AddJavascriptUrl(localpath+"/common/js/map/init.js");
	AddJavascriptUrl(localpath+"/pages/dispatch/js/surveyor_monitor_position.js");
}

function GetBaiduMapJs_monitor_map_position(localpath){
	AddJavascriptUrl("http://api.map.baidu.com/api?v=2.0&ak="+mapConfig.mapKey);
    AddJavascriptUrl(contextRootPath+"/pages/dispatch/js_baidu/surveyor_monitor_position_bd.js");
    
}
function GetBaiduMapJs_nweMonitor_map_baidu(localpath){
	AddJavascriptUrl("http://api.map.baidu.com/api?v=2.0&ak="+mapConfig.mapKey);
	AddScriptAfterDom(localpath+"/pages/newMonitor/public/js/mapInfo.js");
	AddScriptAfterDom(localpath+"/pages/newMonitor/public/js/domLister.js");
	AddScriptAfterDom(localpath+"/pages/newMonitor/public/js/interFace.js");
}
function GetBaiduMapJs_nweMonitor_map_gaode(localpath){
	AddCssUrl(localpath+"/style/maptoolbar.css");
	AddScriptAfterDom(localpath+"/common/js/map/gaoDe.js");
    AddScriptAfterDom(localpath+"/pages/newMonitor/public/js/gdJ/mapInfo.js");
    AddScriptAfterDom(localpath+"/pages/newMonitor/public/js/gdJ/domLister.js");
    AddScriptAfterDom(localpath+"/pages/newMonitor/public/js/gdJ/interFace.js");

}

function GetBaiduMapJs_newAnalysis_map_baidu(localpath){
	AddJavascriptUrl("http://api.map.baidu.com/api?v=2.0&ak="+mapConfig.mapKey);
	AddScriptAfterDom(localpath+"/pages/newAnalysis/public/js/fenxi.js");
	AddScriptAfterDom(localpath+"/pages/newAnalysis/public/js/interFace.js");
}
function GetBaiduMapJs_newAnalysis_map_gaode(localpath){
	AddCssUrl(localpath+"/style/maptoolbar.css");
	AddScriptAfterDom(localpath+"/common/js/map/gaoDe.js");
	AddScriptAfterDom(localpath+"/pages/newAnalysis/public/js/gaode/gaodefenxi.js");
	AddScriptAfterDom(localpath+"/pages/newAnalysis/public/js/gaode/gaodeinterFace.js");
	

}
