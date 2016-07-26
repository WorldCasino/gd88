'use strict';

/** @namespace components */

require('./index.styl');

angular
  .module('ink')
  .directive('ikHeader', ikHeader);

/**
 * 全局header指令
 * @name ikHeader
 * @memberof components#
 * @example
 * &lt;ik-header hide-menu="true"
 *               show-time="true">&lt;/ik-header>
 */

function ikHeader($q, $translate, $localStorage) {

  return {
    template: __inline('./index.html'),
    replace: true,
    restrict: 'E',
    link: link,
    scope: {
      'leftAction': '&',
      'hideMenu': '@', // 隐藏菜单
      'showTime': '@' // 显示时间
    }
  };

  function link(scope) {
    var tmp = scope.leftAction;

    scope.languageType = $localStorage.i18n || 'zh'; // 语言类型
    scope.musicType = 1; // 音乐类型
    scope.headerStyl = {};
    scope.clickShowDialog = clickShowDialog;
    scope.changeLanguage = changeLanguage;

    if(scope.showTime){
      scope.headerStyl = {
        'background': 'transparent',
        'color': '#fff'
      };
    }

    addOperateEvent();

    scope.leftAction = function () {
      $q.when(tmp()).then(function () {
        history.back();
      });
    };

    // 防止冒泡关闭弹出层
    $('#comp-setDialog .dialog-box').on('click', function (e) {
      e.stopPropagation();
    });

    function clickShowDialog(type) {
      scope.dialogType = type;
    }

    function changeLanguage(type){
      scope.languageType = type;
      $translate.use(type);
      $localStorage.i18n = type;
    }
  }


  // 操作事件
  function addOperateEvent() {
    var startX, moveX, minX, maxX, cx, eleObj;

    eleObj = $('.operate-size');

    init();


    eleObj.on('touchstart', function (e) {

      minX = $(this).parent('.operate-strip').offset().left;
      cx = $(this).offset().left - minX;
      maxX = minX + 260;

      startX = e.targetTouches[0].pageX || 0;

    }).on('touchmove', function (e) {
      var leftNum;

      moveX = e.targetTouches[0].pageX || 0;
      leftNum = cx + (moveX - startX);

      if (leftNum <= 0) {
        leftNum = 0;
      } else if (leftNum >= 236) {
        leftNum = 236;
      }

      $(this).css({left: leftNum + 'px'}).prev().css({width: leftNum + 'px'});
    });

    function init() {

      for (var i = 0; i < 2; i++) {
        var l, pl;

        pl = eleObj.eq(i).parent('.operate-strip').offset().left;
        l = eleObj.eq(i).offset().left - pl;

        eleObj.eq(i).prev().css({width: l + 'px'});
      }
    }

  }
}
