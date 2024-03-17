<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import { ReadingRecordService } from '@/service/modules/interact.ts'
import { AlarmClock, CircleClose, Delete, Search } from '@element-plus/icons-vue'
import { $message } from '@/utils/message.ts'
import { isEmpty } from '@/utils'
import HamiScrollList from '@/components/common/HamiScrollList.vue'
import { HamiScrollListInstance } from '@/components/types'

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
    } catch (e) {
        if (e === 'cancel') return
        $message.error("操作失败")
    }
}

const handleDeleteRecord = async (item: ReadingRecord, index: number) => {
    try {
        await ReadingRecordService.deleteReadingRecord(item.id)
        readingRecordList.value?.deleteItem(item, index)
        $message.success("删除成功")
    } catch (e) {

    }
}

const handleQuery = (current: number, size: number) => {
    return ReadingRecordService.listReadingRecord({
        current: current,
        size: size,
        keyword: keyword.value || undefined
    })
}

const handleSearch = async () => {
    readingRecordList.value.init()
}

const highlight = computed(() => {
    return !isEmpty(keyword.value)
})

const clearKeyword = () => {
    keyword.value = ''
    readingRecordList.value.init()
}

</script>
<template>
    <div class="hami-reading-record">
        <div class="container">
            <div class="card">
                <div class="reading-record-header">
                    <div class="left-panel">
                        <el-icon size="22">
                            <AlarmClock/>
                        </el-icon>
                        <span class="text">阅读记录</span>
                    </div>
                    <div class="right-panel">
                        <el-input placeholder="请输入标题关键字" maxlength="8" v-model="keyword" class="search-item">
                            <template #suffix>
                                <el-icon @click="clearKeyword" v-if="keyword.length > 0" class="clear">
                                    <CircleClose/>
                                </el-icon>
                                <el-button
                                    type="info"
                                    :icon="Search"
                                    @click="handleSearch"
                                    :disabled="keyword.length <= 1" size="small" class="search-btn">
                                </el-button>
                            </template>
                        </el-input>
                        <el-button type="primary" plain @click="clearRecords" class="clear-item">清空记录</el-button>
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
                            <CommonArticleCard
                                :article="item.content"
                                reverse
                                border
                                :highlight-title="highlight"
                            >
                                <template #top="article">
                                    <div class="option-item" @click="handleDeleteRecord(item, index)">
                                        <el-icon size="14">
                                            <Delete/>
                                        </el-icon>
                                        <span class="text">删除</span>
                                    </div>
                                </template>
                            </CommonArticleCard>
                        </template>
                    </HamiScrollList>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">

.hami-reading-record {
    margin-top: 32px;

    .reading-record-container {
        border-radius: var(--hami-radius);
        background-color: var(--hami-card-bg);
    }

    .container {
        margin-bottom: 20px;
    }

    .reading-record-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px;

        .left-panel {
            display: flex;
            align-items: center;
            color: var(--hami-blue-2);

            i {
                position: relative;
                top: 1px;
            }
        }

        .text {
            font-size: 20px;
            font-weight: 700;
            color: var(--hami-title-color);
            margin-left: 10px;
        }

        .right-panel {
            display: flex;

            .search-item {
                margin-right: 16px;
                width: 200px;
                position: relative;
            }

            .clear-btn {
                button {
                    width: 120px;
                }
            }

            .el-icon {
                cursor: pointer;
            }

            :deep(.clear) {
                margin-right: 10px;
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
                color: var(--hami-blue-3);
            }
        }

        .hami-article-card:hover {
            background-color: var(--hami-card-hover-bg);
            border-radius: var(--hami-radius);
        }

        .hami-article-card:hover .option-item {
            opacity: 1;
        }
    }
}
</style>