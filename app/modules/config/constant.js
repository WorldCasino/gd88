'use strict';

/** @namespace CONST */

module.exports = {

  /**
   * 版本号
   * @memberOf CONST#
   * @type {String}
   */

  VERSION: '1.0.0',

  /**
   * 请求超时 单位:秒
   * @default 30
   * @memberOf CONST#
   * @type {Number}
   */

  HTTP_TIME_OUT: 30,

  /**
   * cookies过期时间 单位:分钟
   * @default 60
   * @memberOf CONST#
   * @type {Number}
   */

  COOKIES_EXPIRES: 60,

  /**
   * 存储前缀
   * @default app-
   * @memberOf CONST#
   * @type {String}
   */

  STORAGE_PREFIX: 'gd88-',

  I18N: {
    prefix: './assets/modules/i18n/',
    suffix: '.json'
  },

  /**
   * 请求的响应 Code 大于 10000
   * @memberOf CONST#
   * @type {String}
   */

  RES_CODE_10000: 'response_code_gt_10000',

  /**
   * 响应状态
   * @memberOf CONST
   * @namespace RES_STATUS
   */

  RES_STATUS: {

    /**
     * 用户失效
     * @memberOf CONST.RES_STATUS#
     * @type {String}
     */

    401: 'response_status_401',

    /**
     * 请求太快
     * @memberOf CONST.RES_STATUS#
     * @type {String}
     */

    800: 'response_status_800'
  },

  /**
   * 正则
   * @memberOf CONST
   * @namespace REGEX
   */

  REGEX: {

    /**
     * 手机号
     * @memberOf CONST.REGEX#
     * @type {regEx}
     */

    PHONE: /^(0|86|17951)?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/,

    /**
     * 邮箱
     * @memberOf CONST.REGEX#
     * @type {regEx}
     */

    EMAIL: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
  }

};
