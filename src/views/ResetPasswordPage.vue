<script setup lang="ts">
import HamiResetPasswordCard from '@/components/auth/ResetPasswordFrame.vue'
import { useTokenStore } from '@/store/modules/token.ts'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const tokenStore = useTokenStore()
const $router = useRouter()

onMounted(() => {
    if (tokenStore.authenticated()) {
        $router.replace("/")
    }
})

</script>
<template>
    <div class="hami-reset-password">
        <HamiResetPasswordCard></HamiResetPasswordCard>
    </div>
</template>

<style scoped lang="less">
.hami-reset-password {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: var(--hami-login-bg);
    height: 100%;
}
</style>