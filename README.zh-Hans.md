# axios-package

> axios packaged for general use
> [English Version](./README.zh-Hans.md)

## breaking change

- 支持ts
- 库中不再包含默认配置，并且将默认导出从函数改为了类

和1.0.0之前的版本不兼容

## installation

```bash
npm i axios query-string axios-package2
```

## usage

### es6

```js
import { stringify } from 'query-string'
import HttpClient from 'axios-package2'

// 将http的statusText从默认的英文转化为中文，给错误处理函数使用（不传，返回英文）
const statusMap = {
  400: '错误请求',
  401: '未授权，请重新登录',
  403: '拒绝访问',
  404: '请求错误,未找到该资源',
  405: '请求方法未允许',
  408: '请求超时',
  500: '服务器端出错',
  501: '网络未实现',
  502: '网络错误',
  503: '服务不可用',
  504: '网络超时',
  505: 'http版本不支持该请求',
  800: '登陆失效',
}

// 自定义错误处理函数（不传，则不处理）
const errorHandler = (result) => {
  console.log(result)
}

// 提供默认配置
const config = {
  axiosRequestConfig: {
    baseURL: '',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    timeout: 60000,
    transformRequest: [
       (data, headers) => {
        if (headers['Content-Type'].includes('x-www-form-urlencoded')) {
          return stringify(data)
        }
        return data
      }
    ]
  },
  errorHandler,
  statusMap
}

// 实例
const http = new HttpClient(config)

const params = {
  url: '', // 接口请求地址
  data: {}, // post接口，入参需要
  config: {}, // axios配置
  isReturnData: true, // 是否直接但会result中的data结果
  isHandleError: true, // 是否执行处理错误的函数，和之前的errorHandler缺一不可
}

// http methods: 'get' | 'delete' | 'head' | 'options' | 'post' | 'put' | 'patch'

http.get(params).then(result => {
  console.log(result)
})

http.post(params).then(result => {
  console.log(result)
})

```

### typescript

```ts
import { stringify } from 'query-string'
import HttpClient, {HttpClientConfig, HttpRequestParameters } from 'axios-package2'

// 将http的statusText从默认的英文转化为中文，给错误处理函数使用（不传，返回英文）
const statusMap = {
  400: '错误请求',
  401: '未授权，请重新登录',
  403: '拒绝访问',
  404: '请求错误,未找到该资源',
  405: '请求方法未允许',
  408: '请求超时',
  500: '服务器端出错',
  501: '网络未实现',
  502: '网络错误',
  503: '服务不可用',
  504: '网络超时',
  505: 'http版本不支持该请求',
  800: '登陆失效',
}

// 自定义错误处理函数（不传，则不处理）
const errorHandler = (result) => {
  console.log(result)
}

// 提供默认配置
const config: HttpClientConfig = {
  axiosRequestConfig: {
    baseURL: '',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    timeout: 60000,
    transformRequest: [
       (data, headers) => {
        if (headers['Content-Type'].includes('x-www-form-urlencoded')) {
          return stringify(data)
        }
        return data
      }
    ]
  },
  errorHandler,
  statusMap
}

// 实例
const http = new HttpClient(config)

const params = {
  url: '', // 接口请求地址
  data: {}, // post接口，入参需要
  config: {}, // axios配置
  isReturnData: true, // 是否直接但会result中的data结果
  isHandleError: true, // 是否执行处理错误的函数，和之前的errorHandler缺一不可
}

// http methods: 'get' | 'delete' | 'head' | 'options' | 'post' | 'put' | 'patch'

http.get(params).then(result => {
  console.log(result)
})

http.post(params).then(result => {
  console.log(result)
})

```

## ⚠ warn for importing the source version

axios-package2 offers untranspiled version for webpack by default.If you are using official Vue CLI to create your project, you may encounter the problem that the default configuration will exclude `node_modules` from files to be transpiled by Babel. You need to modify the configuration as follows:

For **Vue CLI 3+**, add `axios-package2` (if you use `query-string`, also add) into `transpileDependencies` in `vue.config.js` like this:

```js
module.exports = {
  transpileDependencies: [
    'axios-package2',
    'query-string'
  ]
}
```

For **Vue CLI 2** with the `webpack` template, modify `build/webpack.base.conf.js` like this:

```diff
      {
        test: /\.js$/,
        loader: 'babel-loader',
-       include: [resolve('src'), resolve('test')]
+       include: [
+         resolve('src'),
+         resolve('test'),
+         resolve('node_modules/axios-package2'),
+         resolve('node_modules/query-string')
+       ]
      }
```
