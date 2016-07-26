// JS代码验证

var jshintConfig = {
  i18n: 'zh-CN',

  quotmark: 'single', // 单引号
  immed   : true, // (function(){})(); => (function(){}());
  undef   : true, // 禁止使用不在全局变量列表中的未定义的变量
  unused  : true, // 禁止定义变量却不使用

  bitwise  : true, // 禁用位运算符(如^，|，&)
  camelcase: 'camelCase', // 使用驼峰命名(camelCase)或全大写下划线命名(UPPER_CASE)
  curly    : true, // if和while等语句中使用{}来明确代码块
  noempty  : true, // 禁止出现空的代码块
  trailing : true, // 禁止行尾空格
  latedef  : false, // 变量定义前禁止使用
  evil     : true, // 允许使用eval

  validthis: true, // 允许严格模式下在非构造函数中使用this, 当为false, 添加注释以绕过验证 /* jshint validthis: true */
  loopfunc : false, // 允许循环中定义函数
  expr     : true, // 允许应该出现赋值或函数调用的地方使用表达式
  asi      : true, // 省略分号
  eqnull   : true, // 允许==null
  eqeqeq   : false, // 使用===和!==替代==和!=

  sub: true,

  // 下面是全局对象定义
  browser   : true,
  devel     : true,
  browserify: true,
  jquery    : true,
  globals   : {
    Inkey   : true,
    Swiper   : true,
    angular  : true,
    _        : true,
    xScroll  : true,
    wx       : true,
    TDAPP    : true,
    FastClick: true,
    __uri    : true,
    __inline : true,
    deny     : true // 首页闪屏广告定义的方法, 该方法用于在闪屏结束后移除监听
  }
};

/*************************配置*****************************/
// 项目名
// hd => 活动 platforms => 平台 static => 静态项目

var app = '/gd';

fis
  .set('assets', '/assets') // 静态目录
  .set('live', '../live')  // 调试目录
  .set('dist', '../../../../../../../release' + app) // 发布目录
  .set('baseURL', app) // 发布目录
  .hook('commonjs', {
    extList: ['.js', '.jsx', '.es', '.ts', '.tsx']
  })
  .unhook('components')
  .hook('node_modules');

/*************************目录规范*****************************/

fis
  .match("**/*", {
    release: '${assets}/$&'
  })
  .match('demo.{css,html}', {
    release: false
  })
  .match(/^\/node_modules\/(.*)$/i, { // 将node_modules发布到_nm_文件夹, 因为node_modules被SVN过滤掉了
    release: '${assets}/_nm_/$1'
  })
  .match('**.js', {
    isMod  : true,
    preprocessor: [
      fis.plugin('annotate'),
      fis.plugin('js-require-css'),
      fis.plugin('js-require-file', {
        useEmbedWhenSizeLessThan: 10 * 1024 // 小于10k用base64
      })
    ]
  })
  .match('modules/**.js', {
    // 开启代码验证
    lint: fis.plugin('jshint', jshintConfig)
  })
  .match('{mod,underscore}.js', {
    isMod: false,
    parser: null,
    // 改变打包优先级
    packOrder: -99
  })
  // page下面的页面发布时去掉page文件夹
  .match(/^\/page\/(.*)$/i, {
    useCache: false,
    release : '$1'
  })
  // styl的import文件无需发布
  .match(/^\/styls\/import\/(.*)\.styl/i, {
    release: false
  })
  .match('**.styl', {
    // 编译之后后缀
    rExt  : '.css',
    // 开启编译
    parser: fis.plugin('stylus')
  })
  .match('*.png', {
    // 压缩图片
    optimizer: fis.plugin('png-compressor', {
      type: 'pngquant'
    })
  })
  .match('::package', {
    spriter     : fis.plugin('csssprites', {
      margin: 10, // 图之间的边距
      layout: 'matrix' // 使用矩阵排列方式，默认为线性`linear`
    }),
    postpackager: fis.plugin('loader')
  })
  .match('**', {
    deploy: fis.plugin('local-deliver', {
      to: fis.get('live')
    })
  });

/**********************生产环境*****************/

fis
  .media('pro')
  .match('/{node_modules,styls}/**.{styl,css}', {
    packTo: 'css/lib.css'
  })
  .match('/modules/**.{styl,css}', {
    packTo: 'css/app.css'
  })
  .match('/node_modules/**.js', {
    packTo: 'js/lib.js'
  })
  .match('/modules/**.js', {
    packTo: 'js/app.js'
  })
  .match('**.css', {
    // 压缩CSS
    optimizer: fis.plugin('clean-css'),
    // 开启图片合并
    useSprite: true
  })
  .match('::package', {
    packager:  fis.plugin('map', {
      useTrack : false
    })
  })
  // 添加hash {...,css} 逗号之间不能有空格
  .match('**.{css,js,png,jpg,gif,eot,svg,ttf,woff}', {
    useHash: true
  })
  .match('**', {
    domain: fis.get('baseURL'),
    deploy: [
      fis.plugin('replace', {
        from: '<base href="/"',
        to  : '<base href="' + fis.get('baseURL') + '/"'
      }),
      // 将打包好的zip, 输出到dist目录
      fis.plugin('local-deliver', {
        to: fis.get('dist')
      })
    ]
  });
