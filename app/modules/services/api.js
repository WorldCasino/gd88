'use strict';

/** @namespace services.api */

angular
  .module('ink')
  .factory('MZBaseAPI', MZBaseAPI);


/**
 * 秒赚基础API
 * @name MZBaseAPI
 * @memberof services.api#
 */

function MZBaseAPI(Restangular, getCommonHeader, ENV) {

  return Restangular.withConfig(function (restangularConfig) {
    restangularConfig.setBaseUrl(ENV.mzAPI);

    if(ENV.enableCookie){

      // 增加对cookie传递的支持

      restangularConfig.setDefaultHttpFields({ withCredentials: true });

      restangularConfig.setDefaultHeaders(getCommonHeader());
    }
  });
}
