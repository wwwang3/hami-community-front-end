<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import { onPPT } from '@/utils'


const handleClick = async () => {
    onPPT()
}
</script>
<template>
    <div class="hami-bulletin">
        <div class="bulletin-title">
            <el-icon size="20" class="icon">
                <svg class="icon" viewBox="0 0 1130 1024"
                     xmlns="http://www.w3.org/2000/svg" width="200" height="200">
                    <path
                        d="M1045.295643 1020.414871H78.260754A78.402121 78.402121 0 0 1 0 942.041023V275.184757a78.430394 78.430394 0 0 1 78.260754-78.402121h321.100934c0.763382-2.120505 1.102662-4.325829 2.318418-6.304967L500.128063 30.676447A69.411182 69.411182 0 0 1 556.392117 3.081615h0.056547a77.72356 77.72356 0 0 1 61.918732 31.2421l1.866044 2.770793 95.959899 159.688128h329.102304a78.402121 78.402121 0 0 1 78.260754 78.402121V942.041023a78.373848 78.373848 0 0 1-78.260754 78.373848zM563.91284 73.680279a10.432882 10.432882 0 0 0-7.49245-3.392807h-0.028273a5.117484 5.117484 0 0 0-2.233598 0.424101l-77.55392 126.071063h161.299712l-73.991471-123.102357z m492.579067 201.504478a11.365904 11.365904 0 0 0-11.196264-11.224537H78.260754a11.365904 11.365904 0 0 0-11.196264 11.224537V942.041023c0 6.050506 5.145758 11.196264 11.196264 11.196264h967.034889a11.365904 11.365904 0 0 0 11.196264-11.196264V275.184757z m-285.08063 265.289254H251.548385a33.560518 33.560518 0 0 1-33.532245-33.588792c0-18.57562 15.013172-33.617065 33.532245-33.617065h519.862892c18.519073 0 33.532245 15.041446 33.532245 33.617065 0 18.547346-15.013172 33.588792-33.532245 33.588792zM244.084209 700.982068h335.407271a33.588792 33.588792 0 0 1 0 67.205857H244.084209a33.588792 33.588792 0 1 1 0-67.205857z"
                        fill="currentColor"></path>
                </svg>
            </el-icon>
            <span class="text">公告</span>
        </div>
        <div class="bulletin-item-list">
            <el-text class="bulletin-item" truncated>Hami-v0.0.1发布啦</el-text>
        </div>
        <div class="more-log" @click="handleClick">
            查看更多
            <el-icon size="16">
                <ArrowRight/>
            </el-icon>
        </div>
    </div>
</template>

<style scoped lang="less">

.hami-bulletin {
    padding: 16px 20px 10px;

    .bulletin-title {
        display: flex;
        align-items: center;
        color: var(--hami-blue-2);

        .text {
            font-size: 20px;
            margin-left: 6px;
        }

    }

    .bulletin-item-list {
        padding: 6px 0;

        .bulletin-item {
            line-height: 22px;
            height: 22px;
        }
    }

    .more-log {
        display: flex;
        font-size: 14px;
        align-items: center;
        cursor: pointer;
        height: 20px;
        color: var(--hami-card-text-color);

        .el-icon {
            position: relative;
            top: 1px;
        }

        &:hover {
            color: var(--hami-text-hover-color);
        }
    }
}
</style>