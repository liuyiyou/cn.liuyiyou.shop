//package cn.liuyiyou.shop.prod;
//
//import cn.liuyiyou.shop.order.vo.Prod;
//import com.alibaba.fastjson.JSONObject;
//import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
//import org.junit.Test;
//import org.springframework.web.client.RestTemplate;
//
//import java.util.List;
//
///**
// * @author: liuyiyou@yanglaoban.com
// * @date: 2018/10/30
// * @version: V1.0
// * @Copyright: 2018 yanglaoban.com Inc. All rights reserved.
// */
//public class UserControllerTest extends UserApplicationTests {
//    @Test
//    public void test(){
//        RestTemplate restTemplate=new RestTemplate();
//        //不能用 http://PROD-SERVICE/prod/list
//        //PROD-SERVICE; nested exception is java.net.UnknownHostException: PROD-SE
//        String page = restTemplate.getForEntity("http://localhost:10000/prod/list", String.class).getBody();
//
//        JSONObject object = JSONObject.parseObject(page);
//        Page<Prod> page1 = new Page<>();
//        page1.setTotal(object.getLong("total"));
//        List<Prod> records = JSONObject.parseArray(object.getString("records"), Prod.class);
//        page1.setRecords(records);
//        System.out.println(page1.getRecords().size());
//    }
//}
