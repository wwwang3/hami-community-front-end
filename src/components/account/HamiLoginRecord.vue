<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import { $message, calculateLocation, formatDateTime, isEmpty } from '@/utils'
import { useRequest } from '@/hooks'
import { AccountService } from '@/service/modules/user.ts'
import HamiEmpty from '@/components/common/HamiEmpty.vue'

interface Page {
    current: number
    size: number
    total: number
}

const page = ref<Page>({
    current: 1,
    size: 7,
    total: 0
})

computed(() => {
    return page.value.current < Math.ceil(page.value.total / page.value.size)
})

const [onRequest, getLoginRecords] = useRequest<PageData<LoginRecord>, [PageParam]>({
    run: (...params) => AccountService.getLoginRecords(...params)
})
const records = ref<LoginRecord[]>([] as LoginRecord[])
const inited = ref(false)

onMounted(async () => {
    try {
        inited.value = false
        let pageData = await getLoginRecords({
            current: page.value.size,
            size: page.value.current
        })
        page.value.total = pageData.total
        records.value = pageData.data as LoginRecord[]
    } catch (e) {
        $message.error("加载失败~")
        records.value = []
    } finally {
        inited.value = true
    }
})


const calculateIp = (ipInfo: IpInfo) => {
    if (isEmpty(ipInfo)) {
        return "未知IP属地"
    }
    return isEmpty(ipInfo.ip) ? "未知IP属地" : ipInfo.ip
}
const handleChange = async (_val: number) => {
    try {
        let pageData = await getLoginRecords({
            current: page.value.size,
            size: page.value.current
        })
        records.value = pageData.data as LoginRecord[]
    } catch (e) {
        records.value = []
    }
}

const formatTime = (time: number) => {
    let date = new Date(time)
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
            <el-skeleton v-if="onRequest" :rows="4"></el-skeleton>
            <transition name="el-fade-in-linear">
                <el-table :data="records"
                          max-height="320"
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
    min-height: 500px;
    height: 500px;

    .el-divider {
        margin: 23px 0;
    }

    .login-record-title {
        font-size: 18px;
        font-weight: 700;
        color: var(--hami-title-color);
    }

    .login-record-body {
        display: flex;
        align-items: center;
        justify-content: center;

        :deep(.cell) {
            text-align: center;
        }

        :deep(.login-record-header th.el-table__cell) {
            background-color: var(--hami-white-1);
            color: var(--hami-grey-6);
        }

        :deep(.el-table__body td.el-table__cell) {
            color: var(--hami-grey-2);
        }

    }

    .page {
        margin-top: 20px;
    }
}
</style>