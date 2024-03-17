<script setup lang="ts">
import { computed, onBeforeMount, provide, Ref, ref, watch } from "vue"
import { useRequest } from '@/hooks'
import { ArticleService } from '@/service/modules/article.ts'
import { Calendar, Clock, View } from '@element-plus/icons-vue'
import { $message } from '@/utils/message.ts'
import { formatDateTime } from '@/utils'
import { MdCatalog } from 'md-editor-v3'
import { useCateStore } from '@/store/modules/category.ts'
import { useCollect, useLike } from '@/hooks/userInteract.ts'
import { COMMENT_AREA_OWNER } from '@/store/keys.ts'
import HamiMdViewer from '@/components/md/HamiMdViewer.vue'
import HamiComment from '@/components/comment/HamiComment.vue'
import HamiBackTop from '@/components/common/HamiBackTop.vue'
import CommonUserCard from '@/components/user/CommonUserCard.vue'


const $props = defineProps<{
    id: string
}>()
const [onLoading, getArticleContent] = useRequest<Article, [number]>({
    loading: true,
    run: (...params) => ArticleService.getArticleContent(...params)
})
const cateStore = useCateStore()
const articleId = ref<number>(parseInt($props.id))
const article = ref<Article>() as Ref<Article>


onBeforeMount(async () => {
    await getArticle()
})

provide<User | undefined>(COMMENT_AREA_OWNER, article.value?.author)


const mdId = "hami-md-viewer"
const scrollElement = document.documentElement;

const content = computed<string>(() => {
    return article.value?.articleInfo?.content || ""
})

const activeLikeType = computed(() => {
    return article.value?.liked ? "primary" : "info"
})

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
    let count = content.value.length
    return count > 1000 ? (count / 1000).toFixed(1) + "k" : count
})

const viewTime = computed(() => {
    return Math.ceil((content.value.length || 0) / 275)
})

const userLink = computed(() => {
    return "/user/space/" + article.value?.author?.userId
})

const cateRoute = computed(() => {
    return cateStore.findCateRoute(article.value?.category?.id)
})

// @ts-ignore
watch(() => $props.id, (newVal, _) => {
    // articleId.value = parseInt($props.id)
    articleId.value = parseInt(newVal)
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
        console.error(e)
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
            console.error(e)
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
        console.error(e)
    } finally {
        loading?.close()
    }
}

</script>
<template>
    <div class="hami-article-content-page">
        <div class="article-content-container container" v-if="!onLoading">
            <div class="main-content">
                <div class="content-wrapper card">
                    <div class="title">
                        {{ article.articleInfo?.title }}
                    </div>
                    <router-link :to="userLink" class="author ellipsis">
                        {{ article.author?.username }}
                    </router-link>
                    <div class="meta-data">
                        <el-tag class="ctime item" size="large">
                            <el-icon>
                                <Calendar/>
                            </el-icon>
                            <span class="text">
                                {{ ctime }}
                            </span>
                        </el-tag>
                        <el-tag class="mtime item" size="large">
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
                        </el-tag>
                        <el-tag class="words item" size="large">
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
                        </el-tag>
                        <el-tag class="view-time item" size="large">
                            <el-icon>
                                <Clock/>
                            </el-icon>
                            <span class="text">阅读时长: {{ viewTime }}分钟</span>
                        </el-tag>
                        <el-tag class="views item" size="large">
                            <el-icon>
                                <View/>
                            </el-icon>
                            <span class="text">阅读量: {{ article.stat?.views }}</span>
                        </el-tag>
                    </div>
                    <HamiMdViewer v-model="content"></HamiMdViewer>
                    <div class="content-bottom">
                        <div class="tags">
                            <span>标签: </span>
                            <template v-for="tag in article.tags">
                                <el-tag size="default">
                                    {{ tag.name }}
                                </el-tag>
                            </template>
                        </div>
                        <div class="category">
                            <span>分类: </span>
                            <router-link :to="cateRoute">
                                <el-tag type="danger">
                                    {{ article?.category.name}}
                                </el-tag>
                            </router-link>
                        </div>
                    </div>
                </div>
                <div class="comment-wrapper card" id="hami-comment">
                    <HamiComment :area-id="article.id" @change="handleCommentChange"></HamiComment>
                </div>
            </div>
            <div class="right-panel">
                <div class="user-info card">
                    <CommonUserCard
                        v-if="!onLoading"
                        :user="article.author"
                        show-tag
                        show-opt
                        show-stat
                    />
                </div>
                <el-affix :offset="100">
                    <div class="cate-log card">
                        <MdCatalog :editorId="mdId" :scrollElement="scrollElement"/>
                    </div>
                </el-affix>
            </div>
            <div class="options">
                <el-badge :value="article.stat?.likes" :type="activeLikeType" @click="handleLike">
                    <div class="opt-item thumb-up" :class="{active: article?.liked}">
                        <i class="ri-thumb-up-fill"></i>
                    </div>
                </el-badge>
                <el-badge :value="article.stat?.comments" type="info" :max="100">
                    <router-link  to="#hami-comment" class="opt-item comment">
                        <i class="ri-message-3-fill"></i>
                    </router-link>
                </el-badge>
                <el-badge :value="article.stat?.collects" :type="activeCollectType" :max="100"
                          @click="handleCollect">
                    <div class="opt-item star" :class="{active: article?.collected}">
                        <svg aria-hidden="true" class="hami-icon">
                            <use xlink:href="#hami-icon-star"></use>
                        </svg>
                    </div>
                </el-badge>
            </div>
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

    .options {
        position: fixed;
        left: 100px;
        top: 140px;
        display: flex;
        align-items: center;
        flex-direction: column;

        .opt-item {
            width: 48px;
            height: 48px;
            background-color: var(--hami-item-bg);
            border-radius: 50%;
            box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .04);
            cursor: pointer;
            display: flex;
            align-items: center;
            color: var(--hami-item-text-color);
            justify-content: center;
            transition: all .3s;
            font-size: 1.34rem;

            &:hover {
                color: var(--hami-grey-6);
            }

            &:not(:last-child) {
                margin-bottom: 24px;
            }
        }

        :deep(.el-badge__content.is-fixed) {
            top: 6px;
            right: 13px;
        }
    }

    .content-wrapper {
        padding: 30px 36px;
        border-radius: var(--hami-radius);
        //background-color: var(--hami-bg);
        margin-bottom: 20px;

        .title {
            font-size: 30px;
            color: var(--hami-title-color);
            font-weight: 700;
            margin-bottom: 10px;
        }

        .author {
            max-width: 160px;
            color: var(--hami-text-common);
            transition: all .3s;
            font-size: 18px;
            margin-bottom: 10px;
            white-space: nowrap;
            line-height: 32px;

            &:hover {
                color: var(--hami-text-hover-color);
            }
        }

        .meta-data {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .item {
                --el-tag-font-size: 13px;
            }


            .el-icon {
                margin-right: 5px;
            }

            :deep(.el-tag__content) {
                display: inline-flex;
                align-items: center;
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
            color: var(--hami-card-text-color);
            background-color: var(--hami-card-bg);
            border-radius: var(--hami-radius);
            box-shadow: var(--el-box-shadow);
        }
    }

    .comment-wrapper {
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