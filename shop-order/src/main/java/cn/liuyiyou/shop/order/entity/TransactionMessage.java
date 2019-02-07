package cn.liuyiyou.shop.order.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * <p>
 *
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2018-11-05
 */
@Data
@Accessors(chain = true)
@TableName("transaction_message")
public class TransactionMessage implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;
    /**
     * 消息内容
     */
    @TableField("msg_content")
    private String msgContent;
    /**
     * 消息状态
     */
    @TableField("msg_status")
    private Boolean msgStatus;
    @TableField("create_time")
    private LocalDateTime createTime;


}
