'use strict';

/** @namespace components */

require('./index.styl');

angular
  .module('ink')
  .directive('ikSelect', ikSelect);

/**
 * @name ikSelect
 * @memberof components#
 * @example
 */

function ikSelect() {

  return {
    template: __inline('./index.html'),
    replace: true,
    restrict: 'E',
    scope: {
      title: '@', // 标题
      source: '=' // 数据源
    },
    link: link
  };

  function link(scope, ele) {

    var $ele = $(ele[0]);

    scope.$on('ikSelect:open', open);
    $ele.on('click', close);
    scope.select = select;

    function open(){
      $ele.show();
    }

    function close(){
      $ele.hide();
    }

    // 通知选择

    function select(item){
      scope.$emit('ikSelect:select', item);
    }
  }
}
