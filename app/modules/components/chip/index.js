'use strict';

/** @namespace components */

require('./index.styl');

angular
  .module('ink')
  .directive('ikChip', ikChip);

/**
 * @name ikChip
 * @memberof components#
 * @example
 */

function ikChip() {

  return {
    template: __inline('./index.html'),
    replace: true,
    restrict: 'E',
    scope: {},
    link: link
  };

  function link(scope, ele) {

    var $ele = $(ele[0]);
    var $ul = $('ul', $ele);
    var index = 0; // 初始化下标
    var data = scope.data = [
      {number: '1', pic: __uri('./imgs/chip1.png')},
      {number: '10', pic: __uri('./imgs/chip10.png')},
      {number: '50', pic: __uri('./imgs/chip50.png')},
      {number: '100', pic: __uri('./imgs/chip100.png')},
      {number: '500', pic: __uri('./imgs/chip500.png')},
      {number: '1000', pic: __uri('./imgs/chip1k.png')},
      {number: '5000', pic: __uri('./imgs/chip5k.png')},
      {number: '10K', pic: __uri('./imgs/chip10k.png')},
      {number: '50K', pic: __uri('./imgs/chip50k.png')},
      {number: '100K', pic: __uri('./imgs/chip100k.png')},
      {number: '500K', pic: __uri('./imgs/chip500k.png')},
      {number: 'MAX', pic: __uri('./imgs/chip_max.png')}
    ];
    var dataLen = data.length - 1;

    scope.select = select;
    scope.up = up;
    scope.down = down;

    // 选中事件

    function select(i) {

      index = i;

      $('li', $ele).removeClass('active');
      $('li', $ele).eq(i).addClass('active');

      // 通知选择
      scope.$emit('ikChip:select', data[i]);
    }

    // 向上选择

    function up() {

      if(index <= 0){
        return false;
      }

      index -= 1;

      select(index);
      scroll(index);
    }

    // 向下选择

    function down() {

      if(index >= dataLen){
        return false;
      }

      index += 1;

      select(index);
      scroll(index);
    }

    // 滚动

    function scroll(num){
      $ul.scrollTop(num * 50);
    }
  }
}
