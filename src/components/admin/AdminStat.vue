<script setup lang="ts">
import { ref, reactive, onMounted, computed, Ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import * as echarts from "echarts"
import yunyingImg from "/assets/yunying.png"
import { Warning } from '@element-plus/icons-vue'
import dayjs from '@/utils/time'
import { AdminService } from '@/service/modules/admin.ts'
import { $message } from '@/utils'

// 饼状图
const pieChartRef = ref<HTMLDivElement | null>(null) as Ref<HTMLDivElement>
const start = new Date("2024-04-30")
const operationsTime = () => {
    return dayjs(Date.now()).diff(start.getTime(), "days")
}
const users = ref(0)
const articles = ref(0)
const views = ref(0)
const likes = ref(0)
const comments = ref(0)
const collects = ref(0)
const pv = ref(0)
const uv = ref(0)
const posts = ref(3)
onMounted(async () => {
    let loading = $message.loading("加载中")
    let myPieChart = echarts.init(pieChartRef?.value as HTMLElement)
    myPieChart.showLoading()
    try {
        let stat = await AdminService.getSiteStat()
        users.value = stat.users
        articles.value = stat.articles
        views.value = stat.views
        likes.value = stat.likes
        comments.value = stat.comments
        collects.value = stat.collects
        pv.value = stat.pv
        uv.value = stat.uv
        let option = {
            title: {
                text: '数据统计',
                left: 'center',
                textStyle: {
                    fontSize: 20
                }
            },
            tooltip: {
                trigger: 'item',
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                // 底部
                bottom: 0,
                textStyle: { //图例文字的样式
                    // color: '#fff',
                    fontSize: 20
                }
            },
            series: [
                {
                    name: '数据统计',
                    type: 'pie',
                    radius: ['60%'],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)',
                            fontSize: 18
                        }
                    },
                    data: [
                        { value: collects.value, name: '收藏总数' },
                        { value: likes.value, name: '点赞总数' },
                        { value: views.value, name: '阅读总数' },
                        { value: comments.value, name: '评论总数' }
                    ]
                }
            ]
        }
        setTimeout(() => {
            myPieChart.hideLoading()
            myPieChart.setOption(option)
        }, 1000)

    } catch (err) {
        myPieChart?.hideLoading()
    } finally {
        $message.closeLoading(loading)
    }

})

</script>
<template>
    <div class="admin-stat">
        <div class="left-stat">
            <div class="stat-item">
                <div class="item-title">
                    <img src="https://paicoding.com/admin/assets/yonghu-9f391c94.png">
                </div>
                <div class="item-value">{{ users }}</div>
                <div class="item-bottom">用户总数</div>
            </div>
            <div class="stat-item" style="background-color: #e7e1fb;">
                <div class="item-title">
                    <img src="https://paicoding.com/admin/assets/wenzhangzongshu-6ec0806c.png">
                </div>
                <div class="item-value">{{ articles }}</div>
                <div class="item-bottom">文章总数</div>
            </div>
            <div class="stat-item" style="background-color: #f4e4d4;">
                <div class="item-title">
                    <img src="https://paicoding.com/admin/assets/zhuanlan-3d0224e8.png">
                </div>
                <div class="item-value">{{ posts }}</div>
                <div class="item-bottom">帖子数</div>
            </div>
            <div class="stat-item" style="background-color: #6bc5b8;">
                <div class="item-title">
                    <img src="https://paicoding.com/admin/assets/fangwenliang-f98ae88b.png">
                </div>
                <div class="item-value">{{ pv }}</div>
                <div class="item-bottom">页面访问量</div>
            </div>
            <div class="stat-item" style="background-color: #42a5f5;">
                <div class="item-title">
                    <img src="https://paicoding.com/admin/assets/zhuce-e5d59df0.png">
                </div>
                <div class="item-value">{{ uv }}</div>
                <div class="item-bottom">独立访问数</div>
            </div>
            <div class="stat-item" style="background-color: #9ecbdb;">
                <div class="item-title">
                    <img :src=" yunyingImg">
                </div>
                <div class="item-value">{{ operationsTime() }}</div>
                <div class="item-bottom">运营时间</div>
            </div>
        </div>
        <div class="right-stat">
            <div class="total-stat" ref="pieChartRef"></div>
        </div>
    </div>
</template>

<style scoped lang="less">
.admin-stat {
    background-color: #fff;
    padding: 10px;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    .left-stat {
        display: flex;
        flex-wrap: wrap;
        height: 500px;
        flex: 1;
        margin-right: 20px;
    }
    .total-stat {
        width: 500px;
        height: 500px;
    }
    .stat-item {
        background-color: #e8faea;
        border-radius: 16px;
        display: flex;
        flex-direction: column;
        //align-items: center;
        //justify-content: space-between;
        width: 25%;
        margin-right: 20px;
        margin-top: 15px;
        padding: 20px 0 0 20px;
        .item-title {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background-color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            img {
                height: 48px;
            }
            margin-bottom: 10px;
        }
        .item-value {
            font-size: 28px;
            color: #000;
            font-weight: 700;
            margin-bottom: 10px;
        }
        .item-bottom {
            font-size: 20px;
        }


    }
}
</style>