<script setup lang="ts">
import { computed, ref } from "vue"
import { formatDateTime } from "@/utils/index.ts"
//interface

const $props = defineProps<{
    bulletin?: Bulletin
}>()

const ctime = computed(() => {
    return formatDateTime($props.bulletin?.ctime, "YYYY-MM-DD")
})
const content = ref($props.bulletin?.content)

</script>
<template>
    <div class="hami-bulletin-card">
        <div class="bulletin-header">
            <div class="title">{{ bulletin?.title }}</div>
            <div class="ctime">{{ ctime }}</div>
        </div>
        <div class="bulletin-body">
            <HamiMdViewer v-model="content" :id="'md-viewer-' + bulletin?.id"></HamiMdViewer>
        </div>
    </div>
</template>

<style scoped lang="less">

.hami-bulletin-card {

    .bulletin-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        margin-bottom: 8px;

        .title {
            font-weight: 600;
            color: var(--hami-pink-2);
        }

        .ctime {
            color: var(--hami-card-text-color);
        }

    }

    .bulletin-body {

        .md-editor {
            --md-bk-color: var(--hami-card-blue-bg-2);
            opacity: .7;
            border-radius: var(--hami-radius-small);
            font-size: 13px;
        }

        :deep(.md-editor-preview) {
            font-size: 13px;
        }
    }
}
</style>