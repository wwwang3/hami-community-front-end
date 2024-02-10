<script setup lang="ts">
import { computed, onMounted, provide, ref, Ref, unref, watch } from "vue"
import { useRouter } from "vue-router"
import { isEmpty } from '@/utils'
import { useAutoLoading, useRequest } from '@/hooks'
import { ArticleDraftService } from '@/service/modules/article.ts'
import { $message } from '@/utils/message.ts'
import useUserStore from '@/store/modules/user.ts'
import { ClickOutside as vClickOutside } from 'element-plus'
import { DRAFT_REF, ON_PUBLISH_ARTICLE } from '@/store/keys.ts'
import { defaultAvatar } from "@/store/images.ts"
import HamiMdEditor from '@/components/md/HamiMdEditor.vue'
import HamiPublishArticleForm from '@/components/creator/HamiPublishArticleForm.vue'

const $router = useRouter()
const userStore = useUserStore()

const $props = defineProps({
    draftId: {
        type: String,
        default: -1
    }
})

const draft = ref<ArticleDraft>({
    id: -1,
    articleId: -1,
    userId: -1,
    categoryId: -1,
    tagIds: [],
    content: '',
    picture: '',
    summary: '',
    title: '',
    ctime: Date.now(),
    mtime: Date.now(),
    state: 0
})
const [onLoading, getDraft] = useRequest<ArticleDraft, [number]>({
    run: (...params) => ArticleDraftService.getArticleDraft(...params)
})

const buttonRef = ref()
const publishPopRef = ref()

const buttonText = computed(() => {
    if (!isEmpty(draft.value.articleId) && draft.value.articleId > 0) {
        return "确定并更新"
    }
    return "确定并发表"
})
const isArticle = computed(() => {
    return !isEmpty(draft.value.articleId) && draft.value.articleId > 0;
})
const text = computed(() => {
    if (!isEmpty(draft.value.articleId) && draft.value.articleId > 0) {
        return "更新文章"
    }
    return "发表文章"
})


onMounted(() => {
    handleRouteChange()
})

watch(() => $props.draftId, (_newVal, _oldVal) => {
    handleRouteChange()
})

//fun
const handleRouteChange = async () => {
    if ($props.draftId === "new") {
        draft.value = {
            id: -1,
            articleId: -1,
            userId: -1,
            categoryId: -1,
            tagIds: [],
            content: '',
            picture: '',
            summary: '',
            title: '',
            ctime: Date.now(),
            mtime: Date.now(),
            state: 0
        }
    } else {
        const loading = $message.loading("加载中...")
        try {
            draft.value = await getDraft(parseInt($props.draftId))
        } catch (e) {
            $message.notifyError(e as string)
        } finally {
            loading!.close()
        }
    }
}

const toUserHome = () => {
    $router.replace("/user/space/" + userStore.userInfo?.userId)
}

const handleClose = () => {
    unref(publishPopRef)?.hide()
}

const handleClickOutSide = () => {
    unref(publishPopRef).popperRef?.delayHide?.()
}

const [onProcess, process] = useAutoLoading()

provide<Ref<Boolean>>(ON_PUBLISH_ARTICLE, onProcess)
provide<Ref<ArticleDraft>>(DRAFT_REF, draft)

const handleSave = async () => {
    console.log(draft.value)
    let loading = $message.loading("保存中....")
    try {
        if (!hasDraftId()) {
            let data = await handleCreate();
            if (!isEmpty(data)) {
                $message.success("保存草稿成功")
                await $router.replace("/editor/drafts/" + data.id)
            }
        } else {
            let data = await handleUpdate()
            if (!isEmpty(data)) {
                $message.success("更新成功")
            }
        }
    } catch (e) {
        console.error(e)
        $message.error("保存失败")
    } finally {
        loading?.close()
    }
}

const handleCreate = async (): Promise<ArticleDraft> => {
    return process(ArticleDraftService.createDraft({
        summary: draft.value.summary,
        picture: draft.value.picture,
        title: draft.value.title,
        tagIds: draft.value.tagIds,
        categoryId: draft.value.categoryId,
        content: draft.value.content
    }))
}

const handleUpdate = async (): Promise<ArticleDraft> => {
    if (onProcess.value) {
        $message.notifyError("还没更新完~~")
        return Promise.resolve({} as ArticleDraft)
    }
    return process(ArticleDraftService.updateDraft({
        id: draft.value.id,
        summary: draft.value.summary,
        picture: draft.value.picture,
        title: draft.value.title,
        tagIds: draft.value.tagIds,
        categoryId: draft.value.categoryId,
        content: draft.value.content
    }))
}

const handleEnsure = async () => {
    // 发表文章
    if (!checkParam()) return
    let loading = $message.loading("请稍后...")
    try {
        // 先保存
        await handleSave()
        if (!hasDraftId()) {
            $message.notifyError("系统错误")
            return
        }
        let data = await process(ArticleDraftService.publishArticle(draft.value.id))
        if (!isEmpty(data) || isEmpty(data.articleId)) {
            // 跳转到发表成功页面
            draft.value.articleId = data.articleId
            $message.notifySuccess("发表成功")
            window.sessionStorage.setItem("p_article_id", data.articleId + "")
            window.sessionStorage.setItem("p_title", draft.value.title)
            await $router.replace({
                name: "Published"
            })
        }
    } catch (e) {
        console.error(e)
    } finally {
        loading?.close()
    }
}

const handleSaveDraft = (_val: string, h: Promise<string>) => {
    h.then(_html => {
        handleSave()
    })
}

const hasDraftId = () => {
    return !isNaN(draft.value.id) && !isEmpty(draft.value.id) && draft.value.id !== -1
}

const checkParam = () => {
    if (isEmpty(draft.value.title)) {
        $message.notifyError("文章标题不能为空")
        return false
    }
    if (isEmpty(draft.value.content)) {
        $message.notifyError("正文内容不能为空")
        return false
    }
    return true
}
</script>
<template>
    <div class="ham-editor">
        <div class="hami-editor-header">
            <el-input placeholder="请输入文章标题" class="title" v-model="draft.title"></el-input>
            <div class="right-box">
                <router-link to="/creator/home">
                    <el-button plain>回到主页</el-button>
                </router-link>
                <router-link to="/creator/content">
                    <el-button plain class="draft">草稿箱</el-button>
                </router-link>
                <el-button type="primary" ref="buttonRef" v-click-outside="handleClickOutSide">{{ text }}</el-button>
                <el-avatar
                    :size="56"
                    :src="userStore.userInfo?.avatar || defaultAvatar" class="avatar"
                    @click="toUserHome"
                >
                </el-avatar>
            </div>
        </div>
        <HamiMdEditor v-if="!onLoading" v-model="draft.content" @save="handleSaveDraft"></HamiMdEditor>
        <el-popover
            ref="publishPopRef"
            :title="text"
            :virtual-ref="buttonRef"
            virtual-triggering
            trigger="click"
            width="560"
            placement="bottom-start"
            popper-class="publish-popover"
        >
            <HamiPublishArticleForm
                :button-text="buttonText"
                :is-article="isArticle"
                @close="handleClose"
                @ensure="handleEnsure"
                @save="handleSave"
            >
            </HamiPublishArticleForm>
        </el-popover>
    </div>
</template>

<style scoped lang="less">
.hami-editor-header {
    padding: 0 20px;
    background-color: var(--hami-bg);
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
        padding-left: 20px;
        width: 60%;
        font-size: 24px;
        font-weight: 700;
        --el-input-text-color: var(--hami-title-color);
    }

    :deep(.el-input__wrapper) {
        box-shadow: none;
    }

    :deep(input) {
        --el-input-height: 66px;
    }

    .right-box {
        display: flex;
        align-items: center;

        .draft {
            margin: 0 16px;
        }

        .avatar {
            cursor: pointer;
            margin-left: 40px;
        }
    }
}
</style>

<style>
.el-popover.publish-popover {
    padding: 20px !important;
    border-radius: var(--hami-radius) !important;

    .el-popover__title {
        font-size: 18px;
    }
}
</style>