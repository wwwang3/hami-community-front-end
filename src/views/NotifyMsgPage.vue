<script setup lang="ts">
import { computed, nextTick, ref, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
import { isEmpty } from '@/utils'
import NotifyNavList from '@/components/notify/NotifyNavList.vue'
import useNotifyStore, { NotifyRouteItem, NotifyRouteType } from '@/store/modules/notify.ts'


const activeRoute = ref<NotifyRouteType>("/notify/reply")
const $router = useRouter()
const $route = useRoute()
const notifyStore = useNotifyStore()

watch(() => $route.fullPath, (newVal, _) => {
    let value = notifyStore.notifyRoutes.find(item => item.path === newVal)
    if (isEmpty(value) || activeRoute.value === value?.path) {
        return
    }
    activeRoute.value = value!.path
}, {
    immediate: true
})


const handleClick = (item: NotifyRouteItem) => {
    $router.push(item.path)
}

const handleUpdate = (path: NotifyRouteType) => {
    let item = notifyStore.notifyRoutes.find(item => item.path === path)
    if (isEmpty(item)) {
        return
    }
    nextTick(() => {
        notifyStore.notifyCountItem[item!.type] = 0
    })
}

const header = computed(() => {
    return notifyStore.notifyRoutes.find(item => item.path == activeRoute.value)?.name ?? "通知"
})

</script>
<template>
    <div class="hami-notify">
        <div class="hami-notify-container container">
            <NotifyNavList
                v-model="activeRoute"
                nav-class="notify-nav"
                active-class="active"
                item-class="nav-item"
                list-class="nav-list"
                @click="handleClick"
                @update="handleUpdate"
            >
                <template #header>
                    <div class="nav-header">
                        <el-icon size="18">
                            <svg viewBox="0 0 1024 1024"
                                 xmlns="http://www.w3.org/2000/svg" width="200" height="200">
                                <path
                                    d="M63.791885 555.886533l896.41623-448.208115L790.262538 783.725658 459.709053 679.144788l295.070342-360.434026-380.976898 334.288552L63.791885 555.886533 63.791885 555.886533z"
                                    fill="currentColor"></path>
                                <path
                                    d="M448.50385 731.435735l108.316961 31.747051-84.039022 153.137773L448.50385 731.435735 448.50385 731.435735z"
                                    fill="currentColor"></path>
                            </svg>
                        </el-icon>
                        <span class="title">消息中心</span>
                    </div>
                </template>
            </NotifyNavList>
            <div class="notify-body">
                <div class="notify-body-header">
                    {{ header }}
                </div>
                <div class="notify-body-content">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less">
html.dark {
    .hami-notify {
        .hami-empty {
            background-color: var(--hami-frame-bg);
        }
    }
}
</style>
<style lang="less" scoped>

.hami-notify::before {
    background: var(--hami-notify-bg);
    content: '';
    position: fixed;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
}

.hami-notify {
    margin-top: 10px;

    .hami-notify-container {
        display: flex;
        justify-content: space-between;
        max-width: 1000px;
        height: calc(100vh - 70px);
    }

    :deep(.notify-nav) {
        min-width: 160px;
        background-color: var(--hami-notify-nav-bg);
        font-size: 16px;
        font-weight: 700;
        padding: 10px 0;
        border-top-left-radius: var(--hami-radius);

        .nav-header {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 60px;
            color: var(--hami-title-color);

            i {
                margin-right: 10px;
                top: 2px;
            }

            .title {
                font-size: 18px;
            }
        }

        .nav-list {
            padding-left: 24px;
            height: 360px;

            .nav-item {
                height: 40px;
                display: flex;
                align-items: center;
                position: relative;
                justify-content: normal;
                color: var(--hami-grey-5);
                margin-bottom: 6px;
                cursor: pointer;
                transition: color .3s;

                .name {
                    padding-left: 10px;
                    line-height: 40px;
                }

                .count {
                    position: absolute;
                    right: 12px;
                }

                &:before {
                    content: "\25cf";
                    line-height: 20px;
                }

                .badge-item .el-badge__content {
                    top: 6px;
                    font-weight: normal;
                }
            }

            .nav-item:hover,
            .nav-item.active {
                color: var(--hami-blue-5);
            }
        }
    }

    .notify-body {
        padding: 10px 12px;
        background-color: var(--hami-notify-body-bg);
        flex: 1;
        border-top-right-radius: var(--hami-radius);

        .notify-body-header {
            border-radius: var(--hami-radius);
            background-color: var(--hami-bg);
            height: 42px;
            box-shadow: 0 2px 4px 0 rgba(121, 146, 185, 0.54);
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 16px;
            font-size: 15px;
            color: var(--hami-grey-2);
        }

        .notify-body-content {
            height: calc(100% - 66px);
        }
    }
}
</style>