import Taro from '@tarojs/taro'

import {HTTP_STATUS} from "../utils/status";

import basePath from "../utils/basePath";
// import { AtToast } from "taro-ui"

export default {
    baseOptions(params, method: 'GET' | 'POST' = 'GET') {
        let {url, data} = params;
        let contentType = 'application/json';
        contentType = params.contentType || contentType;
        type OptionType = {
            url: string,
            data?: object | string,
            method: 'GET' | 'POST',
            header: object,
            success: (res: callBackMessageType) => any,
            xhrFields: {withCredentials: boolean},
            timeout: number
        }

        type callBackMessageType = {
            data: object,
            header: Record<string, any>,
            statusCode: number,
            errMsg: string
        }

        function connectUrl(baseUrl: string, route: string, data?: object): string {
            let query = '';
            if (data) {
                for (let i in data) {
                    if (data.hasOwnProperty(i)) {
                        query += `${i}=${data[i]}` + '&'
                    }
                }
            } else {
                return baseUrl + route
            }
            query = query.substring(0, query.length - 1);
            return baseUrl + route + '?' + query
        }

        const option: OptionType = {
            // url: method === 'GET' ? connectUrl(basePath.baseUrl, url, data) : basePath.baseUrl + url,
            // data: method === 'GET' ? null : data,
            url: basePath.baseUrl + url,
            data: data,
            method: method,
            header: {
                'Content-Type': contentType,
                // cookie: Taro.getStorageSync('cookies')
            },
            // mode: 'cors',
            xhrFields: {withCredentials: false},
            timeout: 5000,
            success(res: callBackMessageType): any {
                // setCookie(res);
                if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
                    return '请求资源不存在'
                } else if (res.statusCode === HTTP_STATUS.BAD_GATEWAY) {
                    return '服务端出现了问题'
                } else if (res.statusCode === HTTP_STATUS.FORBIDDEN) {
                    return '没有权限访问'
                } else if (res.statusCode === HTTP_STATUS.SERVER_ERROR) {
                    return '服务器更新'
                } else if (res.statusCode === HTTP_STATUS.SUCCESS) {
                    return res.data
                }
            },
        };

        // eslint-disable-next-line
        return Taro.request(option)
    },
    get(url, data?: object) {
        let option = {url, data};
        return this.baseOptions(option)
    },
    post: function (url, data?: object, contentType?: string) {
        let params = {url, data, contentType};
        return this.baseOptions(params, 'POST')
    },
    // put(url, data?: object) {
    //     let option = {url, data};
    //     return this.baseOptions(option, 'PUT')
    // },
    // delete(url, data?: object) {
    //     let option = {url, data};
    //     return this.baseOptions(option, 'DELETE')
    // }
}