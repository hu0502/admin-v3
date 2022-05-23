import request from './jsconfig.js'

export function apiTest(data) {
    return request({
        url: '/Generator/CreateModule',
        method: 'post',
        data,
    })
}
