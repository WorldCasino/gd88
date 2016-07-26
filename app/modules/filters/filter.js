'use strict';

/**
 * @namespace filter
 */

angular
  .module('ink')
  .filter('numberRound', numberRound)
  .filter('arrayGroup', arrayGroup)
  .filter('trustAsHtmlBR', trustAsHtmlBR);

/**
 * 将 \n 转换为 br标签 对应使用 ng-bind-html 绑定内容
 * @name trustAsHtmlBR
 * @memberof filter#
 */

function trustAsHtmlBR($sce){
  return function (value) {
    value = value || '';
    return $sce.trustAsHtml(value.replace(/\n/g, '<br/>'));
  }
}

/**
 * 不四舍五入保留小数
 * @name numberRound
 * @memberof filter#
 */

function numberRound() {
  return function (value, number) {
    value = Number(value);

    if (!value || typeof value != 'number') {
      return '0.00';
    }

    value = (value + '').split('.');

    return value[0] + '.' + (value.length > 1 ? value[1] + '000000000' : '000000000').substr(0, number);
  }
}

/**
 * 数组分组
 * @name arrayGroup
 * @memberof filter#
 * @param  {Array} arr 数组
 * @param  {Number} len 分组之后，每个数组长度
 * @param  {Boolean} fill 是否填充空余位置
 */

function arrayGroup() {
  return function (arr, len, fill) {
    var newArr, tempArr, tempArrLen;

    newArr = [];
    fill = fill || false;
    arr = arr || [];

    for (var i = 0, arrLen = arr.length; i < arrLen; i += len) {
      tempArr = arr.slice(i, i + len);
      tempArrLen = tempArr.length;

      if (tempArrLen != len && fill) {
        for (var k = 0; k < len - tempArrLen; k++) {
          tempArr.push({});
        }
      }

      newArr.push(tempArr);
    }

    return newArr;
  };
}