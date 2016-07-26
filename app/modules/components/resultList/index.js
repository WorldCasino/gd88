'use strict';

/** @namespace components */

require('./index.styl');

angular
  .module('ink')
  .directive('ikResultList', ikResultList);

/**
 * 结果列表组件
 * @name ikResultList
 * @memberof components#
 * @example
 */

function ikResultList() {

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
    var boxEle, typeList;

    boxEle = $('#comp-resultList');

    scope.typeList = ['type-baccarat', 'type-dice', 'type-roulette', 'type-baccarat type-simple', 'type-dice type-simple', 'type-roulette type-simple'];
  }
}
