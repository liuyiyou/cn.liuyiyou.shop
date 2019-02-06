package cn.liuyiyou.shop.prod.service;

import cn.liuyiyou.shop.prod.entity.Prod;
import cn.liuyiyou.shop.prod.vo.ProdListReqVo;
import cn.liuyiyou.shop.prod.vo.ProdListRespVo;
import cn.liuyiyou.shop.prod.vo.ProdVo;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.IService;

/***
 *
 * @author: liuyiyou.cn
 * @date: 2019/2/1
 * @Copyright 2019 liuyiyou.cn Inc. All rights reserved
 */
public interface IProdService extends IService<Prod> {

    ProdVo getProdById(Long id);


    IPage<ProdListRespVo> prodPage(ProdListReqVo prodListReqVo);
}
