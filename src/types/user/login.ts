/**
 * user模块
 *  login登录
 */
import type { FormInstance } from 'element-plus'
import { ref } from 'vue'
export interface ILoginForm {
    username: string,
    password: string
}
export class LoginFormClass {
    loginForm: ILoginForm = {
        username: '',
        password: ''
    }
    loginFormRef = ref<FormInstance>()
}