<script setup lang="ts">
import { ref, reactive, onMounted, computed, watch, onBeforeMount } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useAutoLoading, useRequest } from '@/hooks'
import { ArticleService } from '@/service/modules/article.ts'
import { Calendar, ChatDotSquare, View } from '@element-plus/icons-vue'
import { UserInteractService } from '@/service/modules/interact.ts'
import { Ref } from 'vue/dist/vue'
import { $message } from '@/utils/message.ts'
import useUserStore from '@/store/modules/user.ts'
import { formatDateTime } from '@/utils'
import HamiMdViewer from '@/components/md/HamiMdViewer.vue'
import { MdCatalog } from 'md-editor-v3'
import HamiUserCard from '@/components/user/HamiUserCard.vue'
//interface


//router, props, inject, provide

const $props = defineProps<{
    id: string
}>()
const $router = useRouter()
const $route = useRoute()
const userStore = useUserStore()

const articleId = ref<number>(parseInt($props.id))
const article = ref<ArticleContent>({} as ArticleContent)
const mdId = "hami-md-viewer"
const scrollElement = document.documentElement;


const activeLikeType = computed(() => {
    return article.value?.liked ? "primary" : "info"
})

const activeCollectType = computed(() => {
    return article.value?.collected ? "primary" : "info"
})

const ctime = computed(() => {
    let time = article.value?.articleInfo?.ctime
    return formatDateTime(time, "YYYY-MM-DD")
})

const userLink = computed(() => {
    return "/user/space/" + article.value?.author?.userId
})
//custom var
const [onLoading, getArticleContent] = useRequest({
    run: (...params) => ArticleService.getArticleContent(...params as Parameters<typeof ArticleService.getArticleContent>)
})
const inited = ref<boolean>(false)

onBeforeMount(async () => {
    try {
        await getArticle()
    } catch (e) {

    } finally {
        inited.value = true
    }
})
//life cycle
onMounted(async () => {
})
//watch
watch(() => $props.id, (newVal, oldVal) => {
    // articleId.value = parseInt($props.id)
    console.log(newVal, oldVal)
    articleId.value = parseInt($props.id)
    getArticle()
})
//fun

const [onLike, processLike] = useAutoLoading()
const [onCollect, processCollect] = useAutoLoading()
const handleLike = async () => {
    try {
        await check(onLike)
        if (article.value?.liked) {
            //已经点赞
            await processLike(UserInteractService.cancelLike({
                itemId: article.value.id,
                itemType: 1
            }))
            article.value.stat.likes--
            article.value.liked = false
        } else {
            await processLike(UserInteractService.like({
                itemId: article.value.id,
                itemType: 1
            }))
            article.value.stat.likes++
            article.value.liked = true
        }
    } catch (e) {
        console.log(e)
    }
}
const handleCollect = async () => {
    try {
        await check(onCollect)
        if (article.value?.collected) {
            //已经点赞
            await processCollect(UserInteractService.cancelCollect(articleId.value))
            article.value.stat.collects--
            article.value.collected = false
        } else {
            await processCollect(UserInteractService.collect(articleId.value))
            article.value.stat.collects++
            article.value.collected = true
        }
    } catch (e) {

    }
}

const handleComment = () => {

}
const check = async (ref: Ref<boolean>) => {
    if (!userStore.logined) {
        $message.notifyError("请登录后访问")
        return Promise.reject()
    }
    if (ref.value) {
        $message.error("上个请求还没处理完(´･_･`)")
        return Promise.reject()
    }
}

const getArticle = async () => {
    try {
        article.value = await getArticleContent(articleId.value)
    } catch (e) {
        console.log(e)
    }
}


</script>
<template>
    <div class="hami-article-content-page">
        <div class="article-content-container container" v-if="inited">
            <div class="main-content">
                <div class="content-wrapper">
                    <div class="title">
                        {{ article.articleInfo?.title }}
                    </div>
                    <div class="info">
                        <el-text class="author item" truncated>
                            <router-link :to="userLink">
                                {{ article.author?.username }}
                            </router-link>
                        </el-text>
                        <div class="ctime item">
                            <el-icon>
                                <Calendar/>
                            </el-icon>
                            <span class="time">
                                {{ ctime }}
                            </span>
                        </div>
                        <div class="views item">
                            <el-icon>
                                <View/>
                            </el-icon>
                            <span class="count">{{ article.stat?.views }}</span>
                        </div>
                    </div>
                    <div class="content">
                        <HamiMdViewer v-model="article.content"></HamiMdViewer>
                    </div>
                    <div class="content-bottom">
                        <div class="tags">
<!--                            <el-icon size="20">-->
<!--                                <svg viewBox="0 0 1024 1024"-->
<!--                                     xmlns="http://www.w3.org/2000/svg" p-id="5355"-->
<!--                                     width="200"-->
<!--                                     height="200">-->
<!--                                    <path-->
<!--                                        d="M469.333533 968.08a52.986667 52.986667 0 0 1-37.713333-15.62l-416-416A52.986667 52.986667 0 0 1 0.0002 498.746667V138.666667a53.393333 53.393333 0 0 1 53.333333-53.333334h360.08a52.986667 52.986667 0 0 1 37.713334 15.62l416 416a53.4 53.4 0 0 1 0 75.426667l-360.08 360.08a52.986667 52.986667 0 0 1-37.713334 15.62zM53.333533 128a10.666667 10.666667 0 0 0-10.666666 10.666667v360.08a10.573333 10.573333 0 0 0 3.126666 7.54l416 416a10.666667 10.666667 0 0 0 15.08 0l360.08-360.08a10.666667 10.666667 0 0 0 0-15.08l-416-416a10.573333 10.573333 0 0 0-7.54-3.126667z m224 341.333333c-58.813333 0-106.666667-47.853333-106.666666-106.666666s47.853333-106.666667 106.666666-106.666667 106.666667 47.853333 106.666667 106.666667-47.853333 106.666667-106.666667 106.666666z m0-170.666666a64 64 0 1 0 64 64 64.073333 64.073333 0 0 0-64-64z m335.086667 676.42l382.706667-382.706667a53.4 53.4 0 0 0 0-75.426667L569.753533 91.58a21.333333 21.333333 0 0 0-30.173333 30.173333l425.373333 425.373334a10.666667 10.666667 0 0 1 0 15.08l-382.706666 382.706666a21.333333 21.333333 0 0 0 30.173333 30.173334z"-->
<!--                                        fill="currentColor"></path>-->
<!--                                </svg>-->
<!--                            </el-icon>-->
                            <span>标签: </span>
                            <template v-for="tag in article.tags">
                                <el-tag type="info" size="large">
                                    {{ tag.tagName }}
                                </el-tag>
                            </template>
                        </div>
                        <div class="category">
<!--                            <el-icon size="18">-->
<!--                                <svg viewBox="0 0 1194 1024"-->
<!--                                     xmlns="http://www.w3.org/2000/svg" width="200" height="200">-->
<!--                                    <path-->
<!--                                        d="M1111.167537 860.160068H81.023966A80.8533 80.8533 0 0 0 0 940.800035v0.426666c0 44.543981 36.266652 80.639966 81.023966 80.639967h1030.143571a80.8533 80.8533 0 0 0 81.023966-80.639967v-0.426666c0-44.543981-36.309318-80.639966-81.066633-80.639967m-0.383999-430.59182H81.493299A81.237299 81.237299 0 0 0 0 510.634881v0.639999c0 44.714648 36.437318 81.066633 81.450633 81.066633h1029.290238c44.970648 0 81.450633-36.351985 81.450632-81.066633v-0.639999c0-44.799981-36.479985-81.066633-81.450632-81.066633M1111.167537 0.000427H81.023966A80.8533 80.8533 0 0 0 0 80.640393v0.426667c0 44.543981 36.266652 80.639966 81.023966 80.639966h1030.143571a80.8533 80.8533 0 0 0 81.023966-80.639966v-0.426667c0-44.501315-36.309318-80.639966-81.066633-80.639966"-->
<!--                                        fill="currentColor"></path>-->
<!--                                </svg>-->
<!--                            </el-icon>-->
                            <span>分类: </span>
                            <span class="item">
                                {{ article?.category.categoryName }}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="comment-wrapper" id="hami-comment"></div>
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
            <el-backtop class="back-top" :right="100" :bottom="64">
                <template #default>
                    <el-icon :size="18" color="#1d7dfa">
                        <svg viewBox="0 0 1024 1024"
                             xmlns="http://www.w3.org/2000/svg"
                             data-spm-anchor-id="a313x.7781069.0.i0" width="200" height="200">
                            <path
                                d="M780.288 750.592H244.736V415.744C244.736 229.376 396.288 79.872 460.8 24.576c29.696-24.576 71.68-24.576 101.376 0 65.536 55.296 217.088 204.8 217.088 391.168v334.848z m-453.632-81.92h371.712V415.744c0-150.528-128-277.504-186.368-326.656-57.344 49.152-186.368 176.128-186.368 326.656v252.928zM509.952 87.04z"
                                fill="#1d7dfa"></path>
                            <path
                                d="M326.656 750.592H148.48c-43.008 0-78.848-34.816-78.848-78.848v-76.8c0-26.624 13.312-51.2 34.816-65.536l221.184-146.432v367.616z m-175.104-81.92h92.16v-133.12l-92.16 61.44v71.68zM875.52 750.592H697.344V384l221.184 146.432c22.528 14.336 34.816 38.912 34.816 65.536v76.8c1.024 41.984-34.816 77.824-77.824 77.824z m-96.256-81.92h92.16v-71.68l-92.16-61.44v133.12zM513.024 489.472c-64.512 0-116.736-52.224-116.736-116.736S449.536 256 513.024 256s116.736 52.224 116.736 116.736-52.224 116.736-116.736 116.736z m0-151.552c-18.432 0-34.816 15.36-34.816 34.816s15.36 34.816 34.816 34.816 34.816-15.36 34.816-34.816S532.48 337.92 513.024 337.92zM512 1017.856c-22.528 0-40.96-18.432-40.96-40.96v-163.84c0-22.528 18.432-40.96 40.96-40.96s40.96 18.432 40.96 40.96v163.84c0 22.528-18.432 40.96-40.96 40.96zM351.232 953.344c-22.528 0-40.96-18.432-40.96-40.96v-66.56c0-22.528 18.432-40.96 40.96-40.96s40.96 18.432 40.96 40.96v66.56c0 22.528-18.432 40.96-40.96 40.96zM673.792 953.344c-22.528 0-40.96-18.432-40.96-40.96v-66.56c0-22.528 18.432-40.96 40.96-40.96s40.96 18.432 40.96 40.96v66.56c0 22.528-18.432 40.96-40.96 40.96z"
                            ></path>
                        </svg>
                    </el-icon>
                </template>
            </el-backtop>
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
            background-color: #fff;
            border-radius: 50%;
            box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .04);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--hami-text-5);
            transition: all .3s;

            &:hover {
                color: var(--hami-text-6);
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
            color: var(--hami-text-blue);
        }

        .collect.active {
            color: var(--hami-text-yellow);
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

        .title {
            font-size: 24px;
            color: var(--hami-title);
            font-weight: 700;
            margin-bottom: 16px;
        }

        .info {
            display: flex;
            align-items: center;
            margin-bottom: 20px;

            .item {
                color: var(--hami-text-gray);

                &:not(:first-child) {
                    margin-left: 12px;
                }
            }

            .author.item {
                max-width: 160px;
                color: var(--hami-text);
                transition: all .3s;

                &:hover {
                    color: var(--hami-link-hover);
                }
            }

            .ctime.item {
                display: flex;
                align-items: center;

                .time {
                    margin-left: 6px;
                }
            }

            .views.item {
                display: flex;
                align-items: center;

                .count {
                    margin-left: 6px;
                }
            }
        }

        .content-bottom {
            display: flex;
            align-items: center;
            //justify-content: space-between;
            width: 400px;
            height: 24px;
            font-size: 14px;
        }

        .category {
            display: flex;
            align-items: center;
            color: var(--hami-text);
            cursor: pointer;
            margin-left: 40px;
            .item {
                color: var(--hami-text-blue);
                margin-left: 10px;
            }
        }

        .tags {
            display: flex;
            align-items: center;
            //color: var(--hami-text-blue);
            color: var(--hami-text);
            .el-tag {
                margin-left: 16px;
            }
        }
    }

    .right-panel {
        max-width: 260px;
        min-width: 240px;
        margin-left: 24px;

        .user-info {
            padding: 16px 20px;
            background-color: var(--hami-bg);
            border-radius: var(--hami-radius);
            margin-bottom: 20px;
        }

        .cate-log {
            padding: 16px 16px;
            background-color: var(--hami-bg);
            border-radius: var(--hami-radius);
        }
    }

    .comment-wrapper {
        background-color: var(--hami-bg);
        margin-top: 20px;
        border-radius: var(--hami-radius);
        min-height: 100px;
    }
}
</style>