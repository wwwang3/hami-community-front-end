<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import { UserInteractService } from '@/service/modules/interact.ts'
import { ifNull, isEmpty } from '@/utils'
import HamiStatCard from '@/components/creator/CreatorStatCard.vue'

//interface
interface UserStatProps {
    stat: UserStat | undefined
}

const $props = defineProps<UserStatProps>()

const dataGrowing = ref<DailyDataGrowing>()

const follower_incr = computed(() => {
    if (isEmpty(dataGrowing.value)) return 0
    let incr =  ifNull(dataGrowing.value?.follower_incr, 0)
    let cancel = ifNull(dataGrowing.value?.cancel_follow_incr, 0)
    return incr - cancel;
})

onMounted(() => {
    getUserDataGrowing()
})

const getUserDataGrowing = async () => {
    try {
        dataGrowing.value = await UserInteractService.getUserDataGrowing()
    } catch (e) {

    }
}
</script>
<template>
    <div class="hami-user-stat">
        <div class="user-stat-title">
            数据概览
        </div>
        <div class="user-stat-container">
            <div class="user-stat-item">
                <HamiStatCard
                    title="总文章数"
                    :value="stat?.totalArticles"
                    :incr="dataGrowing?.article_incr">
                </HamiStatCard>
            </div>
            <div class="user-stat-item">
                <HamiStatCard
                    title="文章阅读量"
                    :value="stat?.totalViews"
                    :incr="dataGrowing?.view_incr">
                </HamiStatCard>
            </div>
            <div class="user-stat-item">
                <HamiStatCard
                    title="文章点赞数"
                    :value="stat?.totalLikes"
                    :incr="dataGrowing?.like_incr">
                </HamiStatCard>
            </div>
            <div class="user-stat-item">
                <HamiStatCard
                    title="文章评论数"
                    :value="stat?.totalComments"
                    :incr="dataGrowing?.comment_incr">
                </HamiStatCard>
            </div>
            <div class="user-stat-item">
                <HamiStatCard
                    title="文章收藏数"
                    :value="stat?.totalCollects"
                    :incr="dataGrowing?.collect_incr">
                </HamiStatCard>
            </div>
            <div class="user-stat-item">
                <HamiStatCard
                    title="总粉丝数"
                    :value="stat?.totalFollowers"
                    :incr="follower_incr">
                </HamiStatCard>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.hami-user-stat {
    height: 360px;
    border-radius: var(--hami-radius);
    margin-top: 20px;
    background-color: var(--hami-bg);

    .user-stat-title {
        padding: 20px;
        font-size: 18px;
        color: var(--hami-title-color);
        border-bottom: 1px solid var(--el-border-color);
    }

    .user-stat-container {
        padding: 20px;
        display: flex;
        flex-flow: row wrap;
    }

    .user-stat-item {
        background-color: var(--hami-card-blue-bg-1);
        width: calc(33.33333% - 13.33333px);
        margin-right: 20px;
        margin-bottom: 20px;
        padding: 16px 20px;
        height: fit-content;
        border-radius: var(--hami-radius);


        &:nth-child(n+3) {
            margin-bottom: 0;
        }

        &:nth-child(3n) {
            margin-right: 0;
        }
    }
}
</style>