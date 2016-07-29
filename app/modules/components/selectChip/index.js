'use strict';

/** @namespace components */

require('./index.styl');

angular
  .module('ink')
  .directive('ikSelectChip', ikSelectChip);

/**
 * @name ikSelectChip
 * @memberof components#
 * @example
 */

function ikSelectChip() {

  return {
    template: __inline('./index.html'),
    replace: true,
    restrict: 'E',
    scope: {
      selectNumber: '='
    },
    link: link
  };

  function link(scope, ele) {

    var selectedChip = [];
    scope.addChip = addChip;


    function addChip() {

      selectedChip.push({value: scope.selectNumber, className: 'ik-icon-chip' + scope.selectNumber});

      scope.selectedChip = selectedChip;

      console.log(scope.selectedChip);
    }
  }
}
