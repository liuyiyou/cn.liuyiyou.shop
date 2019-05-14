# 技术栈


## 项目支撑
1. mysql
2. ZooKeeper
3. [SpringCloud](https://github.com/liuyiyou/cn.liuyiyou.springcloud)

## 后端
1. spring-boot
2. mybatis-plus
3. dubbo-springboot
4. eureka
5. zuul
6. ribbon


## 前端
1. weiui



## 启动流程

1. 启动zookeeper、Eureka、Zull等基础服务
2. shop-common下   执行 mvn clean install  -Dmaven.test.skip=true
3. 各个shop-xxx-api下，执行  mvn clean install  -Dmaven.test.skip=true
4. 启动shop-base微服务
5. 启动shop-prod微服务
6. 启动shop-user微服务