import request from './jsconfig.js'

export function apiTest(data) {
    return request({
        url: '/Users/apiTest',
        method: 'post',
        data,
    })
}
