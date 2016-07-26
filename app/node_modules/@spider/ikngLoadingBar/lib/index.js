'use strict';

document.addEventListener('touchstart', function () {}, false);

require('./index.styl');
require('angular');
require('angular-animate');
require('angular-loading-bar');
require('angular-loading-bar/build/loading-bar.css');

angular
.module('ik.ngLoadingBar', ['angular-loading-bar', 'ngAnimate'])
.provider('ikngLoadingBar', function(){

  // 默认显示关闭按钮的时间 ms
  // ikngLoadingBarProvider.closeShowTime = 5000;

  this.closeShowTime = 5000;

  this.$get = function(){
    return {
      closeShowTime: this.closeShowTime
    };
  }.bind(this);

})
.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider){
  cfpLoadingBarProvider.loadingBarTemplate = '<div></div>';
  cfpLoadingBarProvider.spinnerTemplate = '<div id="ikngLoading"><div class="shade"></div><div class="close"></div><i class="loading"></i></div>';
}])
.run(['$rootScope', 'cfpLoadingBar', 'ikngLoadingBar', '$timeout',
  function($rootScope, cfpLoadingBar, ikngLoadingBar, $timeout){

  var closeTimer;
  
  $rootScope.$on('cfpLoadingBar:started', function(){

    // 指定时间显示关闭按钮

    closeTimer = $timeout(function(){

      var closeEle = angular.element(document.querySelector('#ikngLoading .close'));

      closeEle.css({'display': 'block'});

      closeEle.on('click', function(){
        closeEle.unbind('click');
        cfpLoadingBar.complete();
      }); 

    }, ikngLoadingBar.closeShowTime);
  });

  $rootScope.$on('cfpLoadingBar:completed', function(){

    var closeEle = angular.element(document.querySelector('#ikngLoading .close'));

    closeEle.css({'display': 'none'});

    $timeout.cancel(closeTimer);
  });

}]);