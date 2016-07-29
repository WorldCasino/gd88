'use strict';

/** @namespace services.api */

angular
  .module('ink')
  .factory('MZBaseAPI', MZBaseAPI)
  .factory('SelecTbInfoAPI', SelecTbInfoAPI)
  .factory('LoginAPI', LoginAPI);


/**
 * 登录
 * @param LoginAPI
 * @returns {*}
 * @constructor
 */
function LoginAPI(MZBaseAPI) {
  return MZBaseAPI.service('login.jsp');
}

/**
 * 首页
 * @param SelecTbInfoAPI
 * @returns {*}
 * @constructor
 */
function SelecTbInfoAPI(MZBaseAPI) {
  return MZBaseAPI.service('select_tb_info.jsp');
}
/**
 * 秒赚基础API
 * @name MZBaseAPI
 * @memberof services.api#
 */

function MZBaseAPI(Restangular, getCommonHeader, ENV) {

  return Restangular.withConfig(function (restangularConfig) {
    restangularConfig.setBaseUrl(ENV.mzAPI);

    /*if(ENV.enableCookie){

      // 增加对cookie传递的支持

      restangularConfig.setDefaultHttpFields({ withCredentials: true });

      restangularConfig.setDefaultHeaders(getCommonHeader());
    }*/
  });
}
