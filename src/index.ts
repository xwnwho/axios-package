import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios'

export type ResponseCallback = (response: AxiosResponse) => void

export type HttpClientConfig = {
  requestConfig?: AxiosRequestConfig
  isExecuteReponseInteceptors?: boolean // execute axios response interceptor, default is true
  responseCallback?: ResponseCallback // request finished callback fn
}

export type HttpClientRequestConfig = {
  url: string
  requestConfig?: AxiosRequestConfig
  isExecuteResponseCallback?: boolean // if responseCallback is configured and execute is true, responseCallback function will called
  isReturnResponseData?: boolean // request response.data, default is true
}

export type HttpClientRequestConfigHasData = HttpClientRequestConfig & {
  data?: any
}

const successResponseInterceptorFn = (response: AxiosResponse): AxiosResponse =>
  response

const errorResponseInterceptorFn = (error: AxiosError): AxiosResponse => {
  if (error.response) return error.response
  // cross-site, timeout, cancel, network error
  return {
    data: {},
    status: 0,
    headers: {},
    statusText: error.message,
    config: error.config,
  }
}

export class HttpClient {
  http: AxiosInstance
  responseCallback?: ResponseCallback
  isExecuteResponseCallback?: boolean
  constructor(config?: HttpClientConfig) {
    if (!config) {
      this.http = axios.create()
      return
    }
    const {
      requestConfig,
      isExecuteReponseInteceptors = true,
      responseCallback,
    } = config
    this.http = axios.create(requestConfig)
    this.responseCallback = responseCallback
    isExecuteReponseInteceptors && this.responseInterceptor()
  }
  responseInterceptor(
    successFn = successResponseInterceptorFn,
    errorFn = errorResponseInterceptorFn
  ): void {
    this.http.interceptors.response.use(successFn, errorFn)
  }
  handleResponseCallback(
    reponse: AxiosResponse,
    isExecuteResponseCallback?: boolean
  ): void {
    isExecuteResponseCallback !== false &&
      this.responseCallback &&
      this.responseCallback(reponse)
  }
  handleResponse(response: AxiosResponse, isReturnResponseData = true) {
    return isReturnResponseData ? response.data : response
  }
  async requestSimilarToGet(
    method: 'get' | 'delete' | 'head' | 'options',
    config: HttpClientRequestConfig
  ): Promise<any> {
    const {
      url,
      requestConfig,
      isExecuteResponseCallback,
      isReturnResponseData,
    } = config
    const response: AxiosResponse = await this.http[method](url, requestConfig)
    this.handleResponseCallback(response, isExecuteResponseCallback)
    return this.handleResponse(response, isReturnResponseData)
  }
  async requestSimilarToPost(
    method: 'post' | 'put' | 'patch',
    config: HttpClientRequestConfigHasData
  ): Promise<any> {
    const {
      url,
      data,
      requestConfig,
      isExecuteResponseCallback,
      isReturnResponseData,
    } = config
    const response = await this.http[method](url, data, requestConfig)
    this.handleResponseCallback(response, isExecuteResponseCallback)
    return this.handleResponse(response, isReturnResponseData)
  }
  get(config: HttpClientRequestConfig): Promise<any> {
    return this.requestSimilarToGet('get', config)
  }
  delete(config: HttpClientRequestConfig): Promise<any> {
    return this.requestSimilarToGet('delete', config)
  }
  head(config: HttpClientRequestConfig): Promise<any> {
    return this.requestSimilarToGet('head', config)
  }
  options(config: HttpClientRequestConfig): Promise<any> {
    return this.requestSimilarToGet('options', config)
  }
  post(config: HttpClientRequestConfigHasData): Promise<any> {
    return this.requestSimilarToPost('post', config)
  }
  put(config: HttpClientRequestConfigHasData): Promise<any> {
    return this.requestSimilarToPost('put', config)
  }
  patch(config: HttpClientRequestConfigHasData): Promise<any> {
    return this.requestSimilarToPost('patch', config)
  }
}

export default HttpClient
