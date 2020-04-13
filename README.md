## 生成环境去除掉console 打印信息
1. npm install babel-plugin-transform-remove-console --save-dev
2. babel.config.js 配置如下
```
const plugins = ['@vue/babel-plugin-transform-vue-jsx']
if (process.env.NODE_ENV === 'production') {
  plugins.push('transform-remove-console')
}
module.exports = {
  plugins: plugins,
  presets: [
    [
      '@vue/app', {
        modules: false,
        targets: {
          browsers: ['> 1%', 'last 2 versions', 'not ie <= 8', 'Android >= 4', 'iOS >= 8']
        },
        useBuiltIns: 'entry'
      }
    ]
  ]
}

```
备注：.babelrc文件放置在项目根目录和babel.config.js效果一致，如果两种类型的配置文件都存在，.babelrc会覆盖babel.config.js的配置。


## [loadsh](https://lodash.com/docs#debounce) 输入框限制访问的频率 ,AJAX 请求直到用户输入完毕才会发出。
- https://cn.vuejs.org/v2/guide/computed.html 常用500毫秒
- 中文输入不需要在watch中监听
