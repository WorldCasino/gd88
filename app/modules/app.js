'use strict';

var userAgent = navigator.userAgent.toLowerCase();

angular
  .module('ink')
  .config(config)
  .run(run);

function config(CONST, inkRouterProvider, $httpProvider, RestangularProvider,
                $localStorageProvider, $sessionStorageProvider, $translateProvider) {

  // 配置路由初始化

  inkRouterProvider.configuration();

  RestangularProvider.setDefaultHttpFields({
    timeout: CONST.HTTP_TIME_OUT * 1000
  });

  $translateProvider.useStaticFilesLoader({
    prefix: CONST.I18N.prefix,
    suffix: CONST.I18N.suffix
  });

  var language = window.localStorage.getItem(CONST.STORAGE_PREFIX + 'i18n') || 'zh';

  // 用正则匹配 防止值出现以下情况 "zh" or zh 多了双引号
  $translateProvider.preferredLanguage(language.match('zh|en')[0]);

  // 设置存储前缀

  $localStorageProvider.setKeyPrefix(CONST.STORAGE_PREFIX);

  $sessionStorageProvider.setKeyPrefix(CONST.STORAGE_PREFIX);

  // 公共拦截器

  $httpProvider.interceptors.push('commonInterceptor');

  // 参数拦截器

  $httpProvider.interceptors.push('basicParamsInterceptor');

  // 添加请求锁拦截器

  $httpProvider.interceptors.push('lockQuestInterceptor');

  // 日志拦截器

  $httpProvider.interceptors.push('logInterceptor');
}

function run($rootScope, $state, $stateParams, ENV, INFO, CONST, setBackground) {

  /** @namespace $rootScope */

  /**
   * app基本信息
   * @type {Object}
   */

  $rootScope.INFO = INFO;

  /**
   * 环境变量
   * @type {Object}
   */

  $rootScope.ENV = ENV;

  /**
   * 常量
   * @type {Object}
   */

  $rootScope.CONST = CONST;

  /**
   * 想改变body样式, 可设置该对象
   * @type {Object}
   */

  $rootScope.bodyStyle = {};

  /**
   * 路由状态
   */

  $rootScope.$state = $state;

  /**
   * 路由参数
   * @type {Object}
   */

  $rootScope.$stateParams = $stateParams;

  /**
   * 屏幕宽度
   * @type {Number}
   */

  $rootScope.winWidth = $(window).width();

  /**
   * 屏幕高度
   * @type {Number}
   */

  $rootScope.winHeight = $(window).height();

  /**
   * 判断是否是IOS
   * @type {Boolean}
   */

  $rootScope.isIOS = !!userAgent.match(/\(i[^;]+;( u;)? cpu.+mac os x/);

  /**
   * 判断是否是Android
   * @type {Boolean}
   */

  $rootScope.isAndroid = userAgent.indexOf('android') > -1 || userAgent.indexOf('linux') > -1;

  /**
   * 判断是否微信
   * @type {Boolean}
   */

  $rootScope.isWeixin = userAgent.indexOf('micromessenger') > -1;

  /**
   * 计算高度
   * @param ratio  高度/宽度的比值
   * @param noPx   不追加px
   * @returns {number}
   */
  $rootScope.countHeight = function (ratio, noPx) {
    var w = 0;

    if ($rootScope.winWidth > $rootScope.winHeight) {
      w = $rootScope.winHeight > 720 ? 720 : $rootScope.winHeight;
    } else {
      w = $rootScope.winWidth > 720 ? 720 : $rootScope.winWidth;
    }
    
    return w * ratio + (noPx ? 0 : 'px');
  };

  $rootScope.$on('$stateChangeSuccess', stateChangeSuccess);
  $rootScope.$on('$stateChangeStart', stateChangeStart);
  $rootScope.$on('$locationChangeSuccess', locationChangeSuccess);

  function locationChangeSuccess() {
  }

  function stateChangeStart() {

    // 页面切换前自动将body样式重置

    $rootScope.bodyStyle = setBackground();

    // 跳转页面前关闭 dialog

    $('.ui-dialog').remove();

  }

  function stateChangeSuccess() {
  }
}

