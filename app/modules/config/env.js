'use strict';

/** @namespace ENV */

module.exports = {
  develop: {

    /**
     * debug模式
     * @type {Boolean}
     * @memberof ENV
     */

    debug: true,

    /**
     * 秒赚API地址
     * @type {String}
     * @memberof ENV
     */

    mzAPI: 'http://192.168.0.201:8421/api/',

    /**
     * 前端项目地址
     * @type {String}
     * @memberof ENV
     */

    h5: 'http://h5.test.inkey.com/',

    /**
     * 微信支付地址
     * @type {String}
     * @memberof ENV
     */

    WXPayment: 'http://weixin.test.inkey.com/weixinPay/index.html',

    /**
     * 授权地址
     * @type {String}
     * @memberof ENV
     */

    LoginUrl: 'http://172.16.0.201:7010/user/getCode?port=8421&uname=13990004001&pwd=123456&state='
  },
  test: {
    debug: false,
    enableCookie: false,
    mzAPI: 'http://192.168.0.201:8421/api/',
    h5: 'http://h5.test.inkey.com/',
    WXPayment: 'http://weixin.test.inkey.com/weixinPay/index.html',
    LoginUrl: 'http://weixin.test.inkey.com/WXCore/Entry?redirect_uri='
  },
  prepare: {
    debug: false,
    enableCookie: true,
    mzAPI: 'http://mzapi.ready.inkey.com/api/',
    h5: 'http://h5.ready.inkey.com/',
    WXPayment: 'http://mzmp.ready.inkey.com/weixinPay/index.html',
    LoginUrl: 'http://mzmp.ready.inkey.com/WXCore/Entry?redirect_uri='
  },
  production: {
    debug: false,
    enableCookie: true,
    mzAPI: 'https://mzapi.inkey.com/api/',
    h5: 'https://h5.inkey.com/',
    WXPayment: 'https://h5.inkey.com/platforms/weixinPay/index.html',
    LoginUrl: 'https://mzmp.inkey.com/WXCore/Entry?redirect_uri='
  }
};
