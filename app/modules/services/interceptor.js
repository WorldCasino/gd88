'use strict';

/** @namespace services.interceptor */

angular
  .module('ink')
  .factory('commonInterceptor', commonInterceptor)
  .factory('logInterceptor', logInterceptor)
  .factory('basicParamsInterceptor', basicParamsInterceptor)
  .factory('lockQuestInterceptor', lockQuestInterceptor);

/**
 * 通用响应拦截器
 * @name commonInterceptor
 * @memberof services.interceptor#
 */

function commonInterceptor($rootScope, $q, CONST) {

  return {
    response: response,
    responseError: responseError
  };

  function response(res) {

    var data = res.data;

    if (data.Code >= 10000) {
      $rootScope.$broadcast(CONST.RES_CODE_10000, data.Desc);
    }

    return res;
  }

  function responseError(res) {

    $rootScope.$broadcast(CONST.RES_STATUS[res.status], res);

    return $q.reject(res);
  }
}

/**
 * 日志拦截器
 * @name logInterceptor
 * @memberof services.interceptor#
 */

function logInterceptor($q) {

  function request(config) {
    console.groupCollapsed('%c[请求][%s]', 'color:blue;', config.url);
    console.dir(config);
    console.groupEnd();
    return config;
  }

  function response(res) {
    console.groupCollapsed('%c[返回][%s]', 'color:green;', res.config.url);
    console.dir(res);
    console.groupEnd();

    return res;
  }

  function responseError(res) {

    console.groupCollapsed('%c[返回异常][%s]', 'color:red;', res.config.url);
    console.dir(res);
    console.groupEnd();

    return $q.reject(res);
  }

  return {
    request: request,
    response: response,
    responseError: responseError
  };
}

/**
 * 参数拦截器
 * @name basicParamsInterceptor
 * @memberof services.interceptor#
 */

function basicParamsInterceptor(ENV, $sessionStorage, getCommonHeader, param) {

  return {
    request: request
  };

  function verifyParam(config, param) {

    var _p = config.params || {};
    var _d = config.data || {};

    return ( _p[param] || _d[param] );
  }

  function setHeaders(config) {

    // 当请求参数中包含_longToString_参数时
    // 为该请求添加一个Compatible-LongType请求头, 让后端将long型转换为string类型

    if (verifyParam(config, '_longToString_')) {
      config.headers['Compatible-LongType'] = true;
    }

  }

  // 开发者模式

  function dev(config) {
    var params, urlArr, urlPars;

    params = config.params || {};

    urlArr = decodeURIComponent(config.url).split('?');
    urlPars = urlArr[1] && urlArr[1].split('&');

    // 如果get方式自己带了?test=1 那么将去掉本来URL上已有的?
    if (urlArr.length >= 2) {
      config.url = urlArr[0];
    }

    // 将?test=1 转换成对象并且合并到config.params中
    _.each(urlPars, function (param) {
      param = param.split('=');
      params[param[0]] = param[1];
    });

    params['__h'] = encodeURIComponent(param(_.extendOwn(getCommonHeader(), {
      'token': $sessionStorage.token,
      '_cookies': encodeURIComponent(param({
        '_capkey': $sessionStorage['_capkey'] || ''
      }))
    })));


    config.params = params;

    return config;
  }

  function request(config) {

    setHeaders(config);

    return ENV.enableCookie ? config : dev(config);
  }
}

/**
 * 请求锁拦截器
 * @name lockQuestInterceptor
 * @memberof services.interceptor#
 */

function lockQuestInterceptor($q) {

  var locks;

  locks = {};

  function verifyParam(config, param) {

    var _p = config.params || {};
    var _d = config.data || {};

    return ( _p[param] || _d[param] );
  }

  // 移除锁

  function removeLock(res){
    var url, isLock;

    try{
      url = res.config.url;
      isLock = locks[url];

      if (isLock) {
        delete locks[url];
      }

      return res;
    }catch(e){
      return {};
    }
  }

  function request(config) {
    var url, isLock, _unlock_;

    url = config.url;
    isLock = locks[url];
    // 判断请求参数是否要求对该请求不使用锁
    _unlock_ = verifyParam(config, '_unlock_');

    if (_unlock_) {
      return config;
    }

    if (isLock) {
      // 拒绝请求
      return $q.reject({
        config: config,
        status: 800,
        statusText: '请求太快, 等会儿再来吧!!!'
      });
    }

    locks[url] = true; // 标识请求锁

    return config;
  }

  function response(res) {
    return removeLock(res);
  }

  function responseError(res) {
    return $q.reject(removeLock(res));
  }

  return {
    request: request,
    response: response,
    responseError: responseError
  }
}
