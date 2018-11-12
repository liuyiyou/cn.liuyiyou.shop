package cn.liuyiyou.shop.order.service.impl;

import cn.liuyiyou.shop.order.entity.TransactionMessage;
import cn.liuyiyou.shop.order.mapper.TransactionMessageMapper;
import cn.liuyiyou.shop.order.service.ITransactionMessageService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2018-11-05
 */
@Service
public class TransactionMessageServiceImpl extends ServiceImpl<TransactionMessageMapper, TransactionMessage> implements ITransactionMessageService {

}
