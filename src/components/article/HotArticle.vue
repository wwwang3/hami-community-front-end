<script setup lang="ts">
import { onMounted, ref, watch } from "vue"
import HotImg from "/assets/hot.png"
import { useRequest } from '@/hooks'
import { isEmpty } from '@/utils'
import { Refresh } from '@element-plus/icons-vue'
import { RankService } from '@/service/modules/rank.ts'

type IndexedHotArticle = HotArticle & {
    index: number
}

const $props = defineProps({
    cateId: {
        default: -1,
        type: Number
    }
})


const [onLoading, listHotArticles] = useRequest<Array<HotArticle>, [number | null]>({
    loading: false,
    run: (...params) => RankService.listHotArticle(...params)
})

const rotate = ref<number>(0)

const cateId = ref<number>($props.cateId)

const articleList = ref<IndexedHotArticle[]>([])
const subArticleList = ref<IndexedHotArticle[]>([])
const current = ref<number>(0)
const size = 6
const pages = ref(1)


onMounted(async () => {
    await getHotArticles()
})

watch(() => $props.cateId, (newVal, oldVal) => {
    cateId.value = newVal
    getHotArticles()
})

watch(() => current.value, (newVal, oldVal) => {
    subArticleList.value = getSubList()
})


const handleClick = () => {
    if (onLoading.value || isEmpty(articleList.value)) {
        return
    }
    rotate.value = rotate.value + 360
    current.value = (current.value + 1) % pages.value
}

const getHotArticles = async () => {
    try {
        current.value = 0
        let articles = await listHotArticles(cateId.value === -1 ? null : cateId.value)
        articleList.value = articles.map((article, index) => {
            let t = article as IndexedHotArticle
            t.index = index
            return t
        });
        subArticleList.value = getSubList()
        pages.value = articleList.value ? Math.ceil(articleList.value.length / size) : 1
    } catch (e) {
        console.log(e)
    }
}

const getSubList = () => {
    return articleList.value?.slice(current.value * size, (current.value + 1) * size)
}

const calculateHotIndex = (rank: number) => {
    return Math.ceil(rank);
}
</script>
<template>
    <div class="hami-hot-article">
        <div class="hot-article-title">
            <div class="left">
                <el-image :src="HotImg" class="hot-img"></el-image>
                <span class="text">热门文章</span>
            </div>
            <div class="right" @click="handleClick">
                <el-icon class="icon" size="18" :style="{'transform': `rotate(${rotate}deg)`}">
                    <Refresh/>
                </el-icon>
                <span class="text">换一换</span>
            </div>
        </div>
        <div class="hot-article-list">
            <template v-for="item in subArticleList">
                <div class="hot-article-item">
                    <div class="hot-rank"
                         :class="{'first': item.index === 0, 'second': item.index === 1, 'third': item.index === 2}">
                        {{ item.index + 1 }}
                    </div>
                    <router-link :to="'/article/' + item.articleId">
                        <span class="title ellipsis">
                            {{ item.article.articleInfo.title }}
                        </span>
                        <span class="hot">
                            <el-icon class="hot-icon" :size="15">
                                <svg class="icon" viewBox="0 0 1024 1024"
                                     xmlns="http://www.w3.org/2000/svg" id="mx_n_1695127716484" width="200"
                                     height="200">
                                    <path
                                        d="M442.514286 73.142857c82.529524 64.24381 140.239238 126.610286 173.129143 187.099429 31.158857 57.295238 43.666286 115.907048 37.546666 175.835428l-1.219047 9.996191 6.095238-4.973715a174.055619 174.055619 0 0 0 49.249524-69.607619l2.681904-7.411809 7.704381-23.04c82.285714 55.734857 123.440762 150.064762 123.440762 283.062857C841.142857 823.515429 665.795048 950.857143 521.654857 950.857143c-144.11581 0-308.224-85.333333-334.750476-263.875048-26.550857-178.541714 83.480381-261.90019 158.427429-378.197333C395.288381 231.253333 427.690667 152.697905 442.514286 73.142857z"
                                        fill="currentColor"></path>
                                </svg>
                            </el-icon>
                            <span class="ellipsis hot-index">{{ calculateHotIndex(item.hotRank) }}</span>
                        </span>
                    </router-link>
                </div>
            </template>

        </div>
    </div>
</template>

<style scoped lang="less">
.hami-hot-article {
    padding: 16px 16px 10px;

    .hot-article-title {
        display: flex;
        justify-content: space-between;
        padding-bottom: 12px;
        border-bottom: 1px solid var(--el-border-color);

        .left, .right {
            display: flex;
            align-items: center;
        }

        .left {
            color: var(--hami-text-1);

            .hot-img {
                width: 24px;
                height: 24px;
                margin-right: 6px;
            }
        }

        .right {
            cursor: pointer;
            color: var(--hami-item-text-color);

            .icon {
                margin-right: 6px;
                position: relative;
                top: 1px;
                transition: transform .5s ease;;
            }
        }

        .right:hover {
            .icon {
                color: var(--hami-text-hover-color);
            }

            .text {
                color: var(--hami-text-hover-color);
            }
        }
    }

    .hot-article-list {
        padding-top: 10px;

        .hot-article-item {
            display: flex;
            align-items: center;
            font-size: 1.23rem;
            padding: 6px 10px;

            .first {
                background: linear-gradient(180deg, #f64242 20%, rgba(246, 66, 66, .4) 80%);
                -webkit-background-clip: text;
                background-clip: text;
                color: transparent;
            }

            .second {
                background: linear-gradient(180deg, #ff7426 20%, rgba(255, 116, 38, .4) 80%);
                -webkit-background-clip: text;
                background-clip: text;
                color: transparent;
            }

            .third {
                background: linear-gradient(180deg, #ffac0c 20%, rgba(255, 172, 12, .4) 80%);
                -webkit-background-clip: text;
                background-clip: text;
                color: transparent;
            }

            &:hover {
                border-radius: var(--hami-radius-small);
                background-color: var(--hami-item-hover-bg);
            }

            a {
                display: flex;
                align-items: center;
                justify-content: space-between;
                flex: 1;
                color: var(--hami-title-color);
            }

            .title {
                max-width: 100px;
            }

            .hot {
                flex: 1;
                display: flex;
                align-items: center;
                width: 28px;

                .hot-icon {
                    color: #f64242;
                }

                .hot-index {
                    margin-left: 5px;
                }
            }
        }

        .hot-rank {
            font-weight: 800;
            min-width: 18px;
            display: flex;
            align-items: center;
            height: 24px;
            color: var(--hami-item-text-color);
            text-align: left;
        }

        .title {
            margin-left: 10px;
            font-size: 16px;
        }
    }
}
</style>