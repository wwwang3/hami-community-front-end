<script setup lang="ts">
import { inject, onMounted, ref, Ref } from "vue"
import { useRoute } from "vue-router"
import { UserInteractService } from '@/service/modules/interact.ts'
import { $message } from '@/utils/message.ts'
import useUserStore from '@/store/modules/user.ts'
import { SPACE_USER } from '@/store/keys.ts'
import { HamiScrollListInstance } from '@/components/types'
import ArticleDeleteOperate from '@/components/article/ArticleDeleteOperate.vue'
import { strToNum } from '@/utils'

//interface
interface UserArticleProps {
    id: string
}

const $props = defineProps<UserArticleProps>()
const $route = useRoute()
const userId = ref(parseInt($props.id))
const userCollectArticleList = ref<HamiScrollListInstance<Article> | null>(null)
const userStore = useUserStore()

const spaceUser = inject<Ref<User>>(SPACE_USER) as Ref<User>

onMounted(() => {
    userCollectArticleList.value?.init()
})

const handleQuery = (current: number, size: number) => {
    return UserInteractService.listCollectArticle({
        current: current,
        size: size,
        userId: userId.value
    })
}

const handleCancelCollect = async (item: Article, finish: () => void) => {
    let id = item.id
    try {
        await UserInteractService.cancelCollect(strToNum(id))
        finish()
        if (isSelf() && item.userId === userId.value) {
            //self && 取消收藏自己的文章
            let stat = spaceUser?.value?.stat
            userStore.userInfo.collects--;
            if (stat) {
                stat.totalCollects--
            }
        }
    } catch (e) {
        $message.error("操作失败")
    }
}


const isSelf = () => {
    //进入到空间的是登录用户本人
    return userStore.isSelf(userId.value)
}
</script>
<template>
    <div class="hami-user-article-list">
        <HamiScrollList
            ref="userCollectArticleList"
            :query="handleQuery"
            no-data-text="还没有文章"
            key-property="id"
        >
            <template #item="data">
                <HamiArticleCard :article="data.item" border>
                    <template #top="article">
                        <ArticleDeleteOperate
                            msg="确定取消收藏吗?"
                            :list-ref="userCollectArticleList"
                            :article="article"
                            show-confirm
                            @delete="handleCancelCollect" v-if="isSelf()">
                        </ArticleDeleteOperate>
                    </template>
                </HamiArticleCard>
            </template>
        </HamiScrollList>
    </div>
</template>

<style scoped lang="less">
.hami-user-article-list {
    padding-bottom: 20px;

    .hami-article-card:hover {
        background-color: var(--hami-card-hover-bg);
    }
}
</style>