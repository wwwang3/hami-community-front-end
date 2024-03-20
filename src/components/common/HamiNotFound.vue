<script setup lang="ts">
import { img404 } from "@/store/images.ts"
import { useRouter } from 'vue-router'

const $router = useRouter()

const handleClick = () => {
    $router.replace("/")
}
</script>
<template>
    <div class="container">
        <el-empty class="card not-found" :image="img404" :image-size="940">
            <template #default>
                <el-button color="#626aef" @click="handleClick">返回首页</el-button>
            </template>
            <template #description></template>
        </el-empty>
    </div>
</template>

<style scoped lang="less">
.not-found {
    margin-top: 5rem;
    padding: 0 .8rem 1rem;

    :deep(.el-empty__description) {
        display: none;
    }

    button {
        width: 120px;
    }
}
</style>