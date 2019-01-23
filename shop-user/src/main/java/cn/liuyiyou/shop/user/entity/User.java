package cn.liuyiyou.shop.user.entity;

import java.time.LocalDateTime;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import java.io.Serializable;

import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * <p>
 * 
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2019-01-23
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class User implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 会员ID由系统自动按注册时间顺序生成
     */
    @TableId(value = "uid", type = IdType.AUTO)
    private Integer uid;
    /**
     * 账号(电话号码)
     */
    private String account;
    /**
     * 真实姓名
     */
    @TableField("real_name")
    private String realName;
    private String nickname;
    /**
     * 密码
     */
    private String passwd;
    /**
     * 用户邮箱
     */
    private String email;
    /**
     * 创建时间
     */
    @TableField("create_time")
    private LocalDateTime createTime;
    /**
     * 上一次登录时间
     */
    @TableField("last_time")
    private LocalDateTime lastTime;
    /**
     * 上一次登录渠道：1 PC web, 2 Android app, 3 iOS app， 4 微信, 5 手机WEB
     */
    @TableField("last_channel")
    private Integer lastChannel;
    /**
     * 上一次登录IP
     */
    @TableField("last_ip")
    private String lastIp;
    /**
     * 登录状态 0-下线 1-在线
     */
    private Integer status;
    /**
     * 头像
     */
    private String headimg;
    /**
     * 生日
     */
    private LocalDateTime birthday;
    /**
     * 用户性别,0-未知;1-男;2-女；
     */
    private Integer gender;
    /**
     * 最后更新时间
     */
    @TableField("last_update")
    private LocalDateTime lastUpdate;


}
