<script setup lang="ts">
import { ref, reactive, onMounted, computed } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useRequest } from '@/hooks'
import { UserInteractService } from '@/service/modules/interact.ts'
import { AlarmClock, Clock, Delete, Search } from '@element-plus/icons-vue'
import HamiScrollList from '@/components/common/HamiScrollList.vue'
import { $message } from '@/utils/message.ts'
import { ReadingRecordService } from '@/service/modules/interact.ts'
import { isEmpty } from '@/utils'
import { HamiScrollListInstance } from '@/components/types'
//interface

// @ts-ignore
const readingRecordList = ref<HamiScrollListInstance<ReadingRecord>>()

const keyword = ref("")
onMounted(() => {
    readingRecordList.value?.init()
})
const clearRecords = async () => {
    try {
        await $message.confirm("清空之后就什么都没有了哦~")
        await ReadingRecordService.clearReadingRecords()
        location.reload()
    }  catch (e) {
        if (e === 'cancel') return
        $message.error("操作失败")
    }
}

const handleDeleteRecord = async (item: ReadingRecord, index: number) => {
    try {
        console.log(item, index)
        await ReadingRecordService.deleteReadingRecord(item.id)
        readingRecordList.value?.deleteItem(item, index)
        $message.success("删除成功")
    } catch (e) {

    }
}

const handleQuery = (current: number, size: number) => {
    return ReadingRecordService.listReadingRecord({
        pageSize: size,
        pageNum: current,
        keyword: keyword.value
    })
}

const handleSearch = async () => {
    console.log("search")
    if (isEmpty(keyword.value)) {
        return
    }
    readingRecordList.value.init()
}

const highlight = computed(() => {
    return !isEmpty(keyword.value)
})

</script>
<template>
    <div class="hami-reading-record">
        <div class="reading-record-container container">
            <div class="reading-record-header">
                <div class="left-panel">
                    <el-icon size="22">
                        <AlarmClock/>
                    </el-icon>
                    <span class="text">阅读记录</span>
                </div>
                <div class="right-panel">
                    <el-input placeholder="请输入标题关键字" maxlength="8" v-model="keyword">
                        <template #suffix>
                            <el-icon @click="handleSearch">
                                <Search></Search>
                            </el-icon>
                        </template>
                    </el-input>
                    <el-button type="primary" plain @click="clearRecords">清空记录</el-button>
                </div>
            </div>
            <div class="reading-record-body">
                <HamiScrollList
                    ref="readingRecordList"
                    :size="20"
                    :query="handleQuery"
                    :immediate-loading="true"
                    :show-no-more="false"
                    key-property="articleId"
                    no-data-text="还没有阅读记录"
                    timeline
                    timestamp-key="readingTime"
                >
                    <template #item="{item, index, _delete}">
                        <HamiArticleCard
                            :article="item.content"
                            reverse
                            border
                            :highlight-title="highlight"
                        >
                            <template #item="article">
                                <div class="option-item" @click="handleDeleteRecord(item, index)">
                                    <el-icon size="14">
                                        <Delete/>
                                    </el-icon>
                                    <span class="text">删除</span>
                                </div>
                            </template>
                        </HamiArticleCard>
                    </template>
                </HamiScrollList>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">

.hami-reading-record {
    margin-top: 32px;

    .reading-record-container {
        border-radius: var(--hami-radius);
        background-color: var(--hami-bg);
    }

    .reading-record-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px;

        .left-panel {
            display: flex;
            align-items: center;
            color: var(--hami-brand);

            i {
                position: relative;
                top: 1px;
            }
        }

        .text {
            font-size: 20px;
            font-weight: 700;
            color: var(--hami-text-9);
            margin-left: 10px;
        }

        .right-panel {
            display: flex;
            button {
                width: 120px;
            }
            .el-input {
                margin-right: 16px;
            }
            :deep(input) {
                width: 100px;
            }
            .el-icon {
                cursor: pointer;
            }
        }
    }

    .reading-record-body {
        padding: 16px;
        margin-bottom: 20px;

        .option-item {
            display: flex;
            align-items: center;
            opacity: 0;
            transition: opacity .3s;
            margin-right: 6px;

            .text {
                font-size: 14px;
                margin-left: 4px;
            }

            &:hover {
                color: var(--hami-text-blue);
            }
        }

        .hami-article-card:hover {
            background-color: #f7f8fa;
            border-radius: var(--hami-radius);
        }

        .hami-article-card:hover .option-item {
            opacity: 1;
        }
    }
}
</style>