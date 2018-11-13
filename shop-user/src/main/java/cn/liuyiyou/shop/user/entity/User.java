package cn.liuyiyou.shop.user.entity;

import com.baomidou.mybatisplus.extension.activerecord.Model;
import java.time.LocalDateTime;
import com.baomidou.mybatisplus.annotation.TableField;
import java.io.Serializable;

/**
 * <p>
 * 
 * </p>
 *
 * @author liuyiyou.cn
 * @since 2018-11-12
 */
public class User extends Model<User> {

    private static final long serialVersionUID = 1L;

    /**
     * 会员ID由系统自动按注册时间顺序生成
     */
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
     * 注册渠道：1 PC web, 2 Android app, 3 iOS app， 4 微信
     */
    @TableField("create_channel")
    private Integer createChannel;
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
     * 用户类型，1-C端用户；2-B端用户；3-都是
     */
    @TableField("user_type")
    private Integer userType;
    /**
     * 用户注册邀请码
     */
    @TableField("inv_code")
    private String invCode;
    /**
     * 新规则用户注册邀请码, 20180313后以此字段为准, 保留的invcode只是为了兼容以往分享出去的旧规则邀请码
     */
    @TableField("inv_code_new")
    private String invCodeNew;
    /**
     * 推广来源：1-菜先鲜
     */
    private Integer src;
    /**
     * 营销渠道来源，对应ibalife_report.report_from
     */
    private Integer ditch;
    /**
     * 用户是否消费
     */
    private Boolean consume;
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
     * 活动类型，1--店主拉新
     */
    @TableField("act_type")
    private Integer actType;
    /**
     * 注册至erp对应的customerId
     */
    @TableField("customer_id")
    private String customerId;
    /**
     * 最后更新时间
     */
    @TableField("last_update")
    private LocalDateTime lastUpdate;
    /**
     * 第三方渠道活动的渠道
     */
    @TableField("third_party_channel")
    private Long thirdPartyChannel;


    public Integer getUid() {
        return uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getRealName() {
        return realName;
    }

    public void setRealName(String realName) {
        this.realName = realName;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getPasswd() {
        return passwd;
    }

    public void setPasswd(String passwd) {
        this.passwd = passwd;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDateTime getCreateTime() {
        return createTime;
    }

    public void setCreateTime(LocalDateTime createTime) {
        this.createTime = createTime;
    }

    public Integer getCreateChannel() {
        return createChannel;
    }

    public void setCreateChannel(Integer createChannel) {
        this.createChannel = createChannel;
    }

    public LocalDateTime getLastTime() {
        return lastTime;
    }

    public void setLastTime(LocalDateTime lastTime) {
        this.lastTime = lastTime;
    }

    public Integer getLastChannel() {
        return lastChannel;
    }

    public void setLastChannel(Integer lastChannel) {
        this.lastChannel = lastChannel;
    }

    public String getLastIp() {
        return lastIp;
    }

    public void setLastIp(String lastIp) {
        this.lastIp = lastIp;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Integer getUserType() {
        return userType;
    }

    public void setUserType(Integer userType) {
        this.userType = userType;
    }

    public String getInvCode() {
        return invCode;
    }

    public void setInvCode(String invCode) {
        this.invCode = invCode;
    }

    public String getInvCodeNew() {
        return invCodeNew;
    }

    public void setInvCodeNew(String invCodeNew) {
        this.invCodeNew = invCodeNew;
    }

    public Integer getSrc() {
        return src;
    }

    public void setSrc(Integer src) {
        this.src = src;
    }

    public Integer getDitch() {
        return ditch;
    }

    public void setDitch(Integer ditch) {
        this.ditch = ditch;
    }

    public Boolean getConsume() {
        return consume;
    }

    public void setConsume(Boolean consume) {
        this.consume = consume;
    }

    public String getHeadimg() {
        return headimg;
    }

    public void setHeadimg(String headimg) {
        this.headimg = headimg;
    }

    public LocalDateTime getBirthday() {
        return birthday;
    }

    public void setBirthday(LocalDateTime birthday) {
        this.birthday = birthday;
    }

    public Integer getGender() {
        return gender;
    }

    public void setGender(Integer gender) {
        this.gender = gender;
    }

    public Integer getActType() {
        return actType;
    }

    public void setActType(Integer actType) {
        this.actType = actType;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public LocalDateTime getLastUpdate() {
        return lastUpdate;
    }

    public void setLastUpdate(LocalDateTime lastUpdate) {
        this.lastUpdate = lastUpdate;
    }

    public Long getThirdPartyChannel() {
        return thirdPartyChannel;
    }

    public void setThirdPartyChannel(Long thirdPartyChannel) {
        this.thirdPartyChannel = thirdPartyChannel;
    }

    @Override
    protected Serializable pkVal() {
        return this.uid;
    }

    @Override
    public String toString() {
        return "User{" +
        ", uid=" + uid +
        ", account=" + account +
        ", realName=" + realName +
        ", nickname=" + nickname +
        ", passwd=" + passwd +
        ", email=" + email +
        ", createTime=" + createTime +
        ", createChannel=" + createChannel +
        ", lastTime=" + lastTime +
        ", lastChannel=" + lastChannel +
        ", lastIp=" + lastIp +
        ", status=" + status +
        ", userType=" + userType +
        ", invCode=" + invCode +
        ", invCodeNew=" + invCodeNew +
        ", src=" + src +
        ", ditch=" + ditch +
        ", consume=" + consume +
        ", headimg=" + headimg +
        ", birthday=" + birthday +
        ", gender=" + gender +
        ", actType=" + actType +
        ", customerId=" + customerId +
        ", lastUpdate=" + lastUpdate +
        ", thirdPartyChannel=" + thirdPartyChannel +
        "}";
    }
}
