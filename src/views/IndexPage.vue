<script setup lang="ts">
import type { CateRoutePath } from '@/store/modules/category.ts'
import { useCateStore } from '@/store/modules/category.ts'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import BulletinFrame from '@/components/system/BulletinFrame.vue'
import HamiCateNav from '@/components/common/HamiCateNav.vue'
import IndexArticleList from '@/components/article/IndexArticleList.vue'
import HotArticle from "@/components/article/HotArticle.vue"
import AuthorRank from '@/components/article/AuthorRank.vue'

const $props = withDefaults(defineProps<{
    activePath: CateRoutePath
}>(), {
    activePath: "/recommend"
})

const cateStore = useCateStore()
const isFollow = computed(() => {
    return $props.activePath === "/follow"
})

const cateId = ref<number>(-1)
const rightPanel = ref<HTMLElement | null>(null)
const scrollTop = ref(0)
const sticky = ref(false)

onMounted(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    onUnmounted(() => {
        window.removeEventListener("scroll", handleScroll)
    })
})

watch(() => $props.activePath, (newVal, _) => {
    cateId.value = cateId.value = cateStore.cates[newVal]
}, {
    immediate: true
})

watch(() => scrollTop.value, (newVal, _) => {
    sticky.value = !!(rightPanel.value && newVal > rightPanel.value!.offsetHeight + 20);
})

const handleScroll = () => {
    scrollTop.value = window.scrollY
}

</script>
<template>
    <div class="hami-index-container container">
        <div class="hami-index-columns">
            <div class="left-panel">
                <HamiCateNav :active-path="activePath"></HamiCateNav>
                <div class="sticky-card" v-show="sticky">
                    <HamiCateNav :active-path="activePath"></HamiCateNav>
                </div>
            </div>
            <div class="main-panel">
                <template v-if="isFollow">
                    <HamiFollowUserArticle></HamiFollowUserArticle>
                </template>
                <template v-else>
                    <IndexArticleList :cate-id="cateId"></IndexArticleList>
                </template>
            </div>
            <div class="right-panel" ref="rightPanel">
                <div class="card right-card">
                    <div class="welcome">欢迎使用Hami</div>
                </div>
                <div class="card right-card">
                    <BulletinFrame></BulletinFrame>
                </div>
                <div class="card right-card">
                    <HotArticle :cate-id="cateId"></HotArticle>
                </div>
                <div class="card right-card">
                    <AuthorRank></AuthorRank>
                </div>
                <div class="sticky-card" v-show="sticky">
                    <div class="card right-card">
                        <HotArticle :cate-id="cateId"></HotArticle>
                    </div>
                    <div class="card right-card">
                        <AuthorRank></AuthorRank>
                    </div>
                </div>
                <div class="card right-card">
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
                                     :underline="false" target="_blank">
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
.hami-index-container {
    max-width: 1280px;
    margin: 40px auto 0;
}

.hami-index-columns {
    display: flex;
    justify-content: center;
    margin: -0.75rem;

    .main-panel {
        flex: 1;
        width: 0;
        height: auto;
        padding: 0 .7rem;
    }

    .left-panel {
        width: 14rem;
        padding: 0 .7rem;
        min-height: 500px;
    }

    .right-panel {
        width: 18rem;
        height: fit-content;
        padding: 0 .7rem;

        .right-card {
            margin-bottom: 20px;
        }
    }

    .welcome {
        padding: 1.14rem;
        background-image: linear-gradient(270deg, #8b42e8, #7d71e8, #6396e8, #25b8e7);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        font-size: 1.2rem;
        font-weight: 700;
    }

    .more-list {
        padding: 1.1rem;

        .list-wrap {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
        }

        .item:hover, .list-item:hover {
            color: var(--hami-text-hover-color);
        }

        .item, .list-item {
            cursor: pointer;
            line-height: 24px;
            font-size: 12px;
            color: var(--hami-item-text-color);
        }

        .filing {
            a {
                color: inherit;
                font-size: 13px;
            }
        }

    }

}

.left-panel .sticky-card {
    width: 14rem;
    padding: 0 1.4rem 0 0;
    box-sizing: border-box;
}

.sticky-card {
    width: 18rem;
    padding: 0 1.4rem 0 0;
    box-sizing: border-box;
    position: fixed;
    top: 40px;
    transition: all .6s;
}
</style>
