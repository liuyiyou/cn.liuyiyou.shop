package cn.liuyiyou.shop.common.mq;

import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

/***
 *
 * @author: liuyiyou.cn
 * @date: 2019/4/18
 * @Copyright 2019 liuyiyou.cn Inc. All rights reserved
 */
public class MessageHandlerSelector {

    @Autowired
    private List<IConsumerHandler> messageHandlers = new ArrayList<>();


}
