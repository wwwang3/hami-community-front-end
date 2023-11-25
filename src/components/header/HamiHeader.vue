<script setup lang="ts">
import { useRouter } from "vue-router"
import HamiLogo from '@/components/common/HamiLogo.vue'
import HeaderAvatar from '@/components/header/HeaderAvatar.vue'
import useUserStore from '@/store/modules/user.ts'
import HamiSearch from '@/components/header/HamiSearch.vue'
import HeaderNotify from '@/components/header/HeaderNotify.vue'
import { $message } from '@/utils'

const $router = useRouter()
const userStore = useUserStore()

const toCollect = () => {
    $router.push("/user/space/" + userStore.userInfo.userId + "/collects")
}

const toHistory = () => {
    $router.replace("/history")
}

const toNotify = () => {
    $router.replace("/notify")
}

const handleAboutClick = () => {
    $message.alert("作者喜欢吃哈密瓜, 所以叫Hami ✿ヽ(°▽°)ノ✿", "关于Hami")
}

const onPPT = () => {
    $message.notifySuccess("开发中~~~")
}

</script>
<template>
    <div class="hami-page-header">
        <div class="page-header-container">
            <div class="page-header-left">
                <router-link class="page-header-logo" to="/">
                    <HamiLogo fit="fill" size="small" type="logo3"></HamiLogo>
                </router-link>
                <div class="page-header-nav">
                    <router-link class="header-nav-item" to="/"
                    >
                        首页
                    </router-link>
                    <div class="header-nav-item"
                         @click="onPPT"
                    >
                        沸点
                    </div>
                    <a
                        href="https://github.com/wwwang3/hami-community"
                        target="_blank"
                        class="header-nav-item"
                    >
                        项目地址
                    </a>
                    <div class="header-nav-item"
                         @click="handleAboutClick"
                    >
                        关于Hami
                    </div>
                </div>
            </div>
            <div class="page-header-right">
                <div class="page-header-search">
                    <HamiSearch></HamiSearch>
                </div>
                <div class="page-header-user">
                    <HeaderAvatar></HeaderAvatar>
                </div>
                <div class="page-header-options">
                    <HeaderNotify class="option-item" @click="toNotify"></HeaderNotify>
                    <div class="option-item" @click="toCollect">
                        <el-icon size="20">
                            <svg width="20" height="21" viewBox="0 0 20 21" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                      d="M11.0505 3.16759L12.7915 6.69573C12.954 7.02647 13.2702 7.25612 13.6349 7.30949L17.5294 7.87474C18.448 8.00817 18.8159 9.13785 18.1504 9.78639L15.3331 12.5334C15.0686 12.7905 14.9481 13.1609 15.0104 13.5256L15.6759 17.4031C15.8328 18.3184 14.8721 19.0171 14.0497 18.5845L10.5661 16.7537C10.2402 16.5823 9.85042 16.5823 9.52373 16.7537L6.04087 18.5845C5.21848 19.0171 4.2578 18.3184 4.41468 17.4031L5.07939 13.5256C5.14166 13.1609 5.02198 12.7905 4.75755 12.5334L1.9394 9.78639C1.27469 9.13785 1.64182 8.00817 2.56126 7.87474L6.4549 7.30949C6.82041 7.25612 7.13578 7.02647 7.29832 6.69573L9.04015 3.16759C9.45095 2.33468 10.6389 2.33468 11.0505 3.16759Z"
                                      stroke="currentColor" stroke-width="1.6" stroke-linecap="round"
                                      stroke-linejoin="round"></path>
                                <path
                                    d="M11.603 11.8739C11.413 12.5556 10.7871 13.0554 10.0447 13.0554C9.29592 13.0554 8.66679 12.5467 8.48242 11.8569"
                                    stroke="currentColor" stroke-width="1.6" stroke-linecap="round"
                                    stroke-linejoin="round"></path>
                            </svg>
                        </el-icon>
                        <span>
                            收藏
                        </span>
                    </div>
                    <div class="option-item" @click="toHistory">
                        <el-icon size="20">
                            <svg width="20" height="21" viewBox="0 0 20 21" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                      d="M10 1.74286C5.02955 1.74286 1 5.7724 1 10.7429C1 15.7133 5.02955 19.7429 10 19.7429C14.9705 19.7429 19 15.7133 19 10.7429C19 5.7724 14.9705 1.74286 10 1.74286ZM10.0006 3.379C14.0612 3.379 17.3642 6.68282 17.3642 10.7426C17.3642 14.8033 14.0612 18.1063 10.0006 18.1063C5.93996 18.1063 2.63696 14.8033 2.63696 10.7426C2.63696 6.68282 5.93996 3.379 10.0006 3.379Z"
                                      fill="currentColor"></path>
                                <path d="M9.99985 6.6521V10.743" stroke="currentColor" stroke-width="1.7"
                                      stroke-linecap="round"></path>
                                <path d="M12.4545 10.7427H10" stroke="currentColor" stroke-width="1.7"
                                      stroke-linecap="round"></path>
                            </svg>
                        </el-icon>
                        <span>
                            历史
                        </span>
                    </div>
                    <router-link to="/creator/home">
                        <div class="creator">
                            <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" fill="none">
                                <path
                                    d="M12.0824 10H14.1412C15.0508 10 15.7882 10.7374 15.7882 11.6471V12.8824C15.7882 13.792 15.0508 14.5294 14.1412 14.5294H3.84707C2.93743 14.5294 2.20001 13.792 2.20001 12.8824V11.6471C2.20001 10.7374 2.93743 10 3.84707 10H5.90589"
                                    stroke="currentColor" stroke-width="1.7" stroke-linecap="round"
                                    stroke-linejoin="round"></path>
                                <path d="M8.99413 11.2353L8.99413 3.82353" stroke="currentColor" stroke-width="1.7"
                                      stroke-linecap="round" stroke-linejoin="round"></path>
                                <path d="M12.0823 6.29413L8.9941 3.20589L5.90587 6.29413" stroke="currentColor"
                                      stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                            <span>创作者中心</span>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.hami-page-header {
    position: relative;
    z-index: 100;
    background: var(--hami-header-bg);
    box-shadow: 0 2px 4px rgba(0, 0, 0, .08);

    .page-header-container {
        display: flex;
        align-items: center;
        height: 100%;
        max-width: 1440px;
        margin: 0 auto;
        justify-content: space-between;
        padding: 0 32px;
    }

    .page-header-left, .page-header-right {
        display: flex;
        align-items: center;
        color: var(--hami-text-1);
    }

    .page-header-logo {
        height: 100%;
        margin-right: 20px;
    }

    .page-header-nav {
        display: flex;
        align-items: center;

        .header-nav-item {
            height: 60px;
            padding: 0 1rem;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
        }

        .header-nav-item.active {
            color: var(--hami-text-hover-color);
        }

        .header-nav-item:hover {
            color: var(--hami-text-hover-color);
            transition: color .3s;
            animation: jump .3s;
        }
    }

    .page-header-search {
        width: 380px;
    }

    .page-header-options {
        display: flex;
        align-items: center;

        .creator {
            padding: 0 10px;
            color: #fff;
            background-color: var(--hami-pink-2);
            font-size: 14px;
            height: 40px;
            border-radius: var(--hami-radius);
            cursor: pointer;
            width: 120px;
            display: flex;
            align-items: center;
            text-align: center;
            line-height: 26px;
            transition: background-color .3s;

            svg {
                margin-right: 3px;
                vertical-align: middle;
            }

            span {
                line-height: 26px;
            }

            &:hover {
                background-color: var(--hami-pink-3);
            }
        }

        .option-item {
            margin-right: 28px;
            display: flex;
            align-items: center;
            flex-direction: column;
            flex-shrink: 0;
            min-width: 50px;
            text-align: center;
            font-size: 15px;
            cursor: pointer;

            &:hover {
                :deep(.el-icon) {
                    animation: jump .3s;
                }
            }

            &:hover {
                color: var(--hami-text-hover-color);
            }

            .el-icon {
                font-size: 20px;
                margin-bottom: 1px;
            }

            span {
                line-height: 1.25;
            }
        }
    }

    .page-header-user {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        position: relative;
        margin: 0 28px;
    }
}

@keyframes jump {
    0% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-3px);
    }

    100% {
        transform: translateY(0);
    }

}

</style>