import type { FormInstance } from 'element-plus'
import { ref } from "vue"

//用户列表 参数格式
export interface IUserList {
    id: number,
    name: string,
    username: string,
    age: string,
    create_time: string,
    update_time: string,
    last_time: string,
    avatar: string
}
//新增用户 参数
export interface IAddUser {
    name: string,
    password: string,
    username: string,
    age: string
}
//编辑用户信息
export interface EditInfoInt {
    id: number,
    name: string,
    username: string,
    age: string,
}
//删除用户
export interface DelInfoInt {
    id: number
}

export interface IUserListRes {
    data:IUserList[];
}
export class CUserList {
    //用户信息
    info: IUserList = {
        id: 0,
        name: '',
        username: '',
        age: '',
        create_time: '',
        update_time: '',
        last_time: '',
        avatar: ''
    }
    //用户列表
    userList: IUserList[] = []
    //显示新增用户
    isShowAdd: boolean = false
    //新增用户信息类型
    addUserForm: IAddUser = {
        name: '',
        password: '',
        username: '',
        age: '',
    }
    addUserFormRef = ref<FormInstance>()
    //编辑用户信息
    editInfo: EditInfoInt = {
        id: 0,
        name: '',
        username: '',
        age: ''
    }
    //显示编辑用户信息
    isShowEdit: boolean = false
    editInfoFormRef = ref<FormInstance>()

    //显示删除用户
    isShowDel: boolean = false
    //删除用户
    delInfo: DelInfoInt = {
        id: 0
    }
}