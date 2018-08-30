/**
 * Created by foxh on 2015/8/25.
 * �ٶȵ�ͼAPI��������ļ�
 */

/**
* ��̬���js�ļ�
* */
function AddJavascriptUrl(srcUrl)
{
    document.write('<script type="text/javascript" src="'+srcUrl+'" > </script>');
}
function AddScriptAfterDom(srcUrl){
	document.write('<script type="text/javascript" src="'+srcUrl+'"  defer="defer"> </script>');
}

/**
* ��̬���css�ļ�
* */
function AddCssUrl(srcUrl)
{
    document.write('<link type="text/css" rel="stylesheet" href="'+srcUrl+'" >');
}

/*
* �˹����Ȼ�ȡ�ٶ����js
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
 * �˹����Ȼ�ȡ��ͼ���js
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
* ����������ȡ�ٶ����js
* */
function GetBaiduMapJs_loganalyze(localpath)
{	 
	AddJavascriptUrl("http://api.map.baidu.com/api?v=2.0&ak="+mapConfig.mapKey);
	AddScriptAfterDom(localpath+"/common/js/map/SearchInfoWindow_min.js");
	AddScriptAfterDom(localpath+"/common/js/map/baidu/FeatureLayer.js");
	AddScriptAfterDom(localpath+"/pages/dispatch/js_baidu/dispatch_log_analyze.js");

}

/*
 * ����������ȡ��ͼ���js
 * */
function GetSuperMapJs_loganalyze(localpath)
{
    AddJavascriptUrl(localpath+"/common/js/map/init.js");
    AddJavascriptUrl(localpath+"/pages/dispatch/js/dispatch_log_analyze.js" );
}

/*
* �鿱��ά����ȡ�ٶ����js
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
 * �鿱��ά����ȡ��ͼ���js
 * */
function GetSuperMapJs_surveryarea(localpath)
{
    AddJavascriptUrl(localpath+"/common/js/map/init.js");
    AddJavascriptUrl(localpath+"/pages/dispatch/js/survey_area_draw.js" );
}

/*
* ��ҳ��λϵͳ��ȡ�ٶ����js
* */
function GetBaiduMapJs_location()
{

}

/*
* ��ҳ��λϵͳ��ȡ��ͼ���js
* */
function GetSuperMapJs_location()
{
    AddJavascriptUrl(localpath+"/common/js/map/init.js");
    AddJavascriptUrl(localpath+"/pages/dispatch/js/survey_area_draw.js" );
}
/**
 * �鿱Աλ�ü�ػ�ȡ�ٶȵ�ͼ���js
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
 * �鿱Աλ�ü�ػ�ȡ�ߵµ�ͼ���js
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
 * �鿱Ա���-�鿱Ա��ʷ�켣��ȡ�ٶȵ�ͼ���js
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
 * �鿱Ա���-�鿱Ա��ʷ�켣��ȡ�ߵµ�ͼ���js
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
 * �鿱Ա��ʷ�켣��ȡ�ٶȵ�ͼ���js
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
 * �鿱Ա��ʷ�켣��ȡ�ߵµ�ͼ���js
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
 * λ����Ϣά��-4S��λ��ά��_��ȡ�ٶȵ�ͼ���js
 * @param localpath
 */
function GetBaiduMapJs_flowcontrol(localpath){
	AddJavascriptUrl("http://api.map.baidu.com/api?v=2.0&ak="+mapConfig.mapKey);
	AddScriptAfterDom(localpath+"/common/js/map/SearchInfoWindow_min.js");
	AddCssUrl(localpath+"/style/baidu/map-window.css");
	AddScriptAfterDom(localpath+"/pages/flowcontrol/js_baidu/maintain_shop.js" );
}

/**
 * λ����Ϣά��-4S��λ��ά��_��ȡ�ߵµ�ͼ���js
 * @param localpath
 */
function GetSuperMapJs_flowcontrol(localpath){
	AddCssUrl(localpath+"/style/map-window.css");
	AddJavascriptUrl(localpath+"/common/js/map/MapTypeInit.js" );
	AddJavascriptUrl(localpath+"/pages/flowcontrol/js/maintain_shop.js" );
}


/**
 * ���ȼ��-�����ֲ�_��ȡ�ٶȵ�ͼ���js
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
 * ���ȼ��-�����ֲ�_��ȡ�ߵµ�ͼ���js
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
 * �鿱Ա���-�鿱Ա��ʷ�켣��ȡ�ߵµ�ͼ���js
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
 * �鿱Ա���-�鿱Ա��ʷ�켣��ȡ�ٶȵ�ͼ���js
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
* ����������ȡ�ٶ����js
* */
function GetBaiduMapJs_loganalyze_new(localpath)
{	 
	AddJavascriptUrl("http://api.map.baidu.com/api?v=2.0&ak="+mapConfig.mapKey);
	AddScriptAfterDom(localpath+"/common/js/map/SearchInfoWindow_min.js");
	/*AddScriptAfterDom(localpath+"/common/js/map/baidu/FeatureLayer.js");*/
	AddScriptAfterDom(localpath+"/pages/monitor/js_baidu/surveyor_analyse.js");

}

/*
 * ����������ȡ��ͼ���js
 * */
function GetSuperMapJs_loganalyze_new(localpath)
{
    AddJavascriptUrl(localpath+"/common/js/map/init.js");
    AddJavascriptUrl(localpath+"/pages/monitor/js/surveyor_analyse_gaode.js" );
}


/**
 * ��ͼ��ظߵ�js
 */
function GetSuperMapJs_monitor_map(localpath)
{   
	
	AddJavascriptUrl(localpath+"/common/js/map/gaoDe.js");
    AddJavascriptUrl(localpath+"/pages/dispatch/js/map_monitor_gaode.js");

}

/**
 * ��ͼ��ذٶ�js
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
