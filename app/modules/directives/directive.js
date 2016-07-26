'use strict';

/** @namespace directive */

angular
  .module('ink')
  .directive('ikTipsCenter', ikTipsCenter)
  .directive('ikXscroll', ikXscroll)
  .directive('ikInputFocus', ikInputFocus);

/**
 * 扩大输入框聚焦
 * @name ikInputFocus
 * @memberof directive#
 */

function ikInputFocus() {
  return {
    link: function (scope, ele, attr) {
      var $ele;

      $ele = $(ele[0]);

      $ele.on('click', function () {
        $(this).find(attr.inputclass || 'input').focus();
      });

      scope.$on('$destroy', function () {
        $ele.off('click');
      });
    }
  }
}

/**
 * 弹出提示消息
 * @name ikTipsCenter
 * @memberof directive#
 * @example
 * &lt;a ng-click="showTipsCenter('收藏成功')">&lt;/a>
 * &lt;a ng-click="showTipsCenter('收藏成功', {timeout: 3000})">&lt;/a>
 * &lt;a ng-click="showTipsCenter('收藏成功', {timeout: 3000}, cb)">&lt;/a>
 */

function ikTipsCenter($rootScope, $timeout, CONST) {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="ik-tips-center ik-hide animated small" style="text-align: center"></div>',
    link: function (scope, ele) {
      var timerOut, $win;

      $win = $(window);

      function showTipsCenter(content, opts, cb) {

        if (_.isFunction(opts)) {
          cb = opts;
          opts = {};
        }

        var defOpts = {
          timeout: 1500
        };

        opts = _.extendOwn(defOpts, opts);

        ele.html(content);
        $timeout.cancel(timerOut);

        ele.removeClass('ik-hide').addClass('zoomIn').css({
          top: $win.height() / 2 - ele[0].offsetHeight / 2 + 'px',
          left: $win.width() / 2 - ele[0].offsetWidth / 2 + 'px'
        });

        timerOut = $timeout(function () {
          ele.addClass('ik-hide');
          cb && cb();
        }, opts.timeout);
      }

      $rootScope.showTips = showTipsCenter;

      scope.$on(CONST.RES_CODE_10000, function(e, desc){
        showTipsCenter(desc);
      });
    }
  }
}


/**
 * @name ikXscroll
 * @memberof components#
 * @example
 */

function ikXscroll() {

  return {
    restrict: 'A',
    link: link
  };

  function link(scope, ele) {
    new xScroll({
      el:ele[0]
    });
  }
}