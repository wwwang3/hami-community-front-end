<script setup lang="ts">
import { Delete } from '@element-plus/icons-vue'
import { HamiScrollListInstance } from '@/components/types'
import { $message } from '@/utils'

interface DeleteOperateProps {
    article: Article
    listRef: HamiScrollListInstance<Article>
    msg?: string,
    showConfirm?: boolean
}

const $props = withDefaults(defineProps<DeleteOperateProps>(), {
    msg: "确定删除该文章?",
    showConfirm: false
})
const $emit = defineEmits<{
    (e: 'delete', article: Article, finish: () => void): void
}>()

const handleClick = () => {
    if ($props.showConfirm) {
        $message.confirm($props.msg ?? "确定删除该文章?")
            .then(() => {
                $emit("delete", $props.article, () => {
                    $props.listRef?.delete($props.article.id)
                })
            }).catch(e => {})
    } else {
        $emit("delete", $props.article, () => {
            $props.listRef?.delete($props.article.id)
        })
    }
}

</script>
<template>
    <div class="delete-option-item" @click="handleClick()">
        <el-icon size="14">
            <Delete/>
        </el-icon>
        <span class="text">删除</span>
    </div>
</template>

<style lang="less">

.hami-article-card:hover .delete-option-item {
    opacity: 1;
}
</style>

<style scoped lang="less">
.delete-option-item {
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
        color: var(--hami-text-hover-color);
    }
}
</style>