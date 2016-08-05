'use strict';

require('./index.styl');

module.exports = {
  url         : '/index',
  template    : __inline('./index.html'),
  data        : {
    pageName: '百家乐'
  },
  controllerAs: 'vm',
  controller  : Controller
};

// @ngInject
function Controller($scope, $state) {
  var vm;

  vm = this;

  init();

  function init() {
    
  }

}
