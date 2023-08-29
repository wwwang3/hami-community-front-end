<script setup lang="ts">
import { ref, reactive, onMounted, computed } from "vue"
import { useRoute, useRouter } from "vue-router"
import { MdEditor, config } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

//interface
interface EditorProps {
    draft: ArticleDraftDetail
}

const $props = defineProps({
    modelValue: {
        type: String,
        required: true
    }
})
const $emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
}>()

const content = computed({
    get(): string {
        return $props.modelValue
    },
    set(value: string) {
        $emit("update:modelValue", value)
    }
})
const editorId = "hami-md-editor-v3"
const mdConfig = reactive({
    showToolbarName: true
})

//fun
const handleSave = async (value: string, h: Promise<string>) => {

}

const handleUploadImg = async (files: Array<File>, callback: (urls: Array<string>) => void) => {
    console.log(files)
}

const handleError = async (e: { name: string, message: string }) => {

}
</script>
<template>
    <div class="hami-markdown-editor">
        <MdEditor
            v-model="content"
            :editor-id="editorId"
            :show-toolbar-name="mdConfig.showToolbarName"
            :on-upload-img="handleUploadImg"
            :on-save="handleSave"
            :on-error="handleError"
        >

        </MdEditor>
    </div>
</template>

<style scoped lang="less">
.hami-markdown-editor {
    :deep(.cm-editor) {
        font-size: 16px;
    }
    :deep(.md-editor) {
        height: calc(100vh - 64px);
    }
}
</style>