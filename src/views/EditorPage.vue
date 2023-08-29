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

//router, props, inject, provide
const $route = useRoute()
const $router = useRouter()
const userStore = useUserStore()

const userInfo = reactive<SimpleUserInfo>(userStore.userInfo as SimpleUserInfo)

const draftId = ref("")
const draft = ref<ArticleDraftDetail>({
    id: "",
    articleId: "",
    userId: "",
    categoryId: "",
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

const showPublishDialog = ref(false)
const buttonRef = ref()
const publishPopRef = ref()
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
            id: "",
            articleId: "",
            userId: "",
            categoryId: "",
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
const handleShowDialog = () => {
    showPublishDialog.value = true
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
                <el-button type="primary" @click="handleShowDialog" ref="buttonRef">发布</el-button>
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
        >
            <HamiPublishArticleForm
                :category-id="parseInt(draft.categoryId as string)"
                :picture="draft.picture"
                :summary="draft.summary"
                :tags="draft.tags as Array<Tag>"
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
}
</style>