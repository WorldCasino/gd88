require('/lib/index');
require('angular-ui-router');
require('restangular');

angular
.module('zzz', ['ui.router', 'ik.ngLoadingBar', 'restangular'])
.config(function($urlRouterProvider, $stateProvider, cfpLoadingBarProvider, ikngLoadingBarProvider, RestangularProvider){
  
  $stateProvider.state('index', {
    url: '/index',
    controller: 'MainCtrl',
    template: '<div ng-click="test()">请求接口</div>',
    data: {
      test: true
    }
  });

  $urlRouterProvider.otherwise('/index');

  // 默认加载loading的时间

  cfpLoadingBarProvider.latencyThreshold = 500;

  // 显示关闭按钮的时间

  ikngLoadingBarProvider.closeShowTime = 5000;

  RestangularProvider.setBaseUrl('http://172.16.0.201:7000/m/Event/OpenHaveSurprise/');
  
  // 请求超时

  RestangularProvider.setDefaultHttpFields({ timeout: 8000 });

})
.controller('MainCtrl', function ($state, cfpLoadingBar, Restangular, $scope) {

    cfpLoadingBar.start();
    
    $scope.test = function(){
      for(var i = 0; i < 50;i++){
        Restangular.one('GetComments').get().then(function(d){
          console.log(d);
        });
      }
    }

  }
);