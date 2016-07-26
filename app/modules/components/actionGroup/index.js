'use strict';

/** @namespace components */

require('./index.styl');

angular
  .module('ink')
  .directive('ikActionGroup', ikActionGroup);

/**
 * @name ikActionGroup
 * @memberof components#
 * @example
 * 隐藏重复
 * <ik-action-group hide="{'replay': true}"></ik-action-group>
 */

function ikActionGroup() {

  return {
    template: __inline('./index.html'),
    replace: true,
    restrict: 'E',
    scope: {
      'hide': '=' // replay hook fork pools 4个属性
    },
    link: link
  };

  function link(scope, ele) {

    var $ele = $(ele[0]);
    var $pools = $('.pools', $ele);

    scope.select = select;
    scope.selectPools = selectPools;

    function select(name){
      scope.$emit('ikActionGroup:select', name);
    }

    function selectPools(name){
      select(name);
      $pools.toggle();
    }
  }
}
