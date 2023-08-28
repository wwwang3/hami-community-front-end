<script setup lang="ts">
import { ref, reactive, onMounted, computed } from "vue"
import { useRoute, useRouter } from "vue-router"
import HamiScrollList from '@/components/common/HamiScrollList.vue'
//interface

//router, props, inject, provide

//custom var
const creatorArticleList = ref<InstanceType<typeof HamiScrollList> | null>(null)
//life cycle
onMounted(() => {
    creatorArticleList.value?.init()
})
//watch

//fun
const handleQuery = (pageNum: number, pageSize: number): Promise<PageData<any>> => {
    return new Promise<PageData<number>>((resolve, reject) => {
        setTimeout(() => {
            // let data = []
            // for (let i = 0; i < pageSize; i++) {
            //     data.push(Math.random())
            // }
            // resolve({
            //     pageSize: pageSize,
            //     pageNum: pageNum,
            //     total: 30,
            //     data: data
            // })
            // reject("error")

            resolve({
                pageSize: 10,
                pageNum: 1,
                total: 0,
                data: []
            })
        }, 3000)
    })
}

</script>
<template>
    <div class="hami-creator-article">
        <HamiScrollList :size="10" :query="handleQuery" ref="creatorArticleList">
            <template #item="{item, index, _delete}">
                <div class="creator-article-list-item">
                    {{ item }}
                </div>
            </template>
        </HamiScrollList>
    </div>
</template>

<style scoped lang="less">
.hami-creator-article {
    .creator-article-list-item {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 32px;

    }
}
</style>