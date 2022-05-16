<template>
    <el-container class="container">
        <el-header height="80px" style="width: 100%;">
            <el-row :gutter="20">
                <el-col :span="4">
                    <img class="logo" src="@/assets/logo.png" alt="logo">
                </el-col>
                <el-col :span="16">
                    <h2>后台管理系统</h2>
                </el-col>
                <el-col class="btn-text" :span="4">
                    <el-dropdown trigger="click">
                        <div class="el-dropdown-link">
                            <el-avatar :src="userInfo.avatar">{{ userInfo.avatar ? '' : userInfo.name }}</el-avatar>
                            <el-icon class="el-icon--right">
                                <arrow-down color="#fff" />
                            </el-icon>
                        </div>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item @click="dialogVisible = true">注销登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </el-col>
            </el-row>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <el-menu router active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo"
                    :default-active="menuGroupList[0].parent_title" text-color="#fff">
                    <el-sub-menu :index="i.parent_title" v-for="i in menuGroupList">
                        <template #title>
                            <el-icon>
                                <avatar />
                            </el-icon>
                            <span>{{ i.parent_title }}</span>
                        </template>
                        <el-menu-item v-for="j in i.children" :key="j.path" :route="j" :index="j.path">
                            <i v-if="j.meta.icon && j.meta.icon.includes('el-icon')" :class="j.meta.icon"></i>
                            <component class="icons" :is="j.meta.icon"></component>
                            <span>{{ j.meta.title }}</span>
                        </el-menu-item>
                    </el-sub-menu>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view />
            </el-main>
        </el-container>
    </el-container>
    <el-dialog v-model="dialogVisible" title="提示" width="30%">
        <span>确定退出登录当前用户？</span>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="LogOut">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
    import { useRouter } from "vue-router";
    import { MENU_GROUP } from '@/enum/home/home'
    import { userStoreInstance } from '@/store/user'
    import { storeToRefs } from 'pinia';
    import { ref } from "vue";

    const router = useRouter();

    const userStore = userStoreInstance()
    const list = router.getRoutes().filter(v => v.meta.group)
    let menuGroupList: any[] = []
    for (const key in MENU_GROUP) {
        const keyToAny: any = key
        const obj = {
            parent_group: keyToAny,
            parent_title: MENU_GROUP[keyToAny],
            children: list.filter(item => item.meta.group == keyToAny)
        }
        menuGroupList.push(obj)
    }
    const { userInfo } = storeToRefs(userStore)
    const dialogVisible = ref(false)

    const LogOut = () => {
        userStore.LOG_OUT();
        dialogVisible.value = false
        setTimeout(() => {
            router.replace({
                name: 'UserLogin'
            })
        }, 1000);
    }
</script>

<style lang="scss" scoped>
.container {
    .logo {
        height: 40px;
        padding: 20px;
    }

    h2 {
        text-align: center;
        color: white;
        height: 80px;
        line-height: 80px;
    }

    .btn-text {
        display: flex;
        align-items: center;
        justify-content: flex-end;

        .el-dropdown-link {
            cursor: pointer;
            // color: var(--el-color-primary);
            color: white;
            display: flex;
            align-items: center;
        }

        .el-icon--right {
            margin-left: 15px;
        }
    }

    .el-header {
        background-color: #545c64;
    }

    .el-aside {
        .el-menu {
            height: calc(100vh - 80px);
        }
    }

    //图标样式
    .icons {
        height: 1em;
        width: 1em;
        line-height: 1em;
        margin-right: 5px;
    }


}
</style>