package com.utils;

import freemarker.template.Configuration;
import freemarker.template.Template;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import java.io.*;
import java.util.Map;


/**
 * FreeMarker工具类，生成HTML或者HTML数据
 * Created by ozc on 2017/12/8.
 *
 * @author ozc
 * @version 1.0
 */
public class FreeMarkerUtils {
	
	/**
	 * 
	 * @param ftlName：模板名
	 * @param fileName：生成的html名字
	 * @param map 数据库中的数据
	 * @throws Exception
	 */
	public void ouputFile(String ftlName, String fileName,  Map<String, Object> map) throws Exception{
		//创建fm的配置
		Configuration config = new Configuration();
		//指定默认编码格式
		config.setDefaultEncoding("UTF-8");
		//设置模板的包路径
		config.setClassForTemplateLoading(this.getClass(), "/ftl");

		//获得包的模板
		Template template = config.getTemplate(ftlName);

		//定义输出流，注意的必须指定编码，输出到根项目中
		Writer writer = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(new File(UtilPath.getRootPath() + "/" + fileName)), "UTF-8"));
		//生成模板
		template.process(map, writer);

	}

	/**
	 *
	 * @param ftlName 模版的名称
	 * @param map  模版中需要的数据
	 * @return 返回HTML页面的内容
	 * @throws Exception
     */
	public String returnText(String ftlName, Map<String, Object> map) throws Exception{

		Configuration config = new Configuration();

		config.setDefaultEncoding("UTF-8");
		config.setClassForTemplateLoading(this.getClass(), "/ftl");

		//获得包的模板
		Template template = config.getTemplate(ftlName);
		return FreeMarkerTemplateUtils.processTemplateIntoString(template, map);

	}


	public static void main(String[] args) throws Exception {

		FreeMarkerUtils freeMarkerUtils = new FreeMarkerUtils();
		freeMarkerUtils.ouputFile("navbar.ftl", "navbar.html", null);
	}

}
