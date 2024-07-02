<script setup lang="ts">
import { onMounted, ref } from "vue"
import { useRouter } from "vue-router"
//interface
import { AdminService } from '@/service/modules/admin.ts'
import { $message, formatDateTime } from '@/utils'
import { ElMessageBox } from 'element-plus'
import HamiMdViewer from '@/components/md/HamiMdViewer.vue'
//router, props, inject, provide
const draftList = ref<ArticleDraftVo[]>([])
const state = ref<2 | 3>(2)
const showContentDialog = ref(false)
const currentContent = ref<string>('')
const page = ref<Page>({
    current: 1,
    size: 9,
    total: 0
})

//custom var

//life cycle
onMounted(async () => {
    await handleCurrentChange(1)
})
//watch

//fun
const handleCurrentChange = async (current: number) => {
    let loading = $message.loading("加载中")
    try {
        page.value.current = current
        let result = await AdminService.listReviewDraft({
            current: page.value.current,
            size: page.value.size,
            state: state.value
        })
        page.value.total = result.total
        draftList.value = result.data as ArticleDraftVo[]
    } catch (err) {
        console.error(err)
        $message.error("加载失败")
    } finally {
        $message.closeLoading(loading)
    }

}

const handleReview = async (draft: ArticleDraft, $event: any) => {
    let loading = $message.loading("更新中")
    try {
        if (draft.state === 1 || draft.state === 2) {
            await AdminService.review(draft, '')
        } else {
            // reject
            let msg = await ElMessageBox.prompt('输入审核失败原因', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputValidator: (s) => {
                    return s.length > 0
                }
            })
            await AdminService.review(draft, msg.value)
        }
        $message.success("更新成功")
    } catch (err) {
        if (err !== 'cancel' ) {
            console.error(err)
            $message.error("更新失败")
        }
    } finally {
        await handleCurrentChange(page.value.current)
        $message.closeLoading(loading)
    }
}

const handleShowContent = (draft: ArticleDraft) => {
    currentContent.value = draft.content
    showContentDialog.value = true
}

</script>
<template>
    <div class="admin-article">
        <el-table
            class="admin-article-table"
            :data="draftList"
            stripe
            header-cell-class-name="header-cell-item"
            height="560"
        >
            <el-table-column label="作者" width="180">
                <template #default="scope">
                    <div class="cell-item">
                        {{ scope.row.user.username }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="标题" width="180">
                <template #default="scope">
                    <div class="cell-item title">
                        <el-text truncated>{{ scope.row.draft.title }}</el-text>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="简介" width="200">
                <template #default="scope">
                    <div class="cell-item">
                        <el-text truncated line-clamp="2">{{ scope.row.draft.summary }}</el-text>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="修改时间" width="180">
                <template #default="scope">
                    <div class="cell-item">
                        {{ formatDateTime(scope.row.draft.mtime, "MM-DD HH:mm:ss") }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="内容" width="180">
                <template #default="scope">
                    <div class="cell-item">
                        <el-icon @click="handleShowContent(scope.row.draft)" size="36">
                            <svg  class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4709" width="200" height="200"><path d="M140.458667 512a838.442667 838.442667 0 0 1 97.066666-95.146667C311.978667 355.114667 409.045333 298.666667 512 298.666667c102.954667 0 200.021333 56.448 274.474667 118.186666A838.656 838.656 0 0 1 883.541333 512a838.656 838.656 0 0 1-97.066666 95.146667C712.021333 668.885333 614.954667 725.333333 512 725.333333c-102.954667 0-200.021333-56.448-274.474667-118.186666A838.442667 838.442667 0 0 1 140.458667 512zM938.666667 512c34.218667-25.514667 34.176-25.514667 34.176-25.557333L972.8 486.4l-0.170667-0.213333-0.512-0.725334a495.189333 495.189333 0 0 0-8.96-11.306666A923.733333 923.733333 0 0 0 840.96 351.146667C760.96 284.885333 644.693333 213.333333 512 213.333333 379.306667 213.333333 263.04 284.885333 183.04 351.146667a923.477333 923.477333 0 0 0-122.154667 122.965333 518.485333 518.485333 0 0 0-8.96 11.306667l-0.512 0.725333-0.170666 0.213333-0.085334 0.085334L85.333333 512l-34.176-25.514667a42.666667 42.666667 0 0 0 0 51.029334L85.333333 512l-34.176 25.514667 0.085334 0.128 0.170666 0.213333 0.512 0.725333a386.218667 386.218667 0 0 0 8.96 11.306667A923.306667 923.306667 0 0 0 183.04 672.853333C263.04 739.114667 379.306667 810.666667 512 810.666667c132.693333 0 248.96-71.552 328.96-137.813334a923.52 923.52 0 0 0 122.154667-122.965333 529.024 529.024 0 0 0 8.96-11.306667l0.512-0.725333 0.170666-0.213333 0.085334-0.085334L938.666667 512z m0 0l34.218666 25.514667a42.666667 42.666667 0 0 0 0-51.072L938.666667 512z" fill="#1296db" p-id="4710"></path><path d="M512 469.333333a42.666667 42.666667 0 1 0 0 85.333334 42.666667 42.666667 0 0 0 0-85.333334z m-128 42.666667a128 128 0 1 1 256 0 128 128 0 0 1-256 0z" fill="#1296db" p-id="4711"></path></svg>
                        </el-icon>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="状态" width="275">
                <template #default="scope">
                    <div class="cell-item">
                        <el-select
                            v-model="scope.row.draft.state"
                            placeholder="Select"
                            size="large"
                            :teleported="true"
                            @change="handleReview(scope.row.draft, $event)"
                        >
                            <el-option
                                label="正常"
                                :value="1"
                            />
                            <el-option
                                label="审核中"
                                :value="2"
                            />
                            <el-option
                                label="未通过"
                                :value="3"
                            />
                        </el-select>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            :page-size="9"
            :pager-count="11"
            layout="prev, pager, next"
            :total="page.total"
            @current-change="handleCurrentChange"
        />
        <el-dialog v-model="showContentDialog" title="内容" width="500">
            <HamiMdViewer id="hami-admin-viewer" v-model="currentContent"></HamiMdViewer>
        </el-dialog>
    </div>
</template>

<style scoped lang="less">
.admin-article {
    .el-pagination {
        padding: 0;
    }

    :deep(.header-cell-item) {
        text-align: center;
        font-size: 18px;
        color: #000;
    }

    .cell-item {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 18px;
        color: #1f2a38;

        .el-text {
            font-size: 16px;
            color: #1f2a38;
        }
        .el-icon {
            font-size: 20px;
        }
    }
    .cell-item.title {
        .el-text {
            font-size: 18px;
            color: #1e80ff;
        }
    }

    .el-tag {
        font-size: 16px;
    }

    :deep(.el-select .el-input__inner) {
        width: 60px;
        font-size: 16px;
        color: rgba(0, 0, 0, .88);
        font-weight: 600;
    }
}
</style>