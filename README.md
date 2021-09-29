# axios-package

> axios packaged for general use

> [English Version](./README.en.md)

## fix

- class 属性在项目babel中未能被转译，故将ts编译到es2020,


## breaking change

- 配置移除statusMap
- 可以通过getAxiosInstance实例方法获取内部的axios创建的实例，可以对实例进行一些自定义操作

## installation

```bash
npm i axios axios-package2
```

## usage

### typescript

```ts
import { stringify } from 'query-string'
import { AxiosResponse } from 'axios'
import HttpClient, { HttpClientConfig } from 'axios-package2'

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

const errorHandler = (result: AxiosResponse) => {
  // 接口请求成功，或者是接口http报错
  if (resule.status > 0) {
    // do something
    const statusText = statusMap[result.status]
  }
  // 接口其他错误: 例如接口取消、超时、网络问题
  if (result.status < 0) {
    // do something
  }
  console.log(result)
}

// 实例默认配置
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
}

const http = new HttpClient(config)

// 单个请求配置，只有url是必须的
const params: HttpRequestParameters = {
  url: '',
  data: {},
  config: {},
  isReturnData: true, // 请求直接返回response.data中的数据, 未传为true
  isHandleError: true, // 当errorHandler存在，决定该函数是否调用，未传为true
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
