<script setup lang="ts">
import { onMounted, reactive } from "vue"
import { onBeforeRouteLeave, useRoute, useRouter } from "vue-router"
import { isEmpty } from '@/utils'
import { publishedImg } from "@/store/images.ts"

const article = reactive({
    title: "",
    id: ""
})
const $router = useRouter()
const $route = useRoute()

onMounted(() => {
    article.id = window.sessionStorage.getItem("p_articleId") || ""
    article.title = window.sessionStorage.getItem("p_title") || ""
    if (isEmpty(article.title) || isEmpty(article.id)) {
        handleClick()
    }
})

onBeforeRouteLeave(() => {
    window.sessionStorage.removeItem("p_articleId")
    window.sessionStorage.removeItem("p_title")
})


const handleClick = () => {
    $router.replace("/")
}

</script>
<template>
    <div class="hami-published">
        <div class="hami-published-body">
            <img :src="publishedImg" alt="">
            <router-link :to="'/article/' + article.id" class="title">《{{ article.title }}》</router-link>
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
    background-color: var(--hami-bg);
    border-radius: var(--hami-radius-medium);

    .hami-published-body {
        min-height: 400px;
        text-align: center;
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