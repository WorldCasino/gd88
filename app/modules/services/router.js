'use strict';

/**
 * 项目路由管理服务
 * @name router
 * @memberof services#
 */

var state;

angular
  .module('ink')
  .provider('inkRouter', inkRouter);

state = {

  // 首页 => /index
  'index': require('../pages/index'),

  'test': require('../pages/test'),

  // 登录 => /login
  'login': require('../pages/login'),

  'baccarat': {url: '/baccarat', abstract: true, template: '<ui-view/>'},

  // 百家乐-选桌 => /baccarat/desktop
  'baccarat.desktop': require('../pages/baccarat/desktop'),

  // 百家乐-列表 => /baccarat/list
  'baccarat.list': require('../pages/baccarat/list'),

  // 轮盘
  'roulette': {url: '/roulette', abstract: true, template: '<ui-view/>'},

  // 轮盘-游戏 => /roulette/index
  'roulette.index': require('../pages/roulette/index'),

  // 轮盘-列表 => /roulette/list
  'roulette.list': require('../pages/roulette/list'),

  // 骰宝
  'dice': {url: '/dice', abstract: true, template: '<ui-view/>'},

  // 骰宝-游戏 => /dice/index
  'dice.index': require('../pages/dice/index'),

  // 骰宝-列表 => /dice/list
  'dice.list': require('../pages/dice/list'),

  // 龙虎
  'poker': {url: '/poker', abstract: true, template: '<ui-view/>'},

  // 龙虎-游戏 => /poker/index
  'poker.index': require('../pages/poker/index'),

  // 龙虎-列表 => /poker/list
  'poker.list': require('../pages/poker/list')
};

function inkRouter($stateProvider, $urlRouterProvider, $locationProvider) {

  this.configuration = function () {

    _.mapObject(state, function (val, key) {
      $stateProvider.state(key, val);
    });

    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('index');
  };

  this.$get = angular.noop;

}
