'use strict';

require('./index.styl');

module.exports = {
  url         : '/index',
  template    : __inline('./index.html'),
  data        : {
    pageName: '龙虎游戏'
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
