import { stringify } from 'query-string'
import HttpClient, { HttpClientConfig, HttpRequestParameters } from '../src'

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
const errorHandler = () => { }

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

describe("get", () => {
  it("response status 200", async () => {
    const params: HttpRequestParameters = {
      url: 'https://baidu.com', // 接口请求地址
      config: {}, // axios配置
      isReturnData: false, // 是否直接但会result中的data结果
      isHandleError: false, // 是否执行处理错误的函数，和之前的errorHandler缺一不可
    }
    const result = await http.get(params)
    expect(result.status).toEqual(200);
  })
})

describe("post", () => {
  it("response status 200", async () => {
    const params: HttpRequestParameters = {
      url: 'http://10.76.224.224:8193/Shample/queryDay', // 接口请求地址
      data: {}, // 类似post接口，入参需要
      config: {}, // axios配置
      isReturnData: false, // 是否直接但会result中的data结果
      isHandleError: false, // 是否执行处理错误的函数，和之前的errorHandler缺一不可
    }
    const result = await http.post(params)
    expect(result.status).toEqual(200);
  })
  it("response status 500", async () => {
    const params: HttpRequestParameters = {
      url: 'http://10.76.224.224:8193/Shample/queryTime', // 接口请求地址
      data: {}, // 类似post接口，入参需要
      config: {}, // axios配置
      isReturnData: false, // 是否直接但会result中的data结果
      isHandleError: false, // 是否执行处理错误的函数，和之前的errorHandler缺一不可
    }
    const result = await http.post(params)
    expect(result.status).toEqual(500);
    expect(result.statusText).toEqual(statusMap[500]);
  })
})

describe("error handler", () => {
  const errorHandler = (result: any) => {
    expect(1).toBe(1)
  }
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
  const httpInnter = new HttpClient(config)
  const params: HttpRequestParameters = {
    url: 'http://10.76.224.224:8193/Shample/queryTime', // 接口请求地址
    data: {}, // 类似post接口，入参需要
    config: {}, // axios配置
    isReturnData: false, // 是否直接但会result中的data结果
    isHandleError: false, // 是否执行处理错误的函数，和之前的errorHandler缺一不可
  }
  it("executed", async () => {
    await httpInnter.post(params)
  })
})