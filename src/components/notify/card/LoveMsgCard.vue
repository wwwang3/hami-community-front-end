<script setup lang="ts">
import { computed } from "vue"
import { formatDateTime, isEmpty } from '@/utils'
import { defaultAvatar } from "@/store/images.ts"
import { Delete } from '@element-plus/icons-vue'
import { useEmojiParse } from 'undraw-ui'
import emoji from '@/components/comment/emoji.ts'
import { useDeleteMsg } from '@/components/notify/hooks'

interface LoveMsgProps {
    notify: NotifyMsg
}

const $emit = defineEmits<{
    (e: 'delete'): void
}>()


const $props = defineProps<LoveMsgProps>()

const username = $props.notify.sender.name
const avatar = $props.notify.sender.image

// `用户名`赞了你的文章《`文章标题`》
// `用户名`收藏了你的文章《`文章标题`》
// `用户名`赞了了你在文章《`文章标题`》下的评论
//`评论内容`


//评论内容
const detail = $props.notify.itemInfo.detail
//文章标题
const title = $props.notify.relatedInfo.name
//文章Id
const relatedId = $props.notify.relatedInfo.id

//评论内容(如果有)
const comment = computed(() => {
    //parse emoji
    return !isEmpty(detail) ? useEmojiParse(emoji.allEmoji, detail[0]) : ''
})

const spaceLink = computed(() => {
    return "/user/space/" + $props.notify.sender.id
})

const articleLink = computed(() => {
    return "/article/" + relatedId
})

const prefix = computed(() => {
    return $props.notify.type == 3 || $props.notify.type == 4 ? "赞了" : "收藏了"
})

</script>
<template>
    <div class="notify-card love-notify-card">
        <div class="entry">
            <router-link :to="spaceLink" class="left-panel">
                <el-avatar :src="avatar || defaultAvatar" :size="64"></el-avatar>
            </router-link>
            <div class="right-panel">
                <div class="info">
                    <div class="line-1">
                        <router-link :to="spaceLink" class="line-item username link">
                            {{ username }}
                        </router-link>
                        <div class="line-item">{{ prefix }}</div>
                        <template v-if="comment.length === 0">
                            <div class="line-item">你的文章</div>
                            <router-link :to="articleLink" class="line-item title">
                                「{{ title }}」
                            </router-link>
                        </template>
                        <template v-else>
                            <div class="line-item">你在文章</div>
                            <router-link :to="articleLink" class="line-item title">
                                「{{ title }}」
                            </router-link>
                            <div class="line-item">下的评论</div>
                        </template>
                    </div>
                    <div class="line-3" v-html="comment" v-if="comment.length > 0"></div>
                </div>
                <div class="option">
                    <div class="time">{{ formatDateTime(notify.ctime) }}</div>
                    <div class="delete" @click="useDeleteMsg(notify.id, $emit, $event)">
                        <el-icon>
                            <Delete/>
                        </el-icon>
                        刪除该通知
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.love-notify-card {
    margin-bottom: 10px;

    &:hover {
        .delete {
            display: flex;
            align-items: center;
        }
    }

    .delete {
        display: none;
    }

    .entry {
        display: flex;
    }

    .left-panel {
        display: flex;
        margin-right: 10px;
    }

    .right-panel {
        flex: 1;
    }

    .line-1 {
        color: var(--hami-grey-8);
        display: flex;
        align-items: center;

        .line-item {
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: break-word;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            font-size: 16px;
            line-height: 24px;
            height: 24px;
        }

        .username {
            color: var(--hami-text-common);
            font-weight: 600;
            margin-right: 6px;
        }

        .link:hover {
            color: var(--hami-blue-5);
            text-decoration: underline;
        }

        .title {
            color: var(--hami-blue-1);
        }

        .title:hover {
            text-decoration: underline;
        }
    }

    .line-2 {
        font-size: 16px;
        font-weight: 400;
        margin-top: 8px;
        color: var(--hami-black-5);
        line-height: 28px;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }

    .line-3 {

        &::before {
            content: " ";
            position: absolute;
            width: 2px;
            top: 4px;
            bottom: 4px;
            left: 0;
            background: #c2c8d1;
        }

        margin-top: 8px;
        color: var(--hami-card-text-color);
        font-size: 16px;
        font-weight: 400;
        line-height: 28px;
        position: relative;
        padding-left: 10px;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }

    .option {
        display: flex;
        align-items: center;
        padding-top: 10px;
        font-size: 14px;
        color: var(--hami-grey-1);
        height: 24px;
        box-sizing: content-box;

        .delete {

            i {
                margin-right: 4px;
            }

            pointer-events: auto;
            margin-left: 6px;

            &:hover {
                color: var(--hami-blue-5);
            }
        }
    }

}

</style>