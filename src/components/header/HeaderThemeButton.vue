<script setup lang="ts">
import { ref } from "vue"
import useThemeStore, { ThemeType } from '@/store/modules/theme.ts'

const modes: Array<ThemeType> = ["auto", "light", "dark"]

const themeStore = useThemeStore()

const index = ref(0)
const changeTheme = () => {
    index.value = (index.value + 1) % 3
    themeStore.setThemeMode(modes[index.value])
}
</script>
<template>
    <div class="theme-btn" @click="changeTheme">
        <el-icon v-if="themeStore.themeMode == 'light'" size="20">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" fill="currentColor">
                <path
                    d="M952 552h-80a40 40 0 0 1 0-80h80a40 40 0 0 1 0 80zM801.88 280.08a41 41 0 0 1-57.96-57.96l57.96-58a41.04 41.04 0 0 1 58 58l-58 57.96zM512 752a240 240 0 1 1 0-480 240 240 0 0 1 0 480zm0-560a40 40 0 0 1-40-40V72a40 40 0 0 1 80 0v80a40 40 0 0 1-40 40zm-289.88 88.08-58-57.96a41.04 41.04 0 0 1 58-58l57.96 58a41 41 0 0 1-57.96 57.96zM192 512a40 40 0 0 1-40 40H72a40 40 0 0 1 0-80h80a40 40 0 0 1 40 40zm30.12 231.92a41 41 0 0 1 57.96 57.96l-57.96 58a41.04 41.04 0 0 1-58-58l58-57.96zM512 832a40 40 0 0 1 40 40v80a40 40 0 0 1-80 0v-80a40 40 0 0 1 40-40zm289.88-88.08 58 57.96a41.04 41.04 0 0 1-58 58l-57.96-58a41 41 0 0 1 57.96-57.96z"></path>
            </svg>
        </el-icon>
        <el-icon v-else-if="themeStore.themeMode == 'dark'" size="20">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"
                 fill="currentColor">
                <path
                    d="M524.8 938.667h-4.267a439.893 439.893 0 0 1-313.173-134.4 446.293 446.293 0 0 1-11.093-597.334A432.213 432.213 0 0 1 366.933 90.027a42.667 42.667 0 0 1 45.227 9.386 42.667 42.667 0 0 1 10.24 42.667 358.4 358.4 0 0 0 82.773 375.893 361.387 361.387 0 0 0 376.747 82.774 42.667 42.667 0 0 1 54.187 55.04 433.493 433.493 0 0 1-99.84 154.88 438.613 438.613 0 0 1-311.467 128z"></path>
            </svg>
        </el-icon>
        <el-icon v-else size="20">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"
                 fill="currentColor">
                <path
                    d="M512 992C246.92 992 32 777.08 32 512S246.92 32 512 32s480 214.92 480 480-214.92 480-480 480zm0-840c-198.78 0-360 161.22-360 360 0 198.84 161.22 360 360 360s360-161.16 360-360c0-198.78-161.22-360-360-360zm0 660V212c165.72 0 300 134.34 300 300 0 165.72-134.28 300-300 300z"></path>
            </svg>
        </el-icon>
    </div>
</template>

<style scoped lang="less">
.theme-btn {
    cursor: pointer;
    margin-right: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;

    .el-icon {
        color: var(--hami-grey-3);
        transition: color .3s;
        margin-bottom: 2px;
    }

    .el-icon:hover {
        color: var(--hami-icon-active-1);
    }
}
</style>