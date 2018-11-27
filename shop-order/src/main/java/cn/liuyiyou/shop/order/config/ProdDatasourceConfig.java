//package cn.liuyiyou.shop.order.config;
//
//import org.apache.ibatis.session.SqlSessionFactory;
//import org.mybatis.spring.SqlSessionFactoryBean;
//import org.mybatis.spring.annotation.MapperScan;
//import org.springframework.beans.factory.annotation.Qualifier;
//import org.springframework.boot.context.properties.ConfigurationProperties;
//import org.springframework.boot.jta.atomikos.AtomikosDataSourceBean;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.context.annotation.Primary;
//import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
//
//import javax.sql.DataSource;
//
///**
// * @author: liuyiyou@yanglaoban.com
// * @date: 2018/11/14
// * @version: V1.0
// * @Copyright: 2018 yanglaoban.com Inc. All rights reserved.
// */
//@Configuration
//@MapperScan(basePackages = ProdDatasourceConfig.PACKAGE, sqlSessionFactoryRef = "prodSqlSessionFactory")
//public class ProdDatasourceConfig {
//
//    static final String PACKAGE = "cn.liuyiyou.shop.prod.mapper";
//
//    @Bean(name = "prodDataSource")
//    @ConfigurationProperties(prefix = "spring.jta.atomikos.datasource.two")
//    public DataSource prodDataSource() {
//        return new AtomikosDataSourceBean();
//    }
//
//    @Bean(name = "prodSqlSessionFactory")
//    public SqlSessionFactory orderSqlSessionFactory(@Qualifier("prodDataSource") DataSource prodDataSource)
//            throws Exception {
//        final SqlSessionFactoryBean sessionFactory = new SqlSessionFactoryBean();
//        sessionFactory.setDataSource(prodDataSource);
//        sessionFactory.setMapperLocations(new PathMatchingResourcePatternResolver()
//                .getResources("classpath:mappers/*.xml"));
//        return sessionFactory.getObject();
//    }
//
//}
