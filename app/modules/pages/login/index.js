'use strict';

require('./index.styl');

module.exports = {
  url: '/login',
  template: __inline('./index.html'),
  data: {
    pageName: '登录',
    enableVertical: true // 允许竖屏
  },
  controllerAs: 'vm',
  controller: Controller
};

// @ngInject
function Controller($rootScope, setBackground) {

  var vm, bodyStyle;

  vm = this;
  bodyStyle = setBackground(true) || {};

  init();

  function init() {
    bodyStyle.backgroundColor = '#f2f2f2';
    $rootScope.bodyStyle = bodyStyle;
  }
}
