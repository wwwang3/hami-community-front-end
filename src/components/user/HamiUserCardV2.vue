<script setup lang="ts">
import { ref, reactive, onMounted, computed } from "vue"
import { useRoute, useRouter } from "vue-router"
import defaultAvatar from "/assets/avatar.jpg"
import useUserStore from '@/store/modules/user.ts'
import { $message } from '@/utils/message.ts'
//interface

//router, props, inject, provide
const $router = useRouter()
const userStore = useUserStore
//custom var

//life cycle

//watch

//fun
const handleFollow = () => {
    $message.notifyError("暂不支持")
}
const handleChat = () => {
    $message.notifyError("暂不支持")
}
</script>
<template>
    <div class="hami-user-card-v2">
        <div class="user-card-v2-container">
            <el-avatar :src="defaultAvatar" size="large" class="user-card-avatar"></el-avatar>
            <div class="user-card-body">
                <div class="info-box">
                    <div class="profile-item username">wang3</div>
                    <div class="work">
                        <div class="profile-item company">
                            <el-icon size="22" class="icon">
                                <svg width="21" height="18" viewBox="0 0 21 18">
                                    <path data-v-20db666e="" fill="#72777B"
                                          d="M3 8.909V6.947a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1V8.92l-6 2.184v-.42c0-.436-.336-.79-.75-.79h-1.5c-.414 0-.75.354-.75.79v.409L3 8.909zm0 .7l6 2.184v.47c0 .436.336.79.75.79h1.5c.414 0 .75-.354.75-.79v-.46l6-2.183V16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.609zm6.75 1.075h1.5v1.58h-1.5v-1.58z"></path>
                                    <path data-v-20db666e="" stroke="#72777B"
                                          d="M7.5 5.213V4A1.5 1.5 0 0 1 9 2.5h3A1.5 1.5 0 0 1 13.5 4v1.213"></path>
                                </svg>
                            </el-icon>
                            <span class="content">职位职位职位职位职位职位职位</span>
                        </div>
                        <div class="divider">|</div>
                        <div class="profile-item position">
                            <span class="content">公司职位职位职位职位职位职位</span>
                        </div>
                    </div>
                    <div class="profile-item profile">
                        <el-icon class="icon" size="22">
                            <svg width="21" height="18" viewBox="0 0 21 18">
                                <path  fill="#72777B" fill-rule="evenodd"
                                      d="M4 4h13a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zm9 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3 3a3 3 0 0 0-6 0h6zM5 7v1h4V7H5zm0 2.5v1h4v-1H5zM5 12v1h4v-1H5z"></path>
                            </svg>
                        </el-icon>
                        <span class="content">简介</span>
                    </div>
                    <div class="profile-item blog">
                        <el-icon class="icon" size="18" style="color: #72777B">
                            <User />
                        </el-icon>
                        <span class="content">
                            博客
                        </span>
                    </div>
                </div>
                <div class="button-box">
                    <div class="top"></div>
                    <div class="bottom">
                        <el-button type="primary" @click="handleFollow">关注</el-button>
                        <el-button type="primary" @click="handleChat">私信</el-button>
                    </div>
                    <div class="bottom" style="display: none">
                        <el-button plain @click="() => $router.replace('/account/profile')">设置</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.hami-user-card-v2 {
    padding: 30px 24px;
    border-radius: var(--hami-radius-medium);
    background-color: var(--hami-bg);
    margin-bottom: 20px;

    .user-card-v2-container {
        display: flex;
    }

    .user-card-avatar {
        --el-avatar-size-large: 100px;
        --el-avatar-size: 100px;

        :deep(img) {
            transition: all 1.5s linear;

            &:hover {
                transform: rotate(360deg);
            }
        }
    }

    .user-card-body {
        display: flex;
        flex: 1;
        justify-content: space-between;
        margin-left: 24px;

        .info-box {
            flex: 1;
        }

        .profile-item {
            display: flex;
            align-items: center;

            .content {
                max-width: 160px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                color: var(--hami-text-gray);
                line-height: 28px;
                height: 28px;
            }

            .icon {
                margin-right: 8px;
            }
        }

        .username {
            font-size: 20px;
            color: var(--hami-text-3);
            font-weight: 700;
            height: 24px;
            line-height: 24px;
            margin: 4px 0;
        }

        .work {
            display: flex;
            align-items: center;
            color: var(--hami-text-gray);

            .divider {
                margin: 0 10px;
            }
        }

        .profile {
            max-width: 240px;
        }

        .blog {
            max-width: 240px;
            .content {
                line-height: 29px;
            }
        }

        .button-box {
            min-width: 200px;
            max-width: 252px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .bottom {
            display: flex;
            align-items: center;
            padding-left: 40px;

            button {
                width: 100px;
            }
        }
    }
}

</style>