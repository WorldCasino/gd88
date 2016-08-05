'use strict';

/** @namespace components */

require('./index.styl');

angular
  .module('ink')
  .directive('ikCountdown', ikCountdown);

/**
 * @name ikCountdown
 * @memberof components#
 */

function ikCountdown() {

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
