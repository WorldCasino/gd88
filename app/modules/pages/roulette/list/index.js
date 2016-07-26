'use strict';

require('./index.styl');

module.exports = {
  url         : '/list',
  template    : __inline('./index.html'),
  data        : {
    pageName: '轮盘列表'
  },
  controllerAs: 'vm',
  controller  : Controller
};

// @ngInject
function Controller($scope) {
  var vm;

  vm = this;

  init();

  function init() {
  }

}
