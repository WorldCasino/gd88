'use strict';

/** @namespace components */

require('./index.styl');

angular
  .module('ink')
  .directive('ikNotice', ikNotice);

/**
 * 全局header指令
 * @name ikNotice
 * @memberof components#
 */

function ikNotice() {

  return {
    template: __inline('./index.html'),
    replace : true,
    restrict: 'E',
    link    : link
  };

  function link(scope, ele, attr) {

  }
}
