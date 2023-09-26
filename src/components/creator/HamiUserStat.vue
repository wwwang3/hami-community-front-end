<script setup lang="ts">
import { ref, reactive, onMounted, computed } from "vue"
import { useRoute, useRouter } from "vue-router"
//interface
interface UserStatProps {
    stat: UserStat
}
//router, props, inject, providec
const $props = withDefaults(defineProps<UserStatProps>(), {
    stat: {
        userId: -1,
        totalArticles: 0,
        totalViews: 0,
        totalCollects: 0,
        totalLikes: 0,
        totalComments: 0,
        totalFollowers: 0,
        totalFollowings: 0,
    }
})
//custom var

//life cycle

//watch

//fun

</script>
<template>
    <div class="hami-user-stat">
        <div class="user-stat-title">
            数据概览
        </div>
        <div class="user-stat-container">
            <div class="user-stat-item">
                <div class="stat-title">总粉丝数</div>
                <div class="count">{{stat.totalFollowers}}</div>
            </div>
            <div class="user-stat-item">
                <div class="stat-title">总文章数</div>
                <div class="count">{{stat.totalArticles}}</div>
            </div>
            <div class="user-stat-item">
                <div class="stat-title">文章阅读数</div>
                <div class="count">{{stat.totalViews}}</div>
            </div>
            <div class="user-stat-item">
                <div class="stat-title">文章点赞数</div>
                <div class="count">{{stat.totalLikes}}</div>
            </div>
            <div class="user-stat-item">
                <div class="stat-title">文章评论数</div>
                <div class="count">{{stat.totalComments}}</div>
            </div>
            <div class="user-stat-item">
                <div class="stat-title">文章收藏</div>
                <div class="count">{{stat.totalCollects}}</div>
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
        color: var(--hami-title);
        border-bottom: 1px solid var(--el-border-color);
    }
    .user-stat-container {
        padding: 20px;
        display: flex;
        flex-flow: row wrap;
    }
    .user-stat-item {
        background-color: var(--hami-bg-gray-1);
        width: calc(33.33333% - 13.33333px);
        margin-right: 20px;
        margin-bottom: 20px;
        padding: 16px 20px;
        height: fit-content;
        .stat-title {
            color: var(--hami-text-1);
            height: 24px;
        }
        .count {
            color: var(--hami-text-8);
            font-weight: 600;
            font-size: 32px;
            line-height: 42px;
            margin-bottom: 4px;
            white-space: nowrap;
        }
        &:nth-child(n+3) {
            margin-bottom: 0;
        }
        &:nth-child(3n) {
            margin-right: 0;
        }
    }
}
</style>