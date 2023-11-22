<script setup lang="ts">
import { computed, onBeforeMount, provide, ref, watch } from "vue"
import { useRequest } from '@/hooks'
import { ArticleService } from '@/service/modules/article.ts'
import { Calendar, Clock, View } from '@element-plus/icons-vue'
import { $message } from '@/utils/message.ts'
import { formatDateTime } from '@/utils'
import HamiMdViewer from '@/components/md/HamiMdViewer.vue'
import { MdCatalog } from 'md-editor-v3'
import HamiUserCard from '@/components/common/HamiUserCard.vue'
import { useCateStore } from '@/store/modules/category.ts'
import { useCollect, useLike } from '@/hooks/userInteract.ts'
import { COMMENT_AREA_OWNER } from '@/store/keys.ts'
import HamiComment from '@/components/comment/HamiComment.vue'


const $props = defineProps<{
    id: string
}>()
const [onLoading, getArticleContent] = useRequest({
    loading: true,
    run: (...params) => ArticleService.getArticleContent(...params as Parameters<typeof ArticleService.getArticleContent>)
})
const cateStore = useCateStore()
const articleId = ref<number>(parseInt($props.id))
const article = ref<ArticleContent>({
    content: ''
} as ArticleContent)

provide<User>(COMMENT_AREA_OWNER, article.value.author)

onBeforeMount(async () => {
    await getArticle()
})

const mdId = "hami-md-viewer"
const scrollElement = document.documentElement;

const activeLikeType = computed(() => {
    return article.value?.liked ? "primary" : "info"
})

const inited = ref(false)
const activeCollectType = computed(() => {
    return article.value?.collected ? "primary" : "info"
})

const ctime = computed(() => {
    let time = article.value?.articleInfo?.ctime
    return formatDateTime(time)
})

const mtime = computed(() => {
    let time = article.value?.articleInfo?.mtime
    return formatDateTime(time)
})

const words = computed(() => {
    let count = article.value?.content?.length || 0
    return count > 1000 ? (count / 1000).toFixed(1) + "k" : count
})

const viewTime = computed(() => {
    return Math.ceil((article.value?.content?.length || 0) / 275)
})

const userLink = computed(() => {
    return "/user/space/" + article.value?.author?.userId
})

const cateRoute = computed(() => {
    return cateStore.findCateRoure(article.value.category?.categoryId)
})

watch(() => $props.id, (newVal, oldVal) => {
    // articleId.value = parseInt($props.id)
    articleId.value = parseInt($props.id)
    getArticle()
})

const [liked, processLike] = useLike(article.value?.liked)
const [collected, processCollect] = useCollect(article.value?.collected)
const handleLike = () => {
    processLike({
        itemId: article.value.id,
        itemType: 1
    }).then(state => {
        if (state) {
            article.value.stat.likes++
            article.value.liked = true
        } else {
            article.value.stat.likes--
            article.value.liked = false
        }
    }).catch(e => {
        $message.error("点赞失败")
    })
}
const handleCollect = () => {
    processCollect(article.value.id)
        .then(state => {
            if (state) {
                article.value.stat.collects++
                article.value.collected = true
            } else {
                article.value.stat.collects--
                article.value.collected = false
            }
        })
        .catch(e => {
            $message.error("收藏失败")
        })
}

const handleCommentChange = (delta: number) => {
    article.value.stat.comments += delta
}


const getArticle = async () => {
    let loading = $message.loading("加载中")
    try {
        article.value = await getArticleContent(articleId.value)
        liked.value = article.value.liked
        collected.value = article.value.collected
    } catch (e) {
        console.log(e)
    } finally {
        loading?.close()
    }
}

</script>
<template>
    <div class="hami-article-content-page">
        <div class="article-content-container container" v-if="!onLoading">
            <div class="main-content">
                <div class="content-wrapper">
                    <div class="title">
                        {{ article.articleInfo?.title }}
                    </div>
                    <router-link :to="userLink" class="author">
                        {{ article.author?.username }}
                    </router-link>
                    <div class="meta-data">
                        <div class="ctime item">
                            <el-icon>
                                <Calendar/>
                            </el-icon>
                            <span class="text">
                                {{ ctime }}
                            </span>
                        </div>
                        <div class="mtime item">
                            <el-icon>
                                <svg viewBox="0 0 1024 1024"
                                     xmlns="http://www.w3.org/2000/svg" width="200" height="200">
                                    <path
                                        d="M512.736 992a483.648 483.648 0 0 1-164.672-28.8 36.88 36.88 0 1 1 25.104-69.36 407.456 407.456 0 1 0-184.608-136.512A36.912 36.912 0 0 1 129.488 801.6a473.424 473.424 0 0 1-97.472-290A480 480 0 1 1 512.736 992z"
                                        fill="currentColor"></path>
                                    <path
                                        d="M685.6 638.592a32 32 0 0 1-14.032-2.96l-178.048-73.888a36.8 36.8 0 0 1-22.912-34.016V236.672a36.944 36.944 0 1 1 73.888 0v266.72l155.2 64.272a36.336 36.336 0 0 1 19.952 48 37.616 37.616 0 0 1-34.048 22.928z"
                                        fill="currentColor"></path>
                                </svg>
                            </el-icon>
                            <span class="text">{{ mtime }}</span>
                        </div>
                        <div class="words item">
                            <el-icon>
                                <svg class="icon" viewBox="0 0 1024 1024"
                                     xmlns="http://www.w3.org/2000/svg" width="200" height="200">
                                    <path
                                        d="M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326z m1.8 562H232V136h302v216c0 23.2 18.8 42 42 42h216v494z"></path>
                                    <path
                                        d="M528.1 472h-32.2c-5.5 0-10.3 3.7-11.6 9.1L434.6 680l-46.1-198.7c-1.3-5.4-6.1-9.3-11.7-9.3h-35.4c-1.1 0-2.1 0.1-3.1 0.4-6.4 1.7-10.2 8.3-8.5 14.7l74.2 276c1.4 5.2 6.2 8.9 11.6 8.9h32c5.4 0 10.2-3.6 11.6-8.9l52.8-197 52.8 197c1.4 5.2 6.2 8.9 11.6 8.9h31.8c5.4 0 10.2-3.6 11.6-8.9l74.4-276c0.3-1 0.4-2.1 0.4-3.1 0-6.6-5.4-12-12-12H647c-5.6 0-10.4 3.9-11.7 9.3l-45.8 199.1-49.8-199.3c-1.3-5.4-6.1-9.1-11.6-9.1z"
                                    ></path>
                                </svg>
                            </el-icon>
                            <span class="text">
                                字数: {{ words }}
                            </span>
                        </div>
                        <div class="view-time item">
                            <el-icon>
                                <Clock/>
                            </el-icon>
                            <span class="text">阅读时长: {{ viewTime }}分钟</span>
                        </div>
                        <div class="views item">
                            <el-icon>
                                <View/>
                            </el-icon>
                            <span class="text">阅读量: {{ article.stat?.views }}</span>
                        </div>
                    </div>
                    <HamiMdViewer v-model="article.content"></HamiMdViewer>
                    <div class="content-bottom">
                        <div class="tags">
                            <span>标签: </span>
                            <template v-for="tag in article.tags">
                                <el-tag size="default">
                                    {{ tag.tagName }}
                                </el-tag>
                            </template>
                        </div>
                        <div class="category">
                            <span>分类: </span>
                            <router-link :to="cateRoute">
                                <el-tag type="danger">
                                    {{ article?.category?.categoryName }}
                                </el-tag>
                            </router-link>
                        </div>
                    </div>
                </div>
                <div class="comment-wrapper" id="hami-comment">
                    <HamiComment :area-id="article.id" @change="handleCommentChange"></HamiComment>
                </div>
            </div>
            <div class="right-panel">
                <div class="user-info">
                    <HamiUserCard :user="article.author"></HamiUserCard>
                </div>
                <el-affix :offset="100">
                    <div class="cate-log">
                        <MdCatalog :editorId="mdId" :scrollElement="scrollElement"/>
                    </div>
                </el-affix>
            </div>
            <el-affix :offset="100">
                <div class="options">
                    <el-badge :value="article.stat?.likes" :type="activeLikeType" @click="handleLike">
                        <div class="option-item like" :class="{active: article?.liked}">
                            <el-icon size="20">
                                <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M13.0651 3.25923C12.6654 2.21523 12.1276 1.60359 11.4633 1.40559C10.8071 1.21 10.2539 1.48626 9.97848 1.67918C9.43962 2.05668 9.17297 2.64897 9.0009 3.12662C8.93522 3.30893 8.87504 3.50032 8.82077 3.67291L8.82077 3.67292C8.80276 3.73019 8.78541 3.78539 8.76872 3.8375C8.6974 4.06017 8.63455 4.23905 8.56561 4.38315C8.07104 5.41687 7.64014 6.034 7.2617 6.43277C6.89154 6.8228 6.5498 7.0275 6.18413 7.21038C5.8887 7.35813 5.69369 7.66144 5.69365 8.00211L5.69237 17.3908C5.6923 17.8783 6.08754 18.2736 6.57511 18.2736H14.8382C15.2621 18.2736 15.5829 18.1393 15.8149 17.9421C15.9234 17.8497 15.9985 17.7554 16.0484 17.6856C16.0695 17.6561 16.088 17.6282 16.0983 17.6126L16.1017 17.6075L16.1033 17.6051L16.1194 17.5857L16.1428 17.5478C16.913 16.3019 17.4472 15.3088 17.8659 14.1183C18.3431 12.7613 18.5849 11.5853 18.6874 10.6685C18.7871 9.77617 18.7612 9.07318 18.6558 8.68779C18.5062 8.14118 18.138 7.82653 17.7668 7.66617C17.4231 7.51771 17.0763 7.49836 16.8785 7.49807L13.1134 7.44551C13.662 5.19751 13.31 3.89889 13.0651 3.25923ZM1.251 8.0848C1.22726 7.5815 1.62891 7.16046 2.13277 7.16046H3.4408C3.92832 7.16046 4.32354 7.55568 4.32354 8.04321V17.4303C4.32354 17.9178 3.92832 18.313 3.4408 18.313H2.57554C2.10419 18.313 1.71599 17.9427 1.69378 17.4718L1.251 8.0848Z"
                                          fill="currentColor"
                                    >
                                    </path>
                                </svg>
                            </el-icon>
                        </div>
                    </el-badge>
                    <el-badge :value="article.stat?.comments" type="info" :max="100">
                        <div class="option-item comment">
                            <router-link to="#hami-comment">
                                <el-icon size="22">
                                    <svg viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                              fill="currentColor"
                                              d="M4.62739 1.25C2.9347 1.25 1.5625 2.6222 1.5625 4.31489L1.56396 12.643C1.56403 14.3356 2.9362 15.7078 4.62885 15.7078H6.48326L6.93691 17.6869L6.93884 17.6948C7.16894 18.6441 8.28598 19.0599 9.08073 18.4921L12.7965 15.7078H15.5001C17.1928 15.7078 18.565 14.3355 18.565 12.6428L18.5635 4.31477C18.5635 2.62213 17.1913 1.25 15.4986 1.25H4.62739ZM5.98265 9.89255C6.68783 9.89255 7.2595 9.32089 7.2595 8.61571C7.2595 7.91053 6.68783 7.33887 5.98265 7.33887C5.27747 7.33887 4.70581 7.91053 4.70581 8.61571C4.70581 9.32089 5.27747 9.89255 5.98265 9.89255ZM9.95604 9.89255C10.6612 9.89255 11.2329 9.32089 11.2329 8.61571C11.2329 7.91053 10.6612 7.33887 9.95604 7.33887C9.25086 7.33887 8.6792 7.91053 8.6792 8.61571C8.6792 9.32089 9.25086 9.89255 9.95604 9.89255ZM15.2124 8.61571C15.2124 9.32089 14.6407 9.89255 13.9355 9.89255C13.2304 9.89255 12.6587 9.32089 12.6587 8.61571C12.6587 7.91053 13.2304 7.33887 13.9355 7.33887C14.6407 7.33887 15.2124 7.91053 15.2124 8.61571Z">
                                        </path>
                                    </svg>
                                </el-icon>
                            </router-link>
                        </div>
                    </el-badge>
                    <el-badge :value="article.stat?.collects" :type="activeCollectType" :max="100"
                              @click="handleCollect">
                        <div class="option-item collect" :class="{active: article?.collected}">
                            <el-icon size="20">
                                <svg viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" clip-rule="evenodd" fill="currentColor"
                                          d="M5.24287 18.3845C4.89724 18.5507 4.48229 18.4053 4.31605 18.0596C4.26029 17.9437 4.23783 17.8146 4.25117 17.6866L4.75725 12.8332C4.77762 12.6379 4.71431 12.443 4.583 12.297L1.29207 8.63594C1.03567 8.35071 1.05905 7.91164 1.34428 7.65524C1.43464 7.574 1.54475 7.5179 1.66358 7.49254L6.47789 6.46509C6.66998 6.42409 6.83572 6.30367 6.93407 6.13365L9.39894 1.87248C9.59098 1.54049 10.0158 1.42704 10.3478 1.61907C10.453 1.67992 10.5403 1.76729 10.6012 1.87248L13.0661 6.13365C13.1644 6.30367 13.3301 6.42409 13.5222 6.46509L18.3365 7.49254C18.7116 7.57259 18.9508 7.94155 18.8707 8.31664C18.8454 8.43547 18.7893 8.54557 18.708 8.63594L15.4171 12.297C15.2858 12.443 15.2225 12.6379 15.2429 12.8332L15.7489 17.6866C15.7887 18.0681 15.5117 18.4096 15.1303 18.4493C15.0023 18.4627 14.8732 18.4402 14.7572 18.3845L10.3011 16.2412C10.1108 16.1497 9.8893 16.1497 9.69906 16.2412L5.24287 18.3845Z"></path>
                                </svg>
                            </el-icon>
                        </div>
                    </el-badge>
                </div>
            </el-affix>
            <HamiBackTop></HamiBackTop>
        </div>
    </div>
</template>

<style scoped lang="less">
.hami-article-content-page {

    .article-content-container {
        margin-top: 40px;
        display: flex;
        justify-content: space-between;
        max-width: 1140px;
    }

    .main-content {
        flex: 1;
        max-width: calc(100% - 280px);
    }

    :deep(.el-affix--fixed .options) {
        top: 200px;
    }

    .options {
        position: fixed;
        left: 100px;
        top: 140px;
        display: flex;
        align-items: center;
        flex-direction: column;

        .option-item {
            width: 48px;
            height: 48px;
            background-color: var(--hami-item-bg);
            border-radius: 50%;
            box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .04);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--hami-item-text-color);
            transition: all .3s;

            &:hover {
                color: var(--hami-grey-7);
            }

            &:not(:last-child) {
                margin-bottom: 24px;
            }
        }

        .comment {
            a {
                display: block;
                height: 22px;
            }
        }

        .like.active {
            color: var(--hami-icon-active-1);
        }

        .collect.active {
            color: var(--hami-yellow-1);
        }

        :deep(.el-badge__content.is-fixed) {
            top: 6px;
            right: 13px;
        }
    }

    .content-wrapper {
        padding: 30px 36px;
        border-radius: var(--hami-radius);
        background-color: var(--hami-bg);
        margin-bottom: 20px;
        box-shadow: var(--el-box-shadow);

        .title {
            font-size: 30px;
            color: var(--hami-title-color);
            font-weight: 700;
            margin-bottom: 10px;
        }

        .author {
            max-width: 160px;
            color: var(--hami-text-4);
            transition: all .3s;
            font-size: 18px;
            margin-bottom: 10px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            display: block;
            line-height: 32px;

            &:hover {
                color: var(--hami-text-hover-color);
            }
        }

        .meta-data {
            display: flex;
            align-items: center;

            .item:not(:first-child) {
                margin-left: 10px;
            }

            color: var(--hami-item-text-color);
        }

        .item {
            background: var(--hami-blue-6);
            padding: 4px 8px;
            font-size: 14px;
            border-radius: var(--hami-radius-small);
            display: flex;
            align-items: center;

            .text {
                margin-left: 5px;
            }
        }

        .content-bottom {
            display: flex;
            align-items: center;
            margin-top: 5px;
        }

        .category {
            margin-left: 40px;

            a {
                margin-left: 16px;
            }
        }

        .category, .tags {
            display: flex;
            align-items: center;
            cursor: pointer;
            color: var(--hami-text-common);
        }

        .tags {

            .el-tag {
                margin-left: 16px;
            }
        }
    }

    .right-panel {
        max-width: 280px;
        min-width: 240px;
        margin-left: 24px;

        .user-info {
            padding: 16px 20px;
            background-color: var(--hami-card-bg);
            border-radius: var(--hami-radius);
            margin-bottom: 20px;
            box-shadow: var(--el-box-shadow);
        }

        .cate-log {
            padding: 16px 16px;
            background-color: var(--hami-card-bg);
            border-radius: var(--hami-radius);
            box-shadow: var(--el-box-shadow);
        }
    }

    .comment-wrapper {
        background-color: var(--hami-bg);
        margin-top: 20px;
        border-radius: var(--hami-radius);
        min-height: 100px;
        margin-bottom: 20px;
        box-shadow: var(--el-box-shadow);
    }
}
</style>
<style>
.md-editor-catalog-active > span {
    color: var(--el-menu-active-color);
}

.md-editor-catalog-link span:hover {
    color: var(--el-menu-hover-text-color);
}
</style>