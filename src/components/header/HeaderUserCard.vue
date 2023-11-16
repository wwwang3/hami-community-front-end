<script setup lang="ts">
import { useTokenStore } from '@/store/modules/token.ts'
import { useRouter } from 'vue-router'
import { $message } from '@/utils/message.ts'
import { isEmpty } from '@/utils'
import { computed } from 'vue'
import dayjs from 'dayjs'
import { ArrowRight, Edit, User } from '@element-plus/icons-vue'

const tokenStore = useTokenStore()
const $router = useRouter()
const $props = withDefaults(defineProps<{
    userInfo: LoginProfile
}>(), {})

const logout = async () => {
    await tokenStore.logout()
    $message.success("退出成功")
    setTimeout(() => {
        window.location.reload()
    }, 300)
}
const gotoUserCenter = async () => {
    await $router.replace("/account")
}
const joinTime = computed(() => {
    let ctime = $props.userInfo.ctime
    let days = dayjs(Date.now()).diff(new Date(ctime), 'day');
    return "加入Hami的第" + days + "天"
})
</script>
<template>
    <div class="hami-avatar-panel">
        <div class="item username">{{ userInfo.username }}</div>
        <div class="item tag" v-if="!isEmpty(userInfo.tag)">
            <el-tag size="default">{{ userInfo.tag }}</el-tag>
        </div>
        <el-text class="item profile" truncated v-if="!isEmpty(userInfo.profile)">{{ userInfo.profile }}</el-text>
        <div class="item stats">
            <div class="stat-item">
                <span class="count">{{ userInfo.followings }}</span>
                <span class="text">关注</span>
            </div>
            <div class="stat-item">
                <span class="count">{{ userInfo.followers }}</span>
                <span class="text">粉丝</span>
            </div>
            <div class="stat-item">
                <span class="count">{{ userInfo.collects }}</span>
                <span class="text">收藏</span>
            </div>
            <div class="stat-item">
                <span class="count">{{ userInfo.likes }}</span>
                <span class="text">赞过</span>
            </div>
        </div>
        <div class="join-time">
            <span>{{ joinTime }}</span>
        </div>
        <div class="options">
            <div class="link-option" @click="gotoUserCenter">
                <div class="left-item">
                    <el-icon :size="18">
                        <User/>
                    </el-icon>
                    <span>个人中心</span>
                </div>
                <div class="right-item">
                    <el-icon :size="18">
                        <ArrowRight/>
                    </el-icon>
                </div>
            </div>
            <div class="link-option">
                <div class="left-item">
                    <el-icon size="18">
                        <Edit/>
                    </el-icon>
                    <span>文章管理</span>
                </div>
                <div class="right-item">
                    <el-icon :size="18">
                        <ArrowRight/>
                    </el-icon>
                </div>
            </div>
            <el-divider/>
            <div class="logout-item" @click="logout">
                <el-icon class="logout-icon">
                    <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M17.6137 9.30115C17.6932 9.10837 17.6932 8.89282 17.6137 8.70004C17.5743 8.60393 17.5165 8.51726 17.4443 8.44504L15.2221 6.22282C14.9148 5.9156 14.4176 5.91615 14.111 6.22282C13.8043 6.52948 13.8037 7.02671 14.111 7.33393L14.9921 8.21504L7.99985 8.21504C7.56596 8.21448 7.21429 8.56615 7.21429 9.00059C7.21429 9.21726 7.30207 9.41393 7.44429 9.55615C7.58651 9.69837 7.78318 9.78615 7.99985 9.78615L14.9921 9.78615L14.111 10.6673C13.8043 10.9739 13.8037 11.4712 14.111 11.7784C14.4182 12.0856 14.9154 12.085 15.2221 11.7784L17.4443 9.55615C17.5165 9.48393 17.5743 9.39726 17.6137 9.30115"
                              fill="currentColor"></path>
                        <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M11.8889 5.11111C9.74127 2.96349 6.25873 2.96349 4.11111 5.11111C1.96349 7.25873 1.96349 10.7413 4.11111 12.8889C6.25873 15.0365 9.74127 15.0365 11.8889 12.8889C12.1957 12.5821 12.6932 12.5821 13 12.8889C13.3068 13.1957 13.3068 13.6932 13 14C10.2387 16.7613 5.76127 16.7613 3 14C0.238731 11.2387 0.23873 6.76127 3 4C5.76127 1.23873 10.2387 1.23873 13 4C13.3068 4.30683 13.3068 4.80429 13 5.11111C12.6932 5.41794 12.1957 5.41794 11.8889 5.11111Z"
                              fill="currentColor"></path>
                    </svg>
                </el-icon>
                <span>退出登录</span>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.hami-avatar-panel {
    padding: 20px 18px 18px;
    .item {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .username {
        text-align: center;
        height: 32px;
        line-height: 32px;
        background: linear-gradient(135deg,#79f1a4,#0e5cad);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        font-weight: 700;
        font-size: 22px;
        margin: 10px 0 10px;
    }

    .tag {
        margin-bottom: 6px;
    }

    .profile {
        display: block;
        margin-bottom: 6px;
        padding-left: 20px;
        line-height: 32px;
        height: 32px;
    }

    .stats {
        display: flex;
        justify-content: space-between;
        padding: 0 10px;

        .stat-item {
            display: flex;
            flex-direction: column;
            align-items: center;

            .text {
                font-size: 14px;
            }

            .count {
                font-size: 18px;
                font-weight: 600;
                color: var(--hami-black-2);
            }
        }
    }

    .join-time {
        margin-top: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding: 8px 12px;
        background-color: var(--hami-pink-1);
        border-radius: var(--hami-radius-medium);
        background-size: cover;
        transition: background-color .2s;
        letter-spacing: 1px;

        span {
            color: #FF6699;
            display: -webkit-box;
            line-clamp: 1;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            line-height: 28px;
        }
    }

    .options {
        margin-top: 12px;

        .link-option {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 14px;
            height: 38px;
            border-radius: 8px;
            color: var(--hami-grey-6);
            font-size: 14px;
            cursor: pointer;
            transition: background-color .3s;
            white-space: nowrap;

            &:hover {
                background-color: #e3e5e7;
            }

            &:not(:last-child) {
                margin-bottom: 4px;
            }

            .left-item {
                display: flex;
                align-items: center;

                .el-icon {
                    margin-right: 16px;
                }
            }

            .right-item {
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    }


    .logout-item {
        display: flex;
        align-items: center;
        padding: 10px 14px;
        border-radius: 8px;
        color: var(--hami-text-1);
        font-size: 14px;
        cursor: pointer;
        transition: background-color .3s;

        span {
            height: 24px;
            line-height: 23px;
        }
    }

    .logout-item:hover {
        background-color: #e3e5e7;
    }

    .logout-icon {
        font-size: 18px;
        margin-right: 16px;
    }

    .el-divider {
        margin: 18px 0;
    }
}
</style>