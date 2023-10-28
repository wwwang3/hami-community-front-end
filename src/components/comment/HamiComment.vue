<script setup lang="ts">
import { computed, inject, onMounted, reactive, ref } from "vue"
import { COMMENT_AREA_OWNER } from "@/store/keys.ts"
import CommentService from "@/service/modules/comment.ts"
import useUserStore from '@/store/modules/user.ts'
import emoji from './emoji.ts'
import HamiUserCardHover from '@/components/common/HamiUserCardHover.vue'
import {
    CommentApi, CommentInstance,
    CommentUserApi,
    ConfigApi,
    ReplyApi,
    ReplyPageParamApi,
    SubmitParamApi, throttle,
    UComment,
    UCommentNav,
    UCommentScroll,
    UserApi
} from 'undraw-ui'
import { calculateLocation, formatDateTime, ifNull, isEmpty } from "@/utils/index.ts"
import { $message } from '@/utils/message.ts'
import ImageService from '@/service/modules/image.ts'
import { UserInteractService } from '@/service/modules/interact.ts'
import Operate from '@/components/comment/Operate.vue'

interface CommentProps {
    areaId: number
}

const $emit = defineEmits<{
    (e: "change", total: number): void
}>()

const $props = defineProps<CommentProps>()
const userStore = useUserStore()
//评论区作者(文章作者)
const commentRef = ref<CommentInstance>()
const inited = ref(false)
const latest = ref(true)
const page = ref({
    current: 0,
    size: 20,
    total: 0
})
// @ts-ignore
const sort = computed(() => {
    return latest.value ? 1 : 0
})

const disable = computed(() => {
    return page.value.current >= Math.ceil(page.value.total / page.value.size)
})

const commentConfig = reactive<ConfigApi>({
    comments: [],
    total: page.value.total,
    user: {} as UserApi,
    emoji: emoji,
    aTarget: '_blank',
})

onMounted(async () => {
    console.log(emoji)
    await init()
})

const init = async () => {
    try {
        inited.value = false
        //获取用户登录用户数据
        let loginUser = await userStore.getProfile()
        console.log(loginUser)
        commentConfig.user = {
            id: loginUser.userId,
            username: loginUser.username,
            avatar: loginUser.avatar,
            likeIds: []
        }
        //获取评论数据
        await handleMore()
    } catch (e) {
        console.log(e)
        $message.error("获取失败")
        page.value.total = 0
        commentConfig.comments = []
    } finally {
        inited.value = true
        commentConfig.total = page.value.total
    }
}

const publishComment = async ({ content, parentId, files, finish, reply }: SubmitParamApi) => {
    try {
        let contentImg = await uploadImg(files)
        const commentParam: CommentParam = {
            articleId: $props.areaId,
            content: content,
            contentImg: contentImg,
            rootId: parentId,
            parentId: reply?.id
        }
        let comment = await CommentService.publishComment(commentParam, !isEmpty(reply))
        finish({
            id: comment.id,
            parentId: comment.rootId,
            uid: comment.userId,
            address: calculateLocation(comment.ipInfo),
            content: comment.content,
            likes: comment.likes,
            contentImg: contentImg,
            createTime: formatDateTime(Date.now()),
            user: {
                username: commentConfig.user.username,
                avatar: commentConfig.user.avatar,
                level: 0,
                homeLink: "/user/space/" + commentConfig.user.id
            },
            reply: null
        })
        page.value.total++
        $emit('change', 1)
        $message.success("评论成功")
    } catch (e) {
        $message.error("评论失败")
    }
}

const uploadImg = async (files: File[] | undefined) => {
    if (isEmpty(files)) return undefined
    let requests = files!.map(async (file, index) => {
        return ImageService.upload(file, 'comment')
    });
    return (await Promise.all(requests)).join("||")
}

const handleMore = async () => {
    page.value.current++
    let comments = await handleQueryComments(page.value.current, page.value.size)
    commentConfig.comments.push(...comments)
}

const handleSort = async (latest: boolean) => {
    page.value.current = 1
    commentConfig.comments = await handleQueryComments(page.value.current, page.value.size)
}


const handleLike = async (id: string, finish: () => void) => {
    let itemId = parseInt(id)
    let param: LikeItemParam = {
        itemId: itemId,
        itemType: 2
    }
    try {
        if (commentConfig.user.likeIds.findIndex(value => value == itemId) != -1) {
            //点赞
            await UserInteractService.cancelLike(param)
        } else {
            await UserInteractService.like(param)
        }
        finish()
    } catch (e) {
        $message.error("操作失败")
    }
}

// 删除评论
const remove = async (comment: CommentApi) => {
    try {
        await $message.confirm("确定删除这条评论吗")
        await CommentService.deleteComment(comment.id as number)
        $message.success("删除成功")
        commentRef.value?.remove(comment)
        $emit("change", 1 + ifNull(comment.reply?.total, 0))
    } catch (e) {
        if (e !== 'cancel') {
            console.log(e)
            $message.error("操作失败")
        }
    }
}

const handleReplyPage = async (param: ReplyPageParamApi) => {
    try {
        let reply = await handleQueryReply(parseInt(param.parentId), param.pageNum, param.pageSize)
        param.finish(reply)
    } catch (e) {
        console.log(e)
    }
}

const handleShowInfo = async (uid: string, finish: Function) => {
    console.log(uid)
    finish({
        id: parseInt(uid)
    })
}

const handleQueryComments = async (current: number, size: number) => {
    let data = await CommentService.listComment({
        pageNum: current,
        pageSize: size,
        articleId: $props.areaId,
        sort: sort.value
    })
    console.log(data)
    page.value.total = data.total
    return convert(data.data as CommentInfo[])
}

const handleQueryReply = async (rootId: number, current: number, size: number = 10) => {
    let data = await CommentService.listReply({
        pageNum: current,
        pageSize: size,
        articleId: $props.areaId,
        rootId: rootId
    })
    let reply = convert(data.data as CommentInfo[])
    return {
        total: data.total,
        list: reply
    }
}

const convert = (comments: CommentInfo[] | null): CommentApi[] | [] => {
    if (isEmpty(comments)) {
        return []
    }
    return comments!.map((value: CommentInfo, index: number) => {
        if (value.liked) {
            commentConfig.user.likeIds.push(value.id as never)
        }
        let comment = convertToComment(value)
        let reply = value.reply
        comment.reply = {} as ReplyApi
        if (!isEmpty(reply)) {
            comment.reply.total = reply!.total
            comment.reply.list = convert(reply!.list)
        }
        return comment;
    })
}

const convertToComment = (comment: CommentInfo): CommentApi => {
    return {
        id: comment.id,
        parentId: comment.rootId,
        uid: comment.userId,
        address: calculateLocation(comment.ipInfo),
        content: comment.content,
        contentImg: comment.contentImg,
        createTime: formatDateTime(comment.ctime),
        likes: comment.likes,
        user: convertToCommentUser(comment.user)
    }
}

const convertToCommentUser = (user: User): CommentUserApi => {
    return {
        avatar: user.avatar,
        homeLink: "/user/space/" + user.userId,
        level: 0,
        username: user.username
    }
}

</script>
<template>
    <div class="hami-comment" v-if="inited">
        <u-comment-scroll :disable="disable" @more="handleMore">
            <u-comment
                ref="commentRef"
                :config="commentConfig"
                @submit="publishComment"
                @like="handleLike"
                @reply-page="handleReplyPage"
                @show-info="handleShowInfo"
                upload
                page
                relative-time
            >
                <template #default>
                    <u-comment-nav v-model="latest" @sorted="handleSort"></u-comment-nav>
                </template>
                <template #card="scope">
                    <HamiUserCardHover :id="scope.id"></HamiUserCardHover>
                </template>
                <template #operate="scope">
                    <Operate :comment="scope" @remove="remove"/>
                </template>
            </u-comment>
        </u-comment-scroll>
    </div>
</template>

<style scoped lang="less">
.hami-comment {
    :deep(.u-comment) {
        border-radius: var(--hami-radius);
        min-height: 300px;
    }
}
</style>