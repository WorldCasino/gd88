'use strict';

require('./index.styl');

module.exports = {
  url         : '/list',
  template    : __inline('./index.html'),
  data        : {
    pageName: '骰宝列表'
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
    vm.openSelect = openSelect;

    $scope.$on('ikSelect:select', onSelect);
  }

  function openSelect(){
    $scope.$broadcast('ikSelect:open');
  }

  function onSelect(e, item){
    console.log(item);
    $state.go('dice.index');
  }
}
