<script setup lang="ts">
import {ref} from "vue"
import { formatTime } from 'element-plus/es/components/countdown/src/utils'
import { formatDateTime } from '@/utils'
//interface
interface LoginRecord {
    loginTime: string | Date,
    ipAddress: string,
    location: string,
}
//router, props, inject, provide

//custom var
const records = ref<Array<LoginRecord>>([
    {
        loginTime: formatDateTime(Date.now()),
        ipAddress: "127.0.0.1",
        location: "南极"
    },
    {
        loginTime: formatDateTime(Date.now()),
        ipAddress: "127.0.0.1",
        location: "南极"
    },
    {
        loginTime: formatDateTime(Date.now()),
        ipAddress: "127.0.0.1",
        location: "南极"
    }
])
//life cycle

//watch

//fun

</script>
<template>
    <div class="hami-login-record">
        <div class="login-record-title">
            登录记录
        </div>
        <el-divider></el-divider>
        <div class="login-record-body">
            <el-table :data="records"
                      style="width: 75%"
                      max-height="640"
                      header-row-class-name="login-record-header"
                      stripe>
                <el-table-column prop="loginTime" label="登录时间" width="180" />
                <el-table-column prop="ipAddress" label="IP地址" width="180" />
                <el-table-column prop="location" label="地理位置" />
            </el-table>
        </div>
    </div>
</template>

<style scoped lang="less">
.hami-login-record {
    padding: 20px 24px;
    background-color: var(--hami-bg);
    border-radius: var(--hami-radius-medium);
    color: var(--hami-text);
    .login-record-title {
        font-size: 18px;
        font-weight: 700;
        color: var(--hami-title);
    }
    .login-record-body {
        margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        :deep(.cell) {
            text-align: center;
        }
        :deep(.login-record-header th.el-table__cell) {
            background-color: var(--hami-text-2);
            color: var(--hami-text-1)
        }
        :deep(.el-table__body td.el-table__cell) {
            //background-color: var(--hami-text-3);
            color: var(--hami-text-2)
        }
        //:deep()
    }
}
</style>