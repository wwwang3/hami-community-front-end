<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import useThemeStore, { ThemeType } from '@/store/modules/theme.ts'

const modeMap = {
    'light': '浅色模式',
    'dark': '深色模式',
    'auto': '跟随系统'
}

const themeStore = useThemeStore()
const handleClick = (mode: ThemeType) => {
    themeStore.setThemeMode(mode)
}

const modeName = ref('浅色模式')

watchEffect(() => {
    modeName.value = modeMap[themeStore.themeMode] ?? "浅色模式"
})

</script>
<template>
    <div class="hami-common-setting">
        <div class="common-setting-title">通用设置</div>
        <el-divider></el-divider>
        <div class="common-setting-body">
            <div class="title">页面设置</div>
            <div class="tips">
                该设置仅在当前浏览器生效，目前已支持部分核心页面，更多页面适配持续进行中，如有建议可点击页面右下角反馈
            </div>
            <div class="setting-items">
                <el-radio-group v-model="modeName">
                    <div class="item" @click="handleClick('light')" :class="{active: modeName === '浅色模式'}">
                        <el-skeleton class="i-skeleton skeleton-light"/>
                        <div class="radio">
                            <el-radio label="浅色模式"></el-radio>
                        </div>
                    </div>
                    <div class="item" @click="handleClick('dark')" :class="{active: modeName === '深色模式'}">
                        <el-skeleton class="i-skeleton skeleton-dark"/>
                        <div class="radio">
                            <el-radio label="深色模式"></el-radio>
                        </div>
                    </div>
                    <div class="item" @click="handleClick('auto')" :class="{active: modeName === '跟随系统'}">
                        <div class="skeleton-group">
                            <el-skeleton class="i-skeleton skeleton-light"/>
                            <el-skeleton class="i-skeleton skeleton-dark"/>
                        </div>
                        <div class="radio">
                            <el-radio label="跟随系统"></el-radio>
                        </div>
                    </div>
                </el-radio-group>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.hami-common-setting {
    padding: 20px 24px;
    background-color: var(--hami-bg);
    border-radius: var(--hami-radius-medium);
    min-height: 500px;

    .common-setting-title {
        font-size: 18px;
        font-weight: 700;
        color: var(--hami-title-color);
    }

    .common-setting-body {

        .title {
            color: var(--hami-title-color);
            margin-bottom: 10px;
        }

        .tips {
            color: var(--hami-item-text-color);
            margin-bottom: 20px;
            font-size: 14px;
        }

        .setting-items {
            display: flex;
            justify-content: space-between;

            .item {
                cursor: pointer;
                width: 240px;
                border: 1px solid var(--hami-border-grey);
                border-radius: 6px;

                .radio {
                    padding: 10px 16px;
                }
            }

            .item:not(:last-child) {
                margin-right: 24px;
            }

            .item.active, .item:hover {

                .radio {
                    background-color: var(--hami-blue-6);
                }

            }


            .i-skeleton {
                padding: 10px 16px;
                border-bottom: 1px solid var(--hami-border-grey);

                :deep(.el-skeleton__item):not(:first-child) {
                    margin-top: 5px;
                }

            }

            .skeleton-light {
                background-color: #fff;
                border-radius: 6px 6px 0 0;
                --el-skeleton-color: #e4e5e6;
            }

            .skeleton-dark {
                background-color: #181818;
                border-radius: 6px 6px 0 0;
                --el-skeleton-color: hsla(0, 0%, 100%, .2);;
            }


            .skeleton-group {
                display: flex;

                .skeleton-light {
                    border-radius: 6px 0 0 0;
                }

                .skeleton-dark {
                    border-radius: 0 6px 0 0;
                }
            }
        }
    }
}
</style>