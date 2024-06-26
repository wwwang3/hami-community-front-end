<script setup lang="ts">
import { computed, reactive } from "vue"
import { config, MdEditor } from 'md-editor-v3';
import { Emoji } from '@vavt/v3-extension';
import 'md-editor-v3/lib/style.css';
import '@vavt/v3-extension/lib/asset/Emoji.css';
import { toolbars } from '@/components/md/editorConfig.ts'
import ImageService from '@/service/modules/image.ts'
import useThemeStore from '@/store/modules/theme.ts'

const $props = defineProps({
    modelValue: {
        type: String,
        required: true
    }
})

const themeStore = useThemeStore()

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

const editorId = "hami-md-editor-v3"
const mdConfig = reactive({
    showToolbarName: false
})

config({
    editorExtensions: {},
})

//fun
const handleSave = async (value: string, h: Promise<string>) => {
    $emit("save", value, h)
}

const handleUploadImg = async (files: Array<File>, callback: (urls: Array<string>) => void) => {
    const res = await Promise.all(
        files.map((file) => {
            return ImageService.upload({
                image: file,
                type: 'article-picture'
            })
        })
    );

    callback(res);
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
            :toolbars="toolbars"
            :theme="themeStore.theme"
            show-code-row-number
        >
            <template #defToolbars>
                <Emoji></Emoji>
            </template>
        </MdEditor>
    </div>
</template>

<style lang="less">
html.dark {

    #hami-md-editor-v3 {
        background-color: var(--hami-bg);
    }
}
</style>

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
<style>
.icon-mee-emoji:before {
    content: "\e64a";
}

.emojis {
    background-color: var(--hami-bg);
}

.emojis li {
    height: auto;
}
</style>