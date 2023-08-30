<script setup lang="ts">
import { ref, reactive, onMounted, computed, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
import { FormInstance, FormRules } from 'element-plus'
import { CategoryService, TagService } from '@/service/modules/category.ts'
import { isEmpty } from '@/utils'
import { $message } from '@/utils/message.ts'
import HamiLoading from '@/components/common/HamiLoading.vue'
import { useRequest } from '@/hooks'
import {beforeUpload} from "@/utils/validator.ts"
//interface
interface FormProps {
    buttonText?: string
    categoryId: number
    tags: Array<Tag>,
    summary: string
    picture: string
    isArticle?: boolean
}

export type ItemType = Omit<FormProps, "buttonText">

//router, props, inject, provide
//@ts-ignore
const $props = withDefaults(defineProps<FormProps>(), {
    categoryId: -1,
    tags: [],
    picture: "",
    summary: "",
    buttonText: "确定并发表",
    isArticle: false
})
//custom var

const publishForm = ref<FormInstance>()

const tagList = reactive<Array<Tag>>([] as Array<Tag>)
const categoryList = reactive<Array<Category>>([] as Array<Category>)

const categoryName = ref<string>("")

const [onUpload, processUpload] = useRequest({
    run: (params) => Promise.resolve()
})

const item = ref<ItemType>({
    categoryId: -1,
    summary: "",
    picture: "",
    tags: [] as Tag[]
})

//事件
const $emit = defineEmits<{
    (e: "close"): void,
    (e: "save", item: ItemType): void,
    (e: "ensure", item: ItemType): void
}>()

//life cycle
onMounted(() => {
    initProps()
    initCategory()
    initTags()
})
//watch
watch(() => categoryName.value, (newValue: string, oldValue: string) => {
    for (let cate of categoryList) {
        if (cate.name === newValue) {
            item.value.categoryId = cate.id
            break
        }
    }
})

//fun
const initCategory = async () => {
    try {
        let data = await CategoryService.getAllCategories()
        categoryList.push(...data)
        categoryList.forEach((value, index) => {
            if ($props.categoryId === value.id) {
                categoryName.value = value.name
                return
            }
        })
    } catch (e) {
        console.log(e)
    }
}

const initProps = () => {
    item.value.categoryId = $props.categoryId
    item.value.summary = $props.summary
    item.value.picture= $props.picture
    item.value.tags = $props.tags
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
const handleUploadPicture = async () => {

}

const handleClose = () => {
    $emit("close")
}
const handleSave = () => {
    $emit("save", item.value)
}

//有文章ID时表示确定并更新
//有文章ID时保存草稿和确定并发表是同样的效果
const handleEnsure = () => {
    if (!checkItem()) return
    $emit("ensure", item.value)
}

const checkItem = () => {
    if (item.value.categoryId === -1 || isNaN(item.value.categoryId)) {
        $message.notifyError("请选择分类")
        return false
    }
    if (isEmpty(item.value.tags)) {
        $message.notifyError("请选择1-3个标签")
        return false
    }
    if (item.value.summary.length < 50) {
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
                <el-radio-group v-model="categoryName" size="large" @change="handleChange">
                    <template v-for="cate in categoryList">
                        <el-radio-button :label="cate.name" class="cate-radio"/>
                    </template>
                </el-radio-group>
                <div class="close" title="关闭">
                    <el-icon size="18" @click="handleClose"><Close /></el-icon>
                </div>
            </el-form-item>
            <el-form-item prop="tags" label="标签:" class="tags">
                <el-select
                    placeholder="请选择标签"
                    v-model="item.tags"
                    multiple
                    :multiple-limit="3"
                    filterable
                    no-match-text="空"
                    :teleported="false"
                >
                    <el-option
                        v-for="tag in tagList"
                        :key="tag.id"
                        :label="tag.name"
                        :value="tag.id"
                        :id="tag.id"
                    >

                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="picture" label="封面:" class="picture">
                <el-upload
                    ref="avatarRef"
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
                                <img :src="item.picture" alt="" v-if="!isEmpty(item.picture)">
                                <el-icon :size="24"><Plus /></el-icon>
                            </div>
                        </HamiLoading>
                    </template>
                </el-upload>
                <div class="tips">
                    <span>建议比例(16:9)</span>
                    <span>图片大小不超过5M</span>
                </div>
            </el-form-item>
            <el-form-item prop="summary" label="摘要:" style="width: 90%">
                <el-input
                    type="textarea"
                    :rows="6"
                    placeholder="请输入摘要"
                    v-model="item.summary"
                    maxlength="160"
                    show-word-limit>
                </el-input>
            </el-form-item>
        </el-form>
        <div class="buttons">
            <el-button plain type="info" class="save-draft" @click="handleSave" v-if="!isArticle">存草稿</el-button>
            <el-button color="#626aef" @click="handleEnsure">{{ buttonText }}</el-button>
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
            top: -43px;
            right: 26px;
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
        :deep(img) {
            width: 240px;
            height: auto;
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