1. Dubbo是RPC的，引用的服务类必接口必须是同一个服务即接口（即都是shop-xxx-api)中的，如果在不同的包中，会出现NPE，
   而ribbo或者fegin则是基于http的，只要属性一样，即可正常调取
 
2. 如果服务实现extends其他服务或者实现了其他接口可能服务调用不成功 CountryServiceImpl extends ServiceImpl<XX ,XX> implement CountryService,ICountryService
其中ServiceImpl是mybatis-plus中的类， ICountryService是mybatis-plus自动生成

