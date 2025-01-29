<template>
  <AppBar />
  <SafeArea>
    <DataTable
      ref="noticeTable"
      title="공지사항"
      :columns="columns"
      :items="notices.display"
      :page-meta="noticeTablePage"
    >
      <template #control>
        <div class="flex justify-end mb-2">
          <router-link :to="{ name: 'notice-new' }" class="btn btn-primary">공지 추가</router-link>
        </div>
      </template>
      <template #actions>
        <li>
          <span class="dropdown-item" @click="updateNotice">공지 수정</span>
          <span class="dropdown-item text-danger" @click="deleteNotice">공지사항 삭제</span>
        </li>
      </template>
    </DataTable>
  </SafeArea>
</template>
<script setup lang="ts">
import AppBar from '@/components/surfaces/AppBar.vue'
import SafeArea from '@/components/layouts/SafeArea.vue'
import DataTable from '@/components/display/DataTable.vue'
import type { PageMeta } from '@/types/ui.type'
import { onMounted, ref } from 'vue'
import { NoticeService } from '@/services/notice.service'
import { useRouter } from 'vue-router'
import { orderPageItemList } from '@/utils/index.util'
import dayjs from 'dayjs'
import type { Notice } from '@/types/service.type'

const columns = ['등록번호', '제목', '작성일']
const noticeTable = ref()
const notices = ref({
  raw: [],
  display: [],
})
const noticeTablePage = ref<PageMeta>({
  totalCount: 0,
  pageNo: 1,
  pageSize: 10,
  totalPage: 10,
})

const noticeSvc = new NoticeService()
const router = useRouter()
onMounted(async () => {
  const noticeData = await noticeSvc.listNotice()
  noticeTablePage.value = noticeData.meta
  notices.value.raw = noticeData.list
  notices.value.display = orderPageItemList(
    noticeData.list.map((itm) => {
      return {
        ...itm,
        createdAt: dayjs(itm.createdAt).format('YYYY-MM-DD HH:mm'),
      }
    }),
    ['id', 'title', 'createdAt'],
  )
})

async function updateNotice() {
  const index = noticeTable.value!.getRecentActionTarget()
  const target = notices.value.raw[index] as Notice
  await router.push({ name: 'notice-update', params: { id: target.id } })
}

async function deleteNotice() {
  const index = noticeTable.value!.getRecentActionTarget()
  const target = notices.value.raw[index] as Notice
  if (confirm(`정말로 ${target.title} 공지를 삭제하시겠습니까?`)) {
    await noticeSvc.deleteNotice(target.id)
    window.alert('공지가 삭제되었습니다.')
    router.go(0)
  }
}
</script>
