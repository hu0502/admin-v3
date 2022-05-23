<template>
    <div class="login-box">
        <el-form ref="loginFormRef" :model="loginForm" status-icon :rules="rules" label-width="60px" class="loginForm">
            <h1>后台管理系统</h1>
            <el-form-item class="item" label="账号" prop="username">
                <el-input v-model="loginForm.username" autocomplete="off" />
            </el-form-item>
            <el-form-item class="item" label="密码" prop="password">
                <el-input v-model="loginForm.password" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item class="item">
                <el-button type="primary" @click="submitForm()">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { LoginFormClass } from '@/types/user/login'
import { useRoute, useRouter } from "vue-router"
import { userStoreInstance } from '@/store/user'
import { userLogin } from "@/http/api/user/user.api";
import { ElMessage } from "element-plus";

export default defineComponent({
    name: 'userLogin',
    setup() {
        const router = useRouter();
        const route = useRoute()
        const userStore = userStoreInstance()
        const data = reactive(new LoginFormClass())

        const rules = {
            username: [
                { required: true, message: '请输入账号', trigger: 'blur' },
                { min: 2, max: 24, message: '账号长度为2-24个字符', trigger: 'blur' },
            ],
            password: [
                { required: true, message: '请输入密码', trigger: 'blur' },
                { min: 6, max: 24, message: '密码长度为6-24个字符', trigger: 'blur' },
            ]
        }

        const submitForm = () => {
            data.loginFormRef?.validate(async (valid: boolean) => {
                if (valid) {
                    userLogin(data.loginForm).then(res => {
                        if (res.code === 200) {
                            userStore.SET_TOKEN(res.token)
                            ElMessage.success(res.msg);
                            setTimeout(()=>{
                                let redirect = route.query.redirect || '/'
                                if (typeof redirect !== 'string') {
                                    redirect = '/'
                                }
                                router.replace(redirect)
                            },1000)
                            
                        } else {
                            ElMessage.error(res.msg)
                        }
                    }).catch(err => {
                        return ElMessage.error('系统错误 ')
                    })
                } else {
                    console.log('error');
                }
            })
        }
        return {
            ...toRefs(data),
            rules,
            submitForm
        }
    }

})
</script>

<style lang="scss" scoped>
.login-box {
    width: 100%;
    height: 100%;
    background: url('@/assets/bg.jpg');
    background-size: cover;
    box-sizing: border-box;
    padding-top: 400px;

    .loginForm {
        width: 450px;
        height: 300px;
        padding: 20px;
        background-color: #fff;
        opacity: .9;
        padding: 30px;
        margin: 0 auto;
        border-radius: 20px;

        h1 {
            padding: 20px;
            text-align: center;
            color: #409EFF;
            margin-bottom: 20px;
        }

        .item {
            margin: 20px auto;
        }

        .item:last-child {
            margin-top: 50px;

            button {
                width: 85%;
                padding: 20px 0;
            }
        }
    }
}
</style>