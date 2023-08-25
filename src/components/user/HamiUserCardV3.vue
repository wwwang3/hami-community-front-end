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

</script>
<template>
    <div class="hami-user-card-v3">
        <div class="user-card-v3-container">
            <el-avatar :src="defaultAvatar" size="large" class="user-card-avatar"></el-avatar>
            <div class="user-card-body">
                <div class="info-box">
                    <div class="profile-item username">wang3</div>
                    <div class="profile-item">
                        <div class="follow followers">
                            <div class="count">1</div>
                            <div class="content">粉丝</div>
                        </div>
                        <el-divider direction="vertical"></el-divider>
                        <div class="follow followings">
                            <div class="count">1</div>
                            <div class="content">关注</div>
                        </div>
                        <el-divider direction="vertical"></el-divider>
                        <div class="follow time">
                            <div class="content">在Hami创作的第</div>
                            <div class="count">600</div>
                            <div class="content">天</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.hami-user-card-v3 {
    padding: 20px 24px;
    border-radius: var(--hami-radius-medium);
    background-color: var(--hami-bg);
    margin-bottom: 20px;

    .user-card-v3-container {
        display: flex;
    }

    .user-card-avatar {
        --el-avatar-size-large: 80px;
        --el-avatar-size: 80px;

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

            .follow {
                display: flex;
                align-items: center;
                .count {
                    color: var(--hami-text-3);
                    margin-right: 6px;;
                }
            }
            .follow.time {
                .count {
                    margin-left: 6px;
                }
            }
        }

        .username {
            font-size: 20px;
            color: var(--hami-text-3);
            font-weight: 700;
            height: 24px;
            line-height: 24px;
            margin: 4px 0 16px 0;
        }
    }
}

</style>