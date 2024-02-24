<script setup lang="ts">
import { computed, ref } from "vue"
import { useRouter } from "vue-router"
import { formatDateTime, strToNum } from '@/utils'
import { Calendar, View } from '@element-plus/icons-vue'
import { $message } from '@/utils/message.ts'
import { useLike } from '@/hooks/userInteract.ts'
import HamiHoverAuthorCard from '@/components/common/HamiHoverAuthorCard.vue'
import { TAG_NODES } from '@/store/modules/category.ts'

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

const $slots = defineSlots<{
    top(props: Article): any,
    bottom(props: Article): any,
}>()

const $props = withDefaults(defineProps<ArticleCardProps>(), {
    comment: true,
    border: false,
    reverse: false,
    highlightTitle: false,
    highlightSummary: false,
    showCate: true,
    showUser: true
})
const $router = useRouter()
const article = ref<ArticleInfo>($props.article.articleInfo)
const user = ref<User>($props.article.author)
const category = ref<Category>($props.article.category)
const tags = ref<Tag[]>($props.article.tags)
const stat = ref<ArticleStat>($props.article.stat)

const link = computed(() => {
    return "/article/" + article.value.id
})

const userLink = computed(() => {
    return "/user/space/" + article.value.userId
})

const ctime = computed(() => {
    return formatDateTime(article.value.ctime, "YYYY-MM-DD")
})

const comments = computed(() => {
    return stat.value.comments > 0 ? stat.value.comments : "评论"
})

const [liked, processLike] = useLike($props.article.liked)

const showInfo = ref(false)

const handleLike = () => {
    processLike({
        itemId: article.value.id,
        itemType: 1
    }).then(state => {
        if (state) {
            stat.value.likes++
            $props.article.liked = true
        } else {
            stat.value.likes--
            $props.article.liked = false
        }
    }).catch(_e => {
        $message.error("点赞失败")
    })
}

const toComment = () => {
    $router.push("/article/" + article.value.id + "#hami-comment")
}
const handleBeforeEnter = () => {
    showInfo.value = true
}

const getTagType = (index: number) => {
    let i = strToNum(index)
    return TAG_NODES[(isNaN(i) ? 0 : i) % TAG_NODES.length]
}

</script>
<template>
    <div class="hami-article-card">
        <div class="entry" :class="{'entry-border': border, 'reverse': reverse}">
            <div class="article-info">
                <div class="article-header">
                    <div class="left-panel">
                        <el-popover
                            trigger="hover"
                            width="300"
                            placement="top"
                            @before-enter="handleBeforeEnter"
                            :show-after="300"
                            v-if="showInfo"
                        >
                            <template #reference>
                                <router-link
                                    :to="userLink"
                                    class="link"
                                    v-if="showUser"
                                >
                                    <span class="author ellipsis">{{ user.username }}</span>
                                </router-link>
                            </template>
                            <HamiHoverAuthorCard :id="article.userId"></HamiHoverAuthorCard>
                        </el-popover>
                        <div class="ctime">
                            <el-icon size="16">
                                <Calendar/>
                            </el-icon>
                            <span class="text">{{ ctime }}</span>
                        </div>
                        <span class="category" v-if="showCate">{{ category.name }}</span>
                    </div>
                    <div class="right-panel">
                        <slot v-bind="$props.article" name="top"></slot>
                    </div>
                </div>
                <div class="title-row">
                    <router-link :to="link" class="title ellipsis" v-if="!highlightTitle">
                        {{ article.title }}
                    </router-link>
                    <router-link :to="link" class="title ellipsis" v-else v-html="article.title">
                    </router-link>
                </div>
                <router-link class="summary-row" :to="link">
                   <span class="summary ellipsis" v-if="!highlightSummary">
                        {{ article.summary }}
                   </span>
                    <span v-else v-html="article.summary" class="summary ellipsis"></span>
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
                            <span class="count" v-show="stat.likes > 0">{{ stat.likes }}</span>
                        </div>
                        <div class="item comments" @click="toComment" v-if="comment">
                            <el-icon size="14">
                                <svg width="14" height="14" viewBox="0 0 14 14"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M1.30136 9.11421L1.30019 2.45191C1.30024 1.6778 1.92779 1.05019 2.70191 1.05019H11.3989C12.1731 1.05019 12.8006 1.67785 12.8006 2.452L12.8018 9.1144C12.8017 9.8885 12.1742 10.516 11.4001 10.516H9.13225C8.97329 10.516 8.81862 10.5675 8.69142 10.6629L5.65162 12.9406C5.62173 12.9598 5.58148 12.9444 5.57209 12.91L5.15416 11.0869C5.07758 10.7528 4.78033 10.516 4.43761 10.516H2.70308C1.92893 10.516 1.30136 9.88836 1.30136 9.11421ZM2.70191 0C1.34776 0 0.25 1.09776 0.25 2.45191L0.25117 9.1144C0.25122 10.4685 1.34896 11.5662 2.70308 11.5662H4.18661L4.54953 13.1495L4.55107 13.1558C4.73515 13.9153 5.62879 14.248 6.26458 13.7937L9.23719 11.5662H11.4001C12.7542 11.5662 13.852 10.4684 13.852 9.11421L13.8508 2.45182C13.8508 1.09771 12.753 0 11.3989 0H2.70191ZM3.78612 6.91404C4.35027 6.91404 4.8076 6.45671 4.8076 5.89257C4.8076 5.32842 4.35027 4.87109 3.78612 4.87109C3.22198 4.87109 2.76465 5.32842 2.76465 5.89257C2.76465 6.45671 3.22198 6.91404 3.78612 6.91404ZM7.98631 5.89257C7.98631 6.45671 7.52898 6.91404 6.96483 6.91404C6.40069 6.91404 5.94336 6.45671 5.94336 5.89257C5.94336 5.32842 6.40069 4.87109 6.96483 4.87109C7.52898 4.87109 7.98631 5.32842 7.98631 5.89257ZM10.1484 6.91404C10.7126 6.91404 11.1699 6.45671 11.1699 5.89257C11.1699 5.32842 10.7126 4.87109 10.1484 4.87109C9.58428 4.87109 9.12695 5.32842 9.12695 5.89257C9.12695 6.45671 9.58428 6.91404 10.1484 6.91404Z"
                                          fill="currentColor"></path>
                                </svg>
                            </el-icon>
                            <span class="count">
                                {{ comments }}
                            </span>
                        </div>
                    </div>
                    <div class="tags">
                        <template v-for="tag in tags">
                            <el-tag class="tag-item" :type="getTagType(tag.id)" size="small">
                                {{ tag.name }}
                            </el-tag>
                        </template>
                    </div>
                    <slot name="bottom" v-bind="$props.article"></slot>
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
    padding: 16px 20px 0;
    transition: all .3s;
    cursor: pointer;

    .entry {
        display: flex;
        justify-content: space-between;
        padding-bottom: 16px;
    }

    .entry.entry-border {
        border-bottom: 1px solid var(--el-border-color);
    }

    .entry.reverse {
        flex-direction: row-reverse;

        .article-info {
            margin-right: 0;
            margin-left: 10px;
        }
    }

    .article-info {
        flex: 1;
        margin-right: 6px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .article-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: var(--hami-card-text-color);
        font-size: 14px;
        height: 22px;

        .left-panel {
            display: flex;
            align-items: center;
            max-width: 60%;
        }

        .right-panel {
            display: flex;
            align-items: center;
        }

        .link {
            display: flex;
            align-items: center;

            .author:hover {
                color: var(--hami-text-hover-color);
            }
        }

        .author {
            max-width: 100px;
            margin-right: 10px;
            font-size: 16px;
        }

        .ctime {
            display: flex;
            align-items: center;

            .text {
                margin-left: 4px;
                font-size: 14px;
            }
        }

        .category {
            margin-left: 12px;
        }
    }

    .title-row {
        display: flex;
        align-items: center;
    }

    .title-row, .summary-row {
        :deep(em) {
            color: var(--hami-red-2);
            font-style: normal;
        }
    }

    .title {
        font-size: 17px;
        font-weight: 600;
        color: var(--hami-title-color);
        margin: 4px 0;
        line-height: 24px;
        width: 100%;
    }

    .summary-row {
        display: flex;
        align-items: center;
        line-height: 1.5rem;
    }

    .summary {
        -webkit-line-clamp: 3;
        font-size: 14px;
        word-break: break-all;
        color: var(--hami-card-text-color);
    }

    .bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 8px;
        height: 32px;
    }

    .stat {
        display: flex;

        .item {
            display: flex;
            align-items: center;
            color: var(--hami-item-text-color);

            &:not(:first-child) {
                margin-left: 16px;
            }
        }

        .likes {
            position: relative;
            z-index: 99;
            pointer-events: visible;

            &:hover {
                color: var(--hami-icon-active-1);
            }

            .el-icon {
                transition: all .3s;
            }

            &.active {
                color: var(--hami-icon-active-1);
            }
        }

        .count {
            margin-left: 4px;
        }

        .comments {
            .el-icon {
                position: relative;
                top: 1px;
            }

            &:hover {
                color: var(--hami-icon-active-1);
            }
        }
    }

    .tags {
        display: flex;
        align-items: center;

        .tag-item {
            font-size: 12px;
            margin-right: 10px;
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

</style>
<style>

</style>