<template>
    <el-row justify="space-between">
        <el-col :span="3">
            <el-button type="primary">添加</el-button>
            <el-button type="danger">批量删除</el-button>
        </el-col>
        <el-col :span="3">
            <el-input v-model="input1" class="list-input" placeholder="请输入用户名" />
            <el-button type="primary">查询</el-button>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    const input1 = ref('');
</script>

<style lang="scss" scoped>
.el-col{
    padding: 20px;
}
.list-input {
    width: 10rem;
    margin-right: 20px;
}
</style>