<script setup lang="ts">
import { ref, watch } from "vue"
import { isEmpty } from '@/utils'
import useNotifyStore, { NotifyRouteItem, NotifyRouteType } from '@/store/modules/notify.ts'

interface NotifyNavListProps {
    modelValue: NotifyRouteType
    itemClass?: string
    activeClass?: string
    navClass?: string
    listClass?: string
}

const $props = defineProps<NotifyNavListProps>()

const activeRoute = ref<NotifyRouteType>($props.modelValue ?? "/notify/reply")
const notifyStore = useNotifyStore()

const notifyRoutes = notifyStore.notifyRoutes

const $emit = defineEmits<{
    (e: 'update:modelValue', value: string): void,
    (e: 'click', value: NotifyRouteItem): void
}>()

export type NotifyEmitType = typeof $emit

watch(() => $props.modelValue, (value: NotifyRouteType) => {
    changeActiveRoute(value)
})


const changeActiveRoute = (path: NotifyRouteType) => {
    if (activeRoute.value === path || isEmpty(path)) return
    activeRoute.value = path
    $emit("update:modelValue", path)
}

const handleClick = (item: NotifyRouteItem) => {
    changeActiveRoute(item.path)
    $emit("click", item)
}


</script>
<template>
    <div class="hami-notify-nav" :class="[navClass === undefined ? '' : navClass]">
        <slot name="header"></slot>
        <div class="notify-nav-list" :class="[listClass === undefined ? '': listClass]">
            <template v-for="item in notifyRoutes">
                <div class="notify-nav-item"
                     @click="handleClick(item)"
                     :class="[itemClass, item.path === activeRoute ? activeClass : '']"
                >
                    <span class="name">{{ item.name }}</span>
                    <span class="count" v-if="notifyStore.notifyCountItem[item.type] > 0">{{ notifyStore.notifyCountItem[item.type] }}</span>
                </div>
            </template>
        </div>
    </div>
</template>

<style lang="less" scoped>
.hami-notify-nav {

    .notify-nav-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .name {
            display: inline-block;
            font-size: inherit;
        }
        .count {
            font-size: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background-color: var(--hami-red-3);
            color: var(--hami-white);
            width: 18px;
            height: 18px;
        }
    }
}
</style>