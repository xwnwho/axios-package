# axios-package

> axios packaged for general use

> [🇨🇳 中文版](./README.zh-Hans.md)

## breaking change

- HttpClientConfig remove statusMap configuration
- you can use getAxiosInstance function get inner axios instance

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
  // request succeed or has http error
  if (resule.status > 0) {
    // do something
    const statusText = statusMap[result.status]
  }
  // requset has other error: like timeout,network,canceled etc
  if (result.status < 0) { // -1: canceled;-2：timeout,network etc
    // do something
  }
  console.log(result)
}

// httpClient default config
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

// request config, only url is required
const params: HttpRequestParameters = {
  url: '',
  data: {},
  config: {},
  isReturnData: true, // request return response.data, if not passed, default true
  isHandleError: true, // request will call errorHandler or not, if not passed, default value is true 
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
