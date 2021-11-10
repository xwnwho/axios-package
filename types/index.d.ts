import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
export declare type ResponseCallback = (response: AxiosResponse) => void;
export declare type HttpClientConfig = {
    requestConfig?: AxiosRequestConfig;
    isExecuteReponseInteceptors?: boolean;
    responseCallback?: ResponseCallback;
};
export declare type HttpClientRequestConfig = {
    url: string;
    requestConfig?: AxiosRequestConfig;
    isExecuteResponseCallback?: boolean;
    isReturnResponseData?: boolean;
};
export declare type HttpClientRequestConfigHasData = HttpClientRequestConfig & {
    data?: any;
};
export declare class HttpClient {
    http: AxiosInstance;
    responseCallback?: ResponseCallback;
    isExecuteResponseCallback?: boolean;
    constructor(config?: HttpClientConfig);
    responseInterceptor(successFn?: (response: AxiosResponse<any, any>) => AxiosResponse<any, any>, errorFn?: (error: AxiosError<any, any>) => AxiosResponse<any, any>): void;
    handleResponseCallback(reponse: AxiosResponse, isExecuteResponseCallback?: boolean): void;
    handleResponse(response: AxiosResponse, isReturnResponseData?: boolean): any;
    requestSimilarToGet(method: 'get' | 'delete' | 'head' | 'options', config: HttpClientRequestConfig): Promise<any>;
    requestSimilarToPost(method: 'post' | 'put' | 'patch', config: HttpClientRequestConfigHasData): Promise<any>;
    get(config: HttpClientRequestConfig): Promise<any>;
    delete(config: HttpClientRequestConfig): Promise<any>;
    head(config: HttpClientRequestConfig): Promise<any>;
    options(config: HttpClientRequestConfig): Promise<any>;
    post(config: HttpClientRequestConfigHasData): Promise<any>;
    put(config: HttpClientRequestConfigHasData): Promise<any>;
    patch(config: HttpClientRequestConfigHasData): Promise<any>;
}
export default HttpClient;
