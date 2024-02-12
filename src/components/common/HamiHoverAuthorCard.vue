<script setup lang="ts">
import { ref, Ref, watch } from "vue"
import { useRequest } from '@/hooks'
import { UserService } from '@/service/modules/user.ts'
import { isEmpty } from '@/utils'
import HamiAuthorCard from '@/components/common/HamiAuthorCard.vue'

//interface
interface SpaceUserProps {
    id: number | undefined
}

const $props = defineProps<SpaceUserProps>()
//router, props, inject, provide
const author = ref<User>() as Ref<User>

const [onLoading, getUser] = useRequest<User, [number]>({
    loading: true,
    run: (...params) => UserService.getAuthorInfo(...params)
})

const init = async () => {
    try {
        author.value = await getUser(<number>$props.id)
    } catch (e) {

    }
}

watch(() => $props.id, async (newVal, _oldVal) => {
    if (!isEmpty(newVal)) {
        await init()
    }
}, {
    immediate: true
})
</script>
<template>
    <el-skeleton animated :loading="onLoading" class="hami-user-card">
        <template #template>
            <div class="header">
                <el-skeleton-item variant="image"
                                  style="border-radius: 50%; width: 54px; height: 54px"></el-skeleton-item>
                <div class="info">
                    <el-skeleton-item variant="p"></el-skeleton-item>
                    <el-skeleton-item variant="p"></el-skeleton-item>
                    <el-skeleton-item variant="p" style="width: 50%"></el-skeleton-item>
                </div>
            </div>
        </template>
    </el-skeleton>
    <div class="hover-card">
        <HamiAuthorCard
            v-if="!onLoading"
            :author="author"
            show-tag
            show-opt
            show-stat
        />
    </div>
</template>

<style scoped lang="less">
.hover-card {
    padding: 20px;
}
</style>