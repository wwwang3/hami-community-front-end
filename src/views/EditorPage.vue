<script setup lang="ts">
import { ref, reactive, onMounted, computed, onBeforeMount, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
import HamiMdEditor from '@/components/md/HamiMdEditor.vue'
import { ifNull, isEmpty } from '@/utils'
import { useRequest } from '@/hooks'
import { ArticleDraftService } from '@/service/modules/article.ts'
import { $message } from '@/utils/message.ts'
import useUserStore from '@/store/modules/user.ts'
//interface
import defaultAvatar from "/assets/avatar.jpg"
import { ItemType } from '@/components/creator/HamiPublishArticleForm.vue'

//router, props, inject, provide
const $route = useRoute()
const $router = useRouter()
const userStore = useUserStore()

const userInfo = reactive<SimpleUserInfo>(userStore.userInfo as SimpleUserInfo)

const draftId = ref("")
const draft = ref<ArticleDraftDetail>({
    id: -1,
    articleId: -1,
    userId: -1,
    categoryId: -1,
    tags: [],
    content: '',
    picture: '',
    summary: '',
    title: '',
    ctime: undefined,
    mtime: undefined,
    state: 0
})
const [onLoading, getDraft] = useRequest({
    run: (params) => ArticleDraftService.getArticleDraft(params)
})

const buttonRef = ref()
const publishPopRef = ref()
const showItemForm = ref(false)
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
onBeforeMount(async () => {
    await handleRouteChange()
})

onMounted(() => {
    console.log("EditorPage loaded")
})

//life cycle

//watch
watch(() => $route.params, (newVal, oldVal) => {
    console.log(newVal, oldVal)
})
//fun
const handleRouteChange = async () => {
    let params = $route.params
    draftId.value = params.id as string
    if (draftId.value === "new") {
        draft.value = {
            id: -1,
            articleId: -1,
            userId: -1,
            categoryId: -1,
            tags: [],
            content: '',
            picture: '',
            summary: '',
            title: '',
            ctime: undefined,
            mtime: undefined,
            state: 0
        } as ArticleDraftDetail
    } else {
        const loading = $message.loading("加载中...")
        try {
            draft.value = await getDraft(draftId) as ArticleDraftDetail
        } catch (e) {
            $message.notifyError(e as string)
        } finally {
            loading!.close()
        }
    }
}

const toUserHome = () => {
    $router.replace("/user/space/" + ifNull(userInfo?.userId, 1))
}

const handlePublishOrUpdate = () => {
    showItemForm.value = true
}

const handleClose = () => {
    showItemForm.value = false
}
const handleSave = (item: ItemType) => {
    console.log(item)
    //todo
}

const handleEnsure = (item: ItemType) => {
    console.log(item)
    if (!checkParam()) return
    //todo
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
                <router-link to="/">
                    <el-button plain>回到主页</el-button>
                </router-link>
                <router-link to="/creator/content/draft">
                    <el-button plain class="draft">草稿箱</el-button>
                </router-link>
                <el-button type="primary" ref="buttonRef" @click="handlePublishOrUpdate">{{ text }}</el-button>
                <el-avatar
                    :size="56"
                    :src="userInfo?.avatar || defaultAvatar" class="avatar"
                    @click="toUserHome"
                ></el-avatar>
            </div>
        </div>
        <HamiMdEditor v-if="!onLoading" v-model="draft.content"></HamiMdEditor>
        <el-popover
            ref="publishPopRef"
            title="发表文章"
            :virtual-ref="buttonRef"
            virtual-triggering
            trigger="click"
            width="560"
            placement="bottom-start"
            popper-class="publish-popover"
            :visible="showItemForm"
        >
            <HamiPublishArticleForm
                :category-id="draft.categoryId"
                :picture="draft.picture"
                :summary="draft.summary"
                :tags="draft.tags as Array<Tag>"
                :button-text="buttonText"
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
        --el-input-text-color: var(--hami-title);
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
.publish-popover {
    padding: 20px !important;
    border-radius: var(--hami-radius-medium) !important;
    .el-popover__title {
        font-size: 18px;
    }
}
</style>