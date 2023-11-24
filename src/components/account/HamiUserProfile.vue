<script setup lang="ts">
import { onMounted, reactive, ref } from "vue"
import { useRouter } from "vue-router"
import { useRequest } from '@/hooks'
import { AccountService } from '@/service/modules/user.ts'
import HamiLoading from '@/components/common/HamiLoading.vue'
import { defaultAvatar } from "@/store/images.ts"
import {
    FormInstance,
    FormRules,
    genFileId,
    UploadInstance,
    UploadProps,
    UploadRawFile,
    UploadRequestOptions
} from 'element-plus'
import { $message, isEmpty } from '@/utils'
import useUserStore from '@/store/modules/user.ts'
import ImageService from '@/service/modules/image.ts'

const $router = useRouter()

const userStore = useUserStore()

const [onLoading, getProfile] = useRequest<LoginProfile, []>({
    loading: true,
    run: (...params) => userStore.getProfile()
})

const [onUpdate, handleUpdateProfile] = useRequest<any, [UserProfileParam]>({
    loading: false,
    run: (...params) => AccountService.updateUserProfile(...params)
})

const [onUpload, handleUpload] = useRequest<string, [File]>({
    run: (...params) => ImageService.upload(...params, 'avatar')
})

const userProfileParam = reactive<UserProfileParam>({
    blog: '',
    company: '',
    position: '',
    profile: '',
    username: '',
    avatar: '',
})

const userProfile = ref<LoginProfile>()
const avatarRef = ref<UploadInstance>()
const userProfileForm = ref<FormInstance>()
const userProfileFormRules = reactive<FormRules<typeof userProfileParam>>({
    // username: [
    //     {
    //         required: true,
    //         message: "用户名不能为空",
    //         trigger: "blur"
    //     },
    //     {
    //         min: 2,
    //         max: 20,
    //         trigger: "blur",
    //         message: "长度在2-20个字符"
    //     }
    // ],
})

onMounted(async () => {
    try {
        userProfile.value = await getProfile()
        //copy to param
        userProfileParam.username = userProfile.value.username
        userProfileParam.position = userProfile.value.position
        userProfileParam.company = userProfile.value.company
        userProfileParam.blog = userProfile.value.blog
        userProfileParam.profile = userProfile.value.profile
        userProfileParam.avatar = userProfile.value.avatar
    } catch (e) {
        $message.error("获取账号信息失败")
    }
})

const updateProfile = async (el: FormInstance | undefined) => {
    //更新个人信息
    try {
        await el!.validate()
        let profile = getChangedProp()
        if (isEmpty(profile)) {
            return;
        }
        await handleUpdateProfile(profile)
        $message.success("更新成功")
        setTimeout(() => {
            location.reload()
        }, 1000)
    } catch (e) {
        console.log(e)
    }
}

const updateAvatar = async (options: UploadRequestOptions) => {
    //更新头像
    try {
        //返回头像地址
        userProfileParam.avatar = await handleUpload(options.file)
        $message.success("上传成功")
        return Promise.resolve()
    } catch (e) {
        return Promise.reject(e)
    } finally {
        avatarRef.value!.clearFiles()
    }
}
const handleExceed: UploadProps['onExceed'] = async (files) => {
    avatarRef.value!.clearFiles()
    const file = files[0] as UploadRawFile
    file.uid = genFileId()
    avatarRef.value!.handleStart(file)
}

const handleBeforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
    console.log(rawFile)
    if (!/^.*\.(jpg|jpeg|png|webp)$/i.test(rawFile.name)) {
        $message.error("只支持png, jpg, webp等格式")
        return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
        $message.error("图片最大为2MB")
        return false
    }
    return true
}

const getChangedProp = (): UserProfileParam => {
    let profile = {} as UserProfileParam
    Object.keys(userProfileParam)
        .forEach((key, index) => {
            // @ts-ignore
            if (userProfileParam[key] !== userProfile.value![key]) {
                // @ts-ignore
                profile[key] = userProfileParam[key]
            }
        })
    return profile
}

</script>
<template>
    <div class="hami-user-profile">
        <el-skeleton :rows="5" animated :loading="onLoading"></el-skeleton>
        <div class="user-profile-container" v-if="!onLoading">
            <div class="user-profile-header">个人资料</div>
            <div class="user-profile-body">
                <div class="profile-form">
                    <el-divider></el-divider>
                    <el-form :model="userProfileParam" ref="userProfileForm" label-width="80px" size="large"
                             :rules="userProfileFormRules"
                             :disabled="onUpdate"
                             @submit.native.prevent class="form">
                        <el-form-item label="用户名" prop="username" class="username">
                            <el-input v-model="userProfileParam.username" size="large" type="text" placeholder="用户名"
                                      minlength="2" maxlength="20" show-word-limit disabled>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="职位" prop="position" class="position">
                            <el-input v-model="userProfileParam.position" size="large" maxlength="50" show-word-limit>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="公司" prop="company" class="position">
                            <el-input v-model="userProfileParam.company" size="large" maxlength="50" show-word-limit>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="个人主页" prop="blog" class="position">
                            <el-input v-model="userProfileParam.blog" size="large"
                                      maxlength="100" show-word-limit>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="个人介绍" prop="profile" class="position">
                            <el-input v-model="userProfileParam.profile" size="large"
                                      type="textarea" rows="4" maxlength="128" show-word-limit>
                            </el-input>
                        </el-form-item>
                    </el-form>
                    <el-divider></el-divider>
                    <div class="update-button">
                        <el-button type="primary" size="large" @click="updateProfile(userProfileForm)"
                                   :disabled="onUpdate">
                            保存修改
                        </el-button>
                    </div>
                </div>
                <div class="profile-avatar">
                    <el-upload
                        ref="avatarRef"
                        action="#"
                        name="avatar"
                        :before-upload="handleBeforeUpload"
                        :on-exceed="handleExceed"
                        :http-request="updateAvatar"
                        :limit="1"
                        :show-file-list="false"
                        class="upload"
                        :disabled="onUpload"
                    >
                        <template #default>
                            <HamiLoading :loading="onUpload" text="上传中" style="border-radius: 50%; height: 120px;">
                                <img :src="userProfileParam.avatar || defaultAvatar" alt="">
                            </HamiLoading>
                        </template>
                        <template #trigger>
                            <div class="upload-avatar">
                                <el-button :disabled="onUpload" type="primary" plain>
                                    更换头像
                                </el-button>
                            </div>
                        </template>
                    </el-upload>
                    <div class="tip">点击下方保存修改后生效</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.hami-user-profile {
    padding: 20px 24px;
    background-color: var(--hami-bg);
    border-radius: var(--hami-radius-medium);
    min-height: 540px;

    .el-divider {
        margin: 20px 0
    }

    .user-profile-header {
        font-size: 18px;
        font-weight: 700;
        color: var(--hami-title-color);
    }

    .user-profile-body {
        display: flex;
        justify-content: space-between;

        .profile-form {
            flex: 1;

            .username, .position {
                :deep(input) {
                    font-size: 16px;
                    letter-spacing: 1px;
                }
            }
        }

        .update-button {
            text-align: center;
        }
    }

    .profile-avatar {
        min-width: 300px;
        padding-left: 60px;
        padding-top: 30px;

        .tip {
            text-align: center;
            font-size: 13px;
            color: var(--hami-item-text-color);
            width: 100%;
            margin-top: 6px;
        }

        img {
            width: 120px;
            height: 120px;
            border-radius: 50%;
        }

        .upload {
            display: flex;
            flex-direction: column-reverse;
            align-items: center;
        }

        .loading {
            border-radius: 50%;
        }

        .upload-avatar {
            margin-top: 16px;

            button {
                border-radius: var(--hami-radius-medium);
            }
        }
    }
}


</style>