<script setup lang="ts">
import { computed, reactive } from 'vue';
import { MdPreview } from 'md-editor-v3';
// preview.css相比style.css少了编辑器那部分样式
import 'md-editor-v3/lib/preview.css';
import useThemeStore from '@/store/modules/theme.ts'

const themeStore = useThemeStore()
const $props = defineProps({
    modelValue: {
        type: String,
        required: true
    },
    id: {
        type: String,
        default: "hami-md-viewer"
    }
})

const $emit = defineEmits<{
    (e: 'update:modelValue', value: string): void,
    (e: 'save', value: string, h: Promise<string>): void
}>()

const content = computed({
    get(): string {
        return $props.modelValue
    },
    set(value: string) {
        $emit("update:modelValue", value)
    }
})
const mdConfig = reactive({
    showToolbarName: true
})

</script>

<template>
    <MdPreview :editorId="id" :modelValue="content" :theme="themeStore.theme"/>
</template>

<style lang="less" scoped>

</style>
<style>
    .md-editor-preview-wrapper {
        padding: 0;
    }
</style>

