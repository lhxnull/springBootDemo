package com;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.boot.web.support.SpringBootServletInitializer;

/**
 * Created by 刘星星 on 2018/8/14.
 * 遇到的坑：
 * 1.yml只要有中文就会报错，卧槽，注释都不管用，找了好久惊呆了。
 *2.通过.yml不能把属性注入到实体类中---https://github.com/spring-projects/spring-boot/issues/4847
 *	aspectj-maven-plugin中的<sources/>或者在maven-compiler-plugin中添加
 *	<proc>none</proc>或者将它们加在一起，要不不能注入
 *3.注解大全:
 * @SpringBootApplication：包含了@ComponentScan、@Configuration和@EnableAutoConfiguration注解。
 * 其中@ComponentScan让spring Boot扫描到Configuration类并把它加入到程序上下文。
 * 	@Configuration 等同于spring的XML配置文件；使用Java代码可以检查类型安全。
 * 	@EnableAutoConfiguration 自动配置。
 * 	@ComponentScan 组件扫描，可自动发现和装配一些Bean。
 * 	@Component可配合CommandLineRunner使用，在程序启动后执行一些基础任务。
 * 	@RestController注解是@Controller和@ResponseBody的合集,表示这是个控制器bean,并且是将函数的返回值直 接填入HTTP响应体中,是REST风格的控制器。
 * 	@Autowired自动导入。
 * 	@PathVariable获取参数。
 * 	@JsonBackReference解决嵌套外链问题。
 * 	@RepositoryRestResourcepublic配合spring-boot-starter-data-rest使用。
 */

@SpringBootApplication
//扫描 listener、Filter、servlet；
@ServletComponentScan(value = "com.example")
public class DemoApplication extends SpringBootServletInitializer {


	public static void main(String[] args) {
		System.out.println("*******************************");
		System.out.println("start SpringApplication.run");
		System.out.println("*******************************");
		SpringApplication.run(DemoApplication.class, args);
		System.out.println("end SpringApplication.run");
	}
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(DemoApplication.class);
	}

}
