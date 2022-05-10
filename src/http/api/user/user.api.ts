import { IAddUser , EditInfoInt,DelInfoInt } from '@/types/user/userlist';
import api from '@/http/config/api'
/**
 * userLogin
 */
//请求参数类型
interface loginData {
    username:string,
    password:string
}
//userLogin API返回值类型
interface IResType {
    token: string, 
    code: number,
    msg: string
}
//userLogin 用户登录
export const userLogin = (data:loginData) => api.post<IResType>({
    url:"/Users/login",
    data:data
})

/**
 * getUserList 获取用户列表
 */
//getUserList 返回值类型
interface IUserListType {
    data: any[], 
    code: number,
    msg: string
}
export const getUserList = () => api.post<IUserListType>({
    url:"/Users/getUserList",
    showLoading:false
})

/**
 * userEnroll 用户注册
 */

export const userEnroll = (data:IAddUser) => api.post<IResType>({
    url:"/Users/userEnroll",
    data:data,
    showLoading:false
})

/**
 * 修改用户信息
 */
//返回值类型
interface IInfoType {
    code: number,
    msg: string
}
export const userEditInfo = (data:EditInfoInt) => api.post<IInfoType>({
    url:"/Users/userEditInfo",
    data:data,
    showLoading:false
})
/**
 * 删除用户
 */
 export const userDel = (data:DelInfoInt) => api.post<IInfoType>({
    url:"/Users/userDelete",
    data:data,
    showLoading:false
})

