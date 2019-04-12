package cn.liuyiyou.shop.prod;

import com.baomidou.mybatisplus.annotation.DbType;
import com.baomidou.mybatisplus.generator.AutoGenerator;
import com.baomidou.mybatisplus.generator.InjectionConfig;
import com.baomidou.mybatisplus.generator.config.DataSourceConfig;
import com.baomidou.mybatisplus.generator.config.FileOutConfig;
import com.baomidou.mybatisplus.generator.config.GlobalConfig;
import com.baomidou.mybatisplus.generator.config.PackageConfig;
import com.baomidou.mybatisplus.generator.config.StrategyConfig;
import com.baomidou.mybatisplus.generator.config.TemplateConfig;
import com.baomidou.mybatisplus.generator.config.po.TableInfo;
import com.baomidou.mybatisplus.generator.config.rules.NamingStrategy;
import org.junit.Test;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.baomidou.mybatisplus.annotation.IdType.AUTO;

/**
 * @author: liuyiyou
 * @date: 2018/11/5
 * @version: V1.0
 * @Copyright: 2018 liuyiyou.cn Inc. All rights reserved.
 */
public class MyBatisPlusGenerator {


    @Test
    public void shopBaseGenerator() {
        String outPutDir = "/Users/liuyiyou/code/github/cn.liuyiyou.shop/shop-base/src/main/java";
        String xmlOutPurDir = "/Users/liuyiyou/code/github/cn.liuyiyou.shop/shop-base/src/main/resources/mappers/";
        String dbName = "shop-base";
        String[] tableName = new String[]{"category_attribute"};
        String basePackageName = "cn.liuyiyou.shop.base";
        generator(outPutDir, xmlOutPurDir, dbName, tableName, basePackageName);

    }


    @Test
    public void shopUserGenerator() {
        String outPutDir = "/Users/liuyiyou/code/github/cn.liuyiyou.shop/shop-user/src/main/java";
        String xmlOutPurDir = "/Users/liuyiyou/code/github/cn.liuyiyou.shop/shop-user/src/main/resources/mappers/";
        String dbName = "shop-user";
        String[] tableName = new String[]{"category_attribute"};
        String basePackageName = "cn.liuyiyou.shop.user";
        generator(outPutDir, xmlOutPurDir, dbName, tableName, basePackageName);

    }


    @Test
    public void shopOrderGenerator() {
        String outPutDir = "/Users/liuyiyou/code/github/cn.liuyiyou.shop/shop-order/src/main/java";
        String xmlOutPurDir = "/Users/liuyiyou/code/github/cn.liuyiyou.shop/shop-order/src/main/resources/mappers/";
        String dbName = "shop-order";
        String[] tableName = new String[]{"category_attribute"};
        String basePackageName = "cn.liuyiyou.shop.order";
        generator(outPutDir, xmlOutPurDir, dbName, tableName, basePackageName);

    }

    @Test
    public void shopProdGenerator() {
        String outPutDir = "/Users/liuyiyou/code/github/cn.liuyiyou.shop/shop-prod/src/main/java";
        String xmlOutPurDir = "/Users/liuyiyou/code/github/cn.liuyiyou.shop/shop-prod/src/main/resources/mappers/";
        String dbName = "shop-prod";
        String[] tableName = new String[]{"category_attribute"};
        String basePackageName = "cn.liuyiyou.shop.prod";
        generator(outPutDir, xmlOutPurDir, dbName, tableName, basePackageName);

    }


    public static void generator(String outPutDir, String outXmlPutDir, String dbName, String[] tableName, String basePackageName) {


        AutoGenerator mpg = new AutoGenerator();
        // 全局配置
        GlobalConfig gc = new GlobalConfig();
        gc.setOutputDir(outPutDir);
        gc.setFileOverride(true);
        gc.setActiveRecord(false);
        gc.setIdType(AUTO);
        gc.setEnableCache(false);// XML 二级缓存
        gc.setBaseResultMap(true);// XML ResultMap
        gc.setBaseColumnList(true);// XML columList
        gc.setAuthor("liuyiyou.cn");
        // 自定义文件命名，注意 %s 会自动填充表实体属性！
        gc.setMapperName("%sMapper");
        gc.setXmlName("%sMapper");
        gc.setServiceName("I%sService");
        gc.setServiceImplName("%sService");
        gc.setControllerName("%sController");
        mpg.setGlobalConfig(gc);

        // 数据源配置
        DataSourceConfig dsc = new DataSourceConfig();
        dsc.setDbType(DbType.MYSQL);
        dsc.setDriverName("com.mysql.jdbc.Driver");
        dsc.setUrl("jdbc:mysql://localhost:3306/" + dbName);
        dsc.setUsername("root");
        dsc.setPassword("123456");
        mpg.setDataSource(dsc);

        // 策略配置
        StrategyConfig strategy = new StrategyConfig();
        // strategy.setCapitalMode(true);// 全局大写命名 ORACLE 注意
        //strategy.setTablePrefix(new String[] { "SYS_" });// 此处可以修改为您的表前缀
        strategy.setNaming(NamingStrategy.underline_to_camel);// 表名生成策略
        strategy.setInclude(tableName); // 需要生成的表
        strategy.setEntityLombokModel(true);
        strategy.setRestControllerStyle(true);
        strategy.setLogicDeleteFieldName("deleted");
        //strategy.setExclude(new String[]{"test"}); // 排除生成的表
        mpg.setStrategy(strategy);

        // 包配置
        PackageConfig pc = new PackageConfig();
        pc.setParent(basePackageName);
        pc.setController("controller");
        pc.setService("service");
        pc.setServiceImpl("service.impl");
        pc.setEntity("entity");
        pc.setMapper("mapper");
        mpg.setPackageInfo(pc);

        // 注入自定义配置，可以在 VM 中使用 cfg.abc 【可无】
        InjectionConfig cfg = new InjectionConfig() {
            @Override
            public void initMap() {
                Map<String, Object> map = new HashMap<>();
                map.put("abc", this.getConfig().getGlobalConfig().getAuthor() + "-rb");
                this.setMap(map);
            }
        };

        // 调整 xml 生成目录演示
        List<FileOutConfig> focList = new ArrayList<FileOutConfig>();
        focList.add(new FileOutConfig("/templates/mapper.xml.vm") {
            @Override
            public String outputFile(TableInfo tableInfo) {
                return outXmlPutDir + tableInfo.getEntityName() + "Mapper.xml";
            }
        });
        cfg.setFileOutConfigList(focList);
        mpg.setCfg(cfg);

        // 关闭默认 xml 生成，调整生成 至 根目录
        TemplateConfig tc = new TemplateConfig();
        tc.setXml(null);
        mpg.setTemplate(tc);
        // 执行生成
        mpg.execute();
    }


}
