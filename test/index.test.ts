import { stringify } from 'query-string'

import HttpClient from '../src'
const httpClient = new HttpClient({})

describe('get', () => {
  it('response status 200', async () => {
    const url = 'https://baidu.com/'
    const result = await httpClient.get({ url, isReturnResponseData: false })
    expect(result.status).toEqual(200)
  })
})

describe('post', () => {
  it('response status 200', async () => {
    const params = {
      url: 'http://10.76.224.224:8193/Shample/queryDay',
      isReturnResponseData: false,
    }
    const result = await httpClient.post(params)
    expect(result.status).toEqual(200)
  })
  it('response status 404', async () => {
    const params = {
      url: 'http://10.76.224.224:8193/Shample/queryTime1', // 404
      isReturnResponseData: false,
    }
    const result = await httpClient.post(params)
    // console.log(result.status, result.statusText)
    expect(result.status).toEqual(404)
  })
  it('response status 0', async () => {
    const params = {
      url: 'http://10.76.224.224:8194/Shample/queryTime', // url not exist
      isReturnResponseData: false,
    }
    const result = await httpClient.post(params)
    // console.log(result.status, result.statusText)
    expect(result.status).toEqual(0)
  })
})

describe('responseCallback', () => {
  const responseCallback = () => {
    expect(1).toBe(1)
  }
  const config = {
    requestConfig: {
      baseURL: '',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      timeout: 60000,
      transformRequest: [
        (data: any, headers: any) => {
          if (headers['Content-Type'].includes('x-www-form-urlencoded')) {
            return stringify(data)
          }
          return data
        },
      ],
    },
    responseCallback,
  }
  const httpInstance = new HttpClient(config)
  const params = {
    url: 'http://10.76.224.224:8193/Shample/queryTime', // 接口请求地址
  }
  it('executed', async () => {
    await httpInstance.post(params)
  })
})
