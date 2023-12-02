<script setup lang="ts">
import { onMounted, ref } from "vue"
import { useRouter } from "vue-router"
import { ArticleService } from '@/service/modules/article.ts'
import useUserStore from '@/store/modules/user.ts'
import { loadErrorImg2 } from '@/store/images.ts'
import { HamiScrollListInstance } from '@/components/types'
import HamiArticleCard from '@/components/article/HamiArticleCard.vue'

const userStore = useUserStore()
const $router = useRouter()
const logined = ref(userStore.logined)
const followUserArticleList = ref<HamiScrollListInstance<Article>>()

onMounted(() => {
    followUserArticleList.value?.init()
})

const handleQuery = (current: number, size: number) => {
    return ArticleService.listFollowUserUserArticles({
        pageNum: current,
        pageSize: size
    })
}

const handleClick = () => {
    $router.replace("/login")
}
</script>
<template>
    <div class="hami-follow-user-articles">
        <HamiScrollList
            ref="followUserArticleList"
            :query="handleQuery"
            no-data-text="暂无关注人发布的文章"
            key-property="id"
            :show-no-more="false"
            v-if="logined"
        >
            <template #item="data">
                <HamiArticleCard :article="data.item" class="list-item"></HamiArticleCard>
            </template>
        </HamiScrollList>
        <template v-else>
            <el-empty :image="loadErrorImg2" style="--el-empty-image-width: 200px"
                      description="暂无关注人发布的文章" :image-size="160">
                <el-button @click="handleClick" plain>登录</el-button>
            </el-empty>
        </template>
    </div>
</template>

<style scoped lang="less">
.hami-follow-user-articles {
    .list-item {
        border-radius: var(--hami-radius);
        margin-top: 16px;
        transition: all .3s;

        &:first-child {
            margin-top: 0;
        }

        &:hover {
            box-shadow: var(--el-box-shadow);
        }

        &:last-child {
            margin-bottom: 20px;
        }
    }

    button {
        width: 120px;
    }
}
.el-empty {
    background-color: var(--hami-card-bg);
    border-radius: var(--hami-radius);
}
</style>