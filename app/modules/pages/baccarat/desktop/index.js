'use strict';

require('./index.styl');

module.exports = {
  url: '/desktop',
  template: __inline('./index.html'),
  data: {
    pageName: '百家乐选桌'
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

    _.extend(bodyStyle, {
      'backgroundColor': '#5e5e5e',
      '-webkit-box-shadow': 'inset 0 0 100px #333333',
      '-moz-box-shadow': 'inset 0 0 100px #333333',
      'box-shadow': 'inset 0 0 100px #333333'
    });
    // bodyStyle.backgroundColor = '#5e5e5e';
    $rootScope.bodyStyle = bodyStyle;
  }
}
