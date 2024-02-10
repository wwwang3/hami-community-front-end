<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRequest } from '@/hooks'
import { AccountService } from '@/service/modules/user.ts'
import { $message } from '@/utils/message.ts'
import { useTokenStore } from '@/store/modules/token.ts'
import { useRouter } from 'vue-router'
import { onPPT } from '@/utils'
import UpdatePassForm from '@/components/account/UpdatePassForm.vue'

const [onLoading, handleGetAccountInfo] = useRequest<AccountInfo, [any]>({
    run: (..._params) => AccountService.getAccountInfo()
})

const account = ref<AccountInfo>({
    account: '',
    email: '',
    id: -1,
})

const onUpdatePassword = ref(false)
const tokenStore = useTokenStore()
const $router = useRouter()

onMounted(async () => {
    try {
        account.value = await handleGetAccountInfo(null)
    } catch (e) {
        $message.error("获取账号信息失败")
    }
})

const updateEmail = () => {
    onPPT()
}

const updatePassword = () => {
    onUpdatePassword.value = true
}

const deleteAccount = () => {
    onPPT()
}

const handleClick = () => {
    onPPT()
}

const handleSuccess = () => {
    //修改成功的回调
    onUpdatePassword.value = false
    //退出
    tokenStore.clear()
    $router.replace("/")
}

const handleCancel = () => {
    onUpdatePassword.value = false
}

</script>
<template>
    <div class="hami-account-setting">
        <el-skeleton v-if="onLoading"></el-skeleton>
        <div class="account-setting-view" v-else>
            <div class="account-header">账号管理</div>
            <div class="account-body">
                <div class="setting-list">
                    <el-divider/>
                    <div class="setting-item">
                        <div class="title">邮箱</div>
                        <div class="info-box">
                            <div class="info">{{ account.email }}</div>
                            <div class="action" @click="updateEmail">
                                换绑
                            </div>
                        </div>
                    </div>
                    <el-divider/>
                    <div class="setting-item">
                        <div class="title">微信</div>
                        <div class="info-box">
                            <div class="info">未绑定</div>
                            <div class="action" @click="handleClick">
                                绑定
                            </div>
                        </div>
                    </div>
                    <el-divider/>
                    <div class="setting-item">
                        <div class="title">GitHub</div>
                        <div class="info-box">
                            <div class="info">未绑定</div>
                            <div class="action" @click="handleClick">
                                绑定
                            </div>
                        </div>
                    </div>
                    <el-divider/>
                    <div class="setting-item">
                        <div class="title">密码</div>
                        <div class="info-box">
                            <div class="info">....</div>
                            <div class="action" @click="updatePassword">
                                修改密码
                            </div>
                        </div>
                    </div>
                    <el-divider/>
                    <div class="setting-item">
                        <div class="title">账号注销</div>
                        <div class="info-box">
                            <div class="info"></div>
                            <div class="action" @click="deleteAccount">
                                注销
                            </div>
                        </div>
                    </div>
                    <el-divider/>
                </div>
            </div>
        </div>
        <el-dialog v-model="onUpdatePassword" title="修改密码" width="400">
            <template #default>
                <UpdatePassForm :email="account.email" @success="handleSuccess" @cancel="handleCancel"></UpdatePassForm>
            </template>
        </el-dialog>
    </div>
</template>

<style scoped lang="less">

.hami-account-setting {
    min-height: 500px;
    padding: 20px 24px;
    background-color: var(--hami-bg);
    border-radius: var(--hami-radius-medium);
}

.account-setting-view {
    width: 100%;

    .account-header {
        font-size: 18px;
        font-weight: 700;
        color: var(--hami-title-color);
        margin-bottom: 24px;
    }
}

.el-divider {
    margin: 16px 0;
}

.account-body {

    .setting-list {

        .setting-item {
            display: flex;
            align-items: center;
            padding: 6px 2px;

            .title {
                width: 110px;
                font-size: 18px;
                color: var(--hami-title-color);
            }

            .info-box {
                flex: 1 1 auto;
                width: 100%;
                display: flex;
                align-items: center;
                font-size: 18px;
                justify-content: space-between;
            }

            .info {
                color: var(--hami-item-text-color);
                min-width: 32px;
            }

            .action {
                font-size: 18px;
                color: var(--hami-blue-4);
                cursor: pointer;
            }

            .action:hover {
                color: var(--hami-blue-3);
            }
        }
    }
}

</style>