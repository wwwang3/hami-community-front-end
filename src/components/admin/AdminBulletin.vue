<script setup lang="ts">
import { onMounted, ref } from "vue"
//interface
import { AdminService } from '@/service/modules/admin.ts'
import { $message, formatDateTime } from '@/utils'
import { ElMessageBox } from 'element-plus'
import HamiMdViewer from '@/components/md/HamiMdViewer.vue'
import { Delete } from '@element-plus/icons-vue'


const dataList = ref<Bulletin[]>([])
const showContentDialog = ref(false)
const page = ref<Page>({
    current: 1,
    size: 8,
    total: 0
})

const tempBulletin = ref<Bulletin>({
    id: -1,
    content: '',
    ctime: Date.now(),
    deleted: 0,
    mtime: Date.now(),
    title: ''
})

onMounted(async () => {
    await handleCurrentChange(1)
})

const handleCurrentChange = async (current: number) => {
    let loading = $message.loading("加载中")
    try {
        page.value.current = current
        let result = await AdminService.listBulletin({
            current: page.value.current,
            size: page.value.size,
        })
        page.value.total = result.total
        dataList.value = result.data as Bulletin[]
    } catch (err) {
        console.error(err)
        $message.error("加载失败")
    } finally {
        $message.closeLoading(loading)
    }

}

const handleAdd =  () => {
    tempBulletin.value = {
        id: -1,
        content: '',
        ctime: Date.now(),
        deleted: 0,
        mtime: Date.now(),
        title: ''
    }
    showContentDialog.value = true
}

const handleEdit = (bulletin: Bulletin) => {
    tempBulletin.value = bulletin
    showContentDialog.value = true
}

const handleSave = async (title: string) => {
    let loading = $message.loading(`${title}中...`)
    try {
        let res = await AdminService.publishBulletin({
            id: tempBulletin.value.id == -1 ? null : tempBulletin.value.id,
            title: tempBulletin.value.title,
            content: tempBulletin.value.content,
        })
        tempBulletin.value.id = res.id
        $message.notifySuccess(`${title}成功`)
        // await handleCurrentChange(page.value.current)
    } catch (err) {
        $message.error(`${title}失败`)
    } finally {
        $message.closeLoading(loading)
    }
}

const handleDelete = async (bulletin: Bulletin) => {
    let loading: any = null
    try {
        await $message.confirm("确定删除?", "提示")
        loading = $message.loading("删除中..")
        await AdminService.deleteBulletin(bulletin.id)
        $message.notifySuccess("删除成功")
        await handleCurrentChange(page.value.current)
    } catch (e) {
        if (e !== "cancel") {
            $message.error("删除失败")
        }
    } finally {
        $message.closeLoading(loading)
    }
}
const handleClose = () => {
    handleCurrentChange(page.value.current)
}

</script>
<template>
    <div class="admin-bulletin">
        <div class="admin-bulletin-header">
            <el-button size="large" type="primary" @click="handleAdd">
                发表公告
            </el-button>
        </div>
        <el-table
            class="admin-bulletin-table"
            :data="dataList"
            stripe
            header-cell-class-name="header-cell-item"
            height="530"
        >
            <el-table-column label="序号" width="100">
                <template #default="scope">
                    <div class="cell-item">
                        {{ scope.row.id }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="标题" width="180">
                <template #default="scope">
                    <div class="cell-item title">
                        <el-text truncated>{{ scope.row.title }}</el-text>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="内容" width="580">
                <template #default="scope">
                    <div class="cell-item">
                        <el-text>{{ scope.row.content }}</el-text>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="发布时间" width="220">
                <template #default="scope">
                    <div class="cell-item">
                        {{ formatDateTime(scope.row.ctime, "YYYY-MM-DD HH:mm:ss") }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="100">
                <template #default="scope">
                    <div class="cell-item">
                        <el-button size="large" type="danger" circle @click="handleDelete(scope.row)">
                            <template #icon>
                                <el-icon>
                                    <Delete/>
                                </el-icon>
                            </template>
                        </el-button>

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
        <el-dialog v-model="showContentDialog" title="公告编辑" width="600" @close="handleClose">
            <el-form
                label-position="top"
                label-width="auto"
                :model="tempBulletin"
                style="max-width: 600px"
                size="large"
            >
                <el-form-item label="公告标题">
                    <el-input v-model="tempBulletin.title" maxlength="100"/>
                </el-form-item>
                <el-form-item label="公告内容">
                    <el-input v-model="tempBulletin.content" rows="4" type="textarea"/>
                </el-form-item>
                <div class="btn-list">
                    <el-button v-if="tempBulletin.id === -1" @click="handleSave( '发布')" type="success">发布</el-button>
                    <el-button v-else @click="handleSave('更新')">更新</el-button>
                </div>
            </el-form>
        </el-dialog>
    </div>
</template>

<style scoped lang="less">
.admin-bulletin {
    .el-pagination {
        padding: 0;
    }

    .admin-bulletin-header {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: 100%;
        margin-bottom: 10px;
        padding-right: 10px;
        font-size: 18px;
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