'use strict';

/** @namespace components */

require('./index.styl');

angular
  .module('ink')
  .directive('ikWay', ikWay);

/**
 * @name ikWay
 * @memberof components#
 * @example
 */

function ikWay($timeout, $translate) {

  return {
    template: __inline('./index.html'),
    replace: true,
    restrict: 'E',
    scope: {
      type: '@'
    },
    link: link
  };

  function link(scope, ele) {

    var $ele = $(ele[0]);
    var $info = $('.info', $ele);
    var $way = $('.way', $ele);
    var $wayContent = $('.content', $way);
    var flag = true;
    var timer;

    
    scope.toggle = toggle;
    scope.pic = {
      zh: __uri('./imgs/handler_road_zh.png'),
      en: __uri('./imgs/handle_road_en.png')
    }[$translate.proposedLanguage() || 'zh'];

    function toggle() {

      if (flag) {
        $info.css('opacity', '0');
        $wayContent.css('opacity', '1');
        $way.css('-webkit-transform', 'translate3d(100%, 0, 0)');
      } else {
        $way.css({
          '-webkit-transform': 'translate3d(100px, 0, 0)'
        });

        $timeout.cancel(timer);

        timer = $timeout(function () {
          $info.css({'opacity': '1'});
          $wayContent.css({
            'opacity': '0'
          });
        }, 1000);
      }

      flag = !flag;
    }
  }
}
