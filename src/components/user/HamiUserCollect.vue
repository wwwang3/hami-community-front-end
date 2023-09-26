<script setup lang="ts">
import { ref, reactive, onMounted, computed } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useRequest } from '@/hooks'
import { ArticleService } from '@/service/modules/article.ts'
import { UserInteractService } from '@/service/modules/interact.ts'
import { Delete } from '@element-plus/icons-vue'
import { $message } from '@/utils/message.ts'
import useUserStore from '@/store/modules/user.ts'

//interface
interface UserArticleProps {
    id: string
}

//router, props, inject, provide
const $props = defineProps<UserArticleProps>()
const $route = useRoute()
const userId = ref($props.id)
const userArticleList = ref()
const userStore = useUserStore()
onMounted(() => {
    console.log(userId)
    userArticleList.value?.init()
})
//custom var

//life cycle

//watch

//fun
const handleQuery = (current: number, size: number) => {
    return UserInteractService.listCollectArticles({
        pageNum: current,
        pageSize: size,
        userId: parseInt(userId.value)
    })
}

const handleCancelCollect = (id: number) => {
    console.log(id)
    $message.confirm("确定取消收藏吗?")
        .then(() => {
            console.log("s")
        })
        .catch(e => {
            console.log(e)
        })
}

const  isAuthor = (userId: number) => {
    return userStore.isSelf(userId)
}
</script>
<template>
    <div class="hami-user-article-list">
        <HamiScrollList
            ref="userArticleList"
            :query="handleQuery"
            no-data-text="还没有文章"
            key-property="id"
            :show-no-more="false"
        >
            <template #item="data">
                <HamiArticleCard :article="data.item" border>
                    <template #item="article">
                        <div class="option-item" @click="handleCancelCollect(article.id)" v-if="isAuthor(article.userId)">
                            <el-icon size="13">
                                <Delete/>
                            </el-icon>
                            <span class="text">删除</span>
                        </div>
                    </template>
                </HamiArticleCard>
            </template>
        </HamiScrollList>
    </div>
</template>

<style scoped lang="less">
.hami-user-article-list {
    padding-bottom: 20px;

    .option-item {
        display: flex;
        align-items: center;
        opacity: 0;
        transition: opacity .3s;

        .text {
            font-size: 13px;
            margin-left: 4px;
        }

        &:hover {
            color: var(--hami-text-blue);
        }
    }

    .hami-article-card:hover {
        background-color: #f7f8fa;;
    }

    .hami-article-card:hover .option-item {
        opacity: 1;
    }
}
</style>