import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
export declare type ResponseCallback = (res: AxiosResponse) => any;
export interface HttpClientConfig {
    axiosRequestConfig?: AxiosRequestConfig;
    errorHandler?: ResponseCallback;
}
export interface HttpRequestParameters {
    url: string;
    data?: any;
    config?: AxiosRequestConfig;
    isReturnData?: boolean;
    isHandleError?: boolean;
}
declare class HttpClient {
    private http;
    private responseCallback;
    constructor(config?: HttpClientConfig);
    getAxiosInstance(): AxiosInstance;
    formatError(res: AxiosResponse): AxiosResponse;
    private responseInterceptor;
    similarToGet(method: 'get' | 'delete' | 'head' | 'options', requestConfig: HttpRequestParameters): Promise<any>;
    similarToPost(method: 'post' | 'put' | 'patch', requestConfig: HttpRequestParameters): Promise<any>;
    get(requestConfig: HttpRequestParameters): Promise<any>;
    delete(params: HttpRequestParameters): Promise<any>;
    head(params: HttpRequestParameters): Promise<any>;
    options(params: HttpRequestParameters): Promise<any>;
    post(params: HttpRequestParameters): Promise<any>;
    put(params: HttpRequestParameters): Promise<any>;
    patch(params: HttpRequestParameters): Promise<any>;
}
export default HttpClient;
