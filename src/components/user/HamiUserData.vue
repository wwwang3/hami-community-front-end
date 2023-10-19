<script setup lang="ts">
import { ref, reactive, onMounted, computed } from "vue"
import { Star, View } from '@element-plus/icons-vue'
import { formatDateTime } from '@/utils'
//interface
interface UserStatProps {
    stat: UserStat,
    ctime: number | undefined
}
const $props = defineProps<UserStatProps>()


const ctime = computed(() => {
    return formatDateTime($props.ctime as number, "YYYY-MM-DD")
})


</script>
<template>
    <div class="data-container">
        <div class="block stat-block">
            <div class="stat-title">个人成就</div>
            <div class="stat">
                <div class="stat-item">
                    <el-icon class="icon" size="16" color="#1296db">
                        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"
                             width="200" height="200">
                            <path
                                d="M832 364.8h-147.2s19.2-64 32-179.2c6.4-57.6-38.4-115.2-102.4-121.6h-12.8c-51.2 0-83.2 32-102.4 76.8l-38.4 96c-32 64-57.6 102.4-76.8 115.2-25.6 12.8-121.6 12.8-128 12.8H128c-38.4 0-64 25.6-64 57.6v480c0 32 25.6 57.6 64 57.6h646.4c96 0 121.6-64 134.4-153.6l51.2-307.2c6.4-70.4-6.4-134.4-128-134.4z m-576 537.6H128V422.4h128v480z m640-409.6l-51.2 307.2c-12.8 57.6-12.8 102.4-76.8 102.4H320V422.4c44.8 0 70.4-6.4 89.6-19.2 32-12.8 64-64 108.8-147.2 25.6-64 38.4-96 44.8-102.4 6.4-19.2 19.2-32 44.8-32h6.4c32 0 44.8 32 44.8 51.2-12.8 102.4-32 166.4-32 166.4l-25.6 83.2h243.2c19.2 0 32 0 44.8 12.8 12.8 12.8 6.4 38.4 6.4 57.6z"
                                fill="currentColor"></path>
                        </svg>
                    </el-icon>
                    <div class="content">
                        <div class="text">文章被点赞</div>
                        <div class="count">{{ stat?.totalLikes }}</div>
                    </div>
                </div>
                <div class="stat-item">
                    <el-icon :size="16" color="#1296db" class="icon">
                        <View/>
                    </el-icon>
                    <div class="content">
                        <div class="text">文章被阅读</div>
                        <div class="count">{{ stat?.totalViews }}</div>
                    </div>
                </div>
                <div class="stat-item">
                    <el-icon class="icon" :size="16" color="#1296db"><Star /></el-icon>
                    <div class="content">
                        <div class="text">文章被收藏</div>
                        <div class="count">{{ stat?.totalCollects }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="block follow-block">
            <div class="follow-item">
                <div class="text">关注了</div>
                <div class="count">{{ stat?.totalFollowings }}</div>
            </div>
            <el-divider direction="vertical" style="height: 32px"></el-divider>
            <div class="follow-item">
                <div class="text">关注者</div>
                <div class="count">{{ stat?.totalFollowers }}</div>
            </div>
        </div>
        <div class="other-block">
            <div class="block-item">
                <div class="item-title">加入于</div>
                <div class="content date">
                    {{ ctime }}
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
    .data-container {
        .block {
            background-color: var(--hami-bg);
            border-radius: var(--hami-radius);
            padding: 20px 20px;
            margin-bottom: 20px;
        }

        .stat-block {
            .stat-title {
                font-size: 18px;
                color: var(--hami-text-3);
                line-height: 24px;
                padding-bottom: 10px;
                margin-bottom: 10px;
                border-bottom: 1px solid rgba(230, 230, 231, .5);
            }

            .stat {
                .stat-item {
                    display: flex;
                    align-items: center;
                    margin-bottom: 8px;
                    height: 25px;
                }

                .icon {
                    height: 24px;
                    width: 24px;
                    margin-right: 8px;
                    border-radius: 50%;
                    background-color: #b4e1ec;
                }

                .stat-item:last-child {
                    margin-bottom: 0;
                }

                .content {
                    display: flex;
                    height: 24px;

                    .text {
                        margin-right: 6px;
                    }

                    align-items: center;
                }
            }
        }
        .follow-block {
            display: flex;
            align-items: center;
            justify-content: space-around;
            .follow-item {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                .count {
                    font-size: 18px;
                    color: #333;
                    font-weight: 600;
                    margin-top: 8px;
                }
            }
        }
        .other-block {
            .block-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 16px 0;
                border-bottom:  1px solid var(--hami-border-color-1);
                color: var(--hami-text-4);
            }
            .block-item:first-child {
                border-top:  1px solid var(--hami-border-color-1);
            }
        }
    }
</style>