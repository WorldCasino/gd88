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
function Controller(LoginAPI, $rootScope, setBackground) {

  var vm, bodyStyle;

  vm = this;
  bodyStyle = setBackground(true) || {};

  init();

  console.log();

  function init() {
    bodyStyle.backgroundColor = '#f2f2f2';
    $rootScope.bodyStyle = bodyStyle;

    LoginAPI.post(null, {txtLang: 0, txtAcctid: 'DLDLDLYY21', txtPwd: 111111, OsType: 'H5', OsVersion: 1.00});
  }
}
