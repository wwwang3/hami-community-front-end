<script setup lang="ts">
import type { CateRoutePath } from '@/store/modules/category.ts'
import { useCateStore } from '@/store/modules/category.ts'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import HamiBulletin from '@/components/common/HamiBulletin.vue'
import HamiCateNav from '@/components/common/HamiCateNav.vue'
import HamiIndexArticle from '@/components/article/HamiIndexArticle.vue'
import HamiHotArticle from "@/components/article/HamiHotArticle.vue"
import HamiAuthorRank from '@/components/article/HamiAuthorRank.vue'

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
    window.addEventListener("scroll", handleScroll, {passive: true})
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
            <div class="right-panel" ref="rightPanel">
                <div class="right-card">
                    <div class="welcome">欢迎使用Hami</div>
                </div>
                <div class="right-card">
                    <HamiBulletin></HamiBulletin>
                </div>
                <div class="right-card">
                    <HamiHotArticle :cate-id="cateId"></HamiHotArticle>
                </div>
                <div class="right-card">
                    <HamiAuthorRank></HamiAuthorRank>
                </div>
                <div class="sticky-card" v-show="sticky">
                    <div class="right-card">
                        <HamiHotArticle :cate-id="cateId"></HamiHotArticle>
                    </div>
                    <div class="right-card">
                        <HamiAuthorRank></HamiAuthorRank>
                    </div>
                </div>
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
            background-color: var(--hami-card-bg);
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

        .item:hover, .list-item:hover {
            color: var(--hami-text-hover-color);
        }

        .item, .list-item {
            cursor: pointer;
            line-height: 24px;
            font-size: 13px;
            color: var(--hami-item-text-color);
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
.sticky-card {
    max-width: 280px;
    position: fixed;
    top: 60px;
    transition: all .6s;
}
</style>
