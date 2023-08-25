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
                    <div class="profile-item">
                        <div class="follow followers">
                            <div class="count">1</div>
                            <div class="text">粉丝</div>
                        </div>
                        <el-divider direction="vertical"></el-divider>
                        <div class="follow followings">
                            <div class="count">1</div>
                            <div class="text">关注</div>
                        </div>
                        <el-divider direction="vertical"></el-divider>
                        <div class="follow">
                            在Hami创作的第
                            <div class="count">600</div>
                            天
                        </div>
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
            .follow {
                display: flex;
                align-items: center;
                .count {
                    color: var(--hami-text-3);
                }
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