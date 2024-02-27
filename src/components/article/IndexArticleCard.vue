<script setup lang="ts">
import { computed, ref } from "vue"
import { $message, formatRelativeTime, isEmpty, strToNum } from '@/utils'
import { TAG_NODES } from '@/store/modules/category.ts'
import { useLike } from '@/hooks/userInteract.ts'
import HamiHoverAuthorCard from '@/components/common/HoverAuthorCard.vue'

//interface
interface ArticleCardProps {
    article: Article
    comment?: boolean
    border?: boolean
    reverse?: boolean
    highlightTitle?: boolean
    highlightSummary?: boolean
    showCate?: boolean
    showUser?: boolean
}

const $props = withDefaults(defineProps<ArticleCardProps>(), {
    comment: true,
    border: false,
    reverse: false,
    highlightTitle: false,
    highlightSummary: false,
    showCate: true,
    showUser: true
})

const showInfo = ref(false)

const [liked, processLike] = useLike($props.article.liked)

const articleLink = computed(() => {
    return {
        name: 'ArticleContent',
        params: {
            id: $props.article?.id
        }
    }
})

const spaceLink = computed(() => {
    return {
        name: "UserSpace",
        params: {
            "id": $props.article.author.userId
        }
    }
})

const hasImg = computed(() => {
    return !isEmpty($props.article?.articleInfo?.picture)
})

const imgStyle = computed(() => {
    return {
        'background-image': `url(${$props.article?.articleInfo?.picture})`
    }
})

const reversed = computed(() => {
    return $props.reverse && hasImg.value
})

const getTagType = (index: number) => {
    let i = strToNum(index)
    return TAG_NODES[(isNaN(i) ? 0 : i) % TAG_NODES.length]
}

const handleBeforeEnter = () => {
    showInfo.value = true
}

const handleLike = () => {
    processLike({
        itemId: $props.article.id,
        itemType: 1
    }).then(state => {
        if (state) {
            $props.article.stat.likes++
            $props.article.liked = true
        } else {
            $props.article.stat.likes--
            $props.article.liked = false
        }
    }).catch(_e => {
        $message.error("点赞失败")
    })
}

</script>
<template>
    <div class="article-card" :class="{'reversed': reversed}">
        <div class="card-content">
            <router-link :to="articleLink" class="ellipsis title">
                {{ article?.articleInfo?.title }}
            </router-link>
            <div class="ellipsis summary">{{ article.articleInfo.summary }}</div>
            <HamiDivider></HamiDivider>
            <div class="meta" :class="{'reversed': reversed}">
                <div class="meta-main" :class="{'reversed': reversed}">
                    <el-popover
                        trigger="hover"
                        width="300"
                        placement="top"
                        @before-enter="handleBeforeEnter"
                        :show-after="300"
                        v-if="showUser"
                    >
                        <template #reference>
                            <router-link
                                :to="spaceLink"
                                class="ellipsis meta-item author"
                            >
                                {{ $props.article?.author.username }}
                            </router-link>
                        </template>
                        <template v-if="showInfo" #default>
                            <HamiHoverAuthorCard :id="article.userId"></HamiHoverAuthorCard>
                        </template>
                    </el-popover>
                    <div class="meta-item stat">
                        <i class="ri-eye-line"></i>
                        <HamiNumber :value="article?.stat?.views" class="ellipsis"></HamiNumber>
                    </div>
                    <div class="meta-item stat thumb-up" :class="{'active': liked}" @click="handleLike">
                        <i class="ri-thumb-up-fill"></i>
                        <HamiNumber :value="article?.stat?.likes" class="ellipsis"></HamiNumber>
                    </div>
                    <div class="meta-item">
                        {{ formatRelativeTime(article?.articleInfo?.ctime) }}
                    </div>
                </div>
                <div class="meta-tags">
                    <el-tag v-if="showCate" size="small" class="category" type="info">{{
                            article?.category.name
                        }}
                    </el-tag>
                    <template v-for="tag in article?.tags">
                        <el-tag :type="getTagType(tag.id)" size="small" :title="tag.name">{{ tag.name }}</el-tag>
                    </template>
                </div>
            </div>
        </div>
        <router-link :to="articleLink" v-if="hasImg" class="card-img" :class="{'reversed' : reversed}">
            <div class="img" :style="imgStyle"></div>
        </router-link>
    </div>
</template>

<style scoped lang="less">
.reversed {
    flex-direction: row-reverse !important;
}
.article-card {
    border: 1px solid var(--el-border-color);
    border-radius: var(--hami-radius-medium);
    box-shadow: none;
    transition: background-color .5s ease, opacity .3s ease-out, transform .3s ease-out, backdrop-filter .3s ease-out, -webkit-transform .3s ease-out, -webkit-backdrop-filter .3s ease-out;
    display: flex;
    max-width: 100%;
    overflow: hidden;
    background-color: var(--hami-card-bg);
    margin-bottom: 1.4rem;

    &:hover {
        .img {
            transform: scale(1.1);
            -webkit-filter: brightness(.9);
            filter: brightness(.9);
        }
    }

    .card-content {
        padding: 1.1rem 1rem 1rem;
        flex: 1;
        width: 0;

        .title {
            -webkit-line-clamp: 2;
            line-clamp: 2;
            word-break: break-all;
            color: var(--hami-title-color);
            font-size: 1.6rem;
            font-weight: 400;
            line-height: 1.25;
            margin: 0 0 10px;
        }

        .summary {
            -webkit-line-clamp: 3 !important;
            min-height: 2.4em;
            max-height: 4.8em;
            word-break: break-all;
            color: var(--color-10);
            font-size: 1.1rem;
            font-weight: 300;
            text-indent: 1.5em;
            line-height: 1.5em;
        }

        .meta {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: var(--color-10);

            .meta-main {
                display: flex;
                align-items: center;
                flex: 1;

                &.reversed {
                    .meta-item:not(:first-child) {
                        margin-left: 0;
                        margin-right: .8rem;
                    }
                }
            }

            .meta-tags {

                .el-tag:not(:first-child) {
                    margin-left: 4px;

                    :deep(.el-tag__content) {
                        max-width: 30px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                }
            }

            .meta-item {
                font-size: 1rem;
            }

            .meta-item:not(:first-child) {
                margin-left: 12px;
            }

            .meta-item i {
                font-size: 1rem;
                height: 1rem;
                width: 1rem;
            }

            .author {
                cursor: pointer;
                max-width: 48px;

                &:hover {
                    color: var(--hami-text-hover-color);
                }
            }

            .stat {
                display: flex;
                align-items: center;

                span {
                    margin-left: 3px;
                    max-width: 30px;
                }
            }
            .stat.thumb-up {
                position: relative;
            }
            .stat.thumb-up i {
                position: relative;
                top: -1px;
            }
        }
    }

    .card-img {
        -webkit-clip-path: polygon(0 0, 100% 0, 100% 100%, 10% 100%);
        clip-path: polygon(0 0, 100% 0, 100% 100%, 10% 100%);
        width: 34%;
        overflow: hidden;

        .img {
            height: 100%;
            width: 100%;
            margin: auto;
            background-position: 50% 50%;
            background-size: cover;
            -webkit-transition: all .5s;
            transition: all .5s;
        }
    }
    .card-img.reversed {
        -webkit-clip-path: polygon(0 0,90% 0,100% 100%,0 100%);
        clip-path: polygon(0 0,90% 0,100% 100%,0 100%);
    }
}
</style>