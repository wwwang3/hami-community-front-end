<script setup lang="ts">
import { onMounted } from "vue"
import { onBeforeRouteLeave, useRouter } from "vue-router"
import { isEmpty } from '@/utils'
import { publishedImg } from "@/store/images.ts"

interface Props {
    id: string | number | undefined,
    title: string | undefined
}


const $props = defineProps<Props>()
const $router = useRouter()

onMounted(() => {
    console.log($props)
    if (isEmpty($props.id) || isEmpty($props.title)) {
        console.warn("no article_id or title")
        handleClick()
    }
})

onBeforeRouteLeave(() => {
    window.sessionStorage.removeItem("p_article_id")
    window.sessionStorage.removeItem("p_title")
})


const handleClick = () => {
    $router.replace("/")
}

</script>
<template>
    <div class="card hami-published">
        <div class="hami-published-body">
            <img :src="publishedImg" alt="">
            <router-link :to="'/article/' + $props.id" class="title">《{{ $props.title }}》</router-link>
            <div class="msg">发表成功! 有你的分享Hami会变得更好~</div>
            <el-button type="primary" @click="handleClick">回到首页</el-button>
        </div>
    </div>
</template>

<style scoped lang="less">
.hami-published {
    margin: 80px auto 0;
    width: 900px;
    padding: 20px;
    border-radius: var(--hami-radius-medium);

    .hami-published-body {
        min-height: 400px;
        text-align: center;
        img {
            background-color: transparent;
        }
    }

    .title {
        display: block;
        color: var(--hami-title-color);
        font-size: 18px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        cursor: pointer;

        &:hover {
            color: var(--hami-text-hover-color);
        }
    }

    .msg {
        color: var(--hami-grey-2);
        font-size: 16px;
        margin: 16px;
    }

}
</style>