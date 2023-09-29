<script setup lang="ts">
import { useTokenStore } from '@/store/modules/token.ts'
import useUserStore from '@/store/modules/user.ts'
import { CateRoutePath, useCateStore } from '@/store/modules/category.ts'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import HamiBulletin from '@/components/common/HamiBulletin.vue'
import HamiCateNav from '@/components/common/HamiCateNav.vue'
import HamiIndexArticle from '@/components/article/HamiIndexArticle.vue'
import HamiHotArticle from "@/components/article/HamiHotArticle.vue"
import { useRoute, useRouter } from 'vue-router'

const $router = useRouter()
const $route = useRoute()

const tokenStore = useTokenStore()
const userStore = useUserStore()
const cateStore = useCateStore()
const isFollow = computed(() => {
    return $route.path === "/follow"
})

const cateId = ref<number>(-1)
const activePath = ref<string>("/recommend")

const resolveRoute = (route: string) => {
    if (route in cateStore.cates) {
        activePath.value = route === "/" ? "/recommend" : route
        cateId.value = cateStore.cates[route as CateRoutePath]
    }
}

watch(() => $route.path, (newVal, oldVal) => {
    resolveRoute(newVal)
}, {
    immediate: true
})

</script>
<template>
    <div class="hami-index-page">
        <div class="hami-index-container container">
            <div class="left-panel">
                <el-affix :offset="60">
                    <HamiCateNav :active-path="activePath"></HamiCateNav>
                </el-affix>
            </div>
            <div class="main-panel">
                <template v-if="isFollow">
                    <HamiFollowUserArticle></HamiFollowUserArticle>
                </template>
                <template v-else>
                    <HamiIndexArticle :cate-id="cateId"></HamiIndexArticle>
                </template>
            </div>
            <div class="right-panel">
                <div class="right-card">
                    <div class="welcome">欢迎使用Hami</div>
                </div>
                <div class="right-card">
                    <HamiBulletin></HamiBulletin>
                </div>
                <el-affix :offset="60">
                    <div class="right-card">
                        <HamiHotArticle :cate-id="cateId"></HamiHotArticle>
                    </div>
                </el-affix>
                <div class="right-card">
                    <div class="more-list">
                        <div class="list-wrap">
                            <div class="list-item">用户协议</div>
                            <div class="list-item">隐私政策</div>
                            <div class="list-item">关于我们</div>
                            <div class="list-item">友情链接</div>
                        </div>
                        <div class="item contact">
                            联系我们: wang3.top@gmail.com
                        </div>
                        <div class="item filing">
                            <el-link href="https://beian.miit.gov.cn/#/Integrated/index"
                                     :underline="false">
                                湘ICP备2022022447号-1
                            </el-link>
                        </div>
                        <div class="item author">
                            © 2023 Hami Powered by wang3
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.hami-index-page {
    margin-top: 40px;

    .hami-index-container {
        max-width: 1280px;
        display: flex;
        justify-content: space-between;
    }

    .left-panel {
        min-width: 180px;
        max-height: 500px;
    }

    .right-panel {
        max-width: 280px;
        height: fit-content;

        .right-card {
            box-shadow: var(--el-box-shadow);
            background-color: var(--hami-bg);
            border-radius: var(--hami-radius);
            margin-bottom: 20px;
        }
    }

    .main-panel {
        flex: 1;
        margin: 0 24px;
    }

    .welcome {
        padding: 20px;
        background: linear-gradient(135deg, #5433ff, #20bdff, #a5fecb);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        font-weight: 700;
    }

    .more-list {
        padding: 20px;

        .list-wrap {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
        }

        .list-item:hover {
            color: #1d7dfa;
        }

        .item, .list-item {
            cursor: pointer;
            line-height: 24px;
            font-size: 13px;
            color: var(--hami-text-1);
        }

        .filing {
            a {
                color: inherit;
                font-size: 13px;
            }
        }

        .list-item:not(:first-child) {
            margin-left: 4px;
        }
    }
}
</style>
<style>

</style>