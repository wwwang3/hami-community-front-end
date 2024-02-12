<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import { RankService } from '@/service/modules/rank.ts'
import { useRequest } from '@/hooks'
import { isEmpty } from '@/utils'
import { AuthorRankImg } from "@/store/images.ts"
import { Refresh } from '@element-plus/icons-vue'
import HamiAuthorCard from '@/components/common/HamiAuthorCard.vue'

const userRankList = ref<HotAuthor[]>([])
const subRankList = ref<HotAuthor[]>([])

const [onLoading, getUserRankList] = useRequest<HotAuthor[], []>({
    loading: true,
    run: (..._params) => RankService.listHotAuthor()
})

const page = ref<Page>({
    current: 1,
    size: 5,
    total: 0
})
const rotate = ref(0)

const pages = computed(() => {
    return Math.ceil(page.value.total / page.value.size)
})

onMounted(async () => {
    try {
        userRankList.value = await getUserRankList()
        page.value.total = userRankList.value.length
        subRankList.value = getSubList()
    } catch (e) {

    }
})
const refreshUserRank = () => {
    if (onLoading.value || isEmpty(userRankList.value)) {
        return
    }
    page.value.current = (pages.value === 0) ? 1 : (page.value.current + 1) % pages.value
    console.log(pages.value)
    rotate.value += 360
    subRankList.value = getSubList()
}

const getSubList = () => {
    let current = page.value.current
    let size = page.value.size
    return userRankList.value.slice((current - 1) * size, current * size)
}

</script>
<template>
    <div class="hami-author-rank">
        <div class="author-rank-title">
            <div class="left">
                <el-image :src="AuthorRankImg" class="rank-icon"></el-image>
                <span>作者榜</span>
            </div>
            <div class="right" @click="refreshUserRank">
                <el-icon class="icon" size="18" :style="{'transform': `rotate(${rotate}deg)`}">
                    <Refresh/>
                </el-icon>
                <span class="text">换一换</span>
            </div>
        </div>
        <div class="author-rank-list">
            <template v-for="(item, index) in subRankList">
                <li class="rank-item">
                    <HamiAuthorCard
                        :author="item.author"
                        show-tag
                        :avatar-size="32"
                    />
                </li>
            </template>
        </div>
    </div>
</template>

<style scoped lang="less">
.hami-author-rank {
    padding: 16px;

    .author-rank-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: var(--hami-text-1);
        padding-bottom: 12px;
        border-bottom: 1px solid var(--el-border-color);

        .rank-icon {
            width: 24px;
            margin-right: 6px;
        }

        .left, .right {
            display: flex;
            align-items: center;
        }

        .right {
            cursor: pointer;
            color: var(--hami-item-text-color);

            &:hover {
                color: var(--hami-text-hover-color);
            }

            .icon {
                position: relative;
                top: 1px;
                margin-right: 6px;
            }
        }
    }

    .author-rank-list {
        margin-top: 2px;

        .rank-item {
            padding: 6px 10px;
            border-radius: var(--hami-radius-small);

            &:hover {
                background-color: var(--hami-card-hover-bg);
            }
        }
    }
}
</style>