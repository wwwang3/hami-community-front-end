<script setup lang="ts">
import { ref, Ref, watch } from "vue"
import { useRequest } from '@/hooks'
import { UserService } from '@/service/modules/user.ts'
import { isEmpty } from '@/utils'
import HamiUserCard from '@/components/common/HamiUserCard.vue'

//interface
interface SpaceUserProps {
    id: number | undefined
}

const $props = defineProps<SpaceUserProps>()
//router, props, inject, provide
const user = ref<User>() as Ref<User>

const [onLoading, getUser] = useRequest<User, [number]>({
    loading: true,
    run: (...params) => UserService.getAuthorInfo(...params)
})

const init = async () => {
    try {
        user.value = await getUser(<number>$props.id)
    } catch (e) {

    }
}

watch(() => $props.id, async (newVal, oldVal) => {
    if (!isEmpty($props.id)) {
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
                    <el-skeleton-item variant="p">
                        {{ user?.username }}
                    </el-skeleton-item>
                    <el-skeleton-item variant="p"></el-skeleton-item>
                    <el-skeleton-item variant="p" style="width: 50%"></el-skeleton-item>
                </div>
            </div>
        </template>
    </el-skeleton>
    <HamiUserCard :user="user" :position="false" profile v-if="!onLoading"></HamiUserCard>
</template>

<style scoped lang="less">
.hami-user-card {
    padding: 16px;

    .header {
        display: flex;
        justify-content: space-between;
    }

    .info {
        margin-left: 10px;
        flex: 1;
    }

    :deep(.btn-group) {
        button {
            width: 120px;
        }
    }
}
</style>