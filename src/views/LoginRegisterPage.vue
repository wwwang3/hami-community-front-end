<template>
    <div class="hami-login-register-container">
        <HamiLoginRegister :mode="mode" :change-route="true"></HamiLoginRegister>
    </div>
</template>

<script setup lang="ts">
import {computed, onMounted, reactive} from 'vue'
import HamiLoginRegister from '@/components/auth/HamiLoginRegister.vue'
import { useRouter, useRoute } from 'vue-router'

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
    background: linear-gradient(135deg, #81ffef, #f067b4);
    //background-color: #121212;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}

</style>