<script setup lang="ts">
import { computed, onBeforeMount, reactive, ref } from "vue"
import { useRouter } from "vue-router"
import HamiLogo from '@/components/common/HamiLogo.vue'
import HeaderAvatar from '@/components/header/HeaderAvatar.vue'
import { Message } from '@element-plus/icons-vue'
import { NotifyService } from '@/service/modules/notify.ts'
import useUserStore from '@/store/modules/user.ts'
import HamiSearch from '@/components/header/HamiSearch.vue'
//interface
type NavItem = {
    name: string,
    path: string
}
//router, props, inject, provide
const $router = useRouter()
const userStore = useUserStore()
//custom var
const nav = reactive([
    {
        "name": "首页",
        "path": "/"
    },
    {
        "name": "沸点",
        "path": "/"
    },
    {
        "name": "文档",
        "path": "/"
    },
    {
        "name": "关于",
        "path": "/"
    },
])
const activeNav = ref<string>("首页")
const messageCount = ref(0)
//life cycle
onBeforeMount(async () => {
    console.log("hami-header before-mount")
    await getNotifyCount()
})

//watch

//fun
const handleNavClick = async (item: NavItem) => {
    console.log(item)
    activeNav.value = item.name
    await $router.replace(item.path)
}

const getNotifyCount = async () => {
    let count = await NotifyService.getNoReadCount()
    console.log(count)
    let c = 0
    Object.values(count).forEach((value: number, index) => {
        c += value
    })
    messageCount.value = c
}

const toNotify = () => {
    $router.replace("/notify")
}


const toCollect = () => {
    $router.push("/user/space/" + userStore.userInfo.userId + "/collects")
}

const toHistory = () => {
    $router.replace("/history")
}

</script>
<template>
    <div class="hami-page-header">
        <div class="page-header-container">
            <div class="page-header-left">
                <div class="page-header-logo">
                    <HamiLogo fit="fill" size="small" type="logo3"></HamiLogo>
                </div>
                <div class="page-header-nav">
                    <template v-for="item in nav">
                        <div class="header-nav-item"
                             @click="handleNavClick(item)"
                             :class="{active: item.name === activeNav}"
                        >
                            {{ item.name }}
                        </div>
                    </template>
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
                    <div class="option-item" @click="toNotify">
                        <el-badge class="badge" :value="messageCount"
                                  :is-dot="messageCount >= 10"
                                  :hidden="messageCount === 0"
                        >
                            <el-icon size="20">
                                <Message/>
                            </el-icon>
                        </el-badge>
                        <span>
                            消息
                        </span>
                    </div>
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
                        <span class="creator">创作者中心</span>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.hami-page-header {
    //background-color: var(--hami-bg);
    position: relative;
    z-index: 100;
    background: linear-gradient(-225deg, #e3fdf5 0, #ffe6fa 100%);;
    box-shadow: .1rem 0.1rem 0.2rem rgba(0, 0, 0, .1);

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
            color: #515767;
            padding: 0 1rem;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
        }

        .header-nav-item.active {
            color: var(--hami-blue);
        }

        .header-nav-item:hover {
            color: var(--hami-link-hover);
        }
    }

    .page-header-search {
        width: 380px;
    }

    .page-header-options {
        display: flex;
        align-items: center;

        .creator {
            background-color: var(--hami-brand);
            padding: 0 10px;
            color: var(--hami-text-white);
            font-size: var(--hami-text-size);
            height: 40px;
            border-radius: var(--hami-radius);
            line-height: 40px;
            cursor: pointer;
            width: 120px;
            text-align: center;
            display: block;

            &:hover {
                background-color: #0288d1;
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

            .badge {
                height: 20px;
                --el-badge-radius: 10px;
                --el-badge-font-size: 12px;
                --el-badge-padding: 4px;
                --el-badge-size: 16px;

                :deep(.el-badge__content) {
                    right: 5px;
                    top: 3px;
                }
            }

            &:hover .el-icon {
                animation: jump .3s;
            }

            &:hover {
                color: var(--hami-link-hover);
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