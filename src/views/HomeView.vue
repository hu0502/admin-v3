<template>
    <el-container class="container">
        <el-header height="80px">
            <el-row :gutter="20">
                <el-col :span="4">
                    <img class="logo" src="@/assets/logo.png" alt="logo">
                </el-col>
                <el-col :span="16">
                    <h2>后台管理系统</h2>
                </el-col>
                <el-col class="btn-text" :span="4">
                    <el-button type="text">Five</el-button>
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
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from "vue-router";
import { MENU_GROUP } from '@/enum/home/home'

export default defineComponent({
    name: 'HomeView',
    setup() {
        const router = useRouter();
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

        return {
            list,
            menuGroupList
        }
    }

})

</script>

<style lang="scss" scoped>
.container {
    .logo {
        height: 40px;
        padding: 20px;
    }

    h2 {
        text-align: center;
        color: #fff;
        height: 80px;
        line-height: 80px;
    }

    .btn-text {
        text-align: right;
        height: 80px;
        line-height: 80px;
        padding-right: 100px;

        .el-button--text {
            color: #fff;
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
    .icons{
        height: 1em;
        width: 1em;
        line-height: 1em;
        margin-right: 5px;
    }
}
</style>