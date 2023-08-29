<script setup lang="ts">
import { ref, reactive, onMounted, computed, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
import { FormInstance, FormRules } from 'element-plus'
import { CategoryService, TagService } from '@/service/modules/category.ts'
import { isEmpty } from '@/utils'

//interface
interface FormProps {
    buttonText?: string
    categoryId: number
    tags: Array<Tag>,
    summary: string
    picture: string
}

//router, props, inject, provide
//@ts-ignore
const $props = withDefaults(defineProps<FormProps>(), {
    categoryId: -1,
    tags: [],
    picture: "",
    summary: "",
    buttonText: "发布"
})
//custom var

const publishForm = ref<FormInstance>()

const tagList = reactive<Array<Tag>>([] as Array<Tag>)
const categoryList = reactive<Array<Category>>([] as Array<Category>)

const categoryName = ref<string>("")
const summary = ref<string>("")
const picture = ref<string>()
const tags = ref<Tag[]>([] as Tag[])

const categoryId = ref<number>(-1)
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
            categoryId.value = cate.id
            break
        }
    }
})

//fun
const initCategory = () => {
    CategoryService.getAllCategories()
        .then(res => {
            categoryList.push(...res)
            categoryList.forEach((value, index) => {
                if ($props.categoryId === value.id) {
                    categoryName.value = value.name
                    return
                }
            })
        })
        .catch(e => {
            console.log(e)
        })
}
const tagPage = reactive({
    pageNum: 1,
    pageSize: 10,
    total: 0
})

const initProps = () => {
    categoryId.value = $props.categoryId
    summary.value = $props.summary
    picture.value = $props.picture
    tags.value = $props.tags
}
const initTags = () => {
    TagService.listTags({pageNum: 1, pageSize: 10})
        .then(res => {
            let data = res.data
            tagPage.total = res.total
            tagPage.pageSize = res.pageSize
            if (data !== null && data !== "") {
                tagList.push(...data)
            }
            addTags()
        })
}

const addTags = () => {
    if (!isEmpty($props.tags)) {
        for (let t of $props.tags) {
            if (!tagList.find(tag => tag.id === t.id)) {
                tagList.push(t)
            }
        }
    }
}

const handleChange = () => {
    console.log("changed")
}
</script>
<template>
    <div class="hami-publish-form">
        <el-form ref="publishForm" label-width="80">
            <el-form-item prop="categoryId" label="分类" class="category">
                <el-radio-group v-model="categoryName" size="large" @change="handleChange">
                    <template v-for="cate in categoryList">
                        <el-radio-button :label="cate.name" class="cate-radio"/>
                    </template>
                </el-radio-group>
            </el-form-item>
            <el-form-item prop="tags" label="标签"></el-form-item>
            <el-form-item prop="picture" label="封面"></el-form-item>
            <el-form-item prop="summary" label="简介">
            </el-form-item>
        </el-form>
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
    }
</style>