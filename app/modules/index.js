'use strict';

document.addEventListener('touchstart', function () {}, false);

// common css

require('@spider/frozenui');
require('swiper/dist/css/swiper');
require('/styls/base/reset.styl');
require('/styls/component/animate.styl');
require('/styls/component/icons.styl');
require('/styls/base/base.styl');
require('/styls/font/iconfont.css');

// common js

require('@spider/zepto');
require('@spider/zepto/src/event');
require('@spider/zepto/src/ajax');
require('@spider/zepto/src/touch');
require('@spider/zepto/src/deferred');
require('@spider/zepto/src/callbacks');
require('@spider/xscroll');
// require('swiper');
require('@spider/frozenui/js/frozen');
require('fastclick')(document.body);
require('angular');
require('angular-filter');
require('angular-ui-router');
require('angular-cache');
require('angular-swiper');
require('angular-translate');
require('angular-translate/dist/angular-translate-loader-static-files/angular-translate-loader-static-files');
require('@spider/restangular');
require('ngstorage');

angular
  .module('ink', ['ksSwiper', 'ui.router', 'ngStorage', 'restangular', 'angular-cache', 'angular.filter', 'pascalprecht.translate'])
  .constant('INFO', require('./config/info'))
  .constant('ENV', require('./config/env')[window.H5_ENV || 'develop'])
  .constant('CONST', require('./config/constant'));

// modules

require('./services/pack');
require('./services/api');
require('./services/interceptor');
require('./services/router');
require('./services/services');
require('./services/cache');

require('./components/header');
require('./components/rotateDetect');
require('./components/notice');
require('./components/grid');
require('./components/select');
require('./components/chip');
require('./components/actionGroup');
require('./components/way');
require('./components/resultList');
require('./components/selectChip');
require('./components/countdown');

require('./directives/directive');

require('./filters/filter');

// 入口

require('./app');
