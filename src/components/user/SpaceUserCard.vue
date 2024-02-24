<script setup lang="ts">
import { computed, onUnmounted, watch } from "vue"
import useUserStore from '@/store/modules/user.ts'
import { useFollow } from '@/hooks/userInteract.ts'
import { $message, isEmpty, onPPT } from '@/utils'
import { defaultAvatar } from '@/store/images.ts'
import { AvatarProps } from 'element-plus/es/components/avatar/src/avatar'
import { useRouter } from 'vue-router'

interface SpaceUserCardProps {
    user: User
    avatarSize?: AvatarProps['size']
    showTag?: boolean
}

const $props = withDefaults(defineProps<SpaceUserCardProps>(), {
    icon: false,
    showTag: false,
    avatarSize: 'default'
})

const userStore = useUserStore()
const $router = useRouter()

const [state, handleAction] = useFollow($props.user?.followed)

const stopStateWatch = watch(() => $props.user.followed, (newVal, _) => {
    state.value = newVal
})

onUnmounted(() => {
    stopStateWatch()
})

const description = computed(() => {
    if ($props.user?.position && $props.user?.company) {
        return $props.user.position + " | " + $props.user.company
    } else if ($props.user?.position) {
        return $props.user.position
    } else if ($props.user?.company) {
        return $props.user.company
    } else {
        return "作者暂无简介"
    }
})

const blog = computed(() => {
    if (isEmpty($props.user?.blog)) {
        return undefined
    }
    if ($props.user?.blog.startsWith("http://") || $props.user?.blog.startsWith("https://")) {
        return $props.user?.blog
    }
    return "http://" + $props.user?.blog
})

//fun
const handleFollow = () => {
    if (userStore.isSelf($props.user.userId)) {
        $message.success("你时时刻刻都在关注你自己~")
        return
    }
    handleAction($props.user.userId).then((active: boolean) => {
        let stat = $props.user!.stat
        if (active) {
            stat.totalFollowers++
        } else {
            stat.totalFollowers--;
        }
    })
}

const handleChat = () => {
    onPPT("提示")
}

const handleClick = () => {
    $router.replace('/account/profile')
}


</script>
<template>
    <div class="hami-user-card">
        <div class="user-card-header">
            <div class="header-left">
                <el-avatar :src="user.avatar || defaultAvatar" :size="avatarSize"></el-avatar>
            </div>
            <div class="header-right">
                <div class="account-box">
                    <div class="account-box-left">
                        <div class="username">{{ user?.username }}</div>
                        <el-tag class="tag" v-if="showTag && user?.tag" size="small">{{ user.tag }}</el-tag>
                    </div>
                    <div class="account-box-right">
                        <el-link :href="blog" :underline="false" v-if="blog">
                            <el-icon size="18">
                                <svg class="icon" viewBox="0 0 1024 1024"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M92.358 512.198a419.84 419.84 0 1 0 839.68 0 419.84 419.84 0 1 0-839.68 0z"
                                          fill="#7EC3FC"></path>
                                    <path
                                        d="M121.221 522.445l122.812-46.96c13.244-5.114 20.05-19.293 15.53-32.339-9.577-27.498-2.13-57.856 19.224-78.295l75.599-72.909c15.865-15.182 24.76-35.86 24.692-57.412v-32.904a112.299 112.299 0 0 0-14.459-54.655s-267.646 72.35-243.398 375.467z"
                                        fill="#DBF083"></path>
                                    <path
                                        d="M382.02 136.233l-9.298-16.568-18.316 4.956c-8.84 2.39-23.415 7.475-41.847 15.858a402.548 402.548 0 0 0-89.28 55.57C132.684 270.663 82.392 378.824 94.018 524.055l2.594 32.515 152.747-58.381c24.487-9.462 37.717-35.52 30.686-60.307l-0.867-2.751c-6.39-18.33-1.434-38.516 12.943-52.272l75.366-72.677c20.549-19.647 32.154-46.646 32.072-74.847v-32.7a136.37 136.37 0 0 0-17.53-66.403z m-34.727 42.55l1.167 4.417a86.835 86.835 0 0 1 2.301 19.525v32.686c0.04 14.786-6.062 28.972-17.046 39.478l-75.367 72.677c-28.085 26.877-37.976 67.16-25.258 103.643l0.007 0.293c-0.076 0.328-0.43 0.73-1.216 1.038l-90.706 34.659-0.02-3.85c0.02-109.76 42.12-191.058 113.111-249.529a354.167 354.167 0 0 1 89.272-53.52l3.755-1.516z"
                                        fill="#7B7BA3"></path>
                                    <path
                                        d="M624.271 911.183l0.546-31.499c1.01-58.511-28.801-113.002-77.899-142.363l-16.978-10.124a181.774 181.774 0 0 0-66.6-23.92l-76.063-11.449c-30.645-4.594-55.665-27.607-63.577-58.477l-8.861-34.366c-5.44-21.005-20.514-37.935-40.352-45.308a62.717 62.717 0 0 0-59.106 8.349l-95.71 70.28s171.753 291.199 504.607 278.87z"
                                        fill="#62AFEF"></path>
                                    <path
                                        d="M522.035 911.292l0.39-22.583c0.723-41.957-20.63-81.026-55.795-102.072l-12.158-7.264a130.103 130.103 0 0 0-47.698-17.148l-54.484-8.213c-21.948-3.29-39.868-19.797-45.534-41.922l-6.349-24.645c-3.89-15.06-14.69-27.197-28.904-32.48a44.879 44.879 0 0 0-42.325 5.986l-68.553 50.388S283.64 920.125 522.028 911.292z"
                                        fill="#DBF083"></path>
                                    <path
                                        d="M219.197 645.202l-85.879 63.235 11.141 18.944c4.178 7.1 12.063 18.876 23.654 33.772a505.842 505.842 0 0 0 68.513 72.042c80.247 69.284 176.879 109.547 289.164 105.376l23.156-0.86 0.778-45.602c0.874-50.429-24.815-97.505-67.324-122.996l-12.118-7.25a153.627 153.627 0 0 0-56.368-20.282l-54.142-8.172c-12.001-1.809-21.995-11.032-25.231-23.668l-6.315-24.569c-5.85-22.678-22.187-41.076-43.868-49.152a69.065 69.065 0 0 0-65.16 9.182z m48.04 36.536c6.574 2.451 11.707 8.233 13.605 15.579l6.301 24.521c8.035 31.423 33.676 55.07 65.325 59.829l54.156 8.172c13.557 2.034 26.603 6.73 38.461 13.858l12.138 7.263 3.365 2.123c24.283 16.132 39.418 43.882 40.21 74.063v2.799l-0.58-0.02c-88.727-2.376-165.862-36.899-231.582-93.635a457.318 457.318 0 0 1-61.877-65.058l-5.16-6.78-2.69-3.658 49.33-36.318a20.043 20.043 0 0 1 18.998-2.738z"
                                        fill="#7B7BA3"></path>
                                    <path
                                        d="M911.04 526.896c-29.56 124.28-53.658 194.573-72.323 210.876-15.558 13.496-146.466 51.002-166.577 50.906a71.16 71.16 0 0 1-10.008-0.662c-11.025-0.41-21.415-5.543-28.808-14.207-20.433-23.053-24.187-72.465-24.058-107.724 0.034-6.049-3.809-11.346-9.339-12.875-21.756-6.301-41.103-19.661-55.316-38.196-15.04-19.223-38.639-36.365-51.378-44.92-13.762-9.174-24.89-22.152-32.194-37.525l-20.446-43.274a71.953 71.953 0 0 1-6.451-38.776c4.82-42.776 24.706-94.413 40.537-130.253 5.324-11.987 60.566-117.896 147.988-60.388l39.465-30.195c18.555-14.295 15.06-60.552 2.867-91.361a19.674 19.674 0 0 1 2.3-18.657s257.393 184.217 243.74 407.23z"
                                        fill="#68B3F2"></path>
                                    <path
                                        d="M911.073 485.676v19.265a44.64 44.64 0 0 1-35.662 8.26 45.015 45.015 0 0 1-29.949-21.244l-2.526-4.267a4.233 4.233 0 0 0-7.768 1.27l-18.87 85.804c-0.272 48.108-12.22 82.378-35.546 101.854a71.578 71.578 0 0 1-54.32 15.961 33.833 33.833 0 0 1-24.002-11.305c-17.026-18.357-20.152-57.678-20.043-85.743a10.506 10.506 0 0 0-7.783-10.247 89.825 89.825 0 0 1-46.093-30.399c-12.534-15.298-32.195-28.945-42.803-35.751a74.97 74.97 0 0 1-26.83-29.874l-17.039-34.44a55.016 55.016 0 0 1-5.372-30.857c4.02-34.051 20.582-75.148 33.778-103.676a28.215 28.215 0 0 1 24.14-16.35 28.14 28.14 0 0 1 25.613 13.858l14.677 24.726c2.335 3.96 6.93 5.94 11.373 4.895a9.23 9.23 0 0 0 7.64-7.967l0.225-1.72c3.195-28.18 21.408-52.333 47.445-62.928l34.25-13.852c15.455-11.38 3.372-60.948-6.78-85.47a15.073 15.073 0 0 1 1.912-14.854s191.713 147.558 180.333 325.051z"
                                        fill="#DBF083"></path>
                                    <path
                                        d="M753.172 162.659l-20.35-15.688-14.78 19.51a38.625 38.625 0 0 0-4.922 38.066c4.786 11.578 9.312 27.744 11.155 40.96l0.41 3.311c0.478 4.274 0.607 7.974 0.43 10.889l-0.068 0.587-25.594 10.377-3.713 1.604a99.546 99.546 0 0 0-47.446 45.52l-0.798 1.645-1.53-2.082a51.814 51.814 0 0 0-87.838 10.11c-18.419 39.861-31.43 77.32-35.158 108.954a77.85 77.85 0 0 0 7.592 43.677l16.677 33.73a97.69 97.69 0 0 0 30.925 36.236l4 2.697c14.616 9.38 28.126 20.07 36.25 30.003l3.004 3.584a112.067 112.067 0 0 0 41.165 29.642l3.297 1.283 0.034 1.44c0.942 38.94 7.892 69.708 25.914 89.157l2.41 2.526a57.248 57.248 0 0 0 34.468 16.063l2.28 0.157-0.956-0.096a94.33 94.33 0 0 0 71.912-21.053l3.181-2.779c25.996-23.668 39.022-60.825 40.244-109.513l0.047-3.304 10.186-46.32 0.771 0.424a68.062 68.062 0 0 0 72.479-6.267l9.489-7.202V499.76c5.393-83.524-30.652-166.666-93.416-244.654a641.973 641.973 0 0 0-80.384-83.047l-7.441-6.24a304.316 304.316 0 0 0-3.926-3.16z m20.856 79.053l4.574 4.758a581.516 581.516 0 0 1 28.904 33.082l5.052 6.335c53.09 67.639 82.718 138.035 78.281 206.964l-0.027 5.175-1.372 0.164a19.38 19.38 0 0 1-4.677-0.342 20.023 20.023 0 0 1-13.291-9.475L869 484.209a28.672 28.672 0 0 0-29.225-13.517 28.392 28.392 0 0 0-23.19 21.709l-19.15 86.76-0.013 2.512c-0.232 40.844-9.7 67.87-26.378 81.742a46.087 46.087 0 0 1-29.505 10.534l-2.649-0.075-4.779-0.423a8.916 8.916 0 0 1-6.314-3.018c-8.889-9.557-13.763-35.744-13.64-68.15a34.338 34.338 0 0 0-23.088-32.536l-2.648-0.82a63.782 63.782 0 0 1-29.99-18.5l-2.635-3.072c-12.309-14.97-29.286-28.344-47.998-40.298a49.623 49.623 0 0 1-17.818-19.77l-16.766-33.757a30.126 30.126 0 0 1-2.977-16.971c3.01-25.43 14.698-58.894 31.232-94.509a3.447 3.447 0 0 1 2.881-2.062 3.345 3.345 0 0 1 3.004 1.748l14.486 24.303 1.427 2.212a34.768 34.768 0 0 0 33.724 14.309l0.976-0.185a33.232 33.232 0 0 0 27.73-28.522l0.205-1.604c2.218-19.388 14.472-35.58 31.86-42.632l36.543-14.719 2.471-1.809c13.667-10.028 18.487-27.757 17.435-48.653l-0.184-2.731z"
                                        fill="#7B7BA3"></path>
                                    <path
                                        d="M512.205 78.711c239.411 0 433.493 194.083 433.493 433.494S751.616 945.698 512.205 945.698 78.71 751.616 78.71 512.205 272.794 78.71 512.205 78.71z m0 49.125c-212.282 0-384.369 172.087-384.369 384.362 0 212.282 172.087 384.369 384.362 384.369 212.282 0 384.369-172.087 384.369-384.369 0-212.275-172.087-384.362-384.369-384.362z"
                                        fill="#7B7BA3"></path>
                                </svg>
                            </el-icon>
                        </el-link>
                    </div>
                </div>
                <div class="info-box">
                    <div class="info-box-left">
                        <div class="description">
                            <el-icon size="22" class="icon">
                                <svg width="21" height="18" viewBox="0 0 21 18">
                                    <path fill="currentColor"
                                          d="M3 8.909V6.947a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1V8.92l-6 2.184v-.42c0-.436-.336-.79-.75-.79h-1.5c-.414 0-.75.354-.75.79v.409L3 8.909zm0 .7l6 2.184v.47c0 .436.336.79.75.79h1.5c.414 0 .75-.354.75-.79v-.46l6-2.183V16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.609zm6.75 1.075h1.5v1.58h-1.5v-1.58z"></path>
                                    <path fill="currentColor"
                                          d="M7.5 5.213V4A1.5 1.5 0 0 1 9 2.5h3A1.5 1.5 0 0 1 13.5 4v1.213"></path>
                                </svg>
                            </el-icon>
                            <span class="ellipsis content">{{ description }}</span>
                        </div>
                        <div class="profile">
                            <el-icon class="icon" size="22" v-if="user?.profile">
                                <svg width="21" height="18" viewBox="0 0 21 18">
                                    <path fill="currentColor" fill-rule="evenodd"
                                          d="M4 4h13a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zm9 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3 3a3 3 0 0 0-6 0h6zM5 7v1h4V7H5zm0 2.5v1h4v-1H5zM5 12v1h4v-1H5z"></path>
                                </svg>
                            </el-icon>
                            <span class="ellipsis content">{{ user?.profile }}</span>
                        </div>
                    </div>
                    <div class="info-box-right">
                        <div class="opt-box">
                            <template v-if="!userStore.isSelf(user?.userId)">
                                <el-button type="success" @click="handleFollow" v-if="state" plain>取消关注</el-button>
                                <el-button type="primary" @click="handleFollow" v-else>关注</el-button>
                                <el-button type="primary" plain @click="handleChat">私信</el-button>
                            </template>
                            <template v-else>
                                <el-button plain type="primary" @click.prevent="handleClick" auto-insert-space>设置
                                </el-button>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.hami-user-card {

    .user-card-header {
        display: flex;
        width: 100%;
        margin-bottom: 5px;

        .header-left {
            margin-right: 10px;
            flex: 0 0 auto;
        }

        .header-right {
            margin-right: 10px;
            flex: 1;
        }

    }

    .account-box {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .account-box-left {
            flex: 1;
            display: flex;
            align-items: center;
        }

        .account-box-right {
            display: flex;
            align-items: center;

            .el-icon {
                cursor: pointer;
            }
        }

        .username {
            color: var(--hami-text-1);
            font-size: 17px;
            font-weight: 600;
        }

        .tag {
            margin-left: 4px;
        }
    }

    .info-box {
        display: flex;
        justify-content: space-between;

        .description, .profile {
            display: flex;
            align-items: center;
            color: var(--hami-card-text-color);
            font-size: 14px;
            margin-top: 8px;
        }

        .description {
            margin-top: 8px;
        }

        .profile {
            margin-top: 2px;
        }

        .info-box-right {
            display: flex;
            align-items: flex-end;
        }

        .content {
            max-width: 200px;
            line-height: 28px;
            height: 28px;
            margin-left: 6px;
            word-break: break-all;
        }
    }

    .opt-box {
        display: flex;
        justify-content: space-between;

        button {
            width: 100px;
        }
    }
}
</style>