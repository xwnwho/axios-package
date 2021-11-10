# axios-package

> a simple axios wrapper

## breaking change

- some config property name is renamed

## installation

```bash
npm i axios axios-package2
```

## usage

### typescript

```ts
import { stringify } from 'query-string'
import { AxiosResponse } from 'axios'
import HttpClient, { HttpClientConfig, HttpClientRequestConfig,HttpClientRequestConfigHasData } from 'axios-package2'

// transform some error.response statusText into chinese
export const errorResponseStatusMap = {
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

const responseCallback = (result: AxiosResponse) => {
  // request has response
  if (resule.status > 0) {
    const statusText = errorResponseStatusMap[result.status]
    return
  }
  // request no response error
  console.log(result.statusText)
}

const config: HttpClientConfig = {
  requestConfig: {
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
  responseCallback,
  isExecuteReponseInteceptors: true // execute axios response interceptor, default is true
}

const httpInstance = new HttpClient(config)

// single request config, if your requestParams want to set data property, you should use HttpClientRequestConfigHasData type.
const requestParams: HttpClientRequestConfig = {
  url: '',
  config: {}, // axios request config
  isExecuteResponseCallback: true, // if responseCallback is configured and execute is true, responseCallback function will called
  isReturnResponseData: true, // request return response.data not response, default is true;sometimes if you set config.responceType as blob, you should set false
}

// httpInstance methods: 'get' | 'delete' | 'head' | 'options' | 'post' | 'put' | 'patch'

httpInstance.get(params).then(data => {
  console.log(data)
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
