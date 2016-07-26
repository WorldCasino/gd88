ikngLoadingBar
---
AngularJS LoadingBar 加载状态服务
支持手动加载和API被动加载
支持手动关闭加载

dependencies
---
- [angular-loading-bar](https://github.com/chieffancypants/angular-loading-bar) 用法参考文档

快速开始
===
```
// 安装到本地, 私有仓库安装
$ cnpm i --save @spider/ikngLoadingBar

// 引入模块
require('@spider/ikngLoadingBar');


angular

// 添加依赖模块
.module('app', ['ik.ngLoadingBar'])

// 配置
.config(['ikngLoadingBarProvider', 'cfpLoadingBarProvider', function(ikngLoadingBarProvider, cfpLoadingBarProvider){
  
  // 默认加载loading的时间 ms

  cfpLoadingBarProvider.latencyThreshold = 500;

  // 显示关闭按钮的时间 ms
  // 具体配置参见 Configuration 

  ikngLoadingBarProvider.closeShowTime = 5000;

}])

// 控制器
.controller('IndexCtrl', ['cfpLoadingBar', function(cfpLoadingBar){
  
  // 手动加载

  cfpLoadingBar.start();
  
  // 手动关闭

  cfpLoadingBar.complete();
}]);

```

Configuration
=== 
- `closeShowTime` 显示关闭按钮的时间 ms 默认 5000

test
===
如果你想查看单元测试结果, 那么你可以在根目录输入以下命令
测试脚本在test文件夹, 请根据自己的模块编写测试用例

参考 [jasmine](http://jasmine.github.io/2.4/introduction.html)

ChangeLog
===
0.0.2
 - 修复关闭按钮持续存在的bug