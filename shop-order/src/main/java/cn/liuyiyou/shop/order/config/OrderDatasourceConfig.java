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
// * @author: liuyiyou@liuyiyou.cn
// * @date: 2018/11/14
// * @version: V1.0
// * @Copyright: 2018 liuyiyou.cn Inc. All rights reserved.
// */
//@Configuration
//@MapperScan(basePackages = OrderDatasourceConfig.PACKAGE, sqlSessionFactoryRef = "orderSqlSessionFactory")
//public class OrderDatasourceConfig {
//
//    static final String PACKAGE = "cn.liuyiyou.shop.order.mapper";
//
//    @Bean(name = "orderDataSource")
//    @Primary
//    @ConfigurationProperties(prefix = "spring.jta.atomikos.datasource.one")
//    public DataSource dataSourceOne() {
//        return new AtomikosDataSourceBean();
//    }
//
//    @Bean(name = "orderSqlSessionFactory")
//    @Primary
//    public SqlSessionFactory orderSqlSessionFactory(@Qualifier("orderDataSource") DataSource orderDataSource)
//            throws Exception {
//        final SqlSessionFactoryBean sessionFactory = new SqlSessionFactoryBean();
//        sessionFactory.setDataSource(orderDataSource);
//        sessionFactory.setMapperLocations(new PathMatchingResourcePatternResolver()
//                .getResources("classpath:mappers/*.xml"));
//        return sessionFactory.getObject();
//    }
//
//}
