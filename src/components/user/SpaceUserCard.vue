<script setup lang="ts">
import { computed, watch } from "vue"
import { useRouter } from "vue-router"
import { defaultAvatar } from "@/store/images.ts"
import useUserStore from '@/store/modules/user.ts'
import { $message } from '@/utils/message.ts'
import { useFollow } from '@/hooks/userInteract.ts'

//interface
interface SpaceUserProps {
    user: User
}

const $props = defineProps<SpaceUserProps>()
const $router = useRouter()
const userStore = useUserStore()


const [state, handleAction] = useFollow($props.user?.followed)

const link = computed(() => {
    return "/user/space/" + $props.user.userId
})

watch(() => $props.user?.followed, (newVal, oldVal) => {
    state.value = newVal
})


const handleFollow = () => {
    if (userStore.isSelf($props.user.userId)) {
        return
    }
    handleAction($props.user.userId).then(active => {
        let stat = $props.user!.stat
        if (active) {
            stat.totalFollowers++
        } else {
            stat.totalFollowers--;
        }
    })
}

const handleChat = () => {
    $message.notifySuccess("暂不支持, 敬请期待 _(≧∇≦」∠)_")
}

const handleClick = () => {
    $router.replace('/account/profile')
}
</script>
<template>
    <div class="hami-user-card">
        <div class="user-card-container">
            <el-avatar :src="defaultAvatar" size="large" class="user-card-avatar"></el-avatar>
            <div class="user-card-body">
                <div class="profile-item">
                    <el-text class="username" truncated tag="span">{{ user.username }}</el-text>
                    <el-tag v-if="user.tag" class="tag">{{ user.tag }}</el-tag>
                </div>
                <div class="work">
                    <div class="profile-item company">
                        <el-icon size="22" class="icon">
                            <svg width="21" height="18" viewBox="0 0 21 18">
                                <path fill="currentColor"
                                      d="M3 8.909V6.947a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1V8.92l-6 2.184v-.42c0-.436-.336-.79-.75-.79h-1.5c-.414 0-.75.354-.75.79v.409L3 8.909zm0 .7l6 2.184v.47c0 .436.336.79.75.79h1.5c.414 0 .75-.354.75-.79v-.46l6-2.183V16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.609zm6.75 1.075h1.5v1.58h-1.5v-1.58z"></path>
                                <path fill="currentColor"
                                      d="M7.5 5.213V4A1.5 1.5 0 0 1 9 2.5h3A1.5 1.5 0 0 1 13.5 4v1.213"></path>
                            </svg>
                        </el-icon>
                        <el-text class="content" truncated>{{ user.company }}</el-text>
                    </div>
                    <div class="divider">|</div>
                    <div class="profile-item position">
                        <el-text class="content" truncated>{{ user.position }}</el-text>
                    </div>
                </div>
                <div class="profile-item profile">
                    <el-icon class="icon" size="22">
                        <svg width="21" height="18" viewBox="0 0 21 18">
                            <path fill="currentColor" fill-rule="evenodd"
                                  d="M4 4h13a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zm9 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3 3a3 3 0 0 0-6 0h6zM5 7v1h4V7H5zm0 2.5v1h4v-1H5zM5 12v1h4v-1H5z"></path>
                        </svg>
                    </el-icon>
                    <el-text class="content" truncated>{{ user.profile }}</el-text>
                </div>
                <div class="bottom">
                    <div class="profile-item blog">
                        <el-icon class="icon" size="20">
                            <svg width="21" height="18" viewBox="0 0 21 18" xmlns="http://www.w3.org/2000/svg">
                                <path data-v-01966b9e="" fill="currentColor" fill-rule="evenodd"
                                      d="M12.956 5.684l-.04.08-.472-.043.1-.432.412.395m-1.459-1.84l-.663-.29c.452-.216.55-.17.663.29m1.683.133l-.11.02-2.015-2.098 2.394 1.091c-.271.228-.428.554-.269.987M10.334 1.93l.564-.205.078.074c-.11.127-.208.269-.339.366-.025.02-.175-.133-.303-.235m.018.619c.517.025.862.358 1.221.667l-.078.14-1.209-.688.066-.119M8.885 2.42c.202.051.393.085.57.157.03.012.03.253-.013.274-.146.076-.318.101-.49.149l-.067-.58m2.267 10.777c-.182-.2-.338-.423-.5-.64-.276-.366-.293-.75-.065-1.145.07-.122.152-.253.17-.388.035-.271-.13-.335-.376-.359-.18-.018-.463-.107-.503-.23-.189-.588-.728-.62-1.152-.773-.428-.153-.745-.336-.924-.78-.129-.318-.336-.603-.508-.903l-.05.018.167.739c-.112-.174-.185-.25-.215-.34-.207-.623-.481-1.237-.576-1.878-.055-.371.183-.788.292-1.183.016-.057.079-.112.073-.163a18.42 18.42 0 0 0-.13-.918c-.072-.432-.29-.504-.633-.22-.111.093-.232.172-.348.258l-.096-.101c.225-.28.41-.608.682-.826.39-.314.724-.756 1.386-.535.344.115.715.18 1.074.291.308.095.695-.076 1.047-.13L9.95 2.88l.515.339c.045.25-.04.443-.388.46-.091.004-.188.079-.266.142-.425.343-.399.572.086.822.533.274.533.274.701.638.053-.291.102-.583.16-.873.033-.168.079-.333.119-.5.14.065.276.143.422.193.376.13.691.347.952.65.09.106.186.207.335.373l-1.124.517-.005.152c.459-.47.5.087.737.173-.026.05-.04.09-.048.09-.687-.114-.782.618-1.207.877-.035.022-.08.083-.073.112.09.337-.14.482-.34.672-.085.082-.098.266-.1.405-.003.117.057.236.09.354l-.092.05c-.055-.068-.126-.128-.162-.205-.168-.358-.384-.435-.752-.27a.495.495 0 0 1-.247.03c-.368-.04-.555.09-.624.449-.08.408.103.87.385.92.087.015.205-.061.284-.126.11-.09.198-.209.295-.315l.103.053-.142.613c.119.035.238.046.327.104.08.053.18.154.184.239.028.482.425.716.835.475.6-.353 1.192-.206 1.736.098.37.208.659.564 1.022.792.251.157.563.222.855.305.451.128.51.226.304.651-.152.314-.269.674-.5.915-.506.527-1.079.986-1.617 1.482-.458.422-1.224.548-1.254 1.382-.353-.038-.461-.232-.383-.535.109-.425.244-.844.355-1.27.111-.42.019-.79-.277-1.115m4.934-8.278l-.128.09-.47-.757.098-.07.5.737m.487 3.061c.028-.165.062-.333.055-.498a.946.946 0 0 1 .424-.863c.071-.05.24-.06.293-.01.144.137.313.3.361.482.263 1.008.355 2.031.134 3.148-.233-.259-.4-.224-.585-.023-.163.177-.298.147-.441-.085-.42-.685-.365-1.41-.24-2.15m-.288-2.535c-.02-.281-.034-.563-.056-.935.747.402.751 1.15 1.09 1.682l-.452-.537-.078 1.066c-.338-.259-.543-.46-.46-.847.028-.133-.033-.285-.044-.43M10.857 1C6.525 1 3 4.589 3 9s3.525 8 7.857 8c4.333 0 7.857-3.589 7.857-8s-3.524-8-7.857-8"></path>
                            </svg>
                        </el-icon>
                        <a :href="user.blog || ''" class="link" target="_blank">
                            <el-text truncated class="content">
                                {{ user.blog }}
                            </el-text>
                        </a>
                    </div>
                    <div class="btn-group" v-if="!userStore.isSelf(user?.userId)">
                        <el-button type="info" @click="handleFollow" v-if="state" plain>取消关注</el-button>
                        <el-button type="primary" @click="handleFollow" v-else>关注</el-button>
                        <el-button type="primary" plain @click="handleChat">私信</el-button>
                    </div>
                    <el-button plain @click="handleClick" auto-insert-space v-else>设置</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.hami-user-card {
    padding: 30px;
    border-radius: var(--hami-radius-medium);
    background-color: var(--hami-card-bg);
    margin-bottom: 20px;

    .user-card-container {
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
        flex: 1;
        margin-left: 24px;

        .profile-item {
            display: flex;
            align-items: center;
            color: var(--hami-grey-1);

            .content {
                max-width: 160px;
                line-height: 28px;
                height: 28px;
                margin-left: 6px;
                color: var(--hami-grey-1);
            }
        }

        .username {
            font-size: 20px;
            color: var(--hami-text-3);
            font-weight: 700;
            height: 24px;
            line-height: 24px;
            margin: 4px 0;
            max-width: 200px;
        }

        .tag {
            margin-left: 10px;
        }

        .work {
            display: flex;
            align-items: center;

            .divider {
                margin: 0 10px;
                color: var(--hami-grey-1);
            }
        }

        .profile, .blog {
            max-width: 240px;
        }

        .blog {
            a {
                display: flex;
                align-items: center;
            }
        }

        .bottom {
            display: flex;
            align-items: center;
            justify-content: space-between;

            button {
                width: 120px;
            }
        }

        .button-box {
            min-width: 200px;
            max-width: 252px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .btn-group {
            display: flex;
            justify-content: space-between;
        }

    }
}
</style>