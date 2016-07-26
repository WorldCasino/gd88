'use strict';

/** @namespace components */

require('./index.styl');

angular
  .module('ink')
  .directive('ikGrid', ikGrid);

/**
 * @name ikGrid
 * @memberof components#
 */

function ikGrid() {

  return {
    template: __inline('./index.html'),
    replace: true,
    restrict: 'E',
    link: link,
    scope: { }
  };

  function link() {

  }
}
