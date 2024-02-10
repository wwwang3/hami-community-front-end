<template>
    <div class="hami-login-register-container">
        <HamiLoginRegister :mode="mode"></HamiLoginRegister>
    </div>
</template>

<script setup lang="ts">
import HamiLoginRegister from '@/components/auth/HamiLoginRegister.vue'

type ModeType = {
    mode: "login" | "register"
}

const $props = withDefaults(defineProps<ModeType>(), {
    mode: "login"
})
</script>

<style lang="less" scoped>
.hami-login-register-container {
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--hami-login-bg);
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}

</style>