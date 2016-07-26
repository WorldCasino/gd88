'use strict';

/** @namespace components */

require('./index.styl');

angular
  .module('ink')
  .directive('ikRotateDetect', ikRotateDetect);

/**
 * 屏幕旋转检测指令
 * @name ikRotateDetect
 * @memberof components#
 * @example
 */

function ikRotateDetect($rootScope, $timeout) {

  return {
    template: __inline('./index.html'),
    replace: true,
    restrict: 'E',
    compile: compile
  };

  function compile(ele) {

    var $ele = $(ele[0]);

    onOrientationChange();

    window.onorientationchange = onOrientationChange;

    function onOrientationChange(){

      var $body = $('.ui-view');
      var orientation = window.orientation;

      var timer = $timeout(function(){

        $timeout.cancel(timer);

        var stateData = $rootScope.$state.current.data || {};
        var enableVertical = stateData.enableVertical || false;

        if($rootScope.ENV.debug || enableVertical){ // debug 隐藏
          return false;
        }

        if (!orientation || orientation === 0) { // 竖屏

          $ele.show();
          $body.hide();

        } else { // 横屏

          $ele.hide();
          $body.show();

        }
      }, 0);

    }
  }
}
