<script setup lang="ts">
import { useRoute, useRouter } from "vue-router"
import { formatDateTime, isEmpty } from '@/utils'
import { $message } from '@/utils/message.ts'
import { MoreFilled } from '@element-plus/icons-vue'

interface CardProps {
    draft: ArticleDraftDetail,
    index: number
}

const $router = useRouter()
const $route = useRoute()
const $props = defineProps<CardProps>()
const $emit = defineEmits<{
    (e: "delete", item: ArticleDraftDetail, index: number): any
}>()
//watch
const handleEdit = async () => {
    await $router.replace("/editor/drafts/" + $props.draft?.id)
}
//fun
const handleDelete = async () => {
    $message.confirm("删除后不可恢复,确定删除?")
        .then(() => {
            $emit("delete", $props.draft, $props.index)
        }).catch()
}

</script>
<template>
    <div class="hami-draft-card">
        <div class="card-container">
            <div class="card-header">
                <div class="title">{{ $props.draft.title || "无标题" }}</div>
                <div class="dropdown">
                    <el-popover
                        :width="100"
                        trigger="click"
                        :teleported="false"
                    >
                        <template #reference>
                            <el-icon :size="18">
                                <MoreFilled/>
                            </el-icon>
                        </template>
                        <template #default>
                            <div class="card-dropdown">
                                <el-button text type="primary" @click="handleEdit">编辑</el-button>
                                <el-button text type="danger" @click="handleDelete">删除</el-button>
                            </div>
                        </template>
                    </el-popover>
                </div>
            </div>
            <div class="card-body">
                <div class="ctime" v-if="!isEmpty($props.draft.ctime)">
                    创建时间: {{ formatDateTime($props.draft.ctime as Date) }}
                </div>
                <div class="divider" v-if="!isEmpty($props.draft.ctime) && !isEmpty($props.draft.mtime)">·</div>
                <div class="mtime" v-if="!isEmpty($props.draft.mtime)">
                    最后更新于: {{ formatDateTime($props.draft.mtime as Date) }}
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.hami-draft-card {
    padding: 0 20px;
    background-color: var(--hami-card-bg);
    color: var(--hami-card-text-color);
    cursor: pointer;

    .card-container {
        border-bottom: 1px solid var(--el-border-color);
        padding: 10px 0;
    }

    &:hover {
        background-color: var(--hami-card-hover-bg);
    }

    .card-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;

        .title {
            font-size: 16px;
            color: var(--hami-title-color);
        }

        .dropdown {
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        }
    }

    .card-body {
        display: flex;
        font-size: 14px;
        align-items: center;

        .divider {
            margin: 0 8px;
            font-weight: 600;
        }

        .ctime, .mtime {
            height: 24px;
            line-height: 24px;
        }
    }
}
</style>
<style>
.card-dropdown {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 0;

    .el-button + .el-button {
        margin-left: 0;
        margin-top: 4px;
    }

    .el-button {
        width: 80px;
    }
}
</style>