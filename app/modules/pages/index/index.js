'use strict';

require('./index.styl');

module.exports = {
  url: '/index',
  template: __inline('./index.html'),
  data: {
    pageName: '首页'
  },
  controllerAs: 'vm',
  controller: Controller
};

// @ngInject
function Controller(SelecTbInfoAPI) {
  var vm;

  vm = this;

  init();

  

  function init() {

    // SelecTbInfoAPI.get({GameType: 11, Tbid: 0, Usid: 'DLDLDLYY21'}).then(function (data) {
      
    // });
  }
}
