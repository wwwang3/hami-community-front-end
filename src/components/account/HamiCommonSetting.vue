<script setup lang="ts">
import { ref } from 'vue'

const modes = ['light', 'dark', 'system']
const mode = ref("light")
const handleClick = (m: string) => {
    mode.value = m
}
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
                <el-radio-group v-model="mode">
                    <div class="item" @click="handleClick('light')" :class="{active: mode === 'light'}">
                        <el-skeleton class="i-skeleton"/>
                        <div class="radio">
                            <el-radio label="light"></el-radio>
                        </div>
                    </div>
                    <div class="item" @click="handleClick('dark')" :class="{active: mode === 'dark'}">
                        <el-skeleton class="i-skeleton dark"/>
                        <div class="radio">
                            <el-radio label="dark"></el-radio>
                        </div>
                    </div>
                    <div class="item" @click="handleClick('system')" :class="{active: mode === 'system'}">
                        <div class="skeleton-group">
                            <el-skeleton class="i-skeleton"/>
                            <el-skeleton class="i-skeleton dark"/>
                        </div>
                        <div class="radio">
                            <el-radio label="system"></el-radio>
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
    color: var(--hami-text);
    min-height: 500px;
    .common-setting-title {
        font-size: 18px;
        font-weight: 700;
        color: var(--hami-title);
    }

    .common-setting-body {
        .title {
            color: var(--hami-text);
            margin-bottom: 10px;
        }

        .tips {
            color: var(--hami-gray);
            margin-bottom: 20px;
            font-size: 14px;
        }

        .setting-items {
            display: flex;
            justify-content: space-between;

            .item {
                border-radius: var(--hami-radius);
                cursor: pointer;
                width: 240px;
                border: 1px solid var(--hami-border-gray);

                .i-skeleton {
                    padding: 10px 16px;

                    :deep(.el-skeleton__item):not(:first-child) {
                        margin-top: 5px;
                    }

                    border-bottom: 1px solid var(--hami-border-gray);
                }
                .i-skeleton.dark {
                    background-color: #181818;
                    border-radius: var(--hami-radius) var(--hami-radius) 0 0;
                    :deep(.el-skeleton__item) {
                        background-color: hsla(0,0%,100%,.2);;
                    }
                }
                .i-skeleton.light {
                    background-color: #fff;
                }

                .radio {
                    padding: 10px 16px;
                }
            }

            .item:not(:last-child) {
                margin-right: 24px;
            }

            .item:hover .radio {
                background-color: #eaf2ff;
            }

            .item.active .radio {
                background-color: #eaf2ff;
            }
            .skeleton-group {
                display: flex;
                .i-skeleton.dark {
                    border-top-left-radius: 0;
                }
            }
        }
    }
}
</style>