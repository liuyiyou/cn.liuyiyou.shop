package cn.liuyiyou.shop.common.mq;

/***
 *
 * @author: liuyiyou.cn
 * @date: 2019/4/18
 * @Copyright 2019 liuyiyou.cn Inc. All rights reserved
 */
public interface IConsumerHandler {

    void handle(Object object);

    String topic();
}
