'use strict';

require('./index.styl');

module.exports = {
  url         : '/test',
  template    : __inline('./index.html'),
  data        : {
    pageName: '首页'
  },
  controllerAs: 'vm',
  controller  : Controller
};

// @ngInject
function Controller() {
  var vm;

  vm = this;

  init();

  function init() {
    vm.text = 'hello 首页';
  }
}
