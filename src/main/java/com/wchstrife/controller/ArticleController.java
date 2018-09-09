package com.wchstrife.controller;

import com.neo.entity.ActiveUser;
import com.neo.entity.User;
import com.utils.DateUtil;
import com.wchstrife.entity.Article;
import com.wchstrife.entity.Category;
import com.wchstrife.service.ArticleService;
import com.wchstrife.service.CategoryService;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.tautua.markdownpapers.Markdown;
import org.tautua.markdownpapers.parser.ParseException;

import java.io.StringReader;
import java.io.StringWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * Created by wangchenghao on 2017/7/31.
 */
@Controller
@RequestMapping("/article")
public class ArticleController {

    @Autowired
    private ArticleService articleService;
    @Autowired
    private CategoryService categoryService;

    private SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");

    @RequestMapping("/get/{id}")
    public String get(Model model, @PathVariable(name = "id") String id){

        return "index";
    }

    /**
     * 首次进入
     * @param model
     * @return
     */
    @RequestMapping({"/index"})
    public String list(Model model){
        List<Article> articles = articleService.list();
        ActiveUser user = (ActiveUser)SecurityUtils.getSubject().getPrincipal();
        model.addAttribute("articles", articles);
        model.addAttribute("userNickname", user.getUserNickname());
        return "/index";
    }

    /**
     * 查询全部或者自己的文章，thymeleaf的局部刷新
     * @param model
     * @return
     * "index"index.html的名，
     *"table_refresh"是test.html中需要刷新的部分标志,
     *在标签里加入：th:fragment="table_refresh"
     */
    @RequestMapping("/getOneself")
//    @ResponseBody
    public String getOneself(Model model,String type){
        List<Article> articles;
        ActiveUser user = (ActiveUser)SecurityUtils.getSubject().getPrincipal();
        if("own".equals(type) && user != null){

            articles = articleService.getOneself(user.getUserId());
        }else {
            articles = articleService.list();
        }

        model.addAttribute("articles", articles);
        model.addAttribute("userNickname", user.getUserNickname());
        return "index::table_refresh";
    }

    /**
     * 按类型显示博客
     * @param dispalyname
     * @param category
     * @param model
     * @return
     */
    @RequestMapping("/column/{displayname}/{category}")
    public String column(@PathVariable("displayname") String dispalyname, @PathVariable("category") String category, Model model){
        model.addAttribute("articles", articleService.getArticleByCategoryName(category));
        model.addAttribute("displayName", dispalyname);

        return "front/columnPage";
    }

    /**
     * 显示详细信息
     * @param id
     * @param model
     * @return
     */
    @RequestMapping("/detail/{id}")
    public String detail(@PathVariable("id") String id, Model model){
        System.out.println(id);
        Article article = articleService.getById(id);
        System.out.println(article.getId());
        Markdown markdown = new Markdown();
        try {
            StringWriter out = new StringWriter();
            markdown.transform(new StringReader(article.getContent()), out);
            out.flush();
            article.setContent(out.toString());
        }catch (ParseException e){
            e.printStackTrace();
        }
        model.addAttribute("article", article);

        return "front/detail";
    }

    /**
     * 搜索
     * @param key
     * @param model
     * @return
     */
    @RequestMapping("/search")
    public String search(String key, Model model){
        List<Article> articles = articleService.search(key);
        model.addAttribute("articles", articles);

        return "front/columnPage";
    }

    /**
     * 后台管理
     * @param model
     * @return
     */
    @RequestMapping("/Administration")
    public String admin(Model model){
        ActiveUser user = (ActiveUser)SecurityUtils.getSubject().getPrincipal();
        List<Article>   articles = articleService.getOneself(user.getUserId());
        model.addAttribute("articles", articles);

        return "front/powermanage";
    }

    /**
     * 删除博客
     * @param id
     * @return
     */
    @RequestMapping("/delete/{id}")
    public String delete(@PathVariable("id") String id){
        articleService.delete(id);

        return "redirect:/article/Administration";
    }

    /**
     * 写博客
     * @param model
     * @return
     */
    @RequestMapping("/write")
    public String write(Model model){
        List<Category> categories = categoryService.list();
        model.addAttribute("categories", categories);
        model.addAttribute("article", new Article());

        return "front/write";
    }

    /**
     * 保存
     * @param article
     * @return
     */
    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public String save(Article article){
        //设置种类
        String name = article.getCategory().getName();
        Category category = categoryService.fingdByName(name);
        article.setCategory(category);
        //设置摘要,取前40个字
        article.setDate(DateUtil.sDateFormat());
        ActiveUser activeUser = (ActiveUser)SecurityUtils.getSubject().getPrincipal();
        User user = new User();
        user.setUserId(activeUser.getUserId());
        article.setUser(user);
        articleService.save(article);

        return "redirect:/article/Administration";
    }

    /**
     * 修改
     * @param id
     * @param model
     * @return
     */
    @RequestMapping("/update/{id}")
    public String update(@PathVariable("id") String id, Model model){
        Article article = articleService.getById(id);
        model.addAttribute("target", article);
        List<Category> categories = categoryService.list();
        model.addAttribute("categories", categories);
        model.addAttribute("article", new Article());

        return "front/update";
    }
}
