import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse, AxiosError } from 'axios'

export interface HttpClientStatus {
  [propName: number]: string
}

export interface HttpClientConfig {
  axiosRequestConfig?: AxiosRequestConfig;
  errorHandler?: CallableFunction;
  statusMap?: HttpClientStatus
}

export interface HttpRequestParameters {
  url: string;
  data?: any,
  config?: AxiosRequestConfig;
  isReturnData?: boolean;
  isHandleError?: boolean;
}

export default class HttpClient {
  private http: AxiosInstance
  private errorHandler: CallableFunction | undefined
  private statusMap: HttpClientStatus | undefined
  constructor(config: HttpClientConfig) {
    const { axiosRequestConfig, errorHandler, statusMap } = config
    this.errorHandler = errorHandler
    this.statusMap = statusMap
    const instanceRequestConfig = Object.assign({}, axiosRequestConfig)
    this.http = axios.create(instanceRequestConfig)
    this.responseInterceptor()
  }
  private transformError(status: number | undefined, statusText: string, config: AxiosRequestConfig) {
    return {
      config,
      status,
      statusText
    }
  }
  private responseInterceptor() {
    this.http.interceptors.response.use((response: AxiosResponse) => response,
      (error: AxiosError) => {
        if (error.response) {
          // has response
          const { status, statusText } = error.response
          const text = this.statusMap ? this.statusMap[status] : statusText
          return this.transformError(status, text, error.config)
        }
        if (error.message.includes('Network Error')) {
          // Network Error
          return this.transformError(undefined, '网络错误', error.config)
        }
        if (error.message.includes('timeout')) {
          // timeout
          return this.transformError(undefined, '请求超时', error.config)
        }
        // unknow error
        return this.transformError(undefined, error.message, error.config)
      })
  }
  async similarToGet(method: 'get' | 'delete' | 'head' | 'options', params: HttpRequestParameters) {
    const { url, config, isReturnData = true, isHandleError = true } = params
    const result = await this.http[method](url, config)
    if (isHandleError && this.errorHandler) {
      // execute error handler function
      this.errorHandler(result)
    }
    return isReturnData ? result.data || {} : result
  }
  async similarToPost(method: 'post' | 'put' | 'patch', params: HttpRequestParameters) {
    const {
      url,
      data,
      config,
      isReturnData = true,
      isHandleError = true,
    } = params
    const result = await this.http[method](url, data, config)
    if (isHandleError && this.errorHandler) {
      this.errorHandler(result)
    }
    return isReturnData ? result.data : result
  }
  async get(params: HttpRequestParameters) {
    return await this.similarToGet('get', params)
  }
  async delete(params: HttpRequestParameters) {
    return await this.similarToGet('delete', params)
  }
  async head(params: HttpRequestParameters) {
    return await this.similarToGet('head', params)
  }
  async options(params: HttpRequestParameters) {
    return await this.similarToGet('options', params)
  }
  async post(params: HttpRequestParameters) {
    return await this.similarToPost('post', params)
  }
  async put(params: HttpRequestParameters) {
    return await this.similarToPost('put', params)
  }
  async patch(params: HttpRequestParameters) {
    return await this.similarToPost('patch', params)
  }
}
