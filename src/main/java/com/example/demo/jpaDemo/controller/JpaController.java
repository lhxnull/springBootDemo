package com.example.demo.jpaDemo.controller;

import com.example.demo.jpaDemo.entity.JpaStudent;
import com.example.demo.jpaDemo.service.JpaStudentService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

/**
 * Created by 刘星星 on 2018/8/26.
 * 使用jpa查询的Demo以及返回html，jsp
 */
@Controller
public class JpaController {
    @Resource
    private JpaStudentService jpaStudentService;

    /**
     *
     * @param request
     * @param response
     * @throws ServletException
     * @throws IOException
     */
    @RequestMapping("/demo/jpaDemo")
    public void findStudent(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        List<JpaStudent> students = jpaStudentService.findAll();
        request.setAttribute("students", students);
        System.out.println(students.get(0).getName());
        request.getRequestDispatcher("/pages/listStudent.jsp").forward(request, response);
//        return "redirect:/pages/listStudent.jsp";
    }

    @RequestMapping(value = "/demo/queryById/{id}",method = RequestMethod.GET)
//    public String queryById(@PathVariable String id, Model model){
    public void queryById(@PathVariable String id,HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        JpaStudent stu = jpaStudentService.getJpaStudentById(id);
        System.out.println(stu.getName()+"----"+stu.getAge());
        request.setAttribute("stu", stu);
        request.getRequestDispatcher("/pages/listStudent.jsp").forward(request, response);
    }
    /**
     * 返回字符串json什么的
     * @return
     */
    @RequestMapping(value = "/demo/success")
    @ResponseBody
    public String isSuccess(){
        return "success";
    }

    @RequestMapping("/demo/403")
    public String ruturnTemplates() {

        return "403";
    }

}
