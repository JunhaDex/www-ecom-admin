<template>
  <AppBar />
  <SafeArea>
    <div class="pt-8">
      <DataTable
        title="배송사 등록"
        :columns="columns"
        :has-actions="false"
        :items="couriers"
        :page-meta="productTablePage"
      >
        <template #control>
          <div class="flex justify-end mb-2">
            <button class="btn btn-primary">등록</button>
            <button class="btn btn-secondary ml-4">수정</button>
            <button class="btn btn-danger ml-4">삭제</button>
          </div>
          <div class="flex justify-start">
            <select class="select-box">
              <option value="name">배송사명</option>
            </select>
            <input type="text" class="flex-1 input ml-4" placeholder="검색어를 입력하세요" />
            <button class="btn btn-primary ml-4">검색</button>
          </div>
        </template>
      </DataTable>
    </div>
  </SafeArea>
  <AppFooter />
</template>
<script setup lang="ts">
import AppBar from '@/components/surfaces/AppBar.vue'
import SafeArea from '@/components/layouts/SafeArea.vue'
import AppFooter from '@/components/surfaces/AppFooter.vue'
import DataTable from '@/components/display/DataTable.vue'
import { onMounted, ref } from 'vue'
import { orderPageItemList } from '@/utils/index.util'
import type { PageMeta } from '@/types/ui.type'
import dayjs from 'dayjs'
import { CourierService } from '@/services/courier.service'

const columns = ['배송사명', 'API', '생성일']
const couriers = ref([])
const productTablePage = ref<PageMeta>({
  totalCount: 0,
  pageNo: 1,
  pageSize: 10,
  totalPage: 10,
})

const courierSvc = new CourierService()
onMounted(async () => {
  const courierData = await courierSvc.listCourier()
  productTablePage.value = courierData.meta
  couriers.value = orderPageItemList(
    courierData.list.map((itm) => {
      return {
        ...itm,
        createdAt: dayjs(itm.createdAt).format('YYYY-MM-DD HH:mm'),
      }
    }),
    ['courierName', 'apiUrl', 'createdAt'],
  )
})
</script>
