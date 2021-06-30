import { AxiosRequestConfig } from 'axios';
export interface HttpClientStatus {
    [propName: number]: string;
}
export interface HttpClientResult {
    status: number | undefined;
    statusText: string;
    config: AxiosRequestConfig;
    data?: any;
    headers?: any;
    request?: any;
}
export interface ErrorHandler {
    (result: HttpClientResult): any;
}
export interface HttpClientConfig {
    axiosRequestConfig?: AxiosRequestConfig;
    errorHandler?: ErrorHandler;
    statusMap?: HttpClientStatus;
}
export interface HttpRequestParameters {
    url: string;
    data?: any;
    config?: AxiosRequestConfig;
    isReturnData?: boolean;
    isHandleError?: boolean;
}
export default class HttpClient {
    private http;
    private errorHandler;
    private statusMap;
    constructor(config: HttpClientConfig);
    private transformError;
    private responseInterceptor;
    similarToGet(method: 'get' | 'delete' | 'head' | 'options', params: HttpRequestParameters): Promise<any>;
    similarToPost(method: 'post' | 'put' | 'patch', params: HttpRequestParameters): Promise<any>;
    get(params: HttpRequestParameters): Promise<any>;
    delete(params: HttpRequestParameters): Promise<any>;
    head(params: HttpRequestParameters): Promise<any>;
    options(params: HttpRequestParameters): Promise<any>;
    post(params: HttpRequestParameters): Promise<any>;
    put(params: HttpRequestParameters): Promise<any>;
    patch(params: HttpRequestParameters): Promise<any>;
}
