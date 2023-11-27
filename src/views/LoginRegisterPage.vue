<template>
    <div class="hami-login-register-container">
        <HamiLoginRegister :mode="mode"></HamiLoginRegister>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import HamiLoginRegister from '@/components/auth/HamiLoginRegister.vue'
import { useRoute } from 'vue-router'

const $route = useRoute()

const mode = computed(() => {
    return $route.fullPath === "/login" ? "login" : "register";
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