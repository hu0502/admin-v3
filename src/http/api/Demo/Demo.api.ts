import api from '@/http/config/api'

export const getList = (data: any) => api.post<any>({
    url: "/Demo/getList",
    data: data,
    showLoading: false
})

export const doEdit = (data: any) => api.post<any>({
    url: "/Demo/doEdit",
    data: data,
    showLoading: false
})

export const doDelete = (data: any) => api.post<any>({
    url: "/Demo/doDelete",
    data: data,
    showLoading: false
})