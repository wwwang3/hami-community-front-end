<script setup lang="ts">
import type { Ref } from "vue"
import { inject, onMounted, reactive, ref } from "vue"
import { FormInstance, UploadRequestOptions } from 'element-plus'
import { CategoryService, TagService } from '@/service/modules/category.ts'
import { isEmpty } from '@/utils'
import { $message } from '@/utils/message.ts'
import HamiLoading from '@/components/common/HamiLoading.vue'
import { useRequest } from '@/hooks'
import { beforeUpload } from "@/utils/validator.ts"
import { Close, Plus } from '@element-plus/icons-vue'
import ImageService from '@/service/modules/image.ts'
import { DRAFT_REF, ON_PUBLISH_ARTICLE } from '@/store/keys.ts'

interface FormProps {
    buttonText?: string
    isArticle?: boolean
}

const $props = withDefaults(defineProps<FormProps>(), {
    buttonText: "确定并发表",
    isArticle: false
})

const publishForm = ref<FormInstance>()

const tagList = reactive<Array<Tag>>([] as Array<Tag>)
const categoryList = reactive<Array<Category>>([] as Array<Category>)

const [onUpload, processUpload] = useRequest<string, [File]>({
    run: (...params) => ImageService.upload(...params, "article-picture")
})
const picRef = ref()

//inject
const onProcess = inject(ON_PUBLISH_ARTICLE, false)
const draft = inject(DRAFT_REF, {} as Ref<ArticleDraftDetail>)

//事件
const $emit = defineEmits<{
    (e: "close"): void,
    (e: "save"): void,
    (e: "ensure"): void
}>()

onMounted(() => {
    initCategory()
    initTags()
})

//fun
const initCategory = async () => {
    try {
        let data = await CategoryService.getAllCategories()
        categoryList.push(...data)
    } catch (e) {
        console.log(e)
    }
}
const initTags = async () => {
    try {
        //全查出来算了 也就几十个
        let data = await TagService.getAllTags()
        tagList.push(...data)
    } catch (e) {
        console.log(e)
    }
}

const handleChange = () => {
    console.log("changed")
}
const handleUploadPicture = async (options: UploadRequestOptions) => {
    //更新头像
    console.log(options)
    try {
        //返回头像地址
        draft.value.picture = await processUpload(options.file)
        $message.success("上传成功")
        return Promise.resolve()
    } catch (e) {
        return Promise.reject(e)
    } finally {
        picRef.value!.clearFiles()
    }
}

const handleClose = () => {
    $emit("close")
}
const handleSave = () => {
    $emit("save")
}

//有文章ID时表示确定并更新
//有文章ID时保存草稿和确定并发表是同样的效果
const handleEnsure = () => {
    if (!checkItem()) return
    $emit("ensure")
}

const checkItem = () => {
    if (draft.value.categoryId === -1 || isNaN(draft.value.categoryId)) {
        $message.notifyError("请选择分类")
        return false
    }
    if (isEmpty(draft.value.tags)) {
        $message.notifyError("请选择1-3个标签")
        return false
    }
    if (draft.value.summary.length < 50) {
        $message.notifyError("摘要不少于50字")
        return false
    }
    return true
}
</script>
<template>
    <div class="hami-publish-form">
        <el-form ref="publishForm" label-width="80">
            <el-form-item prop="categoryId" label="分类:" class="category">
                <el-radio-group v-model="draft.categoryId" size="large" @change="handleChange">
                    <template v-for="cate in categoryList">
                        <el-radio-button :label="cate.id" class="cate-radio">
                            {{ cate.name }}
                        </el-radio-button>
                    </template>
                </el-radio-group>
                <div class="close" title="关闭">
                    <el-icon size="18" @click="handleClose">
                        <Close/>
                    </el-icon>
                </div>
            </el-form-item>
            <el-form-item prop="tags" label="标签:" class="tags">
                <el-select
                    placeholder="请选择标签"
                    v-model="draft.tags as Array<Tag>"
                    multiple
                    :multiple-limit="3"
                    filterable
                    no-match-text="空"
                    :teleported="false"
                    value-key="id"
                >
                    <el-option
                        v-for="tag in tagList"
                        :key="tag.id"
                        :label="tag.name"
                        :value="tag"
                        :id="tag.id"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="picture" label="封面:" class="picture">
                <el-upload
                    ref="picRef"
                    action="#"
                    name="file"
                    :before-upload="beforeUpload"
                    :http-request="handleUploadPicture"
                    :limit="1"
                    :show-file-list="false"
                    class="upload"
                    :disabled="onUpload"
                >
                    <template #default>
                        <HamiLoading :loading="onUpload" text="上传中" style="border-radius: 50%; height: 120px;">
                            <div class="picture-item">
                                <img :src="draft.picture" alt="" v-if="!isEmpty(draft.picture)">
                                <el-icon :size="24" v-else>
                                    <Plus/>
                                </el-icon>
                            </div>
                        </HamiLoading>
                    </template>
                </el-upload>
                <div class="tips">
                    <span>建议比例(16:9)</span>
                    <span>图片大小不超过2M</span>
                </div>
            </el-form-item>
            <el-form-item prop="summary" label="摘要:" style="width: 90%">
                <el-input
                    type="textarea"
                    :rows="6"
                    placeholder="请输入摘要"
                    v-model="draft.summary"
                    maxlength="160"
                    show-word-limit>
                </el-input>
            </el-form-item>
        </el-form>
        <div class="buttons">
            <el-button plain type="info" class="save-draft" @click="handleSave" :disabled="onProcess">存草稿</el-button>
            <el-button color="#626aef" @click="handleEnsure" :disabled="onProcess">{{ buttonText }}</el-button>
        </div>
    </div>
</template>

<style scoped lang="less">
.hami-publish-form {
    margin-top: 20px;

    :deep(.el-form-item__label) {
        margin-right: 4px;
    }

    .category {
        font-size: 16px;
        --el-form-label-font-size: 16px;
        position: relative;

        .close {
            position: absolute;
            top: -44px;
            right: 12px;
            cursor: pointer;
        }
    }

    .cate-radio {
        margin: 0 8px 8px 0;

        :deep(.el-radio-button__inner) {
            border: none;
            background-color: #f4f5f5;
            border-radius: var(--hami-radius);
            padding: 0 16px;
            text-align: center;
            font-size: 14px;
            line-height: 30px;
            width: 90px;
            height: 30px;
            display: inline-block;

            &:hover {
                background-color: #e5e6eb;
            }
        }

        :deep(.el-radio-button__original-radio:checked + .el-radio-button__inner) {
            color: #1d7dfa;
            background-color: #e8f3ff;
            box-shadow: none;
        }
    }

    .tags {
        :deep(.el-select) {
            width: 380px;
            position: relative;
            z-index: 10000;
        }

        :deep(.el-select .el-select-tags-wrapper .el-tag) {
            --el-tag-text-color: var(--el-color-primary);
            --el-tag-bg-color: var(--el-color-primary-light-9);
            --el-tag-border-color: var(--el-color-primary-light-8);
            --el-tag-hover-color: var(--el-color-primary);
            background-color: var(--el-tag-bg-color);
        }
    }

    .buttons {
        text-align: center;

        .save-draft {
            margin-right: 24px;
            width: 100px;
        }
    }

    :deep(.upload) {
        width: 240px;
        height: 135px;
    }

    .picture-item {
        width: 240px;
        height: 135px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #8c939d;
        border: 1px dashed var(--el-border-color);
        transition: all .3s;

        img {
            width: 240px;
            height: 135px;
            object-fit: contain;
        }
    }

    .picture-item:hover {
        border-color: var(--el-color-primary);
    }

    .picture {
        .tips {
            display: flex;
            flex-direction: column;
            padding-left: 20px;
            font-size: 13px;
            color: var(--el-text-color-regular);
        }
    }
}
</style>