<template>
    <div class="hami-login-register-container">
        <HamiLoginRegister :mode="mode"></HamiLoginRegister>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import HamiLoginRegister from '@/components/auth/HamiLoginRegister.vue'
import { useRoute, useRouter } from 'vue-router'

const $router = useRouter()
const $route = useRoute()

const mode = computed(() => {
    return $route.fullPath === "/login" ? "login" : "register";
})

onMounted(() => {
    console.log("login-register view")
})

</script>

<style lang="less" scoped>
.hami-login-register-container {
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #65799b, #5e2563);
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}

</style>