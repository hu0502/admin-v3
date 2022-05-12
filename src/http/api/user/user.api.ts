import api from '@/http/config/api'

import { IAddUser, EditInfoInt, DelInfoInt } from '@/types/user/userlist';
import { ILoginForm } from '@/types/user/login';
import { IGetInfoType, IInfoType, IResType, IUserListType } from '@/types/user/api_types';

//用户登录
export const userLogin = (data: ILoginForm) => api.post<IResType>({
    url: "/Users/login",
    data: data
})

//用户注册
export const userEnroll = (data: IAddUser) => api.post<IResType>({
    url: "/Users/userEnroll",
    data: data,
    showLoading: false
})

//获取用户列表
export const getUserList = () => api.post<IUserListType>({
    url: "/Users/getUserList",
    showLoading: false
})

//修改用户信息
export const userEditInfo = (data: EditInfoInt) => api.post<IInfoType>({
    url: "/Users/userEditInfo",
    data: data,
    showLoading: false
})

//删除用户
export const userDel = (data: DelInfoInt) => api.post<IInfoType>({
    url: "/Users/userDelete",
    data: data,
    showLoading: false
})

//获取用户信息
export const getUserInfo = () => api.post<IGetInfoType>({
    url: "/Users/getUserInfo",
})