import React ,{Component} from 'react';
import {AsyncStorage} from 'react-native';
import Storage from 'react-native-storage';
var storage = new Storage({
    //最大容量，默认值1000条史苏句循环储存
    size:1000,
    //储存引擎:对于RN使用AsyncSotage,对于web使用window.localStorage
    storageBackend:AsyncStorage,
    //数据过期时间,默认一整天(1000*3600*24毫秒),设置null则永不过期
    defayltExpires:null,
    //读写时在内存中缓存数据,默认启用
    enableCache:true,
    //如果storage中没有相应数据，或者数据已经过期
    //则会调用相应的sync方法，无缝返回最新数据
    //sync
    //可以在构造函数这里写好sync的方法
    //或者写到另一个文件里,这里require引入
    //或是在任何时候,直接对storage.sync进行赋值修改
    // sync:require('./sync') //这个sync文件是自己写好的
});


//最好在全局范围内创建一个(且只有一个)storage实例,方便直接调用
//对于web
//window.storage = storage;
//对于react native 
//global.storage = storage;

//注意：全局变量一定要先声明，后使用
//如果你再某处调用storage报错未定义
//请检查global.storage = storage语句是否确实已经执行过了
//导出为全局变量

// global.storage=storage;
export default storage
