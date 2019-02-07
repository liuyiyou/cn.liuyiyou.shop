package cn.liuyiyou.shop.common.utils;

import com.google.common.collect.Lists;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.function.BiConsumer;

import static java.util.Objects.requireNonNull;
import static java.util.Optional.ofNullable;

/***
 *
 * @author: liuyiyou.cn
 * @date: 2019/2/7
 * @Copyright 2019 liuyiyou.cn Inc. All rights reserved
 */
@Slf4j
public class CollUtil {

	/**
	 * 集合分组接口
	 * @param <D> 待分组的结合类型
	 * @param <T> 分组依据字段的数据类型
	 */
	public interface GroupBy<D, T> {
		T groupby(D obj);
	}

	public interface PrimaryKey<D, T> {
		T keyby(D d);
	}

	/**
	 * 集合分组函数
	 * @param colls
	 * @param gb
	 * @return 
	 */
	public static final <T, D> Map<T, List<D>> groupColl(Collection<D> colls, GroupBy<D, T> gb) {
		if (null == colls || colls.isEmpty()) {
			log.error("传入待分组的集合为空，搞啥咧？");
			return null;
		}
		if (null == gb) {
			log.error("分组条件接口为空，搞啥咧？");
			return null;
		}
		Iterator<D> iter = colls.iterator();
		Map<T, List<D>> map = new HashMap<T, List<D>>();
		while (iter.hasNext()) {
			D d = iter.next();
			T t = gb.groupby(d);
			if (map.containsKey(t)) {
				map.get(t).add(d);
			} else {
				List<D> list = new ArrayList<D>();
				list.add(d);
				map.put(t, list);
			}
		}
		return map;
	}

	/**
	 * 集合转换成Map结构，对唯一主键的表结构转换成MAP，然后直接根据Key获取对象适用。
	 * @param colls
	 * @param sb
	 * @return
	 */
    public static final <T, D> Map<T, D> coll2Map(Collection<D> colls, PrimaryKey<D, T> sb) {
        if (null == colls || colls.isEmpty()) {
            log.error("传入待分组的集合为空，搞啥咧？");
            return Collections.emptyMap();
        }
        Iterator<D> iter = colls.iterator();
        Map<T, D> map = new HashMap<T, D>();
        while (iter.hasNext()) {
            D d = iter.next();
            T t = sb.keyby(d);
            if (!map.containsKey(t)) {
                map.put(t, d);
            }
        }
        return map;
    }

	public static<T> List<T> returnEmptyListIfNull(List<T> list){
		return ofNullable(list).orElse(Lists.newArrayList());
	}

	public static <T> boolean isEmpty(Collection<T> collection) {
        return collection == null || collection.isEmpty();
    }

    public static <T> boolean isNotEmpty(Collection<T> collection) {
        return !isEmpty(collection);
    }

	/**
	 * 提供索引的foreach
	 * @param elements 集合
	 * @param action 遍历动作
	 * @param <E> 边界泛型
	 */
	public static <E> void forEach(Iterable<? extends E> elements, BiConsumer<Integer, ? super E> action) {
		requireNonNull(elements);
		requireNonNull(action);
		int index = 0;
		for (E element : elements) {
			action.accept(index++, element);
		}
	}

}
