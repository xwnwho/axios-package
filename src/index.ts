import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios'

export type ResponseCallback = (res: AxiosResponse) => any

export interface HttpClientConfig {
  axiosRequestConfig?: AxiosRequestConfig
  errorHandler?: ResponseCallback // this function will called after request finished
}

export interface HttpRequestParameters {
  url: string
  data?: any
  config?: AxiosRequestConfig
  isReturnData?: boolean // request will return response.data, if not passed, default value is true
  isHandleError?: boolean // request will call errorHandler or not, if not passed, default value is true
}

class HttpClient {
  private http: AxiosInstance
  private responseCallback: ResponseCallback | undefined
  constructor(config?: HttpClientConfig) {
    const { axiosRequestConfig = {}, errorHandler } = config || {}
    this.http = axios.create(axiosRequestConfig)
    this.responseCallback = errorHandler
    this.responseInterceptor()
  }
  getAxiosInstance(): AxiosInstance {
    return this.http
  }
  formatError(res: AxiosResponse): AxiosResponse {
    return res
  }
  private responseInterceptor() {
    this.http.interceptors.response.use(
      (res: AxiosResponse) => res,
      (err: AxiosError) => {
        // request has response
        if (err.response) {
          return this.formatError(err.response)
        }
        // request canceled
        if (axios.isCancel(err)) {
          return this.formatError({
            data: {},
            status: -1,
            headers: null,
            statusText: err.message || 'canceled',
            config: err.config,
          })
        }
        // other error like: timeout, network etc
        return this.formatError({
          data: {},
          status: -2,
          headers: null,
          statusText: err.message,
          config: err.config,
        })
      }
    )
  }
  async similarToGet(
    method: 'get' | 'delete' | 'head' | 'options',
    requestConfig: HttpRequestParameters
  ): Promise<any> {
    const {
      url,
      config,
      isReturnData = true,
      isHandleError = true,
    } = requestConfig
    const result: AxiosResponse = await this.http[method](url, config)
    if (isHandleError && this.responseCallback) {
      this.responseCallback(result)
    }
    return isReturnData ? result.data : result
  }
  async similarToPost(
    method: 'post' | 'put' | 'patch',
    requestConfig: HttpRequestParameters
  ): Promise<any> {
    const {
      url,
      data,
      config,
      isReturnData = true,
      isHandleError = true,
    } = requestConfig
    const result = await this.http[method](url, data, config)
    if (isHandleError && this.responseCallback) {
      this.responseCallback(result)
    }
    return isReturnData ? result.data || {} : result
  }
  async get(requestConfig: HttpRequestParameters): Promise<any> {
    return await this.similarToGet('get', requestConfig)
  }
  async delete(params: HttpRequestParameters): Promise<any> {
    return await this.similarToGet('delete', params)
  }
  async head(params: HttpRequestParameters): Promise<any> {
    return await this.similarToGet('head', params)
  }
  async options(params: HttpRequestParameters): Promise<any> {
    return await this.similarToGet('options', params)
  }
  async post(params: HttpRequestParameters): Promise<any> {
    return await this.similarToPost('post', params)
  }
  async put(params: HttpRequestParameters): Promise<any> {
    return await this.similarToPost('put', params)
  }
  async patch(params: HttpRequestParameters): Promise<any> {
    return await this.similarToPost('patch', params)
  }
}

export default HttpClient
