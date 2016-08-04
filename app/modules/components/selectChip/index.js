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
    var selectNum, dataModel;

    selectNum = 0;
    scope.addChip = addChip;
    dataModel = [
      {v: 500000, n: '500K'},
      {v: 100000, n: '100K'},
      {v: 50000, n: '50K'},
      {v: 10000, n: '10K'},
      {v: 5000, n: '5000'},
      {v: 1000, n: '1000'},
      {v: 500, n: '500'},
      {v: 100, n: '100'},
      {v: 50, n: '50'},
      {v: 10, n: '10'},
      {v: 1, n: '1'}
    ];


    function addChip() {
      var addNum, cv, selectedChip;

      selectedChip = [];
      addNum = scope.selectNumber;

      if (addNum.indexOf('K') > -1) {
        selectNum += parseInt(addNum) * 1000;
      } else {
        selectNum += parseInt(addNum);
      }

      cv = selectNum;

      _.map(dataModel, function (val) {
        var ratio = parseInt(cv / val.v);
        if (ratio >= 1) {
          for (var i = 0; i < ratio; i++) {
            selectedChip.push({
              value: val.v,
              className: 'ik-icon-chip' + val.n
            });
          }
          cv = cv - (ratio * val.v);
        }
      });

      scope.selectedChip = selectedChip
      scope.selectNum = selectNum;

    }

  }
}
