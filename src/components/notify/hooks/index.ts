import { $message } from '@/utils'
import { NotifyService } from '@/service/modules/notify.ts'

export async function useDeleteMsg(msg_id: number | string, $emit: any, $event: Event) {
    $event.preventDefault()
    try {
        await $message.confirm("确定删除该通知?", "删除")
        await NotifyService.deleteNotify(msg_id as number)
        $emit("delete")
        $message.success("删除成功")
    } catch (e) {
        if (e === 'cancel') return
        $message.error("操作失败")
    }
}