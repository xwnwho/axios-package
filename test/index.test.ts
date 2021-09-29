import { stringify } from 'query-string'

import HttpClient from '../src'
const httpClient = new HttpClient()

describe('get', () => {
  it('response status 200', async () => {
    const url = 'https://baidu.com/'
    const result = await httpClient.get({ url, isReturnData: false })
    expect(result.status).toEqual(200)
  })
})

describe('post', () => {
  it('response status 200', async () => {
    const params = {
      url: 'http://10.76.224.224:8193/Shample/queryDay', // 接口请求地址
      isReturnData: false,
    }
    const result = await httpClient.post(params)
    expect(result.status).toEqual(200)
  })
  it('response status 500', async () => {
    const params = {
      url: 'http://10.76.224.224:8193/Shample/queryTime', // 接口请求地址
      isReturnData: false,
    }
    const result = await httpClient.post(params)
    expect(result.status).toEqual(500)
  })
})

describe('error handler', () => {
  const errorHandler = () => {
    expect(1).toBe(1)
  }
  const config = {
    axiosRequestConfig: {
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
    errorHandler,
  }
  const httpInnter = new HttpClient(config)
  const params = {
    url: 'http://10.76.224.224:8193/Shample/queryTime', // 接口请求地址
  }
  it('executed', async () => {
    await httpInnter.post(params)
  })
})
