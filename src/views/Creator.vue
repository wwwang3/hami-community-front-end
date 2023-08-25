<script setup lang="ts">
import { ref, reactive, onMounted, computed } from "vue"
import { useRoute, useRouter } from "vue-router"
//interface

//router, props, inject, provide

//custom var

//life cycle

//watch

//fun

</script>
<template>
    <div class="hami-creator">
        <div class="hami-creator-container">
            <div class="creator-nav"></div>
            <div class="creator-body">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
    .hami-creator {
        margin-top: 40px;
        .hami-creator-container {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            //justify-content: space-between;
        }
        .creator-nav {
            min-width: 240px;
        }
        .creator-body {
            flex: 1;
        }
    }
</style>