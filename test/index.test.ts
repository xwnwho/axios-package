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
      url: 'https://baidu.com/',
      isReturnResponseData: false,
    }
    const result = await httpClient.post(params)
    expect(result.status).toEqual(200)
  })
  it('response status 404', async () => {
    const params = {
      url: 'https://baidu.com/haha', // 404
      isReturnResponseData: false,
    }
    const result = await httpClient.post(params)
    // console.log(result.status, result.statusText)
    expect(result.status).toEqual(404)
  })
  it('response status 0', async () => {
    const params = {
      url: 'https://baidu1.com', // url not exist
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
    url: 'https://baidu.com',
  }
  it('executed', async () => {
    await httpInstance.post(params)
  })
})
