import axios from 'axios';

class HttpClient {
    constructor(config) {
        const { axiosRequestConfig, errorHandler, statusMap } = config;
        this.errorHandler = errorHandler;
        this.statusMap = statusMap;
        const instanceRequestConfig = Object.assign({}, axiosRequestConfig);
        this.http = axios.create(instanceRequestConfig);
        this.responseInterceptor();
    }
    transformError(status, statusText, config) {
        return {
            config,
            status,
            statusText
        };
    }
    responseInterceptor() {
        this.http.interceptors.response.use((response) => response, (error) => {
            // cancelToken
            if (axios.isCancel(error)) {
                return this.transformError(undefined, 'cancel', error.config);
            }
            if (error.response) {
                // has response
                const { status, statusText } = error.response;
                const text = this.statusMap ? this.statusMap[status] : statusText;
                return this.transformError(status, text, error.config);
            }
            if (error.message.includes('Network Error')) {
                // Network Error
                return this.transformError(undefined, '网络错误', error.config);
            }
            if (error.message.includes('timeout')) {
                // timeout
                return this.transformError(undefined, '请求超时', error.config);
            }
            // unknow error
            return this.transformError(undefined, error.message, error.config);
        });
    }
    async similarToGet(method, params) {
        const { url, config, isReturnData = true, isHandleError = true } = params;
        const result = await this.http[method](url, config);
        if (isHandleError && this.errorHandler) {
            // execute error handler function
            this.errorHandler(result);
        }
        return isReturnData ? result.data || {} : result;
    }
    async similarToPost(method, params) {
        const { url, data, config, isReturnData = true, isHandleError = true, } = params;
        const result = await this.http[method](url, data, config);
        if (isHandleError && this.errorHandler) {
            this.errorHandler(result);
        }
        return isReturnData ? result.data : result;
    }
    async get(params) {
        return await this.similarToGet('get', params);
    }
    async delete(params) {
        return await this.similarToGet('delete', params);
    }
    async head(params) {
        return await this.similarToGet('head', params);
    }
    async options(params) {
        return await this.similarToGet('options', params);
    }
    async post(params) {
        return await this.similarToPost('post', params);
    }
    async put(params) {
        return await this.similarToPost('put', params);
    }
    async patch(params) {
        return await this.similarToPost('patch', params);
    }
}

export default HttpClient;
