<template>
  <AppBar />
  <SafeArea>
    <div class="pt-8">
      <DataTable
        ref="shipmentTableRef"
        title="배송 관리"
        :columns="columns"
        :items="shipments.display"
        :page-meta="shipmentTablePage"
      >
        <template #control>
          <div class="flex justify-end mb-2">
            <button class="btn btn-primary">배송정보 새로고침</button>
          </div>
        </template>
      </DataTable>
    </div>
  </SafeArea>
</template>
<script setup lang="ts">
import AppBar from '@/components/surfaces/AppBar.vue'
import SafeArea from '@/components/layouts/SafeArea.vue'
import DataTable from '@/components/display/DataTable.vue'
import { ref } from 'vue'
import type { PageMeta } from '@/types/ui.type'

const columns = ['배송번호', '주문번호', '상품명', '배송상태', '배송일자']
const shipments = ref({
  raw: [],
  display: [],
})
const shipmentTablePage = ref<PageMeta>({
  totalCount: 0,
  pageNo: 1,
  pageSize: 10,
  totalPage: 10,
})
const shipmentTableRef = ref<typeof DataTable>()
</script>
