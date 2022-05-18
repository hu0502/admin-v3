<template>
    <div class="user-list-btn">
        <el-button type="primary" @click="openAddDialog">新增用户</el-button>
    </div>
    <el-table stripe :data="userList" border style="width: 100%">
        <el-table-column align="center" prop="id" label="id" width="180" />
        <el-table-column align="center" prop="name" label="姓名" width="180" />
        <el-table-column align="center" prop="avatar" label="头像" width="180">
            <template #default="scope">
                <el-avatar v-if="scope.row.avatar" :src="scope.row.avatar" />
                <el-avatar v-else> user </el-avatar>
            </template>
        </el-table-column>
        <el-table-column align="center" prop="username" label="手机号码" width="180" />
        <el-table-column align="center" prop="age" label="年龄" width="180" />
        <el-table-column align="center" prop="create_time" label="创建时间" width="180" />
        <el-table-column align="center" prop="last_time" label="最后登录时间" width="180" />
        <el-table-column align="center" prop="role" label="操作">
            <template #default="scope">
                <el-button type="text" size="small" @click="editUser(scope.row)">编辑</el-button>
                <el-button type="text" size="small" @click="delUser(scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    
    <el-dialog :modelValue="isShowAdd" title="新增用户" center width="30%">
        <el-form ref="addUserFormRef" status-icon :rules="rules" :model="addUserForm" class="add-form">
            <el-form-item label="手机号码" :label-width="100" prop="username">
                <el-input v-model="addUserForm.username" autocomplete="off" />
            </el-form-item>
            <el-form-item label="密码" :label-width="100" prop="password">
                <el-input v-model="addUserForm.password" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item label="昵称" :label-width="100" prop="name">
                <el-input v-model="addUserForm.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="年龄" :label-width="100" prop="age">
                <el-input v-model.number="addUserForm.age" autocomplete="off" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="isShowAdd = false">取 消</el-button>
                <el-button type="primary" @click="addUser()">确认提交</el-button>
            </div>
        </template>
    </el-dialog>

    <el-dialog :modelValue="isShowEdit" title="编辑用户" center width="30%">
        <el-form ref="editInfoFormRef" status-icon :rules="editrules" :model="editInfo" class="add-form">
            <el-form-item label="手机号码" :label-width="100" prop="username">
                <el-input v-model="editInfo.username" autocomplete="off" />
            </el-form-item>
            <el-form-item label="昵称" :label-width="100" prop="name">
                <el-input v-model="editInfo.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="年龄" :label-width="100" prop="age">
                <el-input v-model.number="editInfo.age" autocomplete="off" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="isShowEdit = false">取 消</el-button>
                <el-button type="primary" @click="editUserConfirm()">确认修改 </el-button>
            </div>
        </template>
    </el-dialog>

    <el-dialog v-model="isShowDel" center title="提示" width="30%">
        <div class="user-del-alert">确定删除当前用户吗？</div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="isShowDel = false">取消</el-button>
                <el-button type="primary" @click="delUserConfirm">删除</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
    import { getUserList, userEditInfo, userEnroll, userDel } from '@/http/api/user/user.api'
    import { CUserList, DelInfoInt, IUserList } from '@/types/user/userlist';
    import { onMounted, reactive,toRefs } from 'vue'
    import { ElMessage } from 'element-plus'
    import { userStoreInstance } from '@/store/user'
    import { storeToRefs } from 'pinia';
    import router from '@/router';
    const userStore = userStoreInstance()
    const { userInfo } = storeToRefs(userStore)

    const state = reactive(new CUserList());
    const { userList,isShowAdd,addUserForm,addUserFormRef,editInfo,editInfoFormRef,isShowEdit,isShowDel } = toRefs(state)
    
    //手机号码校验
    const checkUserName = (rule: any, value: any, callback: any) => {
        if (!value) {
            return callback(new Error('请输入手机号码'));
        }
        const regMobile = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
        if (regMobile.test(value)) {
            callback();
        }
        callback(new Error('请输入合法的手机号'));
    }
    const checkAge = (rule: any, value: any, callback: any) => {
        if (!value) {
            return callback(new Error('请输入年龄'));
        }
        if (!Number.isInteger(value)) {
            callback(new Error('请输入正确的年龄格式'));
        } else {
            callback();
        }
    }
    const rules = {
        username: [
            { validator: checkUserName, trigger: 'blur' },
            { required: true, message: '请输入手机号码', trigger: 'blur' }
        ],
        password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 24, message: '密码的长度在6-24个字符之间', trigger: 'blur' }
        ],
        name: [
            { required: true, message: '请输入昵称', trigger: 'blur' },
            { min: 2, max: 24, message: '昵称的长度在2-24个字符之间', trigger: 'blur' }
        ],
        age: [
            { required: true, message: '请输入年龄', trigger: 'blur' },
            { validator: checkAge, trigger: 'blur' }
        ]
    }
    const editrules = {
        username: [
            { validator: checkUserName, trigger: 'blur' },
            { required: true, message: '请输入手机号码', trigger: 'blur' }
        ],
        name: [
            { required: true, message: '请输入昵称', trigger: 'blur' },
            { min: 2, max: 24, message: '昵称的长度在2-24个字符之间', trigger: 'blur' }
        ],
        age: [
            { required: true, message: '请输入年龄', trigger: 'blur' },
            { validator: checkAge, trigger: 'blur' }
        ]
    }
    onMounted(() => {
        getList();
    })
    const getList = () => {
        getUserList().then(res => {
            state.userList = res.data;
            let index = state.userList?.findIndex((item=>item.id === userInfo.value.id))
            if(index === -1){
                userStore.LOG_OUT();
                ElMessage.error('账号出现错误，请重新登录');
                return setTimeout(() => {
                    router.replace({name: 'UserLogin'})
                }, 2000);
            }
        })
    }
    const editUser = (row: IUserList) => {
        state.editInfo = {
            id: row.id,
            username: row.username,
            name: row.name,
            age: row.age
        }
        state.isShowEdit = true
    }
    //确认编辑提交
    const editUserConfirm = () => {
        state.editInfoFormRef?.validate((valid: boolean) => {
            if (valid) {
                userEditInfo(state.editInfo).then(res => {
                    if (res.code === 200) {
                        if(state.editInfo.id === userInfo.value.id){
                            userStore.LOG_OUT();
                            ElMessage.warning('已修改当前用户信息，请重新登录');
                            return setTimeout(() => {
                                router.replace({name: 'UserLogin'})
                            }, 2000);
                        } 
                        getList();
                        ElMessage.success(res.msg)
                        state.isShowEdit = false
                    } else {
                        ElMessage.error(res.msg)
                    }
                }).catch(err => {
                    ElMessage.error(err.message)
                })
            }
        })
    }
    const delUser = (row: DelInfoInt) => {
        state.delInfo = {
            id: row.id
        }
        if(row.id === userInfo.value.id) return ElMessage.warning('当前登录用户不可删除');
        state.isShowDel = true 
    }
    //确认删除用户
    const delUserConfirm = () => {
        userDel(state.delInfo).then(res => {
            if (res.code === 200) {
                state.isShowDel = false
                getList();
                ElMessage.success(res.msg)
            } else {
                ElMessage.error(res.msg)
            }
        }).catch(err => {
            ElMessage.error(err.message)
        })
    }

    const openAddDialog = () => {
        state.addUserFormRef?.resetFields();
        state.isShowAdd = true;
    }
    const addUser = () => {
        state.addUserFormRef?.validate((valid: boolean) => {
            if (valid) {
                userEnroll(state.addUserForm).then(res => {
                    if (res.code === 200) {
                        getList();
                        ElMessage.success(res.msg)
                        state.isShowAdd = false
                    } else {
                        ElMessage.error(res.msg)
                    }
                }).catch(err => {
                    ElMessage.error(err.message)
                })
            }
        })
    }
</script>

<style lang="scss" scoped>
.user-list-btn {
    margin: 30px auto;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.add-form {
    width: 400px;
    margin: 0 auto;
}

.dialog-footer {
    margin: 0 auto 20px;

    button {
        margin: 0 50px;
    }
}

.user-del-alert {
    text-align: center;
}
</style>