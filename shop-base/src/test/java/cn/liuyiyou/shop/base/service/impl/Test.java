package cn.liuyiyou.shop.base.service.impl;

import org.apache.commons.codec.binary.Base64;
import org.bouncycastle.crypto.digests.MD5Digest;
import org.bouncycastle.jcajce.provider.digest.MD2;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/***
 *
 * @author: liuyiyou.cn
 * @date: 2019/4/12
 * @Copyright 2019 liuyiyou.cn Inc. All rights reserved
 */
public class Test {

    public static void main(String[] args) throws NoSuchAlgorithmException {

//        String base64 = "123456";
//        MessageDigest md5 = MessageDigest.getInstance("MD5");
//        byte[] digest = md5.digest(base64.getBytes());
//        String s = Base64.encodeBase64String(digest);
//        System.out.println(s);


        String base64 = "lycy123456";
        MessageDigest md5 = MessageDigest.getInstance("MD5");
        byte[] digest = md5.digest(base64.getBytes());
        String s = Base64.encodeBase64String(digest);
        System.out.println(s);

    }
}
