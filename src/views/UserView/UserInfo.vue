<template>
    <el-card class="info-card" shadow="always">
        <el-descriptions title="个人信息">
            <el-descriptions-item label="手机号码">{{userInfo.username}}</el-descriptions-item>
            <el-descriptions-item label="昵称">{{userInfo.name}}</el-descriptions-item>
            <el-descriptions-item label="年龄">{{userInfo.age}}</el-descriptions-item>
            <el-descriptions-item label="创建时间">
                <el-tag size="small">{{userInfo.create_time}}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="最后登录时间">
                <el-tag size="small">{{userInfo.update_time}}</el-tag>
            </el-descriptions-item>
        </el-descriptions>
    </el-card>
</template>

<script setup lang="ts">
    import { userStoreInstance } from '@/store/user'
    import { storeToRefs } from 'pinia';
    const userStore = userStoreInstance()
    const { userInfo } = storeToRefs(userStore)

</script>

<style lang="scss">
.info-card {
    padding: 20px;
    width: 800px;
    margin: auto;
    .el-descriptions__cell{
        height: 80px;
        line-height: 80px;
    }
}
</style>