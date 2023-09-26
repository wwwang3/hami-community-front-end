<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import { formatDateTime, isEmpty } from '@/utils'
import { useRequest } from '@/hooks'
import UserService from '@/service/modules/user.ts'
import HamiEmpty from '@/components/common/HamiEmpty.vue'

//interface
interface Page {
    current: number
    size: number
    total: number
}

//router, props, inject, provide

//custom var
const page = ref<Page>({
    current: 1,
    size: 8,
    total: 0
})
computed(() => {
    return page.value.current < Math.ceil(page.value.total / page.value.size)
})
const [onRequest, getLoginRecords] = useRequest({
    run: (...params) => {
        return UserService.getLoginRecords({
            pageNum: page.value.current,
            pageSize: page.value.size
        })
    }
})
const records = ref<LoginRecord[]>([] as LoginRecord[])
const inited = ref(false)
//life cycle
onMounted(async () => {
    try {
        inited.value = false
        let pageData = await getLoginRecords(null)
        page.value.total = pageData.total
        records.value = pageData.data as LoginRecord[]
    } catch (e) {
        console.log(e)
        records.value = []
    } finally {
        inited.value = true
    }
})
//watch

//fun
const calculateLocation = (ipInfo: IpInfo) => {
    if (isEmpty(ipInfo)) return "未知"
    let location = ""
    if (!isEmpty(ipInfo.country)) {
        location = location + ipInfo.country + '-'
    }
    if (ipInfo.province) {
        location = location + ipInfo.province + '-'
    }
    if (ipInfo.city) {
        location += ipInfo.city
    }
    return location;
}
const calculateIp = (ipInfo: IpInfo) => {
    console.log(ipInfo)
    if (isEmpty(ipInfo)) {
        return "未知IP属地"
    }
    return isEmpty(ipInfo.ip) ? "未知IP属地" : ipInfo.ip
}
const handleChange = async (val: number) => {
    try {
        console.log(page.value.current)
        let pageData = await getLoginRecords(null)
        records.value = pageData.data as LoginRecord[]
    } catch (e) {
        records.value = []
    }
}

const formatTime = (time: number) => {
    let date = new Date(time)
    // console.log(time)
    return formatDateTime(date)
}

</script>
<template>
    <div class="hami-login-record">
        <div class="login-record-title">
            登录记录
        </div>
        <el-divider></el-divider>
        <div class="login-record-body">
            <el-skeleton v-if="onRequest" :rows="5"></el-skeleton>
            <transition name="el-fade-in-linear">
                <el-table :data="records"
                          max-height="640"
                          header-row-class-name="login-record-header"
                          stripe
                          v-if="!onRequest"
                >
                    <el-table-column label="登录时间" width="280">
                        <template #default="{row, column, $index}">
                            {{ formatTime(row.loginTime) }}
                        </template>
                    </el-table-column>
                    <el-table-column label="IP地址" width="240">
                        <template #default="{row, column, $index}">
                            {{ calculateIp(row.ipInfo) }}
                        </template>
                    </el-table-column>
                    <el-table-column label="地理位置">
                        <template #default="{row, column, $index}">
                            {{ calculateLocation(row.ipInfo) }}
                        </template>
                    </el-table-column>
                    <template #empty>
                        <HamiEmpty></HamiEmpty>
                    </template>
                </el-table>
            </transition>
        </div>
        <div class="page">
            <el-pagination
                :page-size="page.size"
                :total="page.total"
                v-model:current-page="page.current"
                @update:current-page="handleChange"
                layout="prev, pager, next"
                background
                v-if="inited"
            >
            </el-pagination>
        </div>
    </div>
</template>

<style scoped lang="less">
.hami-login-record {
    padding: 20px 24px;
    background-color: var(--hami-bg);
    border-radius: var(--hami-radius-medium);
    color: var(--hami-text);
    min-height: 500px;
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
            background-color: var(--hami-bg-gray);
            color: var(--hami-text-1)
        }

        :deep(.el-table__body td.el-table__cell) {
            //background-color: var(--hami-text-3);
            color: var(--hami-text-2)
        }

        //:deep()
    }

    .page {
        margin-top: 20px;

    }
}
</style>