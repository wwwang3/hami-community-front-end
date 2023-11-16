<script setup lang="ts">
import { computed } from "vue"
import { $message, formatDateTime, isEmpty } from '@/utils'
import defaultAvatar from "/assets/avatar.jpg"
import { Delete } from '@element-plus/icons-vue'
import { NotifyService } from '@/service/modules/notify.ts'
import { useEmojiParse } from 'undraw-ui'
import emoji from '@/components/comment/emoji.ts'
import { useDeleteMsg } from '@/components/notify/hooks'

interface ReplyMsgProps {
    notify: NotifyMsg
}

const $emit = defineEmits<{
    (e: 'delete'): void
}>()


const $props = defineProps<ReplyMsgProps>()


const username = $props.notify.sender.name
const avatar = $props.notify.sender.image

// `用户名`评论了你的文章《`文章标题`》
// `评论内容`
// `用户名`回复了你在文章《`文章标题`》下的评论
//`回复内容`
//评论内容

//内容
const details = JSON.parse($props.notify.itemInfo.detail) as [string, string]

//评论内容
const comment = computed(() => {
    //parse emoji
    return !isEmpty(details) ? useEmojiParse(emoji.allEmoji, details[0]) : ''
})

//回复内容 可能为空
const reply = computed(() => {
    //parse emoji
    return (isEmpty(details) || details.length < 2) ? '' : useEmojiParse(emoji.allEmoji, details[1])
})

//文章标题
const title = $props.notify.relatedInfo.name

//文章Id
const relatedId = $props.notify.relatedInfo.id

const spaceLink = computed(() => {
    return "/user/space/" + $props.notify.sender.id
})

const articleLink = computed(() => {
    return "/article/" + relatedId
})


const handleDelete = async (msg_id: number | string, $event: Event) => {
    $event.preventDefault()
    try {
        await $message.confirm("确定删除该通知?", "删除")
        await NotifyService.deleteNotify(msg_id as number)
        $emit("delete")
        $message.success("删除成功")
    } catch (e) {
        if (e === 'cancel') return
        $message.error("操作失败")
    }
}

</script>
<template>
    <div class="notify-card reply-notify-card">
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
                        <template v-if="reply.length === 0">
                            <div class="line-item">评论了你的文章</div>
                            <router-link :to="articleLink" class="line-item title">
                                「{{ title }}」
                            </router-link>
                        </template>
                        <template v-else>
                            <div class="line-item">回复了你在文章</div>
                            <router-link :to="articleLink" class="line-item title">
                                「{{ title }}」
                            </router-link>
                            <div class="line-item">下的评论</div>
                        </template>
                    </div>
                    <template v-if="reply.length === 0">
                        <div class="line-2" v-html="comment"></div>
                    </template>
                    <template v-else>
                        <div class="line-2" v-html="reply"></div>
                        <div class="line-3" v-html="comment"></div>
                    </template>
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
.reply-notify-card {
    margin-bottom: 10px;

    .left-panel {
        display: flex;
        margin-right: 10px;
    }

    .right-panel {
        flex: 1;
    }

    .line-1 {
        color: #505050;
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

.reply-notify-card {

    .delete {
        display: none;
    }
}

.reply-notify-card:hover {

    .delete {
        display: flex;
        align-items: center;
    }
}
</style>