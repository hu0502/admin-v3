// import api from '../config/api'
import request from './jsconfig.js'

/**
 * 加载请求
 */

/* export const apiTest = (data:any) => api.post<any>({
    url: "/Users/apiTest",
    data: data,
    showLoading: false
}) */
export function apiTest(data) {
    return request({
        url: '/Users/apiTest',
        method: 'post',
        data,
    })
}
