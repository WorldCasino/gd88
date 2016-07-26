'use strict';

/** @namespace services.cache */

angular
  .module('ink')
  .factory('httpCache', httpCache);

/**
 * 请求缓存
 * @name httpCache
 * @memberof services.cache#
 */

function httpCache(CacheFactory){
  /* jshint newcap: false */
  return CacheFactory('httpCache', {
    maxAge: 15 * 60 * 1000, // 添加的缓存对象将在15分钟之后过期
    cacheFlushInterval: 60 * 60 * 1000, // 该缓存集合每小时清空一次
    deleteOnExpire: 'aggressive' // 过期之后删除缓存
  });
}
