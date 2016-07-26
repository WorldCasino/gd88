'use strict';

/** @namespace services.pack */

var fmt = require('string-format');
var cookiesJS = require('cookies-js');

angular
  .module('ink')
  .factory('cookies', cookies)
  .factory('param', param)
  .factory('stringfmt', stringfmt)
  .factory('redirect', redirect)
  .factory('getCommonHeader', getCommonHeader)
  .factory('currentUrl', currentUrl)
  .factory('dialog', dialog);

/**
 * 序列化对象
 * @memberof services.pack#
 * @example
 * var obj = {a:1, b:2};
 * param(obj); // a=1&b=2
 */

function param() {
  return $.param;
}

/**
 * 弹窗
 * @memberof services.pack#
 */

function dialog() {
  return $.dialog;
}

/**
 * 字符串格式化
 * @memberof services.pack#
 * @example
 * https://github.com/davidchambers/string-format
 */

function stringfmt(){
  return fmt;
}

/**
 * 操作cookies
 * @memberof services.pack#
 * @example
 * https://github.com/ScottHamper/Cookies#cookiessetkey-value--options
 */

function cookies(){
  return cookiesJS;
}

/**
 * 重定向
 * @name redirect
 * @memberof services.pack#
 * @function
 */

function redirect() {
  return function (url) {
    window.location.href = url;
  }
}

/**
 * 获取当前URL
 * @name currentUrl
 * @memberof services.pack#
 * @function
 */

function currentUrl($location) {
  return $location.absUrl().split('#')[0];
}

/**
 * 获取公共header
 * @name getCommonHeader
 * @memberof services.pack#
 * @function
 */

function getCommonHeader($rootScope){
  return function(){
    return {
      'm-cw': $rootScope.winWidth,
      'm-ch': $rootScope.winHeight
    };
  };
}