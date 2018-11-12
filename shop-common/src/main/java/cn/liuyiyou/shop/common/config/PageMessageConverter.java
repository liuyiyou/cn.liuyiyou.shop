package cn.liuyiyou.shop.common.config;

import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.springframework.http.HttpInputMessage;
import org.springframework.http.HttpOutputMessage;
import org.springframework.http.converter.AbstractHttpMessageConverter;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.http.converter.HttpMessageNotWritableException;
import org.springframework.util.StreamUtils;

import java.io.IOException;
import java.nio.charset.Charset;
import java.util.List;

/**
 * @author: liuyiyou@yanglaoban.com
 * @date: 2018/10/30
 * @version: V1.0
 * @Copyright: 2018 yanglaoban.com Inc. All rights reserved.
 */
public class PageMessageConverter extends AbstractHttpMessageConverter<Page> {
    @Override
    protected boolean supports(Class<?> aClass) {
        return true;
    }

    /**
     * 重写readInternal方法
     * 处理请求中的数据
     *
     * @param aClass
     * @param httpInputMessage
     * @return
     * @throws IOException
     * @throws HttpMessageNotReadableException
     */
    @Override
    protected Page readInternal(Class<? extends Page> aClass, HttpInputMessage httpInputMessage) throws IOException, HttpMessageNotReadableException {
        String temp = StreamUtils.copyToString(httpInputMessage.getBody(), Charset.forName("UTF-8"));
        JSONObject object = JSONObject.parseObject(temp);
        Page page = new Page();
        page.setSize(object.getLong("size"));
        page.setRecords((List) object.get("records"));
        page.setCurrent(object.getLong("current"));
        page.setTotal(object.getLong("total"));
        return page;
    }

    @Override
    protected void writeInternal(Page page, HttpOutputMessage httpOutputMessage) throws IOException, HttpMessageNotWritableException {
    }
}
