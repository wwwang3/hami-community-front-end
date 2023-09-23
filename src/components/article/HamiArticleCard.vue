<script setup lang="ts">
import { ref, reactive, onMounted, computed, Ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import useUserStore from '@/store/modules/user.ts'
import { formatDateTime, isEmpty } from '@/utils'
import auth from '@/service/modules/auth.ts'
import { getRoutePrefix } from '@/router'
import dayjs from 'dayjs'
import { Calendar, MoreFilled, View } from '@element-plus/icons-vue'
import { $message } from '@/utils/message.ts'
import { UserInteractService } from '@/service/modules/interact.ts'
import { useAutoLoading, useRequest } from '@/hooks'

//interface
interface ArticleCardProps {
    article: Article,
    border?: boolean
}

const $props = withDefaults(defineProps<ArticleCardProps>(), {
    border: false
})
//router, props, inject, provide
const $route = useRoute()
const $router = useRouter()
const userStore = useUserStore()

//custom var
const prefix = getRoutePrefix() + "article/"

const article = ref<ArticleInfo>($props.article.articleInfo)
const author = ref<User>($props.article.author)
const category = ref<CategoryDTO>($props.article.category)
const tags = ref<TagDTO[]>($props.article.tags)
const stat = ref<ArticleStat>($props.article.stat)
const collected = ref($props.article.collected)
const liked = ref($props.article.liked)

// const [onLike, doLike] = useRequest({
//     run: (...params) => UserInteractService.like(...params as Parameters<typeof UserInteractService.like>)
// })
const link = computed(() => {
    return "/article/" +article.value.id
})

const ctime = computed(() => {
    return formatDateTime(article.value.ctime, "YYYY-MM-DD")
})

const showCate = computed(() => {
    return $route.path === '/recommend' || $route.path === "/"
})

const [onLike, processLike] = useAutoLoading()
//life cycle

//watch

//fun
const handleLike = async () => {
    try {
        await check(onLike)
        if (liked.value) {
            //已经点赞
            await processLike(UserInteractService.cancelLike({
                itemId: article.value.id,
                itemType: 1
            }))
            stat.value.likes--
        } else {
            await processLike(UserInteractService.like({
                itemId: article.value.id,
                itemType: 1
            }))
            stat.value.likes++
        }
        liked.value = !liked.value
    } catch (e) {
        console.log(e)
    }
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
const isAuthor = () => {
    return !isEmpty(userStore.userInfo) && userStore.userInfo?.userId === author.value.userId
}

</script>
<template>
    <div class="hami-article-card">
        <div class="entry">
            <div class="article-info">
                <div class="article-header">
                    <el-text class="author" truncated>{{ author.username }}</el-text>
                    <div class="ctime">
                        <el-icon>
                            <Calendar/>
                        </el-icon>
                        {{ ctime }}
                    </div>
                    <div class="category" v-if="showCate">
                        {{category.categoryName}}
                    </div>
                </div>
                <el-text class="title">
                    {{ article.title }}
                </el-text>
                <router-link class="summary" :to="link">
                    {{ article.summary }}
                </router-link>
                <div class="bottom">
                    <div class="stat">
                        <div class="item views">
                            <el-icon>
                                <View/>
                            </el-icon>
                            <span class="count">{{ stat.views }}</span>
                        </div>
                        <div class="item likes" :class="{active: liked}" @click="handleLike">
                            <el-icon size="16">
                                <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M13.0651 3.25923C12.6654 2.21523 12.1276 1.60359 11.4633 1.40559C10.8071 1.21 10.2539 1.48626 9.97848 1.67918C9.43962 2.05668 9.17297 2.64897 9.0009 3.12662C8.93522 3.30893 8.87504 3.50032 8.82077 3.67291L8.82077 3.67292C8.80276 3.73019 8.78541 3.78539 8.76872 3.8375C8.6974 4.06017 8.63455 4.23905 8.56561 4.38315C8.07104 5.41687 7.64014 6.034 7.2617 6.43277C6.89154 6.8228 6.5498 7.0275 6.18413 7.21038C5.8887 7.35813 5.69369 7.66144 5.69365 8.00211L5.69237 17.3908C5.6923 17.8783 6.08754 18.2736 6.57511 18.2736H14.8382C15.2621 18.2736 15.5829 18.1393 15.8149 17.9421C15.9234 17.8497 15.9985 17.7554 16.0484 17.6856C16.0695 17.6561 16.088 17.6282 16.0983 17.6126L16.1017 17.6075L16.1033 17.6051L16.1194 17.5857L16.1428 17.5478C16.913 16.3019 17.4472 15.3088 17.8659 14.1183C18.3431 12.7613 18.5849 11.5853 18.6874 10.6685C18.7871 9.77617 18.7612 9.07318 18.6558 8.68779C18.5062 8.14118 18.138 7.82653 17.7668 7.66617C17.4231 7.51771 17.0763 7.49836 16.8785 7.49807L13.1134 7.44551C13.662 5.19751 13.31 3.89889 13.0651 3.25923ZM1.251 8.0848C1.22726 7.5815 1.62891 7.16046 2.13277 7.16046H3.4408C3.92832 7.16046 4.32354 7.55568 4.32354 8.04321V17.4303C4.32354 17.9178 3.92832 18.313 3.4408 18.313H2.57554C2.10419 18.313 1.71599 17.9427 1.69378 17.4718L1.251 8.0848Z"
                                          fill="currentColor"
                                    >
                                    </path>
                                </svg>
                            </el-icon>
                            <span class="count">{{ stat.likes }}</span>
                        </div>
                    </div>
                    <div class="tags">
                        <template v-for="tag in tags">
                            <el-tag round effect="light" class="tag-item" type="info" size="small">
                                {{ tag.tagName }}
                            </el-tag>
                        </template>
                    </div>
                </div>
            </div>
            <div class="article-picture" v-if="article.picture">
                <router-link :to="link">
                    <img :src="article.picture" alt="" loading="lazy">
                </router-link>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.hami-article-card {
    background-color: var(--hami-card-bg);
    padding: 16px 20px;
    transition: all .3s;
    cursor: pointer;

    .entry {
        display: flex;
        justify-content: space-between;
    }

    .article-info {
        flex: 1;
    }

    .article-header {
        display: flex;
        align-items: center;
        color: var(--hami-text-1);
        font-size: 14px;
        height: 20px;

        .author {
            max-width: 100px;
            margin-right: 6px;
        }

        .ctime {
            display: flex;
            align-items: center;

            .el-icon {
                margin-right: 4px;
            }
        }
        .category {
            margin-left: 16px;
        }
    }

    .title {
        display: block;
        font-size: 20px;
        font-weight: 700;
        color: var(--hami-title);
        margin: 6px 0;
    }

    .summary {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        max-height: 5rem;
        font-size: 15px;
        overflow: hidden;
        color: var(--hami-text);
    }

    .bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 10px;
    }

    .stat {
        display: flex;

        .item {
            display: flex;
            align-items: center;
            color: var(--hami-text-5);
        }

        .likes {
            margin-left: 8px;
            position: relative;
            z-index: 99;
            pointer-events: visible;

            &:hover {
                color: var(--hami-text-blue);
            }

            .el-icon {
                transition: all .3s;
            }

            &.active {
                color: var(--hami-text-blue);
            }
        }

        .count {
            margin-left: 4px;
        }
    }

    .tags {
        display: flex;
        align-items: center;
        color: var(--hami-text-5);
        .tag-item {
            font-size: 14px;
            margin: 0 6px;
            //background-color: var   ;
            //color: var(--hami-text-5);
        }
    }

    .article-picture {
        height: 135px;

        img {
            width: auto;
            height: 135px;
            border-radius: var(--hami-radius-small);
        }
    }
}
.hami-article-card.border {
    border-bottom: 1px solid var(--el-border-color);
    //padding-bottom: 10px;
}

</style>
<style>
.card-dropdown {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 100px !important;

    .el-button + .el-button {
        margin-left: 0;
        margin-top: 4px;
    }

    .el-button {
        width: 80px;
    }
}
</style>