<script setup lang="ts">
import { inject, onMounted, ref, Ref } from "vue"
import { useRoute } from "vue-router"
import { UserInteractService } from '@/service/modules/interact.ts'
import { Delete } from '@element-plus/icons-vue'
import { $message } from '@/utils/message.ts'
import useUserStore from '@/store/modules/user.ts'
import { SPACE_USER } from '@/store/keys.ts'
import { HamiScrollListInstance } from '@/components/types'

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
    return UserInteractService.listCollectArticles({
        pageNum: current,
        pageSize: size,
        userId: userId.value
    })
}

const handleCancelCollect = async (item: Article, index: number) => {
    let id = item.id
    try {
        await $message.confirm("确定取消收藏吗?")
        let result = await UserInteractService.cancelCollect(id)
        await userCollectArticleList.value?.deleteItem(item, index)
        if (isSelf() && item.userId === userId.value) {
            //self && 取消收藏自己的文章
            let stat = spaceUser?.value?.stat
            if (stat) {
                stat.totalCollects--
            }
        }
        $message.success("取消收藏成功")
    } catch (e) {
        console.log(e)
        if (e !== 'cancel') {
            $message.error("取消收藏失败")
        }
    }
}

const isSelf = () => {
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
            :show-no-more="false"
        >
            <template #item="data">
                <HamiArticleCard :article="data.item" border>
                    <template #item="article">
                        <div class="option-item" @click="handleCancelCollect(article, data.index)" v-if="isSelf()">
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
        margin-right: 6px;

        .text {
            font-size: 13px;
            margin-left: 4px;
        }

        &:hover {
            color: var(--hami-text-hover-color);
        }
    }

    .hami-article-card:hover {
        background-color: var(--hami-card-hover-bg);
    }

    .hami-article-card:hover .option-item {
        opacity: 1;
    }
}
</style>