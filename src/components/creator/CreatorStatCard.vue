<script setup lang="ts">
import { CaretBottom, CaretTop } from '@element-plus/icons-vue'
import { isEmpty } from '@/utils'
import { UCounter } from 'undraw-ui'

interface StatCardProps {
    title: string,
    value: number | undefined
    incr: number | null | undefined
}

const $props = withDefaults(defineProps<StatCardProps>(), {
    value: 0,
    incr: 0
})

const changed = (value: number | null | undefined) => {
    return !isEmpty(value) && value != 0
}

const up = (value: number) => {
    return value > 0
}

</script>
<template>
    <div class="hami-stat-card">
        <div class="stat-title">{{ title }}</div>
        <u-counter :start-amount="0" :end-amount="value" class="count"></u-counter>
        <div class="footer">
            <span class="text">较昨日</span>
            <template v-if="changed(incr)">
                <div class="var-box incr" v-if="up(incr!)">
                    <el-icon class="icon">
                        <CaretTop></CaretTop>
                    </el-icon>
                    <span class="var">{{ incr }}</span>
                </div>
                <div v-else class="var-box down">
                    <el-icon class="icon">
                        <CaretBottom></CaretBottom>
                    </el-icon>
                    <span class="var">{{ -incr! }}</span>
                </div>
            </template>
            <template v-else>
                <span class="var">--</span>
            </template>
        </div>
    </div>
</template>

<style scoped lang="less">
.hami-stat-card {

    .stat-title {
        color: var(--hami-text-3);
        height: 24px;
        font-size: 14px;
    }

    .count {
        color: var(--hami-text-1);
        font-weight: 600;
        font-size: 32px;
        line-height: 42px;
        margin-bottom: 4px;
        white-space: nowrap;
    }

    .footer {
        display: flex;
        align-items: center;

        .icon {
            margin-left: 3px;
        }

        .text {
            font-size: 13px;
            color: var(--hami-grey-1);
        }

        .var-box {
            display: flex;
            align-items: center;
        }

        .var-box.incr {
            color: var(--hami-blue-3);
        }

        .var-box.down {
            color: var(--hami-red-1);
        }

        .var {
            font-size: 14px;
            margin-left: 4px;
            white-space: nowrap;
        }
    }
}
</style>