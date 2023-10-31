<script setup lang="ts">
import { ref, reactive, onMounted, computed } from "vue"
import { useRoute, useRouter } from "vue-router"
import { formatDateTime, isEmpty } from '@/utils'
import { $message } from '@/utils/message.ts'
import { MoreFilled } from '@element-plus/icons-vue'

//interface
interface CardProps {
    article: ArticleDraftDetail,
    index: number
}

//router, props, inject, provide
const $router = useRouter()
const $route = useRoute()
//custom var
const $props = defineProps<CardProps>()
//life cycle
const $emit = defineEmits<{
    (e: "delete", item: ArticleDraftDetail, index: number): any
}>()
//watch
const handleEdit = async () => {
    console.log($props.article)
    await $router.replace("/editor/drafts/" + $props.article.id)
}
//fun
const handleDelete = async () => {
    $message.confirm("删除后不可恢复,确定删除?")
        .then(() => {
            $emit("delete", $props.article, $props.index)
        })
        .catch((e) => {
            console.log(e)
        })
}

</script>
<template>
    <div class="hami-article-card-v1">
        <div class="card-container">
            <div class="card-header">
                <div class="title">{{ $props.article.title || "无标题" }}</div>
                <div class="dropdown">
                    <el-popover
                        :width="100"
                        trigger="click"
                        :teleported="false"
                        popper-class="card-dropdown"
                    >
                        <template #reference>
                            <el-icon :size="18">
                                <MoreFilled/>
                            </el-icon>
                        </template>
                        <template #default>
                            <el-button text type="primary" @click="handleEdit">编辑</el-button>
                            <el-button text type="danger" @click="handleDelete">删除</el-button>
                        </template>
                    </el-popover>
                </div>
            </div>
            <div class="card-body">
                <div class="ctime" v-if="!isEmpty($props.article.ctime)">创建时间:
                    {{ formatDateTime($props.article.ctime as Date) }}</div>
                <div class="divider" v-if="!isEmpty($props.article.ctime) && !isEmpty($props.article.mtime)">·</div>
                <div class="mtime" v-if="!isEmpty($props.article.mtime)">最后更新于:
                    {{ formatDateTime($props.article.mtime as Date) }}</div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.hami-article-card-v1 {
    padding: 0 20px;
    background-color: var(--hami-card-bg);
    color: var(--hami-card-text);
    cursor: pointer;
    .card-container {
        border-bottom: 1px solid #e5e6eb;
        padding: 10px 0;
    }

    &:hover {
        background-color: var(--hami-card-hover);
    }

    .card-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;

        .title {
            font-size: 18px;
            color: var(--hami-title);
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
    min-width: 100px !important;

    .el-button + .el-button {
        margin-left: 0;
        margin-top: 4px;
    }

    .el-button {
        width: 80px;
    }
}
</style>